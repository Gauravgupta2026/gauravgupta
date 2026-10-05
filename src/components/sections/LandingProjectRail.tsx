import { LANDING_GALLERY_PROJECTS } from "@/content/landingProjects";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectGallery } from "./ProjectGallery";
import styles from "./LandingProjectRail.module.css";

export function LandingProjectRail() {
  return (
    <section className={styles.section} id="work" aria-labelledby="selected-work-title">
      <h2 className={styles.sectionTitle} id="selected-work-title">Selected Works</h2>
      <FeaturedProject />
      <div className={styles.galleryProjects}>
        {LANDING_GALLERY_PROJECTS.map((project) => (
          <ProjectGallery key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
