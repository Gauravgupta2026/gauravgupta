"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { PaperFooter } from "./PaperFooter";
import { SideNav } from "./SideNav";
import { EMAIL, RESUME_FILENAME, RESUME_HREF } from "@/content/paperPortfolio";
import styles from "./Paper.module.css";

const LINKS = [{ href: "/", label: "home" }, { href: "/playground", label: "playground" }, { href: "/about", label: "about" }, { href: "/contact", label: "contact" }] as const;
/** Routes that use the left sidebar instead of the top-left link list. Add a route here to roll the sidebar out to it. */
const SIDEBAR_ROUTES = ["/work"];
export function PaperShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const sidebar = SIDEBAR_ROUTES.includes(path);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeMenu = () => { if (!menu.current?.open) return; menu.current.close(); trigger.current?.focus({ preventScroll: true }); };
  const links = LINKS.map((link, index) => {
    const active = path === link.href || (link.href === "/playground" && path === "/labs");
    return <Link href={link.href} key={link.href} aria-current={active ? "page" : undefined} onClick={closeMenu}>{active ? `{${link.label}}` : link.label}{index === LINKS.length - 1 ? "." : ","}</Link>;
  });
  return <div className={`${styles.site} ${sidebar ? styles.hasSidebar : ""}`}>
    <a className={styles.skip} href="#main-content">Skip to content</a>
    <nav className={styles.desktopNav} aria-label="Primary navigation">{links}</nav>
    <button ref={trigger} className={styles.menuTrigger} aria-label="Open navigation" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}><span /><span /></button>
    <dialog ref={menu} className={styles.menu} aria-label="Navigation" onClick={e => { if (e.target === e.currentTarget) closeMenu(); }}>
      <button className={styles.close} aria-label="Close navigation" onClick={closeMenu}>×</button>
      <nav aria-label="Mobile navigation">{links}<Link href="/notes" onClick={closeMenu}>notes,</Link><Link href="/work" onClick={closeMenu}>work.</Link></nav>
      {sidebar && <div className={styles.menuActions}><a href={RESUME_HREF} download={RESUME_FILENAME} onClick={closeMenu}>download resume</a><a href={EMAIL} onClick={closeMenu}>say hello</a></div>}
      <p>A little corner of the internet,<br />by Gaurav Gupta.</p>
    </dialog>
    <div className={styles.surface} key={path}>{sidebar && <SideNav path={path} />}{children}</div>
    <PaperFooter photos={path === "/contact"} />
  </div>;
}
