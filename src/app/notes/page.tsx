import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/articles";
import styles from "@/components/paper/EditorialPage.module.css";
export const metadata: Metadata = { title: "Notes — Gaurav Gupta", description: "Notes on products, design and making things." };
export default function Notes() { return <main id="main-content" className={styles.page}><header className={styles.intro}><h1>Notes</h1><p>A place to slow down and work through a thought.</p></header><ul className={styles.notes}>{articles.map(a => <li key={a.slug}><Link href={`/notes/${a.slug}`}><time>{a.date}</time><span className={styles.noteTitle}>{a.title}</span></Link></li>)}</ul></main>; }
