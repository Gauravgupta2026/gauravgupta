import Image from "next/image";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
// HowIWork ("Work is the story") is built but not confident yet — parked
// out of the page for now. Component stays in place, just unimported.
// import { HowIWork } from "@/components/sections/HowIWork";
import { MyStory } from "@/components/sections/MyStory";
import { Notes } from "@/components/sections/Notes";
import { WorkedWith } from "@/components/sections/WorkedWith";
import { FooterCTA } from "@/components/sections/FooterCTA";

const GAP_SIZES = {
  sm: "h-[48px] md:h-[80px]",
  md: "h-[72px] md:h-[120px]",
  lg: "h-[96px] md:h-[160px]",
} as const;

/** Vertical breathing room between sections, on top of each section's own
 *  top padding. */
function SectionGap({ size = "lg" }: { size?: keyof typeof GAP_SIZES }) {
  return <div aria-hidden="true" className={GAP_SIZES[size]} />;
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <SectionGap size="sm" />
      <MyStory />
      <SectionGap size="md" />
      <Notes />
      <SectionGap size="md" />
      <WorkedWith />

      <Image
        src="/photos/mountains.png"
        alt="Looking out over the mountains"
        width={1512}
        height={702}
        sizes="100vw"
        className="block h-auto w-full"
      />

      <FooterCTA />
    </main>
  );
}
