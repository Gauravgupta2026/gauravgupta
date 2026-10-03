"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./KapuBeach.module.css";

type SceneAction = "pause" | "resume";

export function KapuBeach() {
  const host = useRef<HTMLElement>(null);
  const scene = useRef<HTMLIFrameElement>(null);
  const transport = useRef({ paused: false });
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [replay, setReplay] = useState(0);

  const send = useCallback((action: SceneAction) => {
    scene.current?.contentWindow?.postMessage({ source: "kapu-beach", action }, window.location.origin);
  }, []);

  const syncPlayback = useCallback(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = host.current;
    const bounds = section?.getBoundingClientRect();
    let visible = false;
    if (section && bounds && bounds.top < window.innerHeight && bounds.bottom > 0) {
      // The sticky footer can intersect the viewport while the white CTA covers it.
      const sampleY = Math.min(bounds.bottom, window.innerHeight) - 1;
      const foreground = document.elementFromPoint(window.innerWidth / 2, sampleY);
      visible = foreground !== null && section.contains(foreground);
    }
    const shouldPause = transport.current.paused
      || !visible
      || document.hidden
      || reducedMotion;
    send(shouldPause ? "pause" : "resume");
  }, [send]);

  useEffect(() => {
    const section = host.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(() => syncPlayback(), { threshold: [0, 0.15] });
    let animationFrame = 0;
    const synchronize = () => syncPlayback();
    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(syncPlayback);
    };

    observer.observe(section);
    preference.addEventListener("change", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      preference.removeEventListener("change", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [syncPlayback]);

  function togglePlayback() {
    const next = !transport.current.paused;
    transport.current.paused = next;
    setPaused(next);
    syncPlayback();
  }

  function replayScene() {
    transport.current.paused = false;
    setPaused(false);
    setReady(false);
    setReplay((current) => current + 1);
  }

  return (
    <section
      ref={host}
      className={styles.sea}
      data-ready={ready}
      aria-label="Animated ASCII Kapu beach with an island, lighthouse, and dolphins"
      data-browser-theme-color="#0b2cff"
    >
      <iframe
        ref={scene}
        className={styles.art}
        src={`/kapu-beach.html?scene=anchored-lighthouse&replay=${replay}`}
        loading="lazy"
        title="Animated ASCII Kapu beach island, lighthouse, and dolphins"
        aria-hidden="true"
        tabIndex={-1}
        onLoad={() => {
          setReady(true);
          syncPlayback();
        }}
      />
      <div className={styles.controls}>
        <button
          type="button"
          aria-pressed={paused}
          aria-label={paused ? "Resume the beach animation" : "Pause the beach animation"}
          onClick={togglePlayback}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
            {paused ? <path d="M7 4 20 12 7 20Z" /> : <path d="M6 4h4v16H6zM14 4h4v16h-4z" />}
          </svg>
        </button>
        <button type="button" aria-label="Replay the beach animation" onClick={replayScene}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 10a8 8 0 1 1 0 5M4 4v6h6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
