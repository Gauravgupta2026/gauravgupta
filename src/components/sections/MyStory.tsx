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
    <section
      id="story"
      className={styles.section}
      aria-labelledby="story-title"
      data-browser-theme-color="#ffffff"
    >
      <Reveal as="figure" className={styles.figure} variant="chapter">
        <Image
          src="/photos/beach-manipal.png"
          alt="Friends resting on the beach at night in Manipal"
          width={1512}
          height={843}
          sizes="100vw"
          className={styles.image}
        />
      </Reveal>

      <div className={styles.shell}>
        <div className={styles.biography}>
          <Reveal as="h2" id="story-title" className={styles.biographyTitle}>
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
  );
}
