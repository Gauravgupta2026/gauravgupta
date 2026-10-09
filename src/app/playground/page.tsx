import type { Metadata } from "next";
import { MediaGallery } from "@/components/paper/MediaGallery";
import styles from "@/components/paper/Paper.module.css";
export const metadata: Metadata = { title: "Playground — Gaurav Gupta", description: "Interface studies, small experiments and moments away from the work." };
export default function Playground() { return <main id="main-content" className={styles.galleryPage}><div className={styles.galleryIntro}><h1>Things I’m playing with.</h1><p>Interfaces, little studies, and a few moments in between.</p></div><MediaGallery /></main>; }
