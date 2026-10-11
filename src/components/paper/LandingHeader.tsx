import Link from "next/link";
import styles from "./LandingHeader.module.css";

const links = [{ href: "/work", label: "Work" }, { href: "/labs", label: "Labs" }, { href: "/notes", label: "Notes" }, { href: "/about", label: "About" }];
export function LandingHeader({ path }: { path: string }) {
  const activePath = path.startsWith("/projects/") ? "/work" : path;
  return <header className={styles.header} data-reading={path === "/" || path === "/work" || path === "/labs" || path === "/about" || path === "/notes" || path.startsWith("/notes/")}>
    <Link href="/" className={styles.identity} aria-label="Gaurav Gupta, home">GG</Link>
    <nav aria-label="Primary navigation">
      {links.map(link => <Link href={link.href} key={link.href} aria-current={activePath === link.href || activePath.startsWith(`${link.href}/`) ? "page" : undefined}>{link.label}</Link>)}
    </nav>
  </header>;
}
