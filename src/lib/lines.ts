/*
 * The closing drawing: crayon lines over the stadium stands.
 *
 * Every line comes in from its own edge of the screen, at its own pace and in its own hand: most are straight, one
 * waves, one loops, one zigzags. They meet in the
 * middle; a soft veil of the page colour blooms there and the words appear on it.
 *
 * Crayon: a wobbling stroke, waxy crumbs along its edges, then paper tooth rubbed out of it. The finished lines are
 * drawn once; scrolling only uncovers them.
 */

type Point = readonly [number, number];
type Hand = 'straight' | 'wave' | 'loop' | 'zigzag';
/** `from`: where it enters (share of the width, share of the sky's height). `to`: where it stops, in half-sizes of the words' box. */
interface Line { from: Point; to: Point; hand: Hand; hue: number; begin: number; pace: number }
interface Drawn { pts: Point[]; len: number[]; begin: number; pace: number }
interface Layout { w: number; h: number; dpr: number; stands: HTMLCanvasElement; wax: HTMLCanvasElement; mask: HTMLCanvasElement; lines: Drawn[]; stroke: number }

const WIDE: Line[] = [
  { from: [0, 0.1], to: [-0.5, -0.5], hand: 'straight', hue: 0, begin: 0, pace: 0.5 },
  { from: [0, 0.54], to: [-0.6, 0.1], hand: 'wave', hue: 3, begin: 0.16, pace: 0.5 },
  { from: [0, 0.86], to: [-0.1, 0.5], hand: 'straight', hue: 2, begin: 0.08, pace: 0.46 },
  { from: [0.2, 0], to: [-0.3, -0.35], hand: 'straight', hue: 1, begin: 0.24, pace: 0.4 },
  { from: [0.45, 0], to: [0.14, -0.9], hand: 'straight', hue: 6, begin: 0.34, pace: 0.28 },
  { from: [0.9, 0], to: [0.1, -0.3], hand: 'straight', hue: 5, begin: 0.12, pace: 0.5 },
  { from: [1, 0.3], to: [0.5, -0.2], hand: 'loop', hue: 4, begin: 0.02, pace: 0.6 },
  { from: [1, 0.66], to: [0.6, 0.3], hand: 'zigzag', hue: 6, begin: 0.26, pace: 0.42 },
  { from: [1, 0.97], to: [0.15, 0.45], hand: 'straight', hue: 0, begin: 0.14, pace: 0.5 },
];
const TALL: Line[] = [
  { from: [0, 0.1], to: [-0.3, -0.5], hand: 'straight', hue: 0, begin: 0, pace: 0.5 },
  { from: [0.4, 0], to: [-0.06, -0.6], hand: 'loop', hue: 4, begin: 0.1, pace: 0.54 },
  { from: [1, 0.01], to: [0.2, -0.5], hand: 'straight', hue: 1, begin: 0.06, pace: 0.48 },
  { from: [1, 0.24], to: [0.4, -0.6], hand: 'straight', hue: 3, begin: 0.28, pace: 0.36 },
  { from: [0, 0.97], to: [-0.3, 0.5], hand: 'wave', hue: 3, begin: 0.14, pace: 0.5 },
  { from: [1, 0.84], to: [0.1, 0.5], hand: 'straight', hue: 2, begin: 0.2, pace: 0.46 },
  { from: [0, 0.7], to: [-0.5, 0.6], hand: 'straight', hue: 5, begin: 0.32, pace: 0.32 },
];
const HUES = {
  dark: ['#d9587f', '#f5bf94', '#6aaef2', '#f19aa6', '#a3bd5c', '#ec8a50', '#f2c349'],
  light: ['#a8456b', '#f0a96f', '#3c6e93', '#e8808e', '#84994a', '#e07f3f', '#dba21f'],
};

const WIDE_RATIO = 1.1;                         // width over height: below this the words fill the width, so lines use the top and bottom
const STANDS = { wide: 0.2, tall: 0.15 };       // share of the height taken by the stands
const DRAW_SPAN: Point = [0.02, 0.72];          // share of the scroll that draws the lines
const WORDS_AT = 0.56;                          // the words arrive as the last lines meet
const CLEAR = { wide: 44, tall: 20 };           // px kept free around the words
const STEP = 1.4;                               // px between samples along a line
const OUTSIDE = 24;                             // px a line starts beyond the edge

const clamp = (v: number, a = 0, b = 1): number => Math.max(a, Math.min(b, v));
const mix = (a: Point, b: Point, t: number): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Seeded random numbers, so the drawing is the same on every visit and never shimmers while scrolling. */
function seeded(seed: number): () => number {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Lighten (k > 0) or darken (k < 0) a hex colour. */
function shade(hex: string, k: number): string {
  const n = parseInt(hex.slice(1), 16), to = k > 0 ? 255 : 0, a = Math.abs(k);
  const ch = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (to - v) * a));
  return `rgb(${ch.join(',')})`;
}

/** One flat facet with print speckle. A hairline stroke in its own colour closes the seams between neighbours. */
function facet(c: CanvasRenderingContext2D, pts: Point[], fill: string, rand: () => number, speckle = 0.5): void {
  c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath();
  c.fillStyle = fill; c.fill(); c.strokeStyle = fill; c.lineWidth = 0.8; c.stroke();
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), bw = Math.max(...xs) - x0, bh = Math.max(...ys) - y0;
  c.save(); c.clip();
  for (let i = 0, n = Math.min(260, (bw * bh / 26) * speckle); i < n; i++) {
    c.fillStyle = rand() < 0.55 ? 'rgba(7,6,10,.2)' : 'rgba(255,250,238,.2)';
    c.fillRect(x0 + rand() * bw, y0 + rand() * bh, 1.2, 1.2);
  }
  c.restore();
}

function sheet(w: number, h: number, dpr: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const el = document.createElement('canvas'); el.width = Math.ceil(w * dpr); el.height = Math.ceil(h * dpr);
  const c = el.getContext('2d'); if (!c) throw new Error('2D canvas is not available');
  c.scale(dpr, dpr); c.lineJoin = 'round'; c.lineCap = 'round';
  return [el, c];
}

/** The stands: curved seat rows cut into facets, red and green blocks, aisles, a crowd, the pale rim. */
function drawStands(w: number, h: number, dpr: number, hillTop: number): HTMLCanvasElement {
  const [el, c] = sheet(w, h, dpr), rand = seeded(17);
  const rows = 6, depth = h - hillTop, cols = Math.max(14, Math.round(w / 46)), bow = Math.min(depth * 0.55, w * 0.05);
  const node = (i: number, j: number): Point => {
    const u = (i / cols) * 2 - 1, fan = 1 + j * 0.035;
    return [w / 2 + (u * fan * w) / 2 * 1.04, hillTop + bow * u * u * -1 + bow + (j / rows) * depth * 1.05];
  };
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = node(i, j), b = node(i + 1, j), d = node(i, j + 1), e = node(i + 1, j + 1), aisle = i % 7 === 3;
    const block = i % 14 < 3 ? '#c5301a' : i % 14 > 10 ? '#1d8a4c' : '#1f3fd1', hue = aisle ? '#6aaef2' : j === 2 ? '#3563ea' : block;
    const k = -0.12 + rand() * 0.2 - j * 0.035;
    facet(c, [a, b, d], shade(hue, k), rand, 0.35); facet(c, [b, e, d], shade(hue, k - 0.1), rand, 0.35);
    if (!aisle && hue !== '#3563ea') for (let q = 0; q < 2; q++) if (rand() < 0.62) {
      const p = mix(mix(a, b, 0.15 + rand() * 0.7), mix(d, e, 0.5), 0.25 + rand() * 0.4);
      c.fillStyle = rand() < 0.75 ? '#f1e9dc' : '#f2b41e'; c.beginPath(); c.arc(p[0], p[1], 1.5 + j * 0.16, 0, 6.3); c.fill();
    }
  }
  const rim = (off: number, col: string, lw: number) => {
    c.strokeStyle = col; c.lineWidth = lw; c.beginPath();
    for (let i = 0; i <= cols; i++) { const [x, y] = node(i, 0); if (i) c.lineTo(x, y + off); else c.moveTo(x, y + off); }
    c.stroke();
  };
  rim(0, '#6aaef2', 6); rim(5, '#f4f1ea', 1.6);
  return el;
}

/** One line as a dense polyline. The hand's wiggle fades out at both ends, so lines enter and stop cleanly. */
function trace(a: Point, b: Point, hand: Hand, amp: number, rand: () => number): Point[] {
  const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d, n = Math.max(40, Math.round(d / STEP)), bow = (rand() - 0.5) * d * 0.03, waves = Math.max(2, Math.round(d / (amp * 4.2)));
  const out: Point[] = [], p1 = rand() * 6, p2 = rand() * 6;
  for (let i = 0; i <= n; i++) {
    const t = i / n, fade = Math.min(1, t / 0.18, (1 - t) / 0.14);
    let along = t * d, side = bow * Math.sin(t * Math.PI) + Math.sin(t * d / 41 + p1) * 1.1 + Math.sin(t * d / 17 + p2) * 0.5;
    if (hand === 'wave') side += Math.sin(t * waves * Math.PI * 2) * amp * 0.62 * fade;
    if (hand === 'zigzag') { const q = t * waves * 1.2 % 1; side += (Math.abs(q * 2 - 1) * 2 - 1) * amp * 0.62 * fade; }
    if (hand === 'loop') {                                   // one big loop in the middle of the line
      const q = clamp((t - 0.34) / 0.36), turn = q * Math.PI * 2;
      along += Math.sin(turn) * amp * 1.5; side += (1 - Math.cos(turn)) * amp * -0.95;
    }
    out.push([a[0] + ux * along - uy * side, a[1] + uy * along + ux * side]);
  }
  return out;
}

const measure = (pts: Point[]): number[] => {
  const len = [0];
  for (let i = 1; i < pts.length; i++) len.push(len[i - 1]! + Math.hypot(pts[i]![0] - pts[i - 1]![0], pts[i]![1] - pts[i - 1]![1]));
  return len;
};

/** Rub a crayon along the line: a solid core of uneven width, then crumbs that thin out towards the edge. */
function rub(c: CanvasRenderingContext2D, pts: Point[], hue: string, stroke: number, rand: () => number): void {
  c.fillStyle = hue;
  pts.forEach(([x, y], i) => {
    const r = stroke * (0.4 + 0.05 * Math.sin(i / 23) + 0.04 * Math.sin(i / 7) + rand() * 0.03);
    c.globalAlpha = 1; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    for (let q = 0; q < 3; q++) {
      const a = rand() * Math.PI * 2, o = stroke * (0.4 + rand() * rand() * 0.28);
      c.globalAlpha = 0.45 + rand() * 0.5; c.fillRect(x + Math.cos(a) * o, y + Math.sin(a) * o, 0.8 + rand(), 0.8 + rand());
    }
  });
  c.globalAlpha = 1;
}

const TOOTH = 256;                              // px: size of the paper-grain tile
/** Paper grain: the pits a crayon skips over. Rubbed out of the wax. */
function paperTooth(rand: () => number): HTMLCanvasElement {
  const [el, c] = sheet(TOOTH, TOOTH, 1);
  c.fillStyle = '#000';
  for (let i = 0; i < TOOTH * TOOTH * 0.1; i++) {
    c.globalAlpha = 0.25 + rand() * 0.55; const s = 0.7 + rand() * 1.1;
    c.fillRect(rand() * TOOTH, rand() * TOOTH, s * (1 + rand()), s);
  }
  return el;
}

/** Mounts the drawing. Returns a teardown function. */
export function mountLines(section: HTMLElement): () => void {
  const stage = section.querySelector<HTMLElement>('.sky-stage'), cv = section.querySelector('canvas'), cta = section.querySelector<HTMLElement>('.sky-cta');
  const ctx = cv?.getContext('2d');
  if (!stage || !cv || !cta || !ctx) return () => undefined;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stop = new AbortController();
  let L: Layout | null = null, raf = 0;

  const layout = (): void => {
    const w = stage.clientWidth, h = stage.clientHeight, dpr = Math.min(devicePixelRatio, 2);
    if (!w || !h) return;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const kind = w / h >= WIDE_RATIO ? 'wide' : 'tall', sky = h * (1 - STANDS[kind]), cx = w / 2, cy = sky / 2;
    cta.style.top = `${cy - cta.offsetHeight / 2}px`;
    // Lines keep clear of the words themselves, not of their full-width container.
    const widest = Math.max(...[...cta.children].map((el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect().width; }));
    const hw = Math.min(widest / 2 + CLEAR[kind], w / 2), hh = cta.offsetHeight / 2 + CLEAR[kind];
    const stroke = clamp(w * 0.0085, 8, 13), amp = clamp(Math.min(w, h) * 0.042, 22, 38), rand = seeded(23);
    const hues = HUES[document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'];
    const [wax, wc] = sheet(w, h, dpr);
    const lines = (kind === 'wide' ? WIDE : TALL).map((l): Drawn => {
      const from: Point = [l.from[0] * w + (l.from[0] === 0 ? -OUTSIDE : l.from[0] === 1 ? OUTSIDE : 0), l.from[1] === 0 ? -OUTSIDE : l.from[1] * sky];
      const pts = trace(from, [cx + l.to[0] * hw, cy + l.to[1] * hh], l.hand, amp, rand);
      rub(wc, pts, hues[l.hue] ?? hues[0]!, stroke, rand);
      return { pts, len: measure(pts), begin: l.begin, pace: l.pace };
    });
    wc.globalCompositeOperation = 'destination-out';
    const tooth = wc.createPattern(paperTooth(rand), 'repeat'); if (tooth) { wc.fillStyle = tooth; wc.fillRect(0, 0, w, h); }
    const [mask] = sheet(w, h, dpr);
    L = { w, h, dpr, stands: drawStands(w, h, dpr, sky), wax, mask, lines, stroke };
  };

  const render = (): void => {
    raf = 0; if (!L) return;
    const r = section.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    const k = still ? 1 : clamp(-r.top / Math.max(1, r.height - stage.clientHeight)), prog = clamp((k - DRAW_SPAN[0]) / (DRAW_SPAN[1] - DRAW_SPAN[0]));
    // Cover: a plain stroke as far as each line has come; the finished wax shows only inside it.
    const m = L.mask.getContext('2d'); if (!m) return;
    m.globalCompositeOperation = 'source-over'; m.clearRect(0, 0, L.w, L.h); m.lineWidth = L.stroke * 1.7; m.strokeStyle = '#000';
    L.lines.forEach(({ pts, len, begin, pace }) => {
      const reach = clamp((prog - begin) / pace) * (len[len.length - 1] ?? 0); if (!reach) return;
      m.beginPath(); pts.forEach(([x, y], i) => { if (!i) m.moveTo(x, y); else if (len[i]! <= reach) m.lineTo(x, y); }); m.stroke();
    });
    m.globalCompositeOperation = 'source-in'; m.drawImage(L.wax, 0, 0, L.w, L.h);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.drawImage(L.stands, 0, 0); ctx.drawImage(L.mask, 0, 0);
    cta.classList.toggle('on', prog >= WORDS_AT); cta.inert = prog < WORDS_AT;
  };

  const wake = (): void => { if (!raf) raf = requestAnimationFrame(render); };
  const rebuild = (): void => { layout(); wake(); };
  const box = new ResizeObserver(rebuild); box.observe(stage); box.observe(cta);
  addEventListener('scroll', wake, { passive: true, signal: stop.signal });
  addEventListener('themechange', rebuild, { signal: stop.signal });
  void document.fonts.ready.then(rebuild);
  return () => { stop.abort(); box.disconnect(); cancelAnimationFrame(raf); };
}
