import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { paperProjects } from "@/content/paperPortfolio";
import styles from "@/components/paper/Paper.module.css";
export function generateStaticParams() { return [...paperProjects.map(p => ({ slug: p.slug })), { slug: 'new-project' }]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const p = paperProjects.find(p => p.slug === slug); return { title: p ? p.title + " — Gaurav Gupta" : slug === "new-project" ? "Work in progress — Gaurav Gupta" : "Project not found", description: p?.purpose }; }
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const p = paperProjects.find(p => p.slug === slug);
 if (!p && slug === "new-project") return <main id="main-content" className={styles.readingPage}><Link href="/playground">Back to playground</Link><h1>A work in progress.</h1><p>This idea is still taking shape. There will be more to share when there is something useful to show.</p></main>;
 if (!p) notFound();
 const next = paperProjects[(paperProjects.indexOf(p) + 1) % paperProjects.length];
 return <main id="main-content" className={styles.readingPage}><article><header><Link href="/work">Back to work</Link><h1>{p.title}</h1><p className={styles.meta}>{p.role} · {p.state}</p><p className={styles.lead}>{p.purpose}</p></header><Image src={p.image} alt={p.alt} width={1000} height={750} sizes="(max-width: 700px) calc(100vw - 48px), 660px" className={styles.readingImage} />{p.paragraphs.map(text => <p key={text}>{text}</p>)}<Image src={p.detail} alt={p.title + " visual study"} width={1000} height={750} sizes="(max-width: 700px) calc(100vw - 48px), 660px" className={styles.readingImage} /><Link href={`/projects/${next.slug}`}>Next: {next.title}</Link></article></main>;
}
