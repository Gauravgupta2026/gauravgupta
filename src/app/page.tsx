import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { DeskNote } from "@/components/sections/DeskNote";
import { Projects } from "@/components/sections/Projects";
// HowIWork ("Work is the story") is built but not confident yet — parked
// out of the page for now. Component stays in place, just unimported.
// import { HowIWork } from "@/components/sections/HowIWork";
import { MyStory } from "@/components/sections/MyStory";
import { Notes } from "@/components/sections/Notes";
import { FooterCTA } from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <main className="landing-page">
      <Nav />
      <Hero />
      <DeskNote />
      <Projects />
      <MyStory />
      <Notes />
      <FooterCTA showImage />
    </main>
  );
}
