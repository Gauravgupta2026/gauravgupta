import Link from "next/link";
import { LandingNav } from "@/components/sections/LandingNav";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <LandingNav />
      <section className={styles.message}>
        <p>404</p>
        <h1>Page not found.</h1>
        <p>This address does not have a page.</p>
        <div className={styles.actions}>
          <Link href="/">Go to Home</Link>
          <Link href="/work">See my work</Link>
        </div>
      </section>
    </main>
  );
}
