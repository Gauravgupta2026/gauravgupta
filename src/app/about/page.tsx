import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { ContactBand } from "@/components/sections/ContactBand";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export const metadata: Metadata = {
  title: "About — Gaurav Gupta",
  description:
    "A future-oriented thinker and fast mover building AI systems and user-facing tools.",
};

/** Work history — placeholder copy from the reference; edit freely. */
const EXPERIENCE = [
  {
    role: "Risk, KPMG",
    period: "2026",
    body: "I worked on this this this and did not get rewarded and all was a waste. I wish I could have utilised this opprotunity better but I cant do anything now.",
  },
  {
    role: "Campus Ambassador, Volvo Group Pvt Ltd",
    period: "2023–2025",
    body: "I worked on this this this and did not get rewarded and all was a waste. I wish I could have utilised this opprotunity better but I cant do anything now.",
  },
  {
    role: "Campus Ambassador, Volvo Group Pvt Ltd",
    period: "2023–2025",
    body: "I worked on this this this and did not get rewarded and all was a waste. I wish I could have utilised this opprotunity better but I cant do anything now.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      <Shell as="main" className="pt-[40px] md:pt-[70px]">
        <div className="mx-auto max-w-[640px]">
          <Reveal
            as="h1"
            className="m-0 font-display text-[clamp(32px,5vw,40px)] font-normal leading-[1.15] text-ink"
          >
            I&rsquo;m a husband, dad to three pets, and a designer who&rsquo;s
            trying not to take himself too seriously.
          </Reveal>

          <Reveal
            as="p"
            className="m-0 mt-[34px] font-mono text-[12.5px] leading-[1.9] text-soft-ink"
          >
            I am a future-oriented thinker, and a fast mover. In this journey I
            don&rsquo;t intend to lose the vibrant side of me. I like music, I
            like to read and I like to go outdoors. I have a side of me that
            wishes to indulge in poetry. I have planned a few things for myself
            for the next 5 years [2030]. I want to sketch, pen&amp;ink, I want to
            sell tools. There are more.
          </Reveal>

          <Reveal className="mt-[48px]">
            <MediaPlaceholder
              label="[ B/W PHOTO ]"
              align="bottom-left"
              className="aspect-[16/11] w-full"
            />
          </Reveal>

          <Reveal
            as="h2"
            className="m-0 mt-[64px] font-display text-[32px] font-normal italic tracking-[-0.01em] text-ink"
          >
            Work Experience
          </Reveal>

          <div className="mt-[10px]">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={i} className="pt-[36px]">
                <h3 className="m-0 font-display text-[18px] font-medium text-ink">
                  {job.role}
                </h3>
                <div className="mt-[6px] font-mono text-[11px] tracking-[0.04em] text-mute">
                  {job.period}
                </div>
                <p className="m-0 mt-[18px] font-mono text-[12.5px] leading-[1.9] text-soft-ink">
                  {job.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>

      <ContactBand />

      <Footer />
    </>
  );
}
