import type { ReactNode } from 'react';
import { Dashes, Facets, HUE, mesh, peak, poly, seeded, shade, type Facet, type Point } from './facets';

const FIT = 'xMidYMax slice';                    // the drawing hangs from the bottom edge; the calm top makes room for the words

/** Summit day: two trekkers on the ridge, the flag not yet up. */
export function TrekScene() {
  const trail: Point[] = [[120, 930], [250, 880], [205, 815], [330, 770], [300, 712], [396, 668], [384, 618], [440, 566]];
  const person = (x: number, y: number, shirt: string, pack: string) => (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-4 0L-9 22M4 0L10 21" stroke={HUE.ink} strokeWidth="6" strokeLinecap="round" /><path d="M-15 -26H-6V-2H-15Z" fill={pack} />
      <path d="M-8 -30H8L7 2H-7Z" fill={shirt} /><path d="M2 -30H8L7 2H2Z" fill={shade(shirt, -0.2)} /><path d="M6 -22L22 -8M22 -22V24" stroke={shirt} strokeWidth="4" strokeLinecap="round" />
      <circle cy="-40" r="8.5" fill="#8d5a3b" /><path d="M-9 -42A9 9 0 0 1 9 -42Z" fill={HUE.ink} />
    </g>
  );
  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio={FIT} aria-hidden="true">
      <Dashes n={70} y={270} w={800} h={400} seed={11} color={HUE.snow} />
      <circle cx="600" cy="400" r="46" fill={HUE.marigold} /><path d="M600 354A46 46 0 0 1 600 446Z" fill={shade(HUE.marigold, -0.12)} />
      <Facets list={[...peak([170, 600], -160, 430, 1000, 5, '#2a49c9', 0.28), ...peak([690, 590], 440, 960, 1000, 9, '#2a49c9', 0.24)]} />
      <Facets list={peak([452, 430], 20, 860, 1010, 21, HUE.cobalt, 0.42, 12)} />
      <path d={`M${trail.map((p) => p.join(' ')).join('L')}`} fill="none" stroke={HUE.marigold} strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" strokeLinejoin="round" className="trail" />
      <Facets list={mesh({ x: -10, y: 860, w: 820, h: 150 }, 14, 4, 41, (x, y) => (y > 905 + Math.sin(x / 90) * 26 ? HUE.green : null), 0.4)} />
      {person(394, 640, HUE.vermilion, HUE.marigold)}{person(310, 746, HUE.bone, HUE.vermilion)}
    </svg>
  );
}

/** One more lap: the kart on its loop, seen from above. */
export function KartScene() {
  const loop = 'M150 420C110 300 260 250 380 300S560 400 660 320 790 420 690 480 520 470 420 500 190 540 150 420Z';
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMax meet" overflow="visible" aria-hidden="true">
      <Facets list={mesh({ x: -300, y: -500, w: 1400, h: 1104 }, 22, 17, 3, () => HUE.vermilion, 0.14)} />
      <path d={loop} fill="none" stroke={shade(HUE.vermilion, -0.35)} strokeWidth="76" transform="translate(6 8)" /><path d={loop} fill="none" stroke={HUE.bone} strokeWidth="72" /><path d={loop} fill="none" stroke="#cfc5b2" strokeWidth="60" />
      <path d={loop} fill="none" stroke={HUE.snow} strokeWidth="4" strokeDasharray="20 18" />
      <path d={`M${[0, 1, 2, 3, 4, 5].map((i) => `${128 + i * 12} 402h12v12h-12z`).join('M')}`} fill={HUE.ink} transform="rotate(-12 160 410)" />
      <Facets list={[...mesh({ x: 300, y: 350, w: 170, h: 100 }, 4, 3, 8, (x, y) => (((x - 385) / 85) ** 2 + ((y - 400) / 46) ** 2 < 1 ? HUE.green : null), 0.4)]} />
      <g className="kart" style={{ offsetPath: `path('${loop}')` }}>
        <g fill={HUE.ink}><rect x="-26" y="-22" width="16" height="9" rx="3" /><rect x="-26" y="13" width="16" height="9" rx="3" /><rect x="12" y="-20" width="14" height="8" rx="3" /><rect x="12" y="12" width="14" height="8" rx="3" /></g>
        <path d="M-28 -12L20 -9L32 0L20 9L-28 12Z" fill={HUE.cobalt} /><path d="M-28 0L32 0L20 9L-28 12Z" fill={shade(HUE.cobalt, -0.25)} /><circle cx="-6" r="9" fill={HUE.marigold} /><path d="M-2 -7A9 9 0 0 1 -2 7Z" fill={HUE.ink} />
      </g>
    </svg>
  );
}

/** Where two sides meet: the shoreline from above, one set of footprints along it. */
export function ShoreScene() {
  const shore = (x: number) => 446 + Math.sin(x / 120) * 34 - x * 0.08;
  const line = (off: number) => `M${Array.from({ length: 41 }, (_, i) => `${i * 20} ${(shore(i * 20) + off + Math.sin(i * 1.7) * 4).toFixed(1)}`).join('L')}`;
  const canopy = Array.from({ length: 10 }, (_, i): Facet => {
    const p = (k: number): Point => [Math.cos((k / 10) * Math.PI * 2) * 58, Math.sin((k / 10) * Math.PI * 2) * 58];
    return { d: poly([[0, 0], p(i), p(i + 1)]), fill: i % 2 ? (i < 5 ? HUE.snow : '#d9cfbd') : i < 5 ? HUE.vermilion : shade(HUE.vermilion, -0.18) };
  });
  const steps = Array.from({ length: 13 }, (_, i) => { const x = 60 + i * 42; return <ellipse key={i} cx={x} cy={shore(x) + 46 + (i % 2 ? 9 : -5)} rx="8" ry="4.5" fill="#b7aa93" transform={`rotate(${Math.round(Math.cos(x / 120) * 14)} ${x} ${Math.round(shore(x) + 46)})`} />; });
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio={FIT} aria-hidden="true">
      <Facets list={mesh({ x: 0, y: 0, w: 800, h: 600 }, 15, 11, 14, (x, y) => { const d = shore(x) - y; return d > 150 ? HUE.cobalt : d > 70 ? '#3f74ea' : d > 8 ? HUE.sky : '#e2d8c5'; }, 0.12)} />
      <path d={line(-34)} className="foam slow" fill="none" stroke={HUE.snow} strokeWidth="4" strokeLinecap="round" opacity=".8" /><path d={line(-2)} className="foam" fill="none" stroke={HUE.snow} strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" />
      {steps}
      <g transform="translate(570 528)"><ellipse cx="16" cy="18" rx="58" ry="54" fill="#b7aa93" opacity=".7" /><Facets list={canopy} /><circle r="5" fill={HUE.ink} /></g>
      <g transform="translate(440 514) rotate(-14)"><rect width="46" height="84" fill={HUE.cobalt} /><path d="M0 12H46M0 30H46M0 48H46M0 66H46" stroke={HUE.snow} strokeWidth="6" /></g>
    </svg>
  );
}

/** Bring a half idea: two glasses of chai, one of them for you. */
export function ChaiScene() {
  const glass = (x: number, s: number, seed: number) => {
    return (
      <g transform={`translate(${x} ${560 - 206 * s}) scale(${s})`}>
        <ellipse cx="82" cy="198" rx="88" ry="14" fill="#8a2413" opacity=".6" />
        <path d={poly([[2, -22], [138, -22], [118, 198], [22, 198]])} fill="#fff8e6" opacity=".55" />
        <clipPath id={`glass-${seed}`}><path d={poly([[7, 14], [133, 14], [119, 190], [21, 190]])} /></clipPath>
        <g clipPath={`url(#glass-${seed})`}><Facets list={mesh({ x: 0, y: 14, w: 140, h: 176 }, 6, 7, seed, (px) => (px < 62 ? '#b86a2f' : '#964f20'), 0.2)} /></g>
        <path d={poly([[8, 14], [132, 14], [129, 34], [11, 34]])} fill="#e0a76b" />
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${18 + i * 24} -18L${30 + i * 19} 194`} stroke="#fff8e6" strokeWidth="3" opacity=".5" />)}
        <path d={poly([[2, -22], [138, -22], [118, 198], [22, 198]])} fill="none" stroke={HUE.ink} strokeWidth="4" strokeLinejoin="round" />
        <path className="steam" d="M44 -36C26 -58 62 -70 46 -96" fill="none" stroke="#fff8e6" strokeWidth="9" strokeLinecap="round" /><path className="steam late" d="M92 -36C112 -58 74 -74 96 -100" fill="none" stroke="#fff8e6" strokeWidth="9" strokeLinecap="round" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 600 640" preserveAspectRatio={FIT} aria-hidden="true">
      <Facets list={mesh({ x: 0, y: 496, w: 600, h: 150 }, 12, 4, 6, () => HUE.vermilion, 0.2)} />
      {glass(150, 0.86, 4)}{glass(326, 0.76, 12)}
    </svg>
  );
}

/** Save me a seat: the stands are full, except one. */
export function SeatScene() {
  const rand = seeded(27), rows = 3, seats: ReactNode[] = [], W = 1200;
  const shirts = [HUE.vermilion, HUE.bone, HUE.green, HUE.marigold, HUE.sky, HUE.vermilion], skins = ['#8d5a3b', '#a8714c', '#6f4630', '#c48a5f'];
  for (let j = 0; j < rows; j++) {
    const s = 1 + j * 0.16, gap = 78 * s, n = Math.ceil(W / gap) + 1, off = j % 2 ? -gap / 2 : 0;
    for (let i = 0; i < n; i++) {
      const x = off + i * gap, u = (x / W) * 2 - 1, y = 396 + j * 84 + u * u * -26, free = j === 1 && i === 9, hue = (Math.floor((x + 80) / 300) + 5) % 3 === 0 ? '#3563ea' : HUE.cobalt;
      const shirt = shirts[Math.floor(rand() * shirts.length)]!, skin = skins[Math.floor(rand() * skins.length)]!, up = rand() < 0.16, bob = (rand() * 4).toFixed(1);
      seats.push(
        <g key={`${j}-${i}`} transform={`translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})`}>
          <path d="M-30 4H30V96H-30Z" fill={free ? HUE.marigold : hue} /><path d="M0 4H30V96H0Z" fill={shade(free ? HUE.marigold : hue, -0.16)} />
          {free ? <path d="M-30 54H30V70H-30Z" fill={shade(HUE.marigold, 0.3)} className="free" /> : (
            <g className="fan" style={{ animationDelay: `-${bob}s` }}>
              {up && <path d="M-16 18L-28 -22M16 18L28 -22" stroke={skin} strokeWidth="8" strokeLinecap="round" />}
              <path d="M-22 12H22V78H-22Z" fill={shirt} /><path d="M4 12H22V78H4Z" fill={shade(shirt, -0.16)} /><circle cy="-8" r="17" fill={skin} /><path d="M-18 -10A18 18 0 0 1 18 -10Z" fill={HUE.ink} />
            </g>
          )}
        </g>,
      );
    }
  }
  return (
    <svg viewBox="0 0 1200 640" preserveAspectRatio={FIT} aria-hidden="true">
      <Dashes n={40} y={300} w={1200} h={90} seed={31} color={HUE.snow} />
      <path d={poly([[0, 372], [600, 398], [1200, 372], [1200, 640], [0, 640]])} fill={HUE.navy} />
      {seats}
    </svg>
  );
}
