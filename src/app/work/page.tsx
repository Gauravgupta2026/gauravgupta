import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { ContactCard } from "@/components/sections/ContactCard";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Work — Gaurav Gupta",
  description:
    "Case studies in full — the constraint, what shipped, and whether it worked.",
};

export default function WorkPage() {
  return (
    <main>
      <Nav />
      <Shell as="header" wide className="pb-[28px] pt-[80px] md:pb-[56px] md:pt-[145px]">
        <Reveal
          as="h1"
          className="m-0 font-display text-[26px] font-light leading-[1.05] tracking-[-0.008em] text-white md:text-[40px]"
        >
          Work
        </Reveal>
        <Reveal
          as="p"
          delay={80}
          className="m-0 mt-[14px] max-w-[677px] text-pretty font-body text-[11px] leading-[18px] text-mute-2 md:mt-[28px] md:text-[14px] md:leading-[23px]"
        >
          Case studies in full — the constraint, what shipped, and whether it
          worked. Three write-ups in progress.
        </Reveal>
      </Shell>

      <SectionDivider />

      <Shell wide>
        <WorkShowcase />
      </Shell>

      <ContactCard />
    </main>
  );
}
