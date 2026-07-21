import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import {
  StatCard,
  ExploringCard,
  StackCard,
  type Stat,
  type StackItem,
} from "@/components/ui/SignalCard";

const STATS: Stat[] = [
  { value: "08", label: <>projects<br />shipped</> },
  { value: "20+", label: <>APIs<br />integrated</> },
  { value: "04", label: <>teams<br />built for</>, accent: true },
];

const EXPLORING = ["Agentic AI Memory", "RAG", "Hermes", "SwiftUI"];

const STACK: StackItem[] = [
  { name: "Python", slug: "python" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "Swift", slug: "swift" },
  { name: "Convex", slug: "convex" },
  { name: "Claude", slug: "claude" },
  { name: "Codex", slug: "codex" },
  { name: "Docker", slug: "docker" },
];

const ORGS = [
  { name: "Manipal Institute of Technology", mono: false },
  { name: "Kasturba Medical College", mono: false },
  { name: "KPMG", mono: true },
];

export function Signals() {
  return (
    <Shell as="section" id="work" className="pt-[90px] md:pt-[120px]">
      <Reveal className="mb-[54px] text-center">
        <h2 className="m-0 font-display text-[30px] font-normal italic tracking-[-0.01em] text-ink md:text-[42px]">
          Work, in signals
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 items-stretch gap-[18px] md:grid-cols-3">
        <Reveal>
          <StatCard stats={STATS} />
        </Reveal>
        <Reveal delay={80}>
          <ExploringCard items={EXPLORING} />
        </Reveal>
        <Reveal delay={160}>
          <StackCard items={STACK} />
        </Reveal>
      </div>

      <Reveal className="mt-[64px] flex flex-wrap items-center justify-center gap-x-[54px] gap-y-[18px] opacity-80">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
          Built with &amp; for
        </span>
        {ORGS.map((o) => (
          <span
            key={o.name}
            className={
              o.mono
                ? "font-mono text-[12px] text-ink"
                : "font-display text-[15px] text-ink"
            }
          >
            {o.name}
          </span>
        ))}
      </Reveal>
    </Shell>
  );
}
