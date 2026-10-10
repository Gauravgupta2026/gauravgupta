import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { paperProjects } from "@/content/paperPortfolio";
import paperStyles from "@/components/paper/Paper.module.css";
import styles from "./Project.module.css";
import sachetanaHero from "../../../../public/assets/work/sachetana-wellness.jpg";
import sachetanaDetail from "../../../../public/assets/work/sachetana-detail.jpg";
import wyldeHero from "../../../../public/assets/work/wylde-space.jpg";
import wyldeDetail from "../../../../public/assets/work/wylde-detail.jpg";
import luckyDayHero from "../../../../public/assets/work/lucky-day-hero.jpg";
import luckyDayDetail from "../../../../public/assets/work/lucky-day-detail.jpg";

const projectImages = {
 "sachetana": { hero: sachetanaHero, detail: sachetanaDetail },
 "wylde": { hero: wyldeHero, detail: wyldeDetail },
 "lucky-day": { hero: luckyDayHero, detail: luckyDayDetail },
};
const IMAGE_SIZES = "100vw";
export function generateStaticParams() { return [...paperProjects.map(p => ({ slug: p.slug })), { slug: 'new-project' }]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const p = paperProjects.find(p => p.slug === slug); return { title: p ? p.title + " — Gaurav Gupta" : slug === "new-project" ? "Work in progress — Gaurav Gupta" : "Project not found", description: p?.purpose }; }
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const p = paperProjects.find(p => p.slug === slug);
 if (!p && slug === "new-project") return <main id="main-content" className={paperStyles.readingPage}><Link href="/playground">Back to playground</Link><h1>A work in progress.</h1><p>This idea is still taking shape. There will be more to share when there is something useful to show.</p></main>;
 if (!p) notFound();
 const next = paperProjects[(paperProjects.indexOf(p) + 1) % paperProjects.length];
 const images = projectImages[p.slug];
 return <main id="main-content" className={styles.page}>
  <article className={styles.article}>
   <header className={styles.header}>
    <Link className={styles.back} href="/work">← Back to work</Link>
    <h1>{p.title}</h1>
   </header>
   <Image src={images.hero} alt={p.alt} sizes={IMAGE_SIZES} className={styles.image} />
   <section className={styles.overview} aria-label="Project overview">
    <div><h2>{p.purpose}</h2><Link className={styles.explore} href="#project-story">Explore <span aria-hidden="true">↓</span></Link></div>
    <dl className={styles.facts}><div><dt>Role</dt><dd>{p.role}</dd></div><div><dt>Status</dt><dd>{p.state}</dd></div></dl>
   </section>
   <section id="project-story" className={styles.story} aria-label="Project story">
    {p.paragraphs.map(text => <p key={text}>{text}</p>)}
   </section>
   <Image src={images.detail} alt={p.title + " visual study"} sizes={IMAGE_SIZES} className={styles.image} />
   <nav className={styles.next} aria-label="Next project"><Link href={`/projects/${next.slug}`}><span>Next case study</span><strong>{next.title} ↗</strong></Link></nav>
  </article>
 </main>;
}
