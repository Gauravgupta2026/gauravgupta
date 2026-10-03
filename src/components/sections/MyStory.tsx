import Image from "next/image";
import { OpeningReveal } from "./OpeningReveal";
import styles from "./MyStory.module.css";

const OPENING_PARAGRAPHS = [
  "I’m based in Bengaluru, where I design and build digital products. I like products that make the next moment easier. A card can get a quiet room playing. A check-in can give a student space to find the words.",
  "Those experiences depend on small decisions: what appears first, what needs explaining, and what stays out. That is why I work across design and code. I want to follow an idea far enough to see whether the interaction carries the intention.",
  "The work below is where I explore that connection.",
] as const;

const BIOGRAPHY_PARAGRAPHS = [
  "I grew up in Manipal, taking things apart. By my second year, I was on a fifteen-person go-kart team, handling design, marketing, budgets and sponsors. Eight months later, we raced at Buddh International Circuit and finished fourth overall.",
  "At MIT, I worked on Sachetana. KMC brought us a problem, and our team took it on, making decisions together and building the product. We went on to present it at research competitions and won at MAHE Research Day.",
] as const;

export function MyStory() {
  return (
    <section id="story" className={styles.openingStory} aria-labelledby="story-title" data-browser-theme-color="#ffffff">
      <div className={styles.shell}>
        <OpeningReveal as="figure" className={styles.figure}>
          <Image
            src="/photos/mountains.png"
            loading="eager"
            alt="Looking out across a snow-covered mountain valley"
            width={1512}
            height={702}
            sizes="(max-width: 768px) calc(100vw - 56px), (max-width: 1600px) 89vw, 1424px"
            className={styles.image}
          />
        </OpeningReveal>
        <OpeningReveal className={styles.introduction}>
          <h2 id="story-title" className={styles.title}>The part I care about.</h2>
          <div className={styles.reading}>
            {OPENING_PARAGRAPHS.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </OpeningReveal>
      </div>
    </section>
  );
}

export function Biography() {
  return (
    <section className={styles.memory} aria-labelledby="biography-title" data-browser-theme-color="#ffffff">
      <div className={styles.shell}>
        <figure className={styles.figure}>
          <Image src="/photos/beach-manipal.png" alt="Friends resting on the beach at night in Manipal" width={1512} height={843} sizes="(max-width: 768px) calc(100vw - 56px), 89vw" className={styles.memoryImage} />
          <figcaption className={styles.caption}>Manipal&rsquo;24</figcaption>
        </figure>
        <div className={styles.biography}>
          <h2 id="biography-title" className={styles.title}>How I got here.</h2>
          <div className={styles.reading}>
            {BIOGRAPHY_PARAGRAPHS.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
