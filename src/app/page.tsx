import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { DeskNote } from "@/components/sections/DeskNote";
import { MyStory } from "@/components/sections/MyStory";
import { Notes } from "@/components/sections/Notes";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { LandingFrame } from "@/components/sections/LandingFrame";
import { BehindTheWork } from "@/components/sections/BehindTheWork";
import { LandingWorkProjects } from "@/components/sections/WorkEditorial";

export default function Home() {
  return (
    <main className="landing-page">
      <LandingFrame>
        <Nav />
        <Hero />
        <DeskNote />
        <LandingWorkProjects />
        <BehindTheWork />
        <MyStory />
        <Notes />
      </LandingFrame>
      <AboutFooter />
    </main>
  );
}
