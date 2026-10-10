"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { OPENING_GEOMETRY as G } from "./geometry";
import styles from "./Opening.module.css";

/**
 * Opening sequence: a painted window appears, its shutters swing outward, a line of
 * handwriting is written on the panel behind, then "enter" takes the visitor through the window.
 *
 * Phases:
 *   idle     assets loading, nothing visible
 *   in       the window fades up
 *   open     shutters swing, light grows, text is written (all CSS keyframes)
 *   ready    everything finished, "enter" is shown
 *   leaving  the view moves through the opening and fades into the landing page
 */
type Phase = "idle" | "in" | "open" | "ready" | "leaving";

const ENTRY_KEY = "gaurav-paper-entered";
const OPEN_AT_MS = 900;
/** Opening phase lasts until the second line finishes writing (see Opening.module.css). */
const READY_AT_MS = 4600;
const LEAVE_MS = 1150;
/** Extra scale beyond exactly covering the screen, so the arch's curved corners are off-screen too. */
const ZOOM_MARGIN = 1.3;
/** Longest we wait for images and the font before starting anyway. */
const LOAD_TIMEOUT_MS = 3000;
const IMAGES = ["window-frame", "shutter-left", "shutter-right", "panel"].map((name) => `/opening/${name}.webp`);

const pct = (value: number, total: number) => `${(value / total) * 100}%`;
const place = (box: { x: number; y: number; w: number; h: number }) => ({
  left: pct(box.x, G.window.w),
  top: pct(box.y, G.window.h),
  width: pct(box.w, G.window.w),
  height: pct(box.h, G.window.h),
});

const readEntered = () => {
  try {
    return sessionStorage.getItem(ENTRY_KEY) === "yes";
  } catch {
    return false; // Storage can be blocked. The opening still works without it.
  }
};

function waitForAssets(): Promise<void> {
  const decoded = IMAGES.map((src) => {
    const image = new window.Image();
    image.src = src;
    return image.decode().catch(() => undefined);
  });
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, LOAD_TIMEOUT_MS));
  return Promise.race([Promise.all([...decoded, fonts]).then(() => undefined), timeout]);
}

function Shutter({ side }: { side: "left" | "right" }) {
  const box = side === "left" ? G.shutterLeft : G.shutterRight;
  const src = `/opening/shutter-${side}.webp`;
  return (
    <div className={`${styles.shutter} ${styles[side]}`} style={{ ...place(box), "--outline": `url(${src})` } as React.CSSProperties} aria-hidden="true">
      <div className={`${styles.face} ${styles.front}`}>
        <Image src={src} alt="" width={box.w} height={box.h} unoptimized draggable={false} />
        <span className={styles.shadeFront} />
      </div>
      {/* The back of the shutter is the same painting seen from behind, so it reads as mirrored. */}
      <div className={`${styles.face} ${styles.back}`}>
        <Image src={src} alt="" width={box.w} height={box.h} unoptimized draggable={false} />
        <span className={styles.shadeBack} />
      </div>
    </div>
  );
}

export function Opening() {
  const dialog = useRef<HTMLDialogElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (readEntered()) {
      element.close();
      return;
    }
    // Rendered open (non-modal) for the first paint so the page never flashes. Make it modal now.
    element.close();
    element.showModal();

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    waitForAssets().then(() => {
      if (cancelled) return;
      if (reduced) {
        setPhase("ready"); // No movement for people who ask for less of it: show the finished scene.
        return;
      }
      setPhase("in");
      timers.push(setTimeout(() => setPhase("open"), OPEN_AT_MS));
      timers.push(setTimeout(() => setPhase("ready"), READY_AT_MS));
    });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const enter = () => {
    if (phase === "leaving") return;
    // Scale so the opening, not just the window, grows to cover the whole screen.
    const box = scene.current?.getBoundingClientRect();
    if (box) {
      const openingW = (box.width * G.panel.w) / G.window.w;
      const openingH = (box.height * G.panel.h) / G.window.h;
      const cover = Math.max(window.innerWidth / openingW, window.innerHeight / openingH) * ZOOM_MARGIN;
      scene.current?.style.setProperty("--zoom", String(cover));
    }
    setPhase("leaving");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(
      () => {
        try {
          sessionStorage.setItem(ENTRY_KEY, "yes");
        } catch {
          /* Entry does not depend on persistence. */
        }
        dialog.current?.close();
        document.getElementById("home-title")?.focus({ preventScroll: true });
      },
      reduced ? 0 : LEAVE_MS,
    );
  };

  const origin = {
    "--origin-x": pct(G.panel.x + G.panel.w / 2, G.window.w),
    "--origin-y": pct(G.panel.y + G.panel.h * 0.55, G.window.h),
    "--aspect": `${G.window.w} / ${G.window.h}`,
    "--aspect-n": G.window.w / G.window.h,
    "--panel-ink": G.panelInk,
  } as React.CSSProperties;

  return (
    <dialog
      ref={dialog}
      open
      className={styles.stage}
      data-phase={phase}
      aria-labelledby="opening-title"
      onCancel={(event) => {
        event.preventDefault();
        enter();
      }}
      onKeyDown={(event) => {
        // The button is the visible control; Enter on the dialog does the same once it is shown.
        if (event.key === "Enter" && phase === "ready") enter();
      }}
      suppressHydrationWarning
    >
      <div ref={scene} className={styles.scene} style={origin}>
        <div className={styles.stack}>
          <Image className={styles.panel} src="/opening/panel.webp" alt="" width={G.panel.w} height={G.panel.h} style={place(G.panel)} unoptimized />
          <div className={styles.text} style={place(G.panel)}>
            <h1 id="opening-title">
              <span className={`${styles.line} ${styles.lineOne}`}>welcome to</span>
              <span className={`${styles.line} ${styles.lineTwo}`}>my portfolio</span>
            </h1>
          </div>
          <Image className={styles.frame} src="/opening/window-frame.webp" alt="" width={G.window.w} height={G.window.h} unoptimized priority />
          <Shutter side="left" />
          <Shutter side="right" />
        </div>
      </div>
      <button type="button" className={styles.enter} onClick={enter} disabled={phase !== "ready"}>
        enter
      </button>
    </dialog>
  );
}
