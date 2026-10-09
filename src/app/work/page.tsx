import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { paperProjects } from "@/content/paperPortfolio";
import styles from "@/components/paper/Paper.module.css";
export const metadata: Metadata = { title: "Work — Gaurav Gupta", description: "Products and interaction studies by Gaurav Gupta." };
export default function Work() { return <main id="main-content" className={styles.readingPage}><header><h1 className={styles.script}>A few things I’m making.</h1><p>Different problems. The same care for how they work and feel.</p></header><div className={styles.projectList}>{paperProjects.map(p => <article key={p.slug}><h2><Link href={`/projects/${p.slug}`}>{p.title}</Link></h2><p>{p.purpose}</p><p className={styles.meta}>{p.role} · {p.state}</p><Link href={`/projects/${p.slug}`} aria-label={`Read about ${p.title}`}><Image src={p.image} alt={p.alt} width={1000} height={750} sizes="(max-width: 700px) calc(100vw - 48px), 660px" className={styles.readingImage} /></Link></article>)}</div></main>; }
