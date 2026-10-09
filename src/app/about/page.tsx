import type { Metadata } from "next";
import { StampStory } from "@/components/paper/StampStory";
import styles from "@/components/paper/Paper.module.css";
export const metadata: Metadata = { title: "About — Gaurav Gupta", description: "A designer and engineer in Bengaluru, learning by making things." };
export default function About() { return <main id="main-content"><h1 className={styles.srOnly}>A little about Gaurav</h1><StampStory /></main>; }
