import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/articles";
import styles from "@/components/paper/Paper.module.css";
export const metadata: Metadata = { title: "Notes — Gaurav Gupta", description: "Notes on products, design and making things." };
export default function Notes() { return <main id="main-content" className={styles.readingPage}><header><h1 className={styles.script}>Notes</h1><p>A place to slow down and work through a thought.</p></header><ul className={styles.notesRows}>{articles.map(a => <li key={a.slug}><Link href={`/notes/${a.slug}`}><span>{a.title}</span><time>{a.date}</time></Link></li>)}</ul></main>; }
