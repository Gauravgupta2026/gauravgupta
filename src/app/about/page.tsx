import type { Metadata } from "next";
import Image from "next/image";
import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About — Gaurav Gupta",
  description: "A designer and engineer building digital products with care for how they work and feel.",
};

const DETAILS = [
  { primary: "KPMG", secondary: "Risk", period: "2026" },
  { primary: "Volvo Group", secondary: "Campus Ambassador", period: "2023 — 2025" },
  { primary: "Product & design", secondary: "Focus", period: "Current" },
  { primary: "Bengaluru, IN", secondary: "Location", period: "Current" },
] as const;

export default function AboutPage() {
  return (
    <main className={styles.page} id="top">
      <a className={styles.skip} href="#about-story">Skip to my story</a>
      <section className={styles.introduction} aria-labelledby="about-title">
        <h1 id="about-title" className="visually-hidden">About</h1>
        <div id="about-story" className={styles.story}>
          <p className={styles.lead}>I design and build digital products, with care for how they work and feel.</p>
          <p>I work across product design, interfaces, and code. My portfolio includes projects, prototypes, and experiments, along with the questions I&rsquo;m still working through.</p>
          <p>Away from the screen, I make room for music, reading, poetry, sketching, and the outdoors. I want the work to stay ambitious without losing that side of me.</p>
        </div>
      </section>
      <figure className={styles.portrait}>
        <div className={styles.imageFrame}>
          <Image src="/assets/about.jpeg" alt="Gaurav looking across a snow-covered mountain landscape" fill sizes="(max-width: 1023px) 100vw, calc(100vw - 128px)" className={styles.image} />
        </div>
        <figcaption>Gaurav Gupta · Away from the screen</figcaption>
      </figure>
      <section id="experience" className={styles.experience} aria-labelledby="experience-title">
        <h2 id="experience-title">A little context</h2>
        <dl>
          {DETAILS.map(detail => <div key={detail.primary} className={styles.detailRow}><dt>{detail.primary}</dt><dd>{detail.secondary}</dd><dd>{detail.period}</dd></div>)}
        </dl>
      </section>

    </main>
  );
}
