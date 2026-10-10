"use client";
import Link from "next/link";
import { EMAIL, RESUME_FILENAME, RESUME_HREF } from "@/content/paperPortfolio";
import styles from "./Paper.module.css";

/** `match` lets one nav item stay active on its child routes (a project page still counts as "work"). */
const ITEMS = [
  { href: "/work", label: "Work", match: ["/work", "/projects"] },
  { href: "/playground", label: "Playground", match: ["/playground", "/labs"] },
  { href: "/notes", label: "Notes", match: ["/notes"] },
  { href: "/about", label: "About", match: ["/about"] },
] as const;

const icon = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const DownloadIcon = () => <svg {...icon}><path d="M8 2.5v8M4.75 7.5 8 10.75l3.25-3.25M3 13h10" /></svg>;
const MailIcon = () => <svg {...icon}><rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>;

/**
 * Left rail for desktop and tablet. Top: wordmark and page links.
 * Bottom: the two things a visitor most often wants — the resume and a way to reach me.
 */
export function SideNav({ path }: { path: string }) {
  return <aside className={styles.sidebar} aria-label="Site navigation"><div className={styles.sideInner}>
    <div>
      <Link href="/" className={styles.sideMark}>Gaurav Gupta</Link>
      <nav aria-label="Primary navigation" className={styles.sideLinks}>
        {ITEMS.map(item => {
          const active = item.match.some(m => path === m || path.startsWith(m + "/"));
          return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
        })}
      </nav>
    </div>
    <div className={styles.sideActions}>
      <a href={RESUME_HREF} download={RESUME_FILENAME}><DownloadIcon />Download resume</a>
      <a href={EMAIL}><MailIcon />Say hello</a>
    </div>
  </div></aside>;
}
