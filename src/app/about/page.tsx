import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { AboutGallery } from "@/components/sections/AboutGallery";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "About — Gaurav Gupta",
  description:
    "A future-oriented thinker and fast mover building AI systems and user-facing tools.",
};

/** Condensed to fact pairs — the old placeholder blurbs read as filler, cut
 *  entirely rather than kept as noise. */
const FACTS = [
  { k: "LOCATION", v: "Bengaluru, IN" },
  { k: "FOCUS", v: "Product & design" },
];

const EXPERIENCE = [
  { role: "Risk, KPMG", period: "2026" },
  { role: "Campus Ambassador, Volvo Group", period: "2023 — 2025" },
];

export default function AboutPage() {
  return (
    <main>
      <Nav />

      {/* masthead — editorial label pair, echoes reference's "JOURNAL —— Archive" */}
      <Shell as="header" wide className="pt-[96px] md:pt-[145px]">
        <Reveal as="div" className="flex items-baseline gap-[14px]">
          <span className="font-mono text-[11px] tracking-[0.24em] text-mute md:text-[12px]">
            ABOUT
          </span>
          <span className="text-mute-3">——</span>
          <span className="font-display text-[18px] italic text-soft-ink md:text-[22px]">
            Gaurav Gupta
          </span>
        </Reveal>

        {/* section label + full-width rule, echoes reference's "FEATURED CREATORS" bar */}
        <div className="mt-[40px] md:mt-[56px]">
          <Reveal
            as="span"
            delay={40}
            className="font-mono text-[9px] tracking-[0.24em] text-mute md:text-[10px]"
          >
            THE PERSON
          </Reveal>
          <div className="mt-[14px] h-px w-full bg-divider" />
        </div>

        {/* asymmetric body — wide story column, narrow offset facts rail */}
        <div className="mt-[40px] grid grid-cols-1 gap-[40px] pb-[64px] md:mt-[48px] md:grid-cols-[1fr_260px] md:gap-[64px] md:pb-[96px]">
          <div className="max-w-[600px]">
            <Reveal
              as="h1"
              delay={80}
              className="m-0 text-pretty font-display text-[28px] font-light leading-[1.25] text-white md:text-[38px]"
            >
              I&rsquo;m a husband, dad to three pets, and a designer who&rsquo;s
              trying not to take himself too seriously.
            </Reveal>
            <Reveal
              as="p"
              delay={160}
              className="m-0 mt-[24px] text-pretty text-[14px] leading-[24px] text-mute-2 md:mt-[28px] md:text-[16px] md:leading-[27px]"
            >
              I am a future-oriented thinker, and a fast mover. In this
              journey I don&rsquo;t intend to lose the vibrant side of me. I
              like music, I like to read and I like to go outdoors. I have a
              side of me that wishes to indulge in poetry. I have planned a
              few things for myself for the next five years — I want to
              sketch, pen &amp; ink, and I want to sell tools. There are more.
            </Reveal>
          </div>

          {/* facts rail — offset down on desktop, breaks the symmetric grid.
              Caption typography (bold value line, mono meta line below)
              matches the reference's thumbnail-caption pattern. */}
          <div className="flex flex-col gap-[28px] md:mt-[6px]">
            {FACTS.map((f) => (
              <div key={f.k} className="flex flex-col gap-[4px]">
                <span className="text-[13px] font-medium tracking-[0.02em] text-ink">
                  {f.v}
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-mute">
                  {f.k}
                </span>
              </div>
            ))}

            <div className="flex flex-col gap-[20px] border-t border-border-2 pt-[24px]">
              {EXPERIENCE.map((job) => (
                <div key={job.role} className="flex flex-col gap-[4px]">
                  <span className="text-[13px] font-medium tracking-[0.02em] text-ink">
                    {job.role}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-mute">
                    {job.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Shell>

      <SectionDivider />

      {/* horizontal photo strip — grayscale at rest, tap to focus + color.
          Full-bleed (no Shell) so the strip runs edge to edge instead of
          stopping at the shell's max-width; the heading keeps the shell's
          padding so it still lines up with the rest of the page. */}
      <div className="py-[56px] md:py-[80px]">
        <Shell wide>
          <Reveal
            as="h2"
            className="m-0 mb-[24px] font-display text-[20px] font-light text-soft-ink md:mb-[32px] md:text-[27px]"
          >
            A few frames
          </Reveal>
        </Shell>
        <AboutGallery />
      </div>

      <FooterCTA />
    </main>
  );
}
