import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

const NAMES = ["MIT Manipal", "KMC Manipal", "Superteam India", "Little Unusual"];

function MarqueeGroup() {
  return (
    <div className="flex items-baseline gap-[36px] pr-[36px] font-body text-[19px] tracking-[-0.02em] text-white sm:gap-[64px] sm:pr-[64px] sm:text-[32px]">
      {NAMES.map((name) => (
        <span key={name} className="flex items-baseline gap-[36px] whitespace-nowrap sm:gap-[64px]">
          <span className="text-lilac">&#8727;</span>
          <span>{name}</span>
        </span>
      ))}
    </div>
  );
}

/** Infinite horizontal marquee of past collaborators. */
export function WorkedWith() {
  return (
    <section id="worked-with" className="pt-[80px] md:pt-[130px]">
      <Shell wide>
        <Reveal
          as="h2"
          className="m-0 font-display text-[27px] font-light leading-[1.05] tracking-[-0.008em] text-white md:text-[40px]"
        >
          Worked with
        </Reveal>
        <SectionDivider className="mt-[26px] md:mt-[45px]" />
      </Shell>

      {/* pl matches Shell's side-pad so the marquee's start lines up with
          the heading above it instead of bleeding flush to the viewport
          edge. The mask fades both edges — without it, a name gets
          guillotined mid-word at the container boundary on every pass,
          since the track scrolls continuously. py (not just mt) + the
          bottom SectionDivider give the band equal space above and below,
          so the text centers between the two rules instead of sitting
          closer to one. */}
      <div
        className="overflow-hidden py-[48px] md:py-[80px]"
        style={{
          paddingLeft: "max(var(--side-pad), calc((100% - 1375px) / 2 + var(--side-pad)))",
          maskImage:
            "linear-gradient(to right, transparent 0, black 64px, black calc(100% - 64px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 64px, black calc(100% - 64px), transparent 100%)",
        }}
      >
        <div className="flex w-max animate-marquee will-change-transform">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
