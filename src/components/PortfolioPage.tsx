import type { ReactNode } from "react";
import { PageIntro } from "./PageIntro";
import styles from "./PortfolioPage.module.css";

export function PortfolioPage({ title, description, active, children }: {
  title: string; description: string; active: "work" | "labs"; children: ReactNode;
}) {
  return (
    <main className={styles.page}>
      <a className={styles.skip} href="#page-gallery">Skip to {active === "work" ? "projects" : "experiments"}</a>
      <PageIntro title={title} description={description} />
      {children}
    </main>
  );
}
