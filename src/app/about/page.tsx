import type { Metadata } from "next";
import Image from "next/image";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { AboutGallery } from "@/components/sections/AboutGallery";
import { LandingNav } from "@/components/sections/LandingNav";
import { SectionDivider } from "@/components/ui/SectionDivider";
import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About — Gaurav Gupta",
  description:
    "Gaurav Gupta, a design engineer in Bengaluru. Design, code, teamwork in Manipal, and the ambition to build and back useful products.",
};

const DETAILS = [
  { primary: "KPMG", secondary: "Risk", period: "2026" },
  {
    primary: "Volvo Group",
    secondary: "Campus Ambassador",
    period: "2023 — 2025",
  },
  {
    primary: "Design engineering",
    secondary: "Focus",
    period: "Current",
  },
  {
    primary: "Bengaluru, IN",
    secondary: "Location",
    period: "Current",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="top" className={`about-page ${styles.page}`}>
      <LandingNav />
      <section className={styles.canvas} aria-labelledby="about-title">
        <h1 id="about-title" className={styles.title}>About me</h1>

        <div className={styles.statement}>
          <p>I’m Gaurav, a design engineer based in Bengaluru. I like being close to both the idea and the thing people eventually use: working out an interaction, building it, and seeing where it needs more care.</p>
          <p>My projects give that care different forms. Wylde keeps a party focused on the people in the room. Sachetana lets students decide what to share. Lucky Day gives me room to explore how timing and motion change a simple interaction.</p>
          <p>In Manipal, I learned to make things with a team. Our go-kart project took fifteen people from a car in the workshop to fourth place at Buddh International Circuit. I worked across design, marketing, budgets, and sponsors.</p>
          <p>Then KMC brought a problem to MIT, and our team built Sachetana. We overbuilt, kept presenting the work at research competitions, and won at MAHE Research Day. It’s part of why I’m drawn to problems that need people from different disciplines to work together.</p>
          <p>For now, I’m looking for a team where I can help shape a product and build it. Longer term, I want to create a design-led firm that makes products and backs other builders. There’s a lot to learn between here and there. I want to learn it by making things.</p>
        </div>

        <figure className={styles.portrait}>
          <figcaption>
            <span>(Gaurav Gupta)</span>
            <span>(Design engineer)</span>
          </figcaption>
          <div className={styles.imageFrame}>
            <Image
              src="/assets/about.jpeg"
              alt="Gaurav looking across a snow-covered mountain landscape"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 34vw"
              className={styles.image}
            />
          </div>
        </figure>

        <div id="experience" className={styles.details}>
          {DETAILS.map((detail) => (
            <div className={styles.detailRow} key={`${detail.primary}-${detail.secondary}`}>
              <span>{detail.primary}</span>
              <span>{detail.secondary}</span>
              <span>{detail.period}</span>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />
      <AboutGallery />
      <AboutFooter />
    </main>
  );
}
