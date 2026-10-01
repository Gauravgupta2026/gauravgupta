import Link from "next/link";
import styles from "./LandingOpening.module.css";

export function Hero() {
  return (
    <header
      id="top"
      className={styles.hero}
      aria-labelledby="hero-title"
      data-browser-theme-color="#ffffff"
    >
      <h1 id="hero-title">
        <span>I design &amp; build digital products,</span>{" "}
        <span>with care for how they <em>work and feel.</em></span>
      </h1>

      <div className={styles.metadata}>
        <p>Bengaluru, India</p>
        <p>Currently building <Link href="/projects/wylde">Wylde</Link></p>
        <p className={styles.availability}>Open to design engineering roles</p>
      </div>
    </header>
  );
}
