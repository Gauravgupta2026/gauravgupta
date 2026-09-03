import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
// HowIWork ("Work is the story") is built but not confident yet — parked
// out of the page for now. Component stays in place, just unimported.
// import { HowIWork } from "@/components/sections/HowIWork";
import { MyStory } from "@/components/sections/MyStory";
import { Notes } from "@/components/sections/Notes";
import { WorkedWith } from "@/components/sections/WorkedWith";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <MyStory />
      <Notes />
      <WorkedWith />
      <SiteFooter />
    </main>
  );
}
