import Link from "next/link";
import { featuredWork } from "@/content/featuredWork";
import { landingProjectFeatures } from "@/content/landingProjectFeatures";
import { ProjectMedia } from "@/components/giants/ProjectMedia";
import { LandingProject, LandingProjectReveals } from "./LandingProjectReveals";
import styles from "./LandingProjects.module.css";

export function LandingProjects() {
  return <section id="selected-work" className={styles.section} aria-labelledby="selected-work-title">
    <h2 id="selected-work-title" className={styles.heading}>Selected Works</h2>
    <LandingProjectReveals><div id="landing-project-list" className={styles.list}>
      {landingProjectFeatures.map(project => {
        const media = featuredWork.find(item => item.slug === project.slug)!;
        return <LandingProject className={styles.project} key={project.slug}>
          <Link href={`/projects/${project.slug}`} className={styles.preview} data-slug={project.slug} aria-label={`View ${media.title} project`}>
            <ProjectMedia compact project={media} sizes="(max-width: 767px) calc(100vw - 48px), 660px" />
          </Link>
          <div className={styles.caption}>
            <div><p className={styles.name}>{media.title}</p><h3><Link href={`/projects/${project.slug}`}>{project.headline}</Link></h3></div>
            <div className={styles.description}><p>{project.description}</p><Link className={styles.explore} href={`/projects/${project.slug}`}>Explore {media.title}</Link></div>
          </div>
        </LandingProject>;
      })}
    </div></LandingProjectReveals>
  </section>;
}
