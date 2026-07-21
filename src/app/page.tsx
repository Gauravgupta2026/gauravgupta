import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { MetaBar } from "@/components/sections/MetaBar";
import { Projects } from "@/components/sections/Projects";
import { HowIWork } from "@/components/sections/HowIWork";
import { Notes } from "@/components/sections/Notes";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <MetaBar />
      <Projects />
      <HowIWork />
      <Notes />
      <CTA />
      <Footer />
    </main>
  );
}
