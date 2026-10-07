"use client";

import { featuredWork as selected } from "@/content/featuredWork";
import { ProjectMedia } from "./ProjectMedia";
import Link from "next/link";
import { projectDetails } from "@/content/projectDetails";
import { useProjectRail } from "./useProjectRail";
import styles from "./SelectedWork.module.css";
import presentation from "@/components/ui/ProjectPresentation.module.css";

export function SelectedWork() {
  const { section, viewport, track, active, moveTo, revealFocusedProject } = useProjectRail(selected.length);
  return (
    <section ref={section} id="selected-work" className={styles.section} aria-labelledby="work-title">
      <div className={styles.sticky}>
        <div className={styles.toolbar}>
          <h2 id="work-title">Selected work</h2>
          <nav className={styles.controls} aria-label="Project navigation">
            {active >= 0 && <Link className={styles.viewMore} href={`/projects/${selected[active].slug}`}>View More</Link>}
            <button onClick={() => moveTo(active - 1)} disabled={active === -1} aria-label="Previous panel">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6" /></svg>
            </button>
            <button onClick={() => moveTo(active + 1)} disabled={active === selected.length - 1} aria-label="Next project">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
            </button>
          </nav>
        </div>
        <div ref={viewport} className={styles.viewport} tabIndex={0} role="region" aria-label="Selected projects">
          <div ref={track} className={styles.track}>
            <div className={styles.transition}>
              <p className={styles.thought}>Care in how it works.<br />Care in how it feels.</p>
              <button className={styles.direction} onClick={() => moveTo(0)} aria-label="Continue to the first project">
                <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 32h48M36 12l20 20-20 20" /></svg>
              </button>
            </div>
        {selected.map((project, index) => {
          const detail = projectDetails[project.slug];
          const role = detail.meta?.find(field => field.k === "ROLE")?.v;
          const status = detail.meta?.find(field => field.k === "STATUS")?.v ?? detail.meta?.find(field => field.k === "PERIOD")?.v;
          return (
            <article key={project.slug} data-project className={styles.project} onFocusCapture={() => revealFocusedProject(index)}>
              <Link className={`${styles.mediaLink} ${presentation.frame}`} href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}>
                <ProjectMedia project={project} sizes="(max-width: 1023px) 90vw, 75vw" />
              </Link>
              <div className={styles.caption}>
                <div><h3 className={presentation.title}><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p className={presentation.purpose}>{project.purpose}</p></div>
                <div className={`${styles.facts} ${presentation.facts}`}><p>{project.context}</p><p>{role}</p><p>{status}</p></div>
              </div>
              <p className={styles.context}>{project.focus}</p>
              <Link className={styles.caseStudy} href={`/projects/${project.slug}`}>Read case study</Link>
            </article>
          );
        })}
          </div>
        </div>
        <div className={styles.progress} aria-hidden="true"><span /></div>
        <p className={styles.screenReader} aria-live="polite">{active < 0 ? "Introduction to selected work" : `${active + 1} of ${selected.length}: ${selected[active].title}`}</p>
      </div>
    </section>
  );
}
