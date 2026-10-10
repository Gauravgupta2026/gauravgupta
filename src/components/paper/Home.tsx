import Link from "next/link";
import Image from "next/image";
import { paperProjects, EMAIL, SOCIALS } from "@/content/paperPortfolio";
import { articles } from "@/content/articles";
import { InkDrawing } from "./InkDrawing";
import { Opening } from "@/components/opening/Opening";
import styles from "./Paper.module.css";
export function Home() {
  return <><Opening /><main id="main-content" className={styles.home}>
    <div className={styles.column}>
      <div className={styles.homeIntro}>
        <InkDrawing kind="house" className={styles.house} />
        <div className={styles.introduction}>
          <div className={styles.identity}><h1 id="home-title" tabIndex={-1}>Gaurav</h1><span>designer, engineer &amp; curious person</span></div>
          <p>I’m Gaurav Gupta, a designer and engineer in Bengaluru. I like making things that work well and feel right. This is a small collection of products I’m building, questions I’m working through, and moments I want to keep. Some things are finished. Others are still finding their shape. Come in, have a look around.</p>
          <div className={styles.inlineLinks}><a href={EMAIL}>say hello</a>{SOCIALS.map(s => <a href={s.href} key={s.label} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
        </div>
      </div>
      <span className={styles.ornament} aria-hidden="true">⌁</span>
      <div className={styles.indexGroups}>
        <section><h2 className={styles.script}>Writing</h2><ul className={styles.indexList}>{articles.slice(0, 2).map(a => <li key={a.slug}><Link href={`/notes/${a.slug}`}><span>{a.title}</span><span className={styles.rowMeta}>/notes</span></Link></li>)}</ul><Link className={styles.smallLink} href="/notes">all notes</Link></section>
        <section><h2 className={styles.script}>Projects</h2><ul className={styles.indexList}>{paperProjects.map(p => <li key={p.slug}><Link href={`/projects/${p.slug}`}><span>{p.title}</span><span className={styles.rowMeta}>/{p.category}</span></Link></li>)}</ul><Link className={styles.smallLink} href="/work">a closer look</Link></section>
      </div>
      <Image src="/reference-dwija/rule.svg" alt="" width={661} height={2} className={styles.hiddenRule} />
    </div>
  </main></>;
}
