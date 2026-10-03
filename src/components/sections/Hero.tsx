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
        <span>I believe good products</span>{" "}
        <span><em>work well and feel right.</em></span>
      </h1>

      <Link className={styles.heroAction} href="#work">
        View selected work
      </Link>

    </header>
  );
}
