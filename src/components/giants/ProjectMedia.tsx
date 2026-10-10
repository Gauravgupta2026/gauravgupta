import Image from "next/image";
import type { FeaturedProject } from "@/content/featuredWork";
import styles from "./SelectedWork.module.css";

export function ProjectMedia({ project, sizes, compact = false }: { project: FeaturedProject; sizes: string; compact?: boolean }) {
  return (
    <>
      {project.image ? <Image src={project.image} alt="Sachetana onboarding and journal interface" fill sizes={sizes} className={styles.image} /> : project.slug === "wylde" ? (
      <div className={`${styles.wyldeArt} ${compact ? styles.compact : ""}`} aria-hidden="true">
      <span className={styles.artLabel}>PASS THE PHONE. START SOMETHING.</span>
      <div className={styles.deck}><div className={styles.cardBack} /><div className={styles.playCard}><span>WYLDE</span><strong>Good company.<br /><i>Wild cards.</i></strong><span>PARTY CARD GAME · INTERACTION STUDY</span></div></div>
      <span className={styles.artCaption}>Identity &amp; interaction direction</span>
      </div>
      ) : (
      <div className={`${styles.luckyArt} ${compact ? styles.compact : ""}`} aria-hidden="true">
      <span className={styles.artLabel}>A STUDY IN CHANCE &amp; FEEL</span>
      <div className={styles.machine}><span>LUCKY DAY</span><div className={styles.reels}>{[7, 7, 7].map((number, reel) => <span key={reel}>{number}</span>)}</div><span className={styles.machineFoot}>TIMING. WEIGHT. A LITTLE LUCK.</span></div>
      <span className={styles.artCaption}>Motion &amp; haptics study</span>
      </div>
      )}
    </>
  );
}
