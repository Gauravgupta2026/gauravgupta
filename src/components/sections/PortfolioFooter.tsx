import Link from "next/link";
import { KapuBeach } from "./KapuBeach";
import styles from "./FooterCTA.module.css";

export function PortfolioFooter({ notesHref = "/#notes", className = "" }: { notesHref?: string; className?: string }) {
  return (
    <footer className={`${styles.footer} ${className}`} data-browser-theme-color="#0b2cff">
      <div className={styles.footerShell}>
        <nav aria-label="Footer navigation" className={styles.links}>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/labs">Labs</Link>
          <Link href={notesHref}>Notes</Link>
          <a href="mailto:hey@gauravguptas.com">Get in touch</a>
        </nav>
        <p className={styles.beachCaption}>
          <span>Kapu beach, near Manipal.</span>
          <span>Best years!</span>
        </p>
      </div>
      <figure className={styles.beachFigure} aria-label="Kapu beach, near Manipal. Best years!">
        <KapuBeach />
      </figure>
    </footer>
  );
}
