import type { Metadata } from "next";
import { PortfolioFooter } from "@/components/sections/PortfolioFooter";
import { LandingNav } from "@/components/sections/LandingNav";
import { LabsGrid } from "@/components/sections/LabsGrid";
import { labsQuestions } from "@/content/labsItems";
import styles from "@/components/sections/WorkEditorial.module.css";

export const metadata: Metadata = {
  title: "Labs — Gaurav Gupta",
  description: "Experiments, sketches, and things still taking shape. Interfaces, motion, and questions worth trying.",
};

export default function LabsPage() {
  return (
    <main id="top" style={{ position: "relative", isolation: "isolate" }}>
      <LandingNav />
      <div className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.opening}>
            <h1>Things worth trying.</h1>
            <p className={styles.introduction}>
              Experiments, sketches, and things still taking shape. This is where
              I try an interaction, test a direction, or keep a useful question open.
            </p>
          </header>
          <LabsGrid />
          <section className={styles.questions} aria-labelledby="labs-questions-title">
            <h2 id="labs-questions-title">A few questions</h2>
            <div>
              {labsQuestions.map(item => (
                <details key={item.question} className={styles.question}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section className={styles.contactCard} aria-labelledby="labs-contact-title">
            <h2 id="labs-contact-title">Have a question worth trying?</h2>
            <p>Tell me what you’re curious about, or what you’d like to explore together.</p>
            <a className={styles.contactButton} href="mailto:hey@gauravguptas.com">Get in touch.</a>
            <a className={styles.email} href="mailto:hey@gauravguptas.com">hey@gauravguptas.com</a>
          </section>
        </div>
      </div>
      <PortfolioFooter />
    </main>
  );
}
