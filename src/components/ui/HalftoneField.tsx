"use client";

import { useEffect, useRef } from "react";

// Decorative screen only — these trios aren't part of the design-token
// palette, so they stay local rather than Tailwind tokens. Dark theme keeps
// the original grey/white/yellow; light theme switches to magenta/blue —
// grey dots read as almost invisible static on a light ground, and white
// dots disappear entirely on the white card, so light drops white from the
// mix and leans on the two saturated hues instead.
const DARK_PALETTE = ["#57544c", "#f4f1ea", "#e8b84b"];
const LIGHT_PALETTE = ["#c93fa8", "#2f5fd6", "#8a2fc9"];

// Light mode's card is smaller and plain white (vs. dark's moody surface),
// so the same dark-theme graphic read as a faint smudge stuck in one
// corner. Light gets a finer, smaller dot grid, a coverage floor so dots
// reach every edge instead of fading to nothing on the left, and higher
// alpha for contrast against white.
const DARK_TUNING = { cell: 11, maxRadius: 3.6, floor: 0, alphaMin: 0.4, alphaMax: 1.0 };
const LIGHT_TUNING = { cell: 7, maxRadius: 2, floor: 0.3, alphaMin: 0.55, alphaMax: 1.0 };

function pseudoRandom(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Dot radius follows a noise field, biased denser toward the top-right
// corner so the screen reads as one graphic, not scattered static — the
// `floor` keeps a light dusting everywhere else so it still reads as
// covering the full card rather than one corner.
function draw(canvas: HTMLCanvasElement) {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const [dotA, dotB, dotC] = isDark ? DARK_PALETTE : LIGHT_PALETTE;
  const { cell, maxRadius, floor, alphaMin, alphaMax } = isDark ? DARK_TUNING : LIGHT_TUNING;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);

  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const x = cx * cell + cell / 2;
      const y = cy * cell + cell / 2;
      const nx = x / w;
      const ny = y / h;

      const rawBias = (nx * 0.6 + (1 - ny) * 0.4 - 0.12) / 0.7;
      const bias = Math.max(floor, Math.min(1, rawBias));
      const noise =
        (Math.sin(cx * 0.5 + cy * 0.3) +
          Math.sin(cx * 0.21 - cy * 0.44 + 3) +
          Math.sin((cx + cy) * 0.13 + 6)) /
        3;
      const density = bias * (0.45 + 0.55 * ((noise + 1) / 2));

      const radius = maxRadius * density;
      if (radius < 0.4) continue;

      const seed = cx * 131 + cy * 977;
      const rand = pseudoRandom(seed);
      ctx.fillStyle = rand < 0.06 ? dotC : rand < 0.24 ? dotB : dotA;
      ctx.globalAlpha = alphaMin + pseudoRandom(seed * 3.1) * (alphaMax - alphaMin);
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
    window.addEventListener("themechange", render);
    return () => {
      window.removeEventListener("resize", render);
      window.removeEventListener("themechange", render);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
