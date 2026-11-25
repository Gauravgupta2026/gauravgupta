/** What this device is given to draw. Weak devices get less geometry and fewer lights; the picture stays the same. */
export function pickQuality() {
  const cores = navigator.hardwareConcurrency ?? 4, memory = navigator.deviceMemory ?? 8, touch = matchMedia('(pointer: coarse)').matches;
  const low = cores <= 4 || memory <= 3;
  return {
    low, antialias: !low || devicePixelRatio < 2, terrainSegments: low ? 220 : 300, seaSegments: low ? 80 : touch ? 110 : 160,
    grainDots: low ? 20000 : 90000, pointLights: !low, shadowSize: low ? 1024 : 2048, snow: low ? 0.5 : 1,
    pixelRatio: Math.min(devicePixelRatio, low ? 1.25 : touch ? 1.75 : 2),
  };
}

const WINDOW = 45;                               // frames averaged before a decision
const SLOW_MS = 22, MIN_RATIO = 0.85, STEP = 0.25;   // slower than ~45 fps: draw fewer pixels

/** Watches real frame times and lowers the resolution, then the frame rate, until the scene runs smoothly. */
export function createGovernor(startRatio, setRatio) {
  let ratio = startRatio, sum = 0, n = 0, warmup = 30, skip = false, odd = false;
  return {
    /** Returns false when this frame should be skipped (30 fps mode). */
    frame(ms) {
      if (skip && (odd = !odd)) return false;
      if (ms > 250) return true;                 // a hidden tab or a hitch, not the steady speed
      if (warmup-- > 0 || skip) return true;
      sum += ms;
      if (++n < WINDOW) return true;
      const avg = sum / n; sum = n = 0;
      if (avg > SLOW_MS) {
        if (ratio > MIN_RATIO) { ratio = Math.max(MIN_RATIO, ratio - STEP); setRatio(ratio); } else skip = true;
      }
      return true;
    },
    get ratio() { return ratio; },
  };
}
