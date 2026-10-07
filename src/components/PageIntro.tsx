import styles from "./PortfolioPage.module.css";

export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <header className={styles.introduction}>
      <div className={styles.headingRow}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <p>{description}</p>
    </header>
  );
}
