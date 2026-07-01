import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { ProcessRow, type Process } from "@/components/ui/ProcessRow";

const STEPS: Process[] = [
  {
    num: "01",
    kicker: "Framing",
    title: "Frame ambiguity",
    body: "I start with the root-cause analysis, not solution. Sharp questions, clear constraints, strong bets.",
  },
  {
    num: "02",
    kicker: "Designing",
    title: "Design for use",
    body: "I design flows and interfaces that feel simple, credible, and earn trust.",
  },
  {
    num: "03",
    kicker: "Prototyping",
    title: "Build with narrative",
    body: "I fuse v1 with the function and communicate the story, trying not to break the working prototype.",
  },
  {
    num: "04",
    kicker: "Deploy",
    title: "Instrument the outcomes",
    body: "I track what matters and gather feedback to guide decisions and prioritization.",
  },
  {
    num: "05",
    kicker: "Refine",
    title: "Iterate",
    body: "I run small cycles, focusing on features, bugs, and compound improvements over time.",
  },
];

export function HowIWork() {
  return (
    <Shell as="section" className="pt-[90px] md:pt-[150px]">
      <div className="grid grid-cols-1 items-start gap-[40px] md:grid-cols-[0.85fr_1.3fr] md:gap-[80px]">
        {/* sticky intro + quote */}
        <Reveal className="md:sticky md:top-[48px]">
          <h2 className="m-0 mb-[22px] font-display text-[28px] font-normal italic tracking-[-0.01em] text-ink md:text-[38px]">
            How I Work
          </h2>
          <p className="m-0 mb-[38px] max-w-[300px] font-mono text-[12.5px] leading-[1.8] text-soft-ink">
            I turn ambiguity into structure, design with empathy, and build
            systems that people enjoy using.
          </p>
          <div className="border border-ink/15 bg-card p-[26px]">
            <div className="mb-[18px] font-display text-[18px] italic leading-[1.5] text-ink">
              &ldquo;Gaurav brings product intuition and technical curiosity
              together. He asks questions, builds fast, and thinks
              long-term.&rdquo;
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="h-[24px] w-[24px] rounded-full bg-blue" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
                From an agentic peer
              </span>
            </div>
          </div>
        </Reveal>

        {/* process rows */}
        <div className="flex flex-col">
          {STEPS.map((step) => (
            <Reveal key={step.num}>
              <ProcessRow process={step} />
            </Reveal>
          ))}
        </div>
      </div>
    </Shell>
  );
}
