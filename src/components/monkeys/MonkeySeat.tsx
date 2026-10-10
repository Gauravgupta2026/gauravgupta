"use client";

import { useEffect, useRef } from "react";

/**
 * One seated monkey with a swaying parasol and a rippling tail, drawn on a canvas.
 * Used twice in the footer: the right one is the same drawing flipped, a beat behind.
 *
 * Layer order (back to front): tail, body, parasol base, parasol tassels.
 * Body and tail share one 1310x1200 canvas, so they line up with no offsets.
 * The parasol is placed by its pole tip, which rests on the monkey's sleeve.
 */

// ---- Stage geometry (stage units = pixels of the 1310x1200 body and tail artwork) ----
const ART_W = 1310;
const ART_H = 1200;
/** Leftmost pixel of the tail and rightmost pixel of the foot, measured on the artwork. */
const ART_LEFT = 42;
const ART_RIGHT = 1267;
/** Free space above the body so the parasol feathers and sway never clip. */
const STAGE_TOP = -120;
const STAGE_BOTTOM = 1120;
const STAGE_W = ART_RIGHT - ART_LEFT;
const STAGE_H = STAGE_BOTTOM - STAGE_TOP;
/** Draw resolution cap. Artwork is ~1310px wide, so more than 2x only costs fill rate. */
const MAX_DPR = 2;

// ---- Parasol placement (parasol artwork is 1377 tall) ----
const PARASOL_H = 1377;
/** Pole tip in parasol pixels (the rounded end of the pole). */
const POLE_TIP = { x: 915, y: 1270 };
/** Where the pole tip rests on the monkey's sleeve, in stage units. */
const HAND = { x: 848, y: 742 };
const PARASOL_SCALE = 0.7;
/** Counter-clockwise tilt (radians) that lines the pole up with the monkey's arm and shoulder. */
const PARASOL_TILT = (-2.0 * Math.PI) / 180;
/** Tassel pivot line in parasol pixels: y = Y0 + SLOPE * (x - X0). Matches how the art was split. */
const PIVOT = { y0: 625, x0: 280, slope: -0.382 };
/** Parasol columns that contain tassels, and the width of one vertical slice that shears on its own. */
const TASSEL_X_MIN = 240;
const TASSEL_X_MAX = 960;
const TASSEL_SLICE = 3;

// ---- Motion ----
const SECOND = 1000;
/** Parasol sway: a main swing plus a slower drift so the loop never repeats exactly. */
const SWAY_MAIN = { amplitude: (1.3 * Math.PI) / 180, period: 5.2 };
const SWAY_DRIFT = { amplitude: (0.45 * Math.PI) / 180, period: 8.9 };
/** How far tassels lag behind the swing, as seconds of angular velocity. */
const TASSEL_INERTIA = 1.6;
/** Tassel flutter: shear (dx per dy), time period, and the distance over which the phase repeats. */
const TASSEL_FLUTTER = { shear: 0.05, period: 2.6, wavelength: 520 };
/** Tail ripple: vertical travel at the tip, time period, wavelength along the tail. */
const TAIL_RIPPLE = { amplitude: 15, period: 3.4, wavelength: 760 };
/** Tail columns left of TAIL_FIXED_X ripple; at TAIL_FIXED_X the tail is hidden under the body. */
const TAIL_FIXED_X = 700;
const TAIL_TIP_X = 42;
const TAIL_SLICE = 3;
/** Slices narrower than this many device pixels can be dropped by the canvas, so small drawings use wider slices. */
const MIN_SLICE_DEVICE_PX = 1.5;
/** Frozen moment shown to people who prefer reduced motion. */
const STILL_TIME = 1.1;
/** Footer height used when the canvas is not inside a footer element. */
const FALLBACK_REVEAL_PX = 560;

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

type Sprites = {
  body: HTMLImageElement;
  tail: HTMLImageElement;
  parasolBase: HTMLImageElement;
  parasolTassels: HTMLImageElement;
};

const SPRITE_SRC = {
  body: "/monkeys/body.webp",
  tail: "/monkeys/tail.webp",
  parasolBase: "/monkeys/parasol-base.webp",
  parasolTassels: "/monkeys/parasol-tassels.webp",
} as const;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
    image.src = src;
  });

/** Parasol swing angle in radians and its rate of change in radians per second. */
function parasolSway(time: number) {
  const main = (2 * Math.PI) / SWAY_MAIN.period;
  const drift = (2 * Math.PI) / SWAY_DRIFT.period;
  return {
    angle: SWAY_MAIN.amplitude * Math.sin(main * time) + SWAY_DRIFT.amplitude * Math.sin(drift * time + 1.3),
    velocity: SWAY_MAIN.amplitude * main * Math.cos(main * time) + SWAY_DRIFT.amplitude * drift * Math.cos(drift * time + 1.3),
  };
}

function drawTail(ctx: CanvasRenderingContext2D, tail: HTMLImageElement, time: number, slice: number) {
  const omega = (2 * Math.PI) / TAIL_RIPPLE.period;
  const spatial = (2 * Math.PI) / TAIL_RIPPLE.wavelength;
  for (let x = TAIL_TIP_X; x < TAIL_FIXED_X; x += slice) {
    // 0 where the tail leaves the body, 1 at the curl, eased so the root never snaps.
    const weight = smoothstep(TAIL_FIXED_X, TAIL_TIP_X, x);
    // The wave travels from the root toward the tip, so the curl trails the base.
    const dy = TAIL_RIPPLE.amplitude * weight * Math.sin(omega * time - spatial * (TAIL_FIXED_X - x));
    // One extra pixel of width hides hairline gaps between slices after scaling.
    ctx.drawImage(tail, x, 0, slice + 1, ART_H, x, dy, slice + 1, ART_H);
  }
  // The root (hidden under the body) stays fixed.
  ctx.drawImage(tail, TAIL_FIXED_X, 0, ART_W - TAIL_FIXED_X, ART_H, TAIL_FIXED_X, 0, ART_W - TAIL_FIXED_X, ART_H);
}

function drawParasol(ctx: CanvasRenderingContext2D, sprites: Sprites, time: number, slice: number) {
  const { angle, velocity } = parasolSway(time);
  ctx.save();
  // Pivot the whole parasol on the hand so the pole tip stays planted while the canopy swings.
  ctx.translate(HAND.x, HAND.y);
  ctx.rotate(PARASOL_TILT + angle);
  ctx.scale(PARASOL_SCALE, PARASOL_SCALE);
  ctx.translate(-POLE_TIP.x, -POLE_TIP.y);
  ctx.drawImage(sprites.parasolBase, 0, 0);

  const omega = (2 * Math.PI) / TASSEL_FLUTTER.period;
  const spatial = (2 * Math.PI) / TASSEL_FLUTTER.wavelength;
  // Tassels hang from gravity, so a swing to one side drags them to the other.
  const inertia = -TASSEL_INERTIA * velocity;
  for (let x = TASSEL_X_MIN; x < TASSEL_X_MAX; x += slice) {
    const pivotY = PIVOT.y0 + PIVOT.slope * (x - PIVOT.x0);
    const shear = inertia + TASSEL_FLUTTER.shear * Math.sin(omega * time + spatial * x);
    ctx.save();
    // x' = x + shear * (y - pivotY): zero at the pivot line, growing down the tassel.
    ctx.transform(1, 0, shear, 1, -shear * pivotY, 0);
    ctx.drawImage(sprites.parasolTassels, x, 0, slice + 1, PARASOL_H, x, 0, slice + 1, PARASOL_H);
    ctx.restore();
  }
  ctx.restore();
}

function drawScene(ctx: CanvasRenderingContext2D, sprites: Sprites, scale: number, time: number) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.imageSmoothingQuality = "high";
  ctx.scale(scale, scale);
  ctx.translate(-ART_LEFT, -STAGE_TOP);
  const tailSlice = Math.max(TAIL_SLICE, Math.ceil(MIN_SLICE_DEVICE_PX / scale));
  const tasselSlice = Math.max(TASSEL_SLICE, Math.ceil(MIN_SLICE_DEVICE_PX / (scale * PARASOL_SCALE)));
  drawTail(ctx, sprites.tail, time, tailSlice);
  ctx.drawImage(sprites.body, 0, 0);
  drawParasol(ctx, sprites, time, tasselSlice);
}

export function MonkeySeat({
  mirrored = false,
  delay = 0,
  className = "",
  label,
}: {
  /** Flip left to right. The art faces right, so the right-hand monkey is mirrored to face left. */
  mirrored?: boolean;
  /** Seconds this monkey runs behind the other one, so the pair never move in lockstep. */
  delay?: number;
  className?: string;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const context = canvasEl?.getContext("2d");
    if (!canvasEl || !context) return;
    const ctx: CanvasRenderingContext2D = context;

    let sprites: Sprites | null = null;
    let frame = 0;
    let running = false;
    let revealed = false;
    let scale = 1;
    let clock = 0;
    let last = 0;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

    const paint = () => {
      if (sprites) drawScene(ctx, sprites, scale, (reducedMotion.matches ? STILL_TIME : clock) - delay);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = canvasEl.clientWidth;
      canvasEl.width = Math.round(width * dpr);
      canvasEl.height = Math.round((width * STAGE_H * dpr) / STAGE_W);
      scale = canvasEl.width / STAGE_W;
      paint();
    };

    const tick = (now: number) => {
      if (!running) return;
      clock += (now - last) / SECOND;
      last = now;
      paint();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => (revealed && !document.hidden && !reducedMotion.matches && sprites ? start() : stop());

    // The footer sits behind the page and is uncovered by scrolling to the end, so ordinary
    // "is it on screen" checks are always true. Animate only when the footer has been uncovered.
    const checkReveal = () => {
      const footerHeight = canvasEl.closest("footer")?.clientHeight ?? FALLBACK_REVEAL_PX;
      const remaining = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      revealed = remaining < footerHeight;
      sync();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvasEl);
    window.addEventListener("scroll", checkReveal, { passive: true });
    window.addEventListener("resize", checkReveal);
    document.addEventListener("visibilitychange", sync);
    const onMotionPreference = () => {
      paint();
      sync();
    };
    reducedMotion.addEventListener("change", onMotionPreference);

    let cancelled = false;
    Promise.all(Object.values(SPRITE_SRC).map(loadImage)).then(([body, tail, parasolBase, parasolTassels]) => {
      if (cancelled) return;
      sprites = { body, tail, parasolBase, parasolTassels };
      resize();
      checkReveal();
    });

    return () => {
      cancelled = true;
      stop();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", checkReveal);
      window.removeEventListener("resize", checkReveal);
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", onMotionPreference);
    };
  }, [delay]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", aspectRatio: `${STAGE_W} / ${STAGE_H}`, display: "block", transform: mirrored ? "scaleX(-1)" : undefined }}
      role="img"
      aria-label={label}
    />
  );
}
