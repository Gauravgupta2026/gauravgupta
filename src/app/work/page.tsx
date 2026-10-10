import type { Metadata } from "next";
import { WorkGallery } from "./WorkGallery";
import styles from "./Work.module.css";

export const metadata: Metadata = { title: "Work — Gaurav Gupta", description: "Products and interaction studies by Gaurav Gupta." };
export default function Work() {
  return <main id="main-content" className={styles.page}>
    <h1 className={styles.srOnly}>Work</h1>
    <WorkGallery />
  </main>;
}
