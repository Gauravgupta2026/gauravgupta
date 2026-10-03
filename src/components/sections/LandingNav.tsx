"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./LandingNav.module.css";

const SCROLL_SETTLE_MS = 180;

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/labs", label: "Labs" },
  { href: "/about", label: "About" },
] as const;

export function LandingNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [scrolling, setScrolling] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolling(window.scrollY > 0);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setScrolling(false), SCROLL_SETTLE_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);
  return (
    <>
    <div className={styles.spacer} aria-hidden="true" />
    <nav data-scrolling={scrolling} className={`${styles.nav} ${className}`} aria-label="Primary navigation">
      <Link href="/" className={styles.home} aria-label="Gaurav Gupta — Home" aria-current={pathname === "/" || pathname === "/home-experiment" ? "page" : undefined}>
        <span className={styles.desktopName}>Gaurav Gupta</span>
        <span className={styles.mobileHome}>Home</span>
      </Link>
      <div className={styles.destinations}>
      {LINKS.map((link) => {
        const active = pathname === link.href || (link.href === "/work" && pathname.startsWith("/projects/"));
        return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined}>{link.label}</Link>;
      })}
      </div>
      <a className={styles.contact} href="mailto:hey@gauravguptas.com">Say hello</a>
    </nav>
    </>
  );
}
