"use client";

import { useEffect, useRef } from "react";

const COLS = 150;
const ROWS = 32;
const RAMP = " .:-=+*#%@";

function frame(t: number): string {
  let out = "";
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const v =
        Math.sin(x * 0.19 + t) * Math.cos(y * 0.31 - t * 0.7) +
        Math.sin((x * 0.07 + y * 0.11) * 1.7 + t * 0.4);
      const n = (v + 2) / 4;
      const bayer = ((x & 1) ^ (y & 1)) * 0.06;
      const idx = Math.max(
        0,
        Math.min(RAMP.length - 1, Math.round((n + bayer) * (RAMP.length - 1))),
      );
      out += RAMP[idx];
    }
    out += "\n";
  }
  return out;
}

/**
 * Ambient ASCII dither texture behind the contact block — a dim base layer
 * plus a brighter layer masked to a soft radial spotlight that follows the
 * pointer. Static (first frame only) under prefers-reduced-motion.
 */
export function DitherField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLPreElement>(null);
  const litRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const text = frame(0);
    if (dimRef.current) dimRef.current.textContent = text;
    if (litRef.current) litRef.current.textContent = text;
    if (reduced) return;

    let t = 0;
    let raf = 0;
    const draw = () => {
      const text = frame(t);
      if (dimRef.current) dimRef.current.textContent = text;
      if (litRef.current) litRef.current.textContent = text;
      t += 0.021;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (e: PointerEvent) => {
      const host = hostRef.current;
      const lit = litRef.current;
      if (!host || !lit) return;
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const mask = `radial-gradient(220px 220px at ${x}px ${y}px, #000 0%, rgba(0,0,0,.55) 42%, transparent 72%)`;
      lit.style.webkitMaskImage = mask;
      lit.style.maskImage = mask;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden">
      <pre
        ref={dimRef}
        aria-hidden
        className="absolute inset-0 m-0 select-none whitespace-pre font-mono text-[9px] leading-[11px] tracking-[1.5px] text-[#1c1c1c] md:text-[11px] md:leading-[13px]"
      />
      <pre
        ref={litRef}
        aria-hidden
        className="absolute inset-0 m-0 select-none whitespace-pre font-mono text-[9px] leading-[11px] tracking-[1.5px] text-lilac md:text-[11px] md:leading-[13px]"
        style={{
          WebkitMaskImage:
            "radial-gradient(220px 220px at -400px -400px, #000 0%, rgba(0,0,0,.55) 42%, transparent 72%)",
          maskImage:
            "radial-gradient(220px 220px at -400px -400px, #000 0%, rgba(0,0,0,.55) 42%, transparent 72%)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,11,.72)_0%,rgba(11,11,11,.1)_38%,rgba(11,11,11,.86)_100%)]" />
    </div>
  );
}
