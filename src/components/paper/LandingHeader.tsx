import Link from "next/link";
import { EMAIL } from "@/content/paperPortfolio";
import styles from "./LandingHeader.module.css";

const links = [{ href: "/work", label: "Work" }, { href: "/labs", label: "Labs" }, { href: "/notes", label: "Notes" }, { href: "/about", label: "About" }];
export function LandingHeader({ path }: { path: string }) {
  return <header className={styles.header} data-reading={path === "/" || path === "/home-experiment" || path === "/work" || path === "/notes" || path.startsWith("/notes/")}>
    <Link href="/" className={styles.identity} aria-label="Gaurav Gupta, home">GG</Link>
    <nav aria-label="Primary navigation">
      {links.map(link => <Link href={link.href} key={link.href} aria-current={path === link.href || (link.href === "/labs" && path === "/playground") ? "page" : undefined}>{link.label}</Link>)}
      <a href={EMAIL}>Hello</a>
    </nav>
  </header>;
}
