"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PaperFooter } from "./PaperFooter";
import { EMAIL } from "@/content/paperPortfolio";
import styles from "./Paper.module.css";

const LINKS = [{ href: "/", label: "home" }, { href: "/playground", label: "playground" }, { href: "/about", label: "about" }, { href: "/contact", label: "contact" }] as const;
export function PaperShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date()).toLowerCase().replace(" ", ""));
    update(); const interval = setInterval(update, 60_000); return () => clearInterval(interval);
  }, []);
  const closeMenu = () => { if (!menu.current?.open) return; menu.current.close(); trigger.current?.focus({ preventScroll: true }); };
  const links = LINKS.map((link, index) => {
    const active = path === link.href || (link.href === "/playground" && path === "/labs");
    return <Link href={link.href} key={link.href} aria-current={active ? "page" : undefined} onClick={closeMenu}>{active ? `{${link.label}}` : link.label}{index === LINKS.length - 1 ? "." : ","}</Link>;
  });
  return <div className={styles.site}>
    <a className={styles.skip} href="#main-content">Skip to content</a>
    <nav className={styles.desktopNav} aria-label="Primary navigation">{links}</nav>
    <button ref={trigger} className={styles.menuTrigger} aria-label="Open navigation" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}><span /><span /></button>
    <div className={styles.status}><span suppressHydrationWarning>− &nbsp; {time || "local time"}, bengaluru</span><a href={EMAIL}>− &nbsp; open to thoughtful work</a></div>
    <dialog ref={menu} className={styles.menu} aria-label="Navigation" onClick={e => { if (e.target === e.currentTarget) closeMenu(); }}>
      <button className={styles.close} aria-label="Close navigation" onClick={closeMenu}>×</button>
      <nav aria-label="Mobile navigation">{links}<Link href="/notes" onClick={closeMenu}>notes,</Link><Link href="/work" onClick={closeMenu}>work.</Link></nav>
      <p>A little corner of the internet,<br />by Gaurav Gupta.</p>
    </dialog>
    <div className={styles.surface} key={path}>{children}</div>
    <PaperFooter photos={path === "/contact"} />
  </div>;
}
