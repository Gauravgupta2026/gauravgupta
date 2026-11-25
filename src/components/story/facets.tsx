/*
 * The stadium's drawing language as static SVG: flat facets, each a slightly different shade of one colour. Everything is
 * seeded and rendered on the server, so the illustrations cost the browser no JavaScript.
 */
export type Point = readonly [number, number];
export type Rand = () => number;

export const HUE = { cobalt: '#1f3fd1', navy: '#111c63', sky: '#6aaef2', vermilion: '#c7381d', green: '#1d7a45', bone: '#ece4d4', snow: '#f7f5ef', marigold: '#f2b41e', ink: '#14110f' };

export function seeded(seed: number): Rand {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Lighten (k > 0) or darken (k < 0) a hex colour. */
export function shade(hex: string, k: number): string {
  const n = parseInt(hex.slice(1), 16), to = k > 0 ? 255 : 0, a = Math.abs(k);
  return `#${[n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (to - v) * a).toString(16).padStart(2, '0')).join('')}`;
}

const at = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`;
export const poly = (pts: readonly Point[]) => `M${pts.map(at).join('L')}Z`;
export const mix = (a: Point, b: Point, t: number): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export interface Facet { d: string; fill: string }
/** Facets of one colour share a path, which keeps the markup small. A hairline stroke closes the seams. */
export function Facets({ list }: { list: Facet[] }) {
  const by = new Map<string, string>();
  list.forEach((f) => by.set(f.fill, (by.get(f.fill) ?? '') + f.d));
  return <>{[...by].map(([fill, d]) => <path key={fill} d={d} fill={fill} stroke={fill} strokeWidth=".8" />)}</>;
}

/** Round the shade to a few steps: a poster has a limited set of inks. */
const step = (k: number) => Math.round(k * 25) / 25;

/** A jittered triangle mesh over a rectangle. `hue` picks the colour from the middle of each triangle (null leaves a hole). */
export function mesh(box: { x: number; y: number; w: number; h: number }, cols: number, rows: number, seed: number, hue: (x: number, y: number, rand: Rand) => string | null, depth = 0.16): Facet[] {
  const rand = seeded(seed), dx = box.w / cols, dy = box.h / rows, out: Facet[] = [];
  const node = Array.from({ length: rows + 1 }, (_, j) => Array.from({ length: cols + 1 }, (_, i): Point => {
    const edge = i === 0 || j === 0 || i === cols || j === rows;
    return [box.x + i * dx + (edge ? 0 : (rand() - 0.5) * dx * 0.62), box.y + j * dy + (edge ? 0 : (rand() - 0.5) * dy * 0.62)];
  }));
  const add = (a: Point, b: Point, c: Point) => {
    const col = hue((a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3, rand); if (!col) return;
    out.push({ d: poly([a, b, c]), fill: shade(col, step((rand() - 0.6) * depth)) });
  };
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = node[j]![i]!, b = node[j]![i + 1]!, c = node[j + 1]![i]!, d = node[j + 1]![i + 1]!;
    if (rand() < 0.5) { add(a, b, c); add(b, d, c); } else { add(a, b, d); add(a, d, c); }
  }
  return out;
}

/** A peak: rows of facets from the summit down, lit on the left, in shade on the right, snow above the line. */
export function peak(top: Point, left: number, right: number, base: number, seed: number, hue: string, snowline: number, rows = 9): Facet[] {
  const rand = seeded(seed), out: Facet[] = [];
  const row = Array.from({ length: rows + 1 }, (_, j): Point[] => {
    const t = j / rows, n = Math.max(1, Math.round(j * 1.15)), y = top[1] + (base - top[1]) * t, x0 = top[0] + (left - top[0]) * t, x1 = top[0] + (right - top[0]) * t;
    return Array.from({ length: n + 1 }, (_, i): Point => [x0 + (x1 - x0) * (i / n) + (j && i && i < n ? (rand() - 0.5) * 26 : j ? (rand() - 0.5) * 16 : 0), y + (j && j < rows ? (rand() - 0.5) * 22 : 0)]);
  });
  row[0] = [top];
  for (let j = 0; j < rows; j++) {
    const up = row[j]!, dn = row[j + 1]!; let i = 0, k = 0;
    while (i < up.length - 1 || k < dn.length - 1) {
      const takeDown = i >= up.length - 1 || (k < dn.length - 1 && (k + 1) / (dn.length - 1) <= (i + 1) / Math.max(1, up.length - 1));
      const tri: Point[] = takeDown ? [up[i]!, dn[k]!, dn[k + 1]!] : [up[i]!, up[i + 1]!, dn[k]!];
      if (takeDown) k++; else i++;
      const cx = (tri[0]![0] + tri[1]![0] + tri[2]![0]) / 3, cy = (tri[0]![1] + tri[1]![1] + tri[2]![1]) / 3, lit = cx < top[0] + (cy - top[1]) * 0.12;
      const snow = cy < top[1] + (base - top[1]) * (snowline + (rand() - 0.5) * 0.16);
      out.push({ d: poly(tri), fill: shade(snow ? HUE.snow : hue, step((lit ? 0.04 : snow ? -0.2 : -0.34) + (rand() - 0.5) * 0.1)) });
    }
  }
  return out;
}

/** Short slivers: the stars of the hero's sky. */
export function Dashes({ n, y: y0, w, h, seed, color }: { n: number; y: number; w: number; h: number; seed: number; color: string }) {
  const rand = seeded(seed); let d = '';
  for (let i = 0; i < n; i++) { const x = rand() * w, y = y0 + rand() * h, a = -0.3 + rand() * 0.6, l = 2 + rand() ** 2 * 10; d += `M${at([x, y])}L${at([x + Math.cos(a) * l, y + Math.sin(a) * l])}`; }
  return <path d={d} stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity=".7" />;
}
