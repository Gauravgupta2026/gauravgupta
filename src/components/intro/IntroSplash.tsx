"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BoilStroke } from "./BoilStroke";
import { SCRIBBLE_VARIANTS, SWASH_VARIANTS } from "./scribble";

/** How long the finished lockup holds before the curtain leaves. */
const HOLD_MS = 2600;
/** Curtain slide-out duration. Matches the site's 0.9s reveal rhythm. */
const CURTAIN_MS = 900;
/** Don't let a stalled font load hold the curtain up indefinitely. */
const FONT_WAIT_TIMEOUT_MS = 1200;

const SEEN_KEY = "intro-seen";

/**
 * "idle" covers both "curtain is up" and "never playing" — which of the two is
 * decided entirely in CSS by html[data-intro="play"]. Keeping that out of React
 * state is deliberate: the markup must be identical on server and client so the
 * curtain paints from the SSR HTML, before hydration.
 */
type Phase = "idle" | "leaving" | "done";

/**
 * Full-bleed intro curtain: the lockup draws itself on, holds, then slides down
 * to reveal the site.
 *
 * Whether it plays at all is decided by the inline script in <layout>, which
 * runs before first paint and sets `data-intro="play"` on <html>. That ordering
 * matters: it means this element is CSS-hidden by default, so a returning
 * visitor (or a reduced-motion visitor, or a no-JS visitor) never sees a flash
 * of curtain. This component only *reads* that decision — it never makes it.
 */
export function IntroSplash() {
  const [phase, setPhase] = useState<Phase>("idle");
  // Timers are cleared from several paths (skip, unmount) — keep them addressable.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const leave = useCallback(() => {
    clearTimers();
    setPhase((p) => (p === "idle" ? "leaving" : p));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // Returning visitor / reduced motion / no-JS: the bootstrap never set
    // data-intro, so CSS is already keeping this element display:none. Nothing
    // to schedule, and nothing to unmount — leave it inert.
    if (root.dataset.intro !== "play") return;

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Private mode with storage disabled — the intro just replays. Harmless.
    }

    // The curtain buys us the font load for free: hold the exit until faces are
    // ready so the hero behind is fully painted when it's uncovered. Never let
    // that wait exceed FONT_WAIT_TIMEOUT_MS.
    const fontsReady = document.fonts
      ? Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, FONT_WAIT_TIMEOUT_MS)),
        ])
      : Promise.resolve();

    let cancelled = false;
    fontsReady.then(() => {
      if (cancelled) return;
      timers.current.push(setTimeout(leave, HOLD_MS));
    });

    // Nobody should be held hostage by an intro. Any input fast-forwards it.
    const skip = () => leave();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });

    return () => {
      cancelled = true;
      clearTimers();
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [leave]);

  // Release the scroll lock the moment the curtain starts moving, so the reveal
  // and the user's first scroll can overlap.
  useEffect(() => {
    if (phase !== "leaving") return;
    const root = document.documentElement;
    root.classList.remove("intro-lock");
    const t = setTimeout(() => {
      delete root.dataset.intro;
      setPhase("done");
    }, CURTAIN_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    // Belt-and-braces: never strand the lock if we unmount mid-flight.
    return () => document.documentElement.classList.remove("intro-lock");
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`intro-splash ${phase === "leaving" ? "is-leaving" : ""}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="intro-card">
        <p className="intro-eyebrow">A Product</p>

        <div className="intro-lockup">
          <BoilStroke
            variants={SCRIBBLE_VARIANTS}
            viewBox="0 0 640 220"
            className="intro-scribble"
            strokeWidth={4.5}
            drawDelay={620}
            drawDuration={900}
          />
          <div className="intro-word-slot">
            <span className="intro-word">Portfolio</span>
          </div>
        </div>

        <p className="intro-of">of</p>

        <div className="intro-name-wrap">
          <p className="intro-name">Gaurav Gupta</p>
          <BoilStroke
            variants={SWASH_VARIANTS}
            viewBox="0 0 200 24"
            className="intro-swash"
            strokeWidth={2.8}
            drawDelay={1180}
            drawDuration={520}
          />
        </div>
      </div>
    </div>
  );
}
