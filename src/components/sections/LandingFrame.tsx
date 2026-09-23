"use client";

import { useEffect, useRef, type ReactNode } from "react";

const FRAME_OPEN_DISTANCE = 280;
const FRAME_RETURN_DISTANCE = 360;

function clampUnit(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Scroll-linked frame for the landing page; keeps the editorial surface
 *  inset at the opening and close, then lets the middle run edge to edge. */
export function LandingFrame({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let animationFrame = 0;

    const updateFrame = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const distanceToEnd = Math.max(
          0,
          frame.getBoundingClientRect().bottom - window.innerHeight,
        );
        const openProgress = clampUnit(window.scrollY / FRAME_OPEN_DISTANCE);
        const returnProgress = clampUnit(
          (FRAME_RETURN_DISTANCE - distanceToEnd) / FRAME_RETURN_DISTANCE,
        );

        frame.style.setProperty("--frame-open-progress", openProgress.toFixed(3));
        frame.style.setProperty("--frame-return-progress", returnProgress.toFixed(3));
      });
    };

    updateFrame();
    window.addEventListener("scroll", updateFrame, { passive: true });
    window.addEventListener("resize", updateFrame, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateFrame);
      window.removeEventListener("resize", updateFrame);
    };
  }, []);

  return (
    <div ref={frameRef} className="landing-frame">
      {children}
    </div>
  );
}
