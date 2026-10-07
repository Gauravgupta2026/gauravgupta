import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { articles, getArticle } from "@/content/articles";
import styles from "./NotePage.module.css";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Note not found" };
  return { title: `${article.title} — Gaurav Gupta`, description: article.dek };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main className={styles.page}>
      <article>
        <header className={styles.header}>
          <div className={styles.kicker}>
            <time>{article.date}</time>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className={styles.dek}>{article.dek}</p>
          <div className={styles.rule} aria-hidden="true" />
        </header>

        <div className={styles.body}>
          <ArticleBody body={article.body} />
        </div>

        <footer className={styles.footer}>
          <Link href="/notes">← All notes</Link>
        </footer>
      </article>
    </main>
  );
}
