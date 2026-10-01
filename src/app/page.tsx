import { LandingNav } from "@/components/sections/LandingNav";
import { Hero } from "@/components/sections/Hero";
import { DolphinSea } from "@/components/sections/DolphinSea";
import { MyStory } from "@/components/sections/MyStory";
import { Notes } from "@/components/sections/Notes";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { LandingFrame } from "@/components/sections/LandingFrame";
import { LandingProjectRail } from "@/components/sections/LandingProjectRail";
import opening from "@/components/sections/LandingOpening.module.css";

export default function Home() {
  return (
    <main className="landing-page">
      <LandingFrame>
        <div className={opening.opening}>
          <LandingNav />
          <Hero />
          <DolphinSea />
        </div>
        <LandingProjectRail />
        <MyStory />
        <Notes />
      </LandingFrame>
      <AboutFooter />
    </main>
  );
}
