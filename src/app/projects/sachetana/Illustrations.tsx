import type { ReactNode } from "react";
import type { MetricId } from "./content";
import styles from "./Sachetana.module.css";

/** Hand-drawn SVG for each number and idea. One style: hairlines, one accent. */

type SvgProps = { title: string; viewBox: string; className?: string; children: ReactNode };

function Svg({ title, viewBox, className = "", children }: SvgProps) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={title} className={`${styles.ill} ${className}`}>
      {children}
    </svg>
  );
}

/** A text block with fixed line breaks, so the drawing never reflows. */
function Lines({ lines, x, y, cls, anchor = "middle", lh = 15 }: { lines: readonly string[]; x: number; y: number; cls: string; anchor?: "start" | "middle" | "end"; lh?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={cls}>
      {lines.map((line, i) => <tspan key={line} x={x} dy={i === 0 ? 0 : lh}>{line}</tspan>)}
    </text>
  );
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ---------- Metric illustrations: 300 x 130 ---------- */

const METRIC_BOX = "0 0 300 130";

function Reach() {
  return (
    <Svg title="Fifty dots, each one thousand students. A tiny mark inside the first dot shows the eighty to one hundred who used the app." viewBox={METRIC_BOX}>
      {range(50).map((i) => <circle key={i} cx={7 + (i % 25) * 11.6} cy={58 + Math.floor(i / 25) * 14} r={4.2} className={styles.iDot} />)}
      <circle cx={7} cy={58} r={1.5} className={styles.iAcc} />
      <path d="M7 24 V52" className={styles.iAccLine} />
      <text x={0} y={16} className={styles.iAccText}>80–100 used the app</text>
      <text x={0} y={110} className={styles.iMute}>about 50,000 students at MAHE</text>
    </Svg>
  );
}

function Won() {
  return (
    <Svg title="Twenty circles in a row, one for each team. The first is filled: we won." viewBox={METRIC_BOX}>
      {range(20).map((i) => i === 0
        ? <circle key={i} cx={10} cy={72} r={9} className={styles.iAcc} />
        : <circle key={i} cx={10 + i * 14.5} cy={72} r={6.2} className={styles.iSoft} />)}
      <path d="M5.5 72 l3.2 3.4 l6 -6.6" className={styles.iCheck} />
      <path d="M10 36 V58" className={styles.iAccLine} />
      <text x={0} y={28} className={styles.iAccText}>We won</text>
      <text x={0} y={112} className={styles.iMute}>about 20 teams entered</text>
    </Svg>
  );
}

function Testers() {
  return (
    <Svg title="Thirty small figures. Each figure is five people, so together they stand for more than one hundred and fifty." viewBox={METRIC_BOX}>
      {range(30).map((i) => {
        const cx = 15 + (i % 10) * 30;
        const cy = 24 + Math.floor(i / 10) * 38;
        return (
          <g key={i} className={styles.iDot}>
            <circle cx={cx} cy={cy} r={4.5} />
            <path d={`M${cx - 7} ${cy + 18} v-4 a7 7 0 0 1 14 0 v4 z`} />
          </g>
        );
      })}
    </Svg>
  );
}

function Iterations() {
  return (
    <Svg title="Five or six friends tested the prototype. The design was redrawn three or four times." viewBox={METRIC_BOX}>
      {range(6).map((i) => (
        <circle key={i} cx={14 + (i % 3) * 20} cy={42 + Math.floor(i / 3) * 22} r={6} className={i === 5 ? styles.iDashed : styles.iInk} />
      ))}
      <text x={0} y={108} className={styles.iMute}>5–6 friends</text>
      <path d="M78 54 H114 m-6 -5 l6 5 l-6 5" className={styles.iLine} />
      {range(4).map((i) => (
        <g key={i}>
          <rect x={130 + i * 42} y={20} width={36} height={64} rx={6} className={i === 3 ? styles.iBoxDashed : styles.iBox} />
          <text x={148 + i * 42} y={56} textAnchor="middle" className={styles.iMute}>v{i + 1}</text>
        </g>
      ))}
      <text x={130} y={108} className={styles.iMute}>3–4 redesigns</text>
    </Svg>
  );
}

function Samples() {
  return (
    <Svg title="Twenty small sheets, one for each reviewed sample. One carries a flag." viewBox={METRIC_BOX}>
      {range(20).map((i) => {
        const x = 4 + (i % 10) * 29.4;
        const y = 26 + Math.floor(i / 10) * 44;
        const flagged = i === 13;
        return (
          <g key={i}>
            <rect x={x} y={y} width={20} height={28} rx={2.5} className={flagged ? styles.iBoxAcc : styles.iBox} />
            <path d={`M${x + 4} ${y + 9} h12 M${x + 4} ${y + 15} h12 M${x + 4} ${y + 21} h8`} className={flagged ? styles.iAccLine : styles.iSoft} />
          </g>
        );
      })}
      <text x={0} y={118} className={styles.iMute}>flagged responses, reviewed by interns</text>
    </Svg>
  );
}

function Events() {
  const stops = [{ x: 40, label: "Hackathon" }, { x: 150, label: "Research Day" }, { x: 260, label: "Summit" }];
  return (
    <Svg title="Three places it was shown: the hackathon, Research Day and the Entrepreneurship Summit." viewBox={METRIC_BOX}>
      {stops.map((stop) => (
        <g key={stop.label}>
          <circle cx={stop.x} cy={52} r={16} className={styles.iBoxAcc} />
          <circle cx={stop.x} cy={52} r={5} className={styles.iAcc} />
          <text x={stop.x} y={94} textAnchor="middle" className={styles.iMute}>{stop.label}</text>
        </g>
      ))}
    </Svg>
  );
}

const METRIC_ART: Record<MetricId, () => ReactNode> = {
  reach: Reach, won: Won, testers: Testers, iterations: Iterations, samples: Samples, events: Events,
};

export function MetricArt({ id }: { id: MetricId }) {
  const Art = METRIC_ART[id];
  return <Art />;
}

/* ---------- How it works: a swimlane, 1040 x 470 ---------- */

const NODE_W = 168;
const NODE_H = 50;
const LANES = [
  { label: "STUDENT", y: 53 }, { label: "APP", y: 139 }, { label: "INTERNS", y: 225 }, { label: "SENIORS", y: 311 }, { label: "SOS", y: 413 },
] as const;

function Node({ x, y, lines, tone, w = NODE_W }: { x: number; y: number; lines: readonly string[]; tone: "plain" | "mute" | "acc"; w?: number }) {
  const box = tone === "acc" ? styles.iBoxAcc : tone === "mute" ? styles.iBoxMute : styles.iBox;
  const text = tone === "acc" ? styles.iAccText : tone === "mute" ? styles.iMute : styles.iText;
  return (
    <g>
      <rect x={x - w / 2} y={y - NODE_H / 2} width={w} height={NODE_H} rx={8} className={box} />
      <Lines lines={lines} x={x} y={y - (lines.length - 1) * 7.5 + 4} cls={text} />
    </g>
  );
}

export function Swimlane() {
  return (
    <Svg title="Swimlane chart. The student takes an assessment. The app scores it. Below the benchmark nothing is shown. Above it the response is flagged, interns review it, critical cases go to a senior, and the student is told to book help. A separate SOS path calls the emergency contact, then the ambulance contact." viewBox="0 0 1040 470" className={styles.illWide}>
      <defs>
        <marker id="arrow-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" className={styles.iLine} /></marker>
        <marker id="arrow-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" className={styles.iAccLine} /></marker>
      </defs>
      {[96, 182, 268, 354].map((y) => <path key={y} d={`M0 ${y} H1040`} className={styles.iSoft} />)}
      <path d="M0 368 H1040" className={styles.iSoft} />
      {LANES.map((lane) => <text key={lane.label} x={4} y={lane.y + 4} className={styles.iLane}>{lane.label}</text>)}

      <path d="M200 78 V114" className={styles.iLine} markerEnd="url(#arrow-ink)" />
      <path d="M284 139 C312 139 306 53 336 53" className={styles.iSoft} markerEnd="url(#arrow-ink)" />
      <text x={314} y={84} className={styles.iMute}>below</text>
      <path d="M284 139 H336" className={styles.iAccLine} markerEnd="url(#arrow-acc)" />
      <text x={294} y={131} className={styles.iAccText}>above</text>
      <path d="M420 164 V225 H556" className={styles.iAccLine} markerEnd="url(#arrow-acc)" />
      <path d="M640 250 V311 H776" className={styles.iAccLine} markerEnd="url(#arrow-acc)" />
      <text x={652} y={303} className={styles.iAccText}>critical</text>
      <path d="M860 286 V78" className={styles.iAccLine} markerEnd="url(#arrow-acc)" />
      <text x={870} y={196} className={styles.iAccText}>notice sent</text>
      <text x={870} y={211} className={styles.iAccText}>back to the student</text>
      <path d="M284 413 H336 M504 413 H556" className={styles.iLine} markerEnd="url(#arrow-ink)" />

      <Node x={200} y={53} lines={["Takes the", "assessment"]} tone="plain" />
      <Node x={200} y={139} lines={["Scores it against", "the benchmark"]} tone="plain" />
      <Node x={420} y={53} lines={["Back to normal browsing.", "Nothing is shown"]} tone="mute" />
      <Node x={420} y={139} lines={["Flags the", "response"]} tone="acc" />
      <Node x={640} y={225} lines={["Review it on", "the dashboard"]} tone="acc" />
      <Node x={860} y={311} lines={["Take critical", "cases"]} tone="acc" />
      <Node x={860} y={53} lines={["Told to book help at", "the hospital website"]} tone="acc" />
      <Node x={200} y={413} lines={["Presses SOS"]} tone="plain" />
      <Node x={420} y={413} lines={["Calls the emergency", "contact"]} tone="plain" />
      <Node x={640} y={413} lines={["Next call:", "ambulance contact"]} tone="plain" />
    </Svg>
  );
}

/* ---------- Timeline: prototype to app, 1040 x 250 ---------- */

export function Timeline() {
  const stations = [
    { x: 60, name: "Hackathon", sub: ["1 month.", "Prototypes only."] },
    { x: 250, name: "Won", sub: ["The college asks for a", "campus-wide app."] },
    { x: 560, name: "Stashed", sub: ["The backing", "did not arrive."] },
    { x: 760, name: "Restarted", sub: ["After we graduated.", "No business followed."] },
    { x: 960, name: "Stashed again", sub: ["Last touched", "December 2025."] },
  ];
  return (
    <Svg title="Timeline. A one-month hackathon with prototypes only. A win. About three months of building with no support, during which it was shown at Research Day and the Summit and used by about eighty to one hundred students. Then it was stashed for about a year, restarted after graduation, and stashed again." viewBox="0 0 1040 250" className={styles.illWide}>
      <path d="M60 120 H250" className={styles.iDashedLine} />
      <path d="M250 120 H560" className={styles.iBuild} />
      <path d="M560 120 H760 M760 120 H960" className={styles.iDotted} />
      <text x={155} y={104} textAnchor="middle" className={styles.iMute}>prototypes</text>
      <text x={405} y={104} textAnchor="middle" className={styles.iAccText}>Build. About 3 months. No support.</text>
      <text x={660} y={104} textAnchor="middle" className={styles.iMute}>about a year</text>

      <path d="M250 62 V50 H560 V62" className={styles.iAccLine} />
      <text x={405} y={34} textAnchor="middle" className={styles.iText}>Shown at Research Day and the Summit.</text>
      <text x={405} y={18} textAnchor="middle" className={styles.iText}>About 80 to 100 students used the APK.</text>

      {stations.map((s, i) => (
        <g key={s.name}>
          <circle cx={s.x} cy={120} r={9} className={i === 1 ? styles.iAcc : i === 0 ? styles.iBox : styles.iBoxMute} />
          <text x={s.x} y={156} textAnchor="middle" className={styles.iText}>{s.name}</text>
          <Lines lines={s.sub} x={s.x} y={174} cls={styles.iMute} />
        </g>
      ))}
    </Svg>
  );
}

/* ---------- Story illustrations ---------- */

export function KeyMap() {
  return (
    <Svg title="A student's name, phone and email are kept apart from their responses. A key links the two. Interns see only the responses." viewBox="0 0 520 190">
      <Node x={86} y={80} lines={["Name, phone,", "email"]} tone="plain" />
      <Node x={434} y={80} lines={["Responses,", "journals"]} tone="acc" />
      <path d="M170 80 H206 M314 80 H350" className={styles.iSoft} />
      <circle cx={232} cy={80} r={14} className={styles.iBoxAcc} />
      <circle cx={232} cy={80} r={4} className={styles.iAcc} />
      <path d="M246 80 H300 M286 80 v8 M296 80 v6" className={styles.iAccLine} />
      <Lines lines={["alphanumeric key"]} x={266} y={118} cls={styles.iAccText} />
      <path d="M2 132 H170" className={styles.iSoft} />
      <Lines lines={["Hidden behind the key"]} x={86} y={152} cls={styles.iMute} />
      <path d="M350 132 H518" className={styles.iAccLine} />
      <Lines lines={["What interns see"]} x={434} y={152} cls={styles.iAccText} />
    </Svg>
  );
}

export function ScopeBlocks() {
  return (
    <Svg title="Four apps in one become two." viewBox="0 0 520 170">
      {range(4).map((i) => <rect key={i} x={62 + (i % 2) * 54} y={30 + Math.floor(i / 2) * 54} width={46} height={46} rx={8} className={styles.iBoxMute} />)}
      <text x={116} y={150} textAnchor="middle" className={styles.iMute}>4 apps in one</text>
      <path d="M200 83 H300 m-8 -6 l8 6 l-8 6" className={styles.iLine} />
      <text x={250} y={70} textAnchor="middle" className={styles.iMute}>cut</text>
      {range(2).map((i) => <rect key={i} x={364 + i * 62} y={59} width={54} height={54} rx={9} className={styles.iBoxAcc} />)}
      <text x={420} y={150} textAnchor="middle" className={styles.iAccText}>2 apps</text>
    </Svg>
  );
}

export function ReasonIcon({ id }: { id: "discovery" | "acceptance" | "reach" }) {
  return (
    <svg viewBox="0 0 40 40" className={styles.reasonIcon} aria-hidden>
      {id === "discovery" && <><circle cx={17} cy={17} r={9} className={styles.iLine} /><path d="M24 24 L33 33" className={styles.iLine} /></>}
      {id === "acceptance" && <><path d="M10 34 V8 H30 V34 Z" className={styles.iLine} /><path d="M10 34 H32 M25 21 h2" className={styles.iLine} /></>}
      {id === "reach" && <path d="M6 34 H14 V26 H22 V18 H30 V10 H36" className={styles.iLine} />}
    </svg>
  );
}
