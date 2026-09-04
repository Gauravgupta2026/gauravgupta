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

      <div className="mt-[48px] overflow-hidden md:mt-[80px]">
        <div className="flex w-max animate-marquee will-change-transform">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
    </section>
  );
}
