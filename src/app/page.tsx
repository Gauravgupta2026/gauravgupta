import { LandingNav } from "@/components/sections/LandingNav";
import { Hero } from "@/components/sections/Hero";
import { MyStory, Biography } from "@/components/sections/MyStory";
import { Notes } from "@/components/sections/Notes";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { LandingFrame } from "@/components/sections/LandingFrame";
import { LandingProjectRail } from "@/components/sections/LandingProjectRail";
import opening from "@/components/sections/LandingOpening.module.css";

export default function Home() {
  return (
    <main className="landing-page">
      <LandingFrame>
        <LandingNav />
        <div className={opening.opening}>
          <Hero />
        </div>
        <MyStory />
        <LandingProjectRail />
        <Biography />
        <Notes />
      </LandingFrame>
      <FooterCTA />
    </main>
  );
}
