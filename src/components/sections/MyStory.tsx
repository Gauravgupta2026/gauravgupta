import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import styles from "./MyStory.module.css";

const STORY_PARAGRAPHS = [
  "I grew up in Manipal taking things apart. By my second year, I had joined a go-kart team with a car, fifteen people, and a competition date. They put me on design, marketing and budgets.",
  "I managed sponsors, the calendar, and a workshop of engineers who each knew their subsystem deserved another week. Eight months later, the kart ran at Buddh International Circuit and finished fourth overall.",
  "Design and development at MIT x KMC later taught me to move between disciplines without treating the handoff as someone else’s problem. A sketch had to survive the browser; a feature had to make sense to the person using it.",
] as const;

export function MyStory() {
  return (
    <>
      <section
        id="story"
        className={styles.statementScreen}
        aria-labelledby="story-title"
        data-browser-theme-color="#ffffff"
      >
        <Reveal as="div" className={styles.statementFrame} variant="chapter">
            <h2 id="story-title" className={styles.statement}>
              you are not immune to nostalgia
            </h2>
        </Reveal>
      </section>

      <section className={styles.section} aria-label="Gaurav's story">
        <div className={styles.shell}>

        <Reveal as="div" delay={80} className={styles.reflection}>
          <p>
            To be very clear: I&rsquo;m not trying to Good Old Days the internet.
            None of this is meant to make you feel nostalgic &mdash; the Internet
            used to be slow and less populated and less diverse, and its access
            was limited to those of a certain class. The Web For All is a marked
            improvement, widespread global internet access is a marked
            improvement, and what I&rsquo;m asking you to consider is what it used to
            feel like to use these tools, and what we&rsquo;ve lost in the Big Tech,
            Web 2.0 and web3 devouring of the &rsquo;Net.
          </p>
        </Reveal>

        <Reveal as="figure" delay={120} className={styles.figure}>
          <Image
            src="/photos/beach-manipal.png"
            alt="Friends resting on the beach at night in Manipal"
            width={1512}
            height={843}
            sizes="(max-width: 768px) calc(100vw - 44px), calc(100vw - 128px)"
            className={styles.image}
          />
        </Reveal>

        <div className={styles.biography}>
          <Reveal as="h3" className={styles.biographyTitle}>
            what i&rsquo;ve been
          </Reveal>

          <div className={styles.storyGrid}>
            {STORY_PARAGRAPHS.map((paragraph, index) => (
              <Reveal
                as="p"
                delay={index * 80}
                className={styles.storyParagraph}
                key={paragraph}
              >
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
