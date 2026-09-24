"use client";

import { useEffect } from "react";

const DEFAULT_THEME_COLOR = "#080808";

/** Keeps supporting mobile browser chrome aligned with the section under it. */
export function ViewportThemeColor() {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-browser-theme-color]"),
    );
    let animationFrame = 0;

    const update = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const sampleY = Math.min(80, window.innerHeight * 0.08);
        const activeSection = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= sampleY && bounds.bottom > sampleY;
        });
        const color = activeSection?.dataset.browserThemeColor ?? DEFAULT_THEME_COLOR;

        if (meta?.content !== color) meta?.setAttribute("content", color);
        document.documentElement.style.backgroundColor = color;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  return null;
}
