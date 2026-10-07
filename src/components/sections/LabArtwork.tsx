/** Illustrative placeholders, explicitly labelled in the gallery. */
export function LabArtwork({ variant, id }: { variant: number; id: string }) {
  return (
    <svg viewBox="0 0 400 500" aria-hidden="true" width="400" height="500" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id={`${id}-metal`} cx="32%" cy="24%" r="75%"><stop stopColor="#f0eee3" /><stop offset=".3" stopColor="#b3b1a7" /><stop offset=".7" stopColor="#585b53" /><stop offset="1" stopColor="#262a25" /></radialGradient>
        <linearGradient id={`${id}-film`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#eedac4" /><stop offset=".25" stopColor="#a7afc1" /><stop offset=".5" stopColor="#c79198" /><stop offset=".75" stopColor="#b8bd91" /><stop offset="1" stopColor="#ebe2d6" /></linearGradient>
      </defs>
      {variant % 4 === 0 ? <g transform="translate(200 250) rotate(-12)">
        <circle r="115" fill={`url(#${id}-film)`} />
        {Array.from({ length: 18 }, (_, i) => <circle key={i} r={28 + i * 4.5} fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth=".7" />)}
        {[[-28, -28], [28, -28], [-28, 28], [28, 28]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="#111" stroke="#dad8d0" strokeWidth="3" />)}
      </g> : variant % 4 === 1 ? <g transform="translate(200 255) rotate(-18)">
        <path d="M-130-60 120-30 98 58-105 72Z" fill={`url(#${id}-film)`} />
        {Array.from({ length: 35 }, (_, i) => <path key={i} d={`M${-125+i*7} -55 l24 112`} stroke="#453b3c" strokeOpacity=".3" fill="none" />)}
      </g> : variant % 4 === 2 ? <g transform="translate(200 250)">
        <ellipse cx="9" cy="12" rx="124" ry="130" fill="#000" opacity=".25" />
        <circle r="126" fill={`url(#${id}-metal)`} stroke="#b8b8ac" strokeWidth="3" />
        {[109, 93, 75, 53, 30].map(r => <circle key={r} r={r} fill="none" stroke="#292c28" strokeWidth="2" />)}
        <path d="M-40-12 Q0-90 40-12 Q90 0 40 12 Q0 90-40 12 Q-90 0-40-12Z" fill="none" stroke="#d5d1be" strokeOpacity=".55" strokeWidth="2" />
      </g> : <g transform="translate(200 250) rotate(12)">
        <path d="M-120-25 Q-40-100 20-15 T130-20 L110 60 Q35 115-20 30 T-110 50Z" fill={`url(#${id}-film)`} />
        <path d="M-120-25 Q-40-100 20-15 T130-20" fill="none" stroke="#eee8dc" strokeWidth="3" />
      </g>}
    </svg>
  );
}
