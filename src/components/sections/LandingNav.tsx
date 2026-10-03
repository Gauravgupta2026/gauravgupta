"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./LandingNav.module.css";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/labs", label: "Labs" },
  { href: "/about", label: "About" },
] as const;

export function LandingNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  return (
    <>
    <div className={styles.spacer} aria-hidden="true" />
    <nav className={`${styles.nav} ${className}`} aria-label="Primary navigation">
      <Link href="/" className={styles.home} aria-label="Gaurav Gupta — Home" aria-current={pathname === "/" ? "page" : undefined}>
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
