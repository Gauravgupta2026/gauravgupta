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

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <MyStory />
      <Notes />
      <WorkedWith />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/photos/mountains.png"
        alt="Looking out over the mountains"
        className="block h-auto w-full"
      />

      <FooterCTA />
    </main>
  );
}
