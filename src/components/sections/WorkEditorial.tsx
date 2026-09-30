import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WORK_EDITORIAL } from "@/content/workEditorial";
import styles from "./WorkEditorial.module.css";

type ProjectRowProps = {
  title: string;
  description: string;
  role: string;
  detail: string;
  image: string;
  detailImage: string;
  primaryAlt: string;
  secondaryAlt: string;
  href?: string;
  reverse?: boolean;
  priority?: boolean;
};

function ProjectMeta({ role, detail }: { role: string; detail: string }) {
  return (
    <p className={styles.meta}>
      <span>{role}</span>
      <span>{detail}</span>
    </p>
  );
}

function ProjectRow({
  title,
  description,
  role,
  detail,
  image,
  detailImage,
  primaryAlt,
  secondaryAlt,
  href,
  reverse = false,
  priority = false,
}: ProjectRowProps) {
  const content = (
    <>
      <div className={`${styles.mediaGrid} ${reverse ? styles.reverse : ""}`}>
        <figure className={`${styles.media} ${styles.primaryMedia}`}>
          <Image
            alt={primaryAlt}
            fill
            priority={priority}
            sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) 58vw, 770px"
            src={image}
          />
        </figure>
        <figure className={`${styles.media} ${styles.secondaryMedia}`}>
          <Image
            alt={secondaryAlt}
            fill
            sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) 34vw, 500px"
            src={detailImage}
          />
        </figure>
      </div>

      <div
        className={`${styles.projectCopy} ${reverse ? styles.copyRight : styles.copyLeft}`}
      >
        <h2>{title}</h2>
        <p>{description}</p>
        <ProjectMeta role={role} detail={detail} />
      </div>
    </>
  );

  return (
    <Reveal as="article" className={styles.project} variant="project">
      {href ? (
        <Link className={styles.projectLink} href={href}>
          {content}
        </Link>
      ) : (
        content
      )}
    </Reveal>
  );
}

export function WorkEditorial() {
  const { reflection } = WORK_EDITORIAL;

  return (
    <div className={styles.page}>
      <ProjectCollection headingLevel="h1" titleId="work-title" />

      <p className={styles.thesis} aria-label="Interactions drive feelings">
          <span>Interactions</span>
          <span>drive</span>
          <span>feelings</span>
      </p>

      <section className={styles.reflection} aria-label="Design reflection">
        <p>{reflection}</p>
      </section>
    </div>
  );
}

type ProjectCollectionProps = {
  headingLevel: "h1" | "h2";
  titleId: string;
  landing?: boolean;
};

function ProjectCollection({
  headingLevel,
  titleId,
  landing = false,
}: ProjectCollectionProps) {
  const { luckyDay, internship, wylde, sachetana } = WORK_EDITORIAL;
  const Heading = headingLevel;

  return (
    <div className={styles.paper}>
      {landing ? (
        <header className={styles.landingHeading}>
          <div className={styles.kickerScreen}>
            <Reveal as="p" className={styles.landingKicker} variant="chapter">
              Work is the story
            </Reveal>
          </div>
          <Reveal as="div" className={styles.titleReveal} variant="chapter">
            <Heading className={styles.landingTitle} id={titleId}>
              <span>Every project starts</span>
              <span>somewhere</span>
            </Heading>
          </Reveal>
        </header>
      ) : (
        <Heading className={styles.title} id={titleId}>
          Work is the story
        </Heading>
      )}

      <div className={styles.projects}>
        <ProjectRow
          description={sachetana.description}
          detail={sachetana.detail}
          detailImage={sachetana.detailImage}
          href={sachetana.href}
          image={sachetana.image}
          primaryAlt="Two phones displaying a calm, privacy-focused reflection interface"
          priority
          role={sachetana.role}
          secondaryAlt="A close-up phone showing a private mood check-in"
          title={sachetana.title}
        />

        <ProjectRow
          description={wylde.description}
          detail={wylde.detail}
          detailImage={wylde.detailImage}
          href={wylde.href}
          image={wylde.image}
          primaryAlt="Two people crossing a quiet brutalist interior"
          reverse
          role={wylde.role}
          secondaryAlt="Friends gathering inside a softly lit brutalist social space"
          title={wylde.title}
        />

        <ProjectRow
          description={luckyDay.description}
          detail={luckyDay.detail}
          detailImage={luckyDay.detailImage}
          href={luckyDay.href}
          image={luckyDay.primaryImage}
          primaryAlt="Two phones displaying a dark, celestial card game"
          role={luckyDay.role}
          secondaryAlt="Overlapping phones with a card-game screen and a light control interface"
          title={luckyDay.title}
        />

        <ProjectRow
          description={internship.description}
          detail={internship.detail}
          detailImage={internship.detailImage}
          image={internship.image}
          primaryAlt="A pale research and search interface displayed on a laptop"
          reverse
          role={internship.role}
          secondaryAlt="A detailed research workspace with filters, sources and a selected result"
          title={internship.title}
        />
      </div>
    </div>
  );
}

export function LandingWorkProjects() {
  return (
    <section
      className={`${styles.page} ${styles.landingProjects}`}
      id="work"
      aria-labelledby="landing-work-title"
      data-browser-theme-color="#ffffff"
    >
      <ProjectCollection headingLevel="h2" titleId="landing-work-title" landing />
    </section>
  );
}
