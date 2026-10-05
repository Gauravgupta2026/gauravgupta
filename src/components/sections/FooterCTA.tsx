import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import styles from "./FooterCTA.module.css";

export function FooterCTA({ showImage = false }: { showImage?: boolean }) {
  return (
    <footer id="contact" className={styles.footer}>
      {showImage ? (
        <Reveal as="figure" className={styles.figure}>
          <Image
            src="/photos/mountains.png"
            alt="Mountain ridges fading into the distance"
            width={1512}
            height={702}
            sizes="(max-width: 768px) 100vw, calc(100vw - 128px)"
            className={styles.image}
          />
        </Reveal>
      ) : null}

      <div className={styles.shell}>
        <div className={styles.invitation}>
          <Reveal as="h2" className={styles.statement}>
            Creativity and ideas
            <br />
            travel together.
          </Reveal>

          <Reveal as="div" delay={80} className={styles.copy}>
            <p>
              I&rsquo;m looking for product work where the problem is still
              taking shape, where research, systems thinking, and a carefully
              made prototype can change the direction of the room.
            </p>
            <p>
              If that sounds like your kind of work, I&rsquo;d like to hear what
              you&rsquo;re trying to make.
            </p>
            <a className={styles.email} href="mailto:hey@gauravguptas.com">
              Email Gaurav <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>

        <div className={styles.utility}>
          <span>&copy; 2026 Gaurav Gupta</span>
          <nav aria-label="Footer navigation" className={styles.links}>
            <Link href="/about">About</Link>
            <Link href="/work">Work</Link>
            <a href="mailto:hey@gauravguptas.com">Contact</a>
          </nav>
          <span>Designed and built in Bengaluru</span>
        </div>

        <p className={styles.fin} aria-label="Fin">
          Fin.
        </p>
      </div>
    </footer>
  );
}
