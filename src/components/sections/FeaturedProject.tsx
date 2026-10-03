import Image from "next/image";
import Link from "next/link";
import { FEATURED_PROJECT } from "@/content/landingProjects";
import styles from "./LandingProjectRail.module.css";

export function FeaturedProject() {
  const project = FEATURED_PROJECT;

  return (
    <article className={styles.featured} aria-labelledby="featured-project-title">
      <div className={styles.featuredCopy}>
        <h3 id="featured-project-title" className={styles.featuredTitle}>
          <span>{project.headline.before}</span>{" "}
          <em>{project.headline.emphasis}</em>{" "}
          <span>{project.headline.after}</span>
        </h3>
        <p className={styles.featuredDescription}>{project.description}</p>
        <Link className={styles.featuredAction} href={project.href}>
          Read the case study

        </Link>

        <div className={styles.proof}>
          <h4>Why this work matters</h4>
          <ul>
            {project.proof.map((item) => (
              <li key={item.title}>

                <p><strong>{item.title}</strong> {item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.featuredMedia} aria-label={`${project.title} project imagery`}>
        <Link className={styles.featuredHero} href={project.href} aria-label={`Read ${project.title} case study`}>
          <Image
            alt={project.media.heroAlt}
            fill
            sizes="(max-width: 760px) calc(100vw - 64px), 45vw"
            src={project.media.hero}
          />
        </Link>
      </div>
    </article>
  );
}
