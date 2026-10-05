"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./DolphinSea.module.css";

type SceneAction = "pause" | "resume";

export function DolphinSea() {
  const host = useRef<HTMLElement>(null);
  const scene = useRef<HTMLIFrameElement>(null);
  const transport = useRef({ paused: false, visible: false, started: false });
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [replay, setReplay] = useState(0);

  const send = useCallback((action: SceneAction) => {
    scene.current?.contentWindow?.postMessage({ source: "dolphin-sea", action }, window.location.origin);
  }, []);

  const syncPlayback = useCallback(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldPause = transport.current.paused
      || !transport.current.visible
      || !transport.current.started
      || document.hidden
      || reducedMotion;
    send(shouldPause ? "pause" : "resume");
  }, [send]);

  useEffect(() => {
    const section = host.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchInput = window.matchMedia("(hover: none), (pointer: coarse)");
    const observer = new IntersectionObserver(([entry]) => {
      transport.current.visible = entry.isIntersecting;
      if (touchInput.matches && entry.intersectionRatio >= 0.33) {
        transport.current.started = true;
      }
      syncPlayback();
    }, { threshold: [0, 0.15, 0.33] });
    const synchronize = () => syncPlayback();

    observer.observe(section);
    preference.addEventListener("change", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
    };
  }, [syncPlayback]);

  function startScene() {
    if (transport.current.started) return;
    transport.current.started = true;
    syncPlayback();
  }

  function togglePlayback() {
    const next = !transport.current.paused;
    transport.current.paused = next;
    setPaused(next);
    syncPlayback();
  }

  function replayScene() {
    transport.current.paused = false;
    transport.current.started = true;
    setPaused(false);
    setReady(false);
    setReplay((current) => current + 1);
  }

  return (
    <section
      ref={host}
      className={styles.sea}
      data-ready={ready}
      aria-label="Animated ASCII ocean and dolphin"
      data-browser-theme-color="#0b2cff"
      onPointerEnter={startScene}
      onFocusCapture={startScene}
    >
      <iframe
        ref={scene}
        className={styles.art}
        src={`/ascii-dolphin.html?replay=${replay}`}
        title="Animated ASCII dolphin crossing an electric-blue sea"
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
          aria-label={paused ? "Resume the ocean animation" : "Pause the ocean animation"}
          onClick={togglePlayback}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
            {paused ? <path d="M7 4 20 12 7 20Z" /> : <path d="M6 4h4v16H6zM14 4h4v16h-4z" />}
          </svg>
        </button>
        <button type="button" aria-label="Replay the dolphin animation" onClick={replayScene}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 10a8 8 0 1 1 0 5M4 4v6h6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
