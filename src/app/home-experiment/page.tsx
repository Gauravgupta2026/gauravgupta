import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { LandingNav } from "@/components/sections/LandingNav";
import { LandingFrame } from "@/components/sections/LandingFrame";
import { PortfolioFooter } from "@/components/sections/PortfolioFooter";
import { notes } from "@/content/notes";
import { WORK_PROJECTS } from "@/content/workPage";
import { PersonalPhotoStrip } from "./PersonalPhotoStrip";
import styles from "./page.module.css";

const display = localFont({
  src: "../../../public/fonts/fraunces/Fraunces-variable.ttf",
  weight: "100 900",
  variable: "--font-experiment-display",
  display: "swap",
});

const projectCopy = {
  wylde: { description: "A party game made for the people in the room.", detail: "A party game has to earn its place in the room. In Wylde, the first round teaches the rules through play. Scoring stays out, leaving people free to pass the phone and enjoy each other’s company.", fact: "Design & build · Solo project" },
  sachetana: { description: "A reflection app for students, built at MIT for a problem from KMC.", detail: "An AI can help someone put a feeling into words, but sharing those words is a personal decision. The app drafts a reflection; the student reviews it and chooses what to save or share.", fact: "Team project · MAHE Research Day winner" },
  "lucky-day": { description: "A slot machine game, explored through motion and interaction.", detail: "A small game gave me room to study the details: how a reel slows, when a result appears, and what a vibration adds to the moment. Spring motion and tactile feedback are the substance of this experiment.", fact: "Design & build · Personal project" },
} as const;

const projectImages = {
  wylde: { src: "/assets/projects/lucky-day.jpg", alt: "Two phones displaying colourful party-game cards", width: 1920, height: 1536 },
  sachetana: { src: "/assets/projects/sachetana.jpg", alt: "Two phones showing a reflection and wellbeing interface", width: 1920, height: 1440 },
  "lucky-day": { src: "/assets/work/lucky-day-hero.jpg", alt: "Two phone interface studies in a purple celestial scene", width: 1672, height: 941 },
} as const;

const projects = WORK_PROJECTS.filter((project) => project.slug in projectCopy);

export const metadata: Metadata = {
  title: "Gaurav Gupta — Design & code",
  description: "I design and code. I care how it feels and I care that it works. Selected work and notes by Gaurav Gupta.",
  robots: { index: false, follow: false },
};

export default function HomeExperiment() {
  return (
    <main className={`landing-page ${display.variable} ${styles.page}`}>
      <div className={styles.surface}>
        <LandingFrame>
          <div className={styles.opening}>
            <LandingNav className={styles.navigation} />
            <header className={styles.hero}>
              <div className={styles.headline}>
                <h1><span>I care how<br className={styles.mobileBreak} /> it feels</span>{" "}<span>&amp; I care that<br className={styles.mobileBreak} /> it works.</span></h1>
              </div>
              <dl className={styles.identity}>
                <div>
                  <dt>Based in</dt>
                  <dd>Bengaluru</dd>
                </div>
                <div>
                  <dt>Trade</dt>
                  <dd>Design &amp; code</dd>
                </div>
                <div>
                  <dt>Dreams of</dt>
                  <dd>A design VC</dd>
                </div>
              </dl>
            </header>
            <PersonalPhotoStrip />
          </div>
          <section className={`${styles.chapter} ${styles.introduction}`} aria-label="Introduction">
            <div className={styles.reading}>
              <p>I’m Gaurav, a design engineer. I work across the sketch and the browser, turning an idea into something people can try.</p>
              <p>I’m interested in the moments that decide how a product feels: the first round of a game, the pause before sharing something personal, the response to a tap. They can look small on a screen. They matter to the person on the other side.</p>
              <p>If your idea is still taking shape, I can help you work out the interaction, build a prototype, and carry the design into code. Making it usable is part of making it.</p>
            </div>
          </section>
          <section id="work" className={styles.work} aria-labelledby="work-title">
            <header className={styles.chapterHeading}><h2 id="work-title">Things I’ve made.</h2></header>
            <div className={styles.projectList}>
              {projects.map((project) => {
                const copy = projectCopy[project.slug as keyof typeof projectCopy];
                const image = projectImages[project.slug as keyof typeof projectImages];
                return (
                  <article key={project.slug} className={styles.project}>
                    <div className={styles.projectBrief}>
                      <h3><Link href={project.href!}>{project.title}</Link></h3>
                      <p className={styles.premise}>{copy.description}</p>
                      <p className={styles.projectDetail}>{copy.detail}</p>
                      <p className={styles.projectFact}>{copy.fact}</p>
                    </div>
                    <Link className={styles.projectImage} href={project.href!} aria-label={`Explore ${project.title}`}>
                      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 680px) calc(100vw - 32px), 648px" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
          <section id="story" className={styles.chapter} aria-labelledby="origin-title">
            <h2 id="origin-title">Where this started.</h2>
            <p className={styles.sectionLabel}>Manipal</p>
            <div className={styles.reading}>
              <p>Manipal gave me a place to make things with other people. In our go-kart team, fifteen of us had a car to build and a competition date to meet. My part crossed design, marketing, budgets, and sponsors. Eight months later, we raced at Buddh International Circuit and finished fourth overall.</p>
              <p>Sachetana began with a problem KMC brought to MIT. Our team took it up, made the decisions, and built the solution. We overbuilt it. Then we kept taking it to research competitions, giving the work a life beyond its first presentation.</p>
              <p>Those projects asked different things of me. One meant keeping people, money, and a deadline moving together. The other meant working across disciplines to turn an open problem into a product. Both made the work bigger than the screen in front of me.</p>
              <p>That’s the kind of work I want more of: a team with a question worth pursuing, and room to make something together. Longer term, I dream of a design-led firm that builds products and backs other builders. For now, I want to get good at the work that makes that possible.</p>
            </div>
          </section>
          <section id="notes" className={styles.chapter} aria-labelledby="notes-title">
            <h2 id="notes-title">Things I’m thinking about.</h2>
            <ul className={styles.notes}>
              {notes.map((note) => (
                <li key={note.slug}><Link href={`/notes/${note.slug}`}><span className={styles.noteDate}>{note.date}</span><span className={styles.noteTitle}>{note.title}</span></Link></li>
              ))}
            </ul>
          </section>
          <section id="contact" className={`${styles.chapter} ${styles.contact}`} aria-labelledby="contact-title">
            <h2 id="contact-title">Have something in mind?</h2>
            <p className={styles.contactCopy}>I’m looking for a design engineering role where I can help shape a product and build it with the team. Tell me about the problem you’re working on, what you’ve tried, and where you need a hand.</p>
            <a className={styles.contactButton} href="mailto:hey@gauravguptas.com">Get in touch</a>
          </section>
        </LandingFrame>
      </div>
      <PortfolioFooter notesHref="/#notes" className={styles.footer} />
    </main>
  );
}
