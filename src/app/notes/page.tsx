import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/articles";
import { PageIntro } from "@/components/PageIntro";
import styles from "./NotesIndex.module.css";

export const metadata: Metadata = {
  title: "Notes — Gaurav Gupta",
  description: "Notes on design, building software, and the decisions behind products.",
};

export default function NotesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.surface}>
          <PageIntro title="Writing" description="is where I slow down." />
          <section className={styles.index} aria-label="Writing">
          <ul className={styles.list}>
            {articles.map(article => (
              <li key={article.slug} id={`note-${article.slug}`}>
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
    </main>
  );
}
