import Link from "next/link";
import styles from "@/components/paper/Paper.module.css";
export default function NotFound() { return <main id="main-content" className={styles.readingPage}><h1>This page wandered off.</h1><p>There’s still plenty to explore.</p><Link href="/">Back home</Link></main>; }
