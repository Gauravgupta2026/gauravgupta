import type { Metadata } from "next";
import { MediaGallery } from "@/components/paper/MediaGallery";
import styles from "@/components/paper/Labs.module.css";
export const metadata: Metadata = { title: "Labs — Gaurav Gupta", description: "Interface studies, small experiments and moments away from the work." };
export default function Playground() {
  return <main id="main-content" className={styles.page}>
    <header className={styles.intro}><h1>Things I’m playing with.</h1><p>Interfaces, little studies,<br />and a few moments in between.</p></header>
    <MediaGallery />
  </main>;
}
