import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { articles, getArticle } from "@/content/articles";
import styles from "@/components/paper/Paper.module.css";
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const a = getArticle(slug); return { title: a ? a.title + " — Gaurav Gupta" : "Note not found", description: a?.dek }; }
export default async function Note({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const a = getArticle(slug); if (!a) notFound(); return <main id="main-content" className={styles.readingPage}><article><header><Link href="/notes">Back to notes</Link><h1>{a.title}</h1><p className={styles.meta}>{a.date} · Working note</p><p className={styles.lead}>{a.dek}</p></header><ArticleBody body={a.body.filter(block => !('text' in block && /placeholder/i.test(block.text)) && !(block.type === 'img' && !block.src))} /></article></main>; }
