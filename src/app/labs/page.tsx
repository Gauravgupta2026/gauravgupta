import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { LabsGrid } from "@/components/sections/LabsGrid";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Labs — Gaurav Gupta",
  description:
    "Half-finished things kept in public. Nothing here is a product yet, and some of it never will be.",
};

export default function LabsPage() {
  return (
    <main>
      <Nav />
      <Shell
        as="header"
        wide
        className="relative pb-[28px] pt-[80px] md:pb-[56px] md:pt-[145px]"
      >
        <Reveal
          as="h1"
          className="m-0 font-display text-[26px] font-light leading-[1.05] tracking-[-0.008em] text-white md:text-[40px]"
        >
          Labs
        </Reveal>
        <Reveal
          as="p"
          delay={80}
          className="m-0 mt-[14px] max-w-[677px] text-pretty font-body text-[11px] leading-[18px] text-mute-2 md:mt-[28px] md:text-[14px] md:leading-[23px]"
        >
          Half-finished things kept in public. Nothing here is a product yet,
          and some of it never will be.
        </Reveal>
        <div className="mt-[12px] font-mono text-[7px] tracking-[0.2em] text-faint md:absolute md:right-[var(--side-pad)] md:top-[97px] md:mt-0 md:text-[9px]">
          WORK IN PROGRESS
        </div>
      </Shell>

      <SectionDivider />

      <Shell wide className="py-[32px] md:py-[80px]">
        <LabsGrid />
      </Shell>

    </main>
  );
}
