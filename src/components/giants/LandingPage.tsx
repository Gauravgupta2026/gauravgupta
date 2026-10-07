import { LandingExperience } from "./LandingExperience";
import styles from "./EdnaOpening.module.css";

export function LandingPage() {
  return (
    <main
      className={styles.page}
      style={{
        fontFamily: "var(--font-giants-body), sans-serif",
      }}
    >
      <LandingExperience />
    </main>
  );
}
