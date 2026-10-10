"use client";
import { usePathname } from "next/navigation";
import { PaperFooter } from "./PaperFooter";
import { MonkeyFooter } from "./MonkeyFooter";
import { LandingHeader } from "./LandingHeader";
import styles from "./Paper.module.css";

export function PaperShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const photos = path === "/contact";
  return <div className={styles.site} data-landing={path === "/" || path === "/home-experiment"} data-case-study={path.startsWith("/projects/")} data-editorial={path === "/work" || path === "/notes" || path.startsWith("/notes/")}>
    <a className={styles.skip} href="#main-content">Skip to content</a>
    <LandingHeader path={path} />
    <div className={styles.surface} key={path}><div className={styles.pageContent}>{children}</div></div>
    {photos ? <PaperFooter /> : <MonkeyFooter />}
  </div>;
}
