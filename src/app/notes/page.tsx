import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { articles } from "@/content/articles";
import styles from "./NotesIndex.module.css";

export const metadata: Metadata = {
  title: "Notes — Gaurav Gupta",
  description: "Notes on design, building software, and the decisions behind products.",
};

export default function NotesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.surface}>
        <Nav />
        <section className={styles.index} aria-labelledby="notes-title">
          <h1 id="notes-title">Notes</h1>
          <ul className={styles.list}>
            {articles.map(article => (
              <li key={article.slug}>
                <Link className={styles.row} href={`/notes/${article.slug}`}>
                  <span className={styles.title}>{article.title}</span>
                  <span className={styles.kind}>Article</span>
                  <span className={styles.date}>{article.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <AboutFooter />
    </main>
  );
}
