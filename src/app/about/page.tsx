import type { Metadata } from "next";
import Image from "next/image";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { AboutGallery } from "@/components/sections/AboutGallery";
import { Nav } from "@/components/sections/Nav";
import { SectionDivider } from "@/components/ui/SectionDivider";
import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About — Gaurav Gupta",
  description:
    "A future-oriented thinker and fast mover building products and user-facing tools.",
};

const DETAILS = [
  { primary: "KPMG", secondary: "Risk", period: "2026" },
  {
    primary: "Volvo Group",
    secondary: "Campus Ambassador",
    period: "2023 — 2025",
  },
  {
    primary: "Product & design",
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
      <Nav />
      <section className={styles.canvas} aria-labelledby="about-title">
        <h1 id="about-title" className={styles.title}>About me</h1>

        <div className={styles.statement}>
          <p>
            I&rsquo;m a husband, dad to three pets, and a designer who&rsquo;s trying
            not to take himself too seriously.
          </p>
          <p>
            I am a future-oriented thinker and a fast mover. I like music,
            reading, the outdoors, poetry, sketching, pen and ink, and making
            useful tools. I want the work to stay ambitious without losing the
            vibrant side of me.
          </p>
        </div>

        <figure className={styles.portrait}>
          <figcaption>
            <span>(Gaurav Gupta)</span>
            <span>(Product designer + builder)</span>
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
