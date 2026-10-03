import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LandingNav } from "@/components/sections/LandingNav";
import { LandingFrame } from "@/components/sections/LandingFrame";
import { PortfolioFooter } from "@/components/sections/PortfolioFooter";
import { notes } from "@/content/notes";
import { WORK_PROJECTS } from "@/content/workPage";
import styles from "./page.module.css";

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
  description: "I design and build software. Work, personal stories, and notes by Gaurav Gupta, a design engineer in Bengaluru.",
  robots: { index: false, follow: false },
};

export default function HomeExperiment() {
  return (
    <main className={`landing-page ${styles.page}`}>
      <div className={styles.surface}>
        <LandingFrame>
          <div>
            <LandingNav />
            <header className={styles.hero}>
              <h1>I believe good products<br className={styles.desktopBreak} /> work well and feel right.</h1>
              <a className={styles.button} href="#work">See my work</a>
            </header>
            <figure className={styles.openingPhoto}>
              <Image src="/photos/alternate/mountain-portrait.webp" alt="Gaurav resting on a rock in a snowy mountain landscape" width={1600} height={900} sizes="(max-width: 809px) calc(100vw - 40px), (max-width: 1199px) calc(100vw - 64px), 1200px" preload />
            </figure>
          </div>
          <section className={`${styles.chapter} ${styles.introduction}`} aria-label="Introduction" data-browser-theme-color="#ffffff">
            <div className={styles.reading}>
              <p>I’m Gaurav, a design engineer in Bengaluru. I design and build software, from the first sketch to a product that people can use.</p>
              <p>I study the small parts of an interaction: the first round of a game, a pause before sharing, or the response to a tap. These parts change how a product feels.</p>
              <p>I can help you develop an idea, build a prototype, and turn the design into code.</p>
            </div>
          </section>
          <section id="work" className={styles.work} aria-labelledby="work-title">
            <header className={styles.chapterHeading}><h2 id="work-title">Ideas, made real.</h2></header>
            <div className={styles.projectList}>
              {projects.map((project, index) => {
                if (!project.href) return null;
                const copy = projectCopy[project.slug as keyof typeof projectCopy];
                const image = projectImages[project.slug as keyof typeof projectImages];
                return (
                  <article key={project.slug} className={`${styles.project} ${index === 0 ? styles.featured : ""}`}>
                    <div className={styles.projectBrief}>
                      <h3><Link href={project.href}>{project.title}</Link></h3>
                      <p className={styles.premise}>{copy.description}</p>
                      {index !== 0 && <p className={styles.projectDetail}>{copy.detail}</p>}
                      <p className={styles.projectFact}>{copy.fact}</p>
                    </div>
                    <Link className={styles.projectImage} href={project.href} aria-label={`Explore ${project.title}`}>
                      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={index === 0 ? "(max-width: 809px) calc(100vw - 40px), (max-width: 1199px) calc(100vw - 64px), 1120px" : "(max-width: 809px) calc(100vw - 40px), (max-width: 1199px) 46vw, 532px"} />
                    </Link>
                    <Link className={styles.projectAction} href={project.href}>Explore {project.title}</Link>
                  </article>
                );
              })}
            </div>
          </section>
          <section id="story" className={`${styles.chapter} ${styles.story}`} aria-labelledby="origin-title">
            <h2 id="origin-title">Where this started.</h2>
            <figure className={styles.storyPhoto}>
              <Image src="/photos/beach-manipal.png" alt="Friends resting on the beach at night in Manipal" width={1512} height={843} sizes="100vw" />
              <figcaption>Manipal. A place to build, with people to build with.</figcaption>
            </figure>
            <div className={styles.reading}>
              <p>At Manipal, fifteen of us built a go-kart in eight months. I worked on design, marketing, budgets, and sponsors. We raced at Buddh International Circuit and finished fourth overall.</p>
              <p>Sachetana began with a problem KMC brought to MIT. Our team built the solution, then took it to research competitions. We built more than we needed, but the work continued beyond its first presentation.</p>
              <p>These projects taught me to work with people, manage money, and meet a deadline. I want more work with a team that has a problem to solve. Longer term, I want to build a design firm that makes products and supports other builders. For now, I want to develop the skills that make this possible.</p>
            </div>
          </section>
          <section id="notes" className={styles.chapter} aria-labelledby="notes-title">
            <h2 id="notes-title">Notes from the work.</h2>
            <ul className={styles.notes}>
              {notes.map((note) => (
                <li key={note.slug}><Link href={`/notes/${note.slug}`}><span className={styles.noteDate}>{note.date}</span><span className={styles.noteTitle}>{note.title}</span></Link></li>
              ))}
            </ul>
          </section>
          <section id="contact" className={`${styles.chapter} ${styles.contact}`} aria-labelledby="contact-title" data-browser-theme-color="#ffffff">
            <h2 id="contact-title">Let’s make something<br /> worth using.</h2>
            <p className={styles.contactCopy}>I’m looking for a design engineering role. I want to help a team develop a product and build it. Tell me about your project.</p>
            <a className={styles.button} href="mailto:hey@gauravguptas.com">Get in touch</a>
          </section>
        </LandingFrame>
      </div>
      <PortfolioFooter notesHref="/#notes" className={styles.footer} />
    </main>
  );
}
