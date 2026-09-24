import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { Nav } from "@/components/sections/Nav";
import { articles, getArticle } from "@/content/articles";
import styles from "./NotePage.module.css";

const SOURCE_NAME: Record<string, string> = {
  substack: "Substack",
  medium: "Medium",
  site: "On-site",
};

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
      <Nav />
      <article>
        <header className={styles.header}>
          <div className={styles.kicker}>
            <Link href="/#notes">Notes</Link>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className={styles.dek}>{article.dek}</p>
          <div className={styles.meta}>
            <span>{SOURCE_NAME[article.source]}</span>
            <time>{article.date}</time>
          </div>
        </header>

        <div className={styles.body}>
          <ArticleBody body={article.body} />
        </div>

        <footer className={styles.footer}>
          <Link href="/#notes">← All notes</Link>
          <a href="mailto:hey@gauravguptas.com">Continue the conversation ↗</a>
        </footer>
      </article>
    </main>
  );
}
