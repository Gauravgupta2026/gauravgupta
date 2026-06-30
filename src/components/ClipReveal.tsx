"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-driven clip-path wipe for project center images. As the element rises
 * into view it un-clips bottom→top (matching the reference: progress = how far
 * the element top has travelled up from the viewport bottom, over 85% of the
 * viewport height). Disabled under prefers-reduced-motion.
 */
export function ClipReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.clipPath = "none";
      return;
    }

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)));
      el.style.clipPath = `inset(0 0 ${((1 - p) * 100).toFixed(2)}% 0)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
