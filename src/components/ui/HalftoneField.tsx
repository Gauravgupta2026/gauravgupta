"use client";

import { useEffect, useRef } from "react";

// Decorative screen only — this grey/white/yellow trio isn't part of the
// design-token palette, so it stays local rather than a Tailwind token.
const DOT_GREY = "#57544c";
const DOT_WHITE = "#f4f1ea";
const DOT_YELLOW = "#e8b84b";
const CELL = 11;
const MAX_RADIUS = 3.6;

function pseudoRandom(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Dot radius follows a noise field, biased denser toward the top-right
// corner so the screen reads as one graphic, not scattered static.
function draw(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);

  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const x = cx * CELL + CELL / 2;
      const y = cy * CELL + CELL / 2;
      const nx = x / w;
      const ny = y / h;

      const bias = Math.max(0, Math.min(1, (nx * 0.6 + (1 - ny) * 0.4 - 0.12) / 0.7));
      const noise =
        (Math.sin(cx * 0.5 + cy * 0.3) +
          Math.sin(cx * 0.21 - cy * 0.44 + 3) +
          Math.sin((cx + cy) * 0.13 + 6)) /
        3;
      const density = bias * (0.45 + 0.55 * ((noise + 1) / 2));

      const radius = MAX_RADIUS * density;
      if (radius < 0.5) continue;

      const seed = cx * 131 + cy * 977;
      const rand = pseudoRandom(seed);
      ctx.fillStyle = rand < 0.06 ? DOT_YELLOW : rand < 0.24 ? DOT_WHITE : DOT_GREY;
      ctx.globalAlpha = 0.4 + pseudoRandom(seed * 3.1) * 0.6;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

/** Halftone dot screen for the footer's CTA card. Static, no animation. */
export function HalftoneField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const render = () => draw(canvas);
    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
