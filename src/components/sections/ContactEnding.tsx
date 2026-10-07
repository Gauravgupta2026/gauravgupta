import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ContactCTA } from "./ContactCTA";
import { PetalDivider } from "./PetalDivider";
import styles from "./ContactEnding.module.css";

export function ContactEnding() {
  return <>
    <ContactCTA />
    <div className={styles.ending}>
    <PetalDivider />
    <footer className={styles.footer}>
      <Link href="/">Gaurav Gupta</Link>
      <div><a href="https://github.com/Gauravgupta2026">GitHub</a><a href="https://in.linkedin.com/in/gaurav-gupta-218a08202">LinkedIn</a><Link href="/notes">Notes</Link><ThemeToggle className={styles.themeToggle} iconOnly /></div>
    </footer>
    </div>
  </>;
}
