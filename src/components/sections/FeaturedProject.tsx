import Image from "next/image";
import Link from "next/link";
import { FEATURED_PROJECT } from "@/content/landingProjects";
import styles from "./LandingProjectRail.module.css";

export function FeaturedProject() {
  const project = FEATURED_PROJECT;

  return (
    <article className={styles.featured} aria-labelledby="featured-project-title">
      <div className={styles.featuredCopy}>
        <p className={styles.eyebrow}>{project.eyebrow}</p>
        <h3 id="featured-project-title" className={styles.featuredTitle}>
          <span>{project.headline.before}</span>{" "}
          <em>{project.headline.emphasis}</em>{" "}
          <span>{project.headline.after}</span>
        </h3>
        <p className={styles.featuredDescription}>{project.description}</p>
        <Link className={styles.featuredAction} href={project.href}>
          Read the case study
          <span aria-hidden="true">↗</span>
        </Link>

        <div className={styles.proof}>
          <h4>Why this work matters</h4>
          <ul>
            {project.proof.map((item) => (
              <li key={item.title}>
                <span aria-hidden="true">→</span>
                <p><strong>{item.title}</strong> {item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.featuredMedia} aria-label={`${project.title} project imagery`}>
        <figure className={styles.featuredHero}>
          <Image
            alt={project.media.heroAlt}
            fill
            sizes="(max-width: 760px) 84vw, 58vw"
            src={project.media.hero}
          />
        </figure>
      </div>
    </article>
  );
}
