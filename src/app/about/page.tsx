import type { Metadata } from "next";
import Image from "next/image";
import { ContactSection } from "@/components/paper/ContactSection";
import { aboutContext, aboutParagraphs, aboutPhoto } from "@/content/paperPortfolio";
import editorial from "@/components/paper/EditorialPage.module.css";
import styles from "@/components/paper/AboutPage.module.css";

export const metadata: Metadata = { title: "About — Gaurav Gupta", description: "A designer and engineer in Bengaluru, learning by making things." };

export default function About() {
  return <main id="main-content" className={editorial.page}>
    <header className={styles.header}>
      <h1>About</h1>
      <div className={styles.prose}>{aboutParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    </header>
    <figure className={styles.photo}>
      <Image src={aboutPhoto.src} alt={aboutPhoto.alt} width={1280} height={960} sizes="(max-width: 767px) calc(100vw - 48px), 660px" priority />
      <figcaption className={editorial.label}>{aboutPhoto.caption}</figcaption>
    </figure>
    <section className={styles.context} aria-labelledby="context-title">
      <h2 id="context-title">A little context</h2>
      <ul>{aboutContext.map(row => <li key={row.name} className={styles.row}>
        <span className={styles.name}>{row.name}</span>
        <span className={styles.detail}>{row.detail}</span>
        <span className={styles.period}>{row.period}</span>
      </li>)}</ul>
    </section>
    <ContactSection />
  </main>;
}
