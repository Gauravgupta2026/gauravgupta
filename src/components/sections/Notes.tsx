import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { notes } from "@/content/notes";
import styles from "./Notes.module.css";

export function Notes() {
  return (
    <section
      id="notes"
      className={styles.section}
      aria-labelledby="notes-title"
      data-browser-theme-color="#ffffff"
    >
      <div className={styles.shell}>
        <header className={styles.heading}>
          <Reveal as="p" className={styles.kicker} variant="chapter">
            This is where i slow down
          </Reveal>
          <Reveal as="h2" id="notes-title" className={styles.title} variant="chapter" delay={100}>
            Notes
          </Reveal>
        </header>

        <div className={styles.grid}>
          {notes.map((note, index) => (
            <Reveal as="article" delay={index * 80} key={note.slug}>
              <Link
                href={`/notes/${note.slug}`}
                className={styles.card}
                aria-label={`Read ${note.title}`}
              >
                <time className={styles.date}>{note.date}</time>
                <h3 className={styles.cardTitle}>{note.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
