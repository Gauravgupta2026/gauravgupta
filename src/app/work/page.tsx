import type { Metadata } from "next";
import { WorkGallery } from "./WorkGallery";
import editorial from "@/components/paper/EditorialPage.module.css";
import styles from "./Work.module.css";

export const metadata: Metadata = { title: "Work — Gaurav Gupta", description: "Products and interaction studies by Gaurav Gupta." };
export default function Work() {
  return <main id="main-content" className={styles.page}>
    <header className={editorial.intro}>
      <h1>Things I’ve built.</h1>
      <p>Products and prototypes I’ve designed and built, with write-ups as they’re ready.</p>
    </header>
    <WorkGallery />
  </main>;
}
