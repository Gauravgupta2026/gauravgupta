"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/labs", label: "Play" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [heroVisible, setHeroVisible] = useState(true);
  const inHero = pathname === "/" && heroVisible;
  useEffect(() => {
    if (pathname !== "/") return;
    const heading = document.querySelector("#hero-name");
    if (!heading) return;
    const observer = new IntersectionObserver(([entry]) => {
      setHeroVisible(entry.isIntersecting || entry.boundingClientRect.bottom > 0);
    });
    observer.observe(heading);
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <header className={styles.header} data-hero={inHero}>
      <Link className={styles.name} href="/" aria-label="Gaurav Gupta, home" aria-hidden={inHero} tabIndex={inHero ? -1 : 0}>Gaurav Gupta</Link>
      <nav className={styles.links} aria-label="Main navigation">
        {LINKS.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) || (link.href === "/work" && pathname.startsWith("/projects/")) ? "page" : undefined}>{link.label}</Link>)}
      </nav>
    </header>
  );
}
