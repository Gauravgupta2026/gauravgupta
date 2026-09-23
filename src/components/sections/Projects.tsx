import Link from "next/link";
import { selectedWork } from "@/content/selectedWork";

export function Projects() {
  return (
    <section id="work" className="projects-chapter" aria-labelledby="projects-title">
      <div className="projects-shell">
        <header className="projects-heading">
          <h2 id="projects-title">Every project<br />starts somewhere.</h2>
          <p className="projects-deck">
            Scroll through the work at your own pace. Each project gets room to
            breathe, with its first evidence visible before you open it.
          </p>
        </header>

        <div className="projects-list">
          {selectedWork.map((project) => (
            <article className="project-record" key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="project-record-link"
                aria-label={`Read the ${project.title} case study`}
              >
                <span className="project-record-number">{project.num}</span>

                <span className="project-record-identity">
                  <span className="project-record-name">{project.title}</span>
                  <span className="project-record-gallery" aria-hidden="true">
                    {project.visuals.map((visual) => (
                      <span className="project-record-visual" key={visual}>
                        <span>{visual}</span>
                      </span>
                    ))}
                  </span>
                </span>

                <span className="project-record-summary">
                  <span className="project-record-premise">{project.premise}</span>
                  <span className="project-record-list project-record-facts">
                    {project.facts.map((fact) => (
                      <span key={fact}>{fact}</span>
                    ))}
                  </span>
                </span>

                <span className="project-record-list project-record-role">
                  {project.disciplines.map((discipline) => (
                    <span key={discipline}>{discipline}</span>
                  ))}
                </span>

                <span className="project-record-action" aria-hidden="true">↗</span>
              </Link>

              <Link
                href={`/projects/${project.slug}`}
                className="project-mobile-link"
                aria-label={`Read the ${project.title} case study`}
              >
                <span className="project-mobile-number">{project.num}</span>
                <span
                  className="project-mobile-image"
                  role="img"
                  aria-label={`${project.title} project preview`}
                >
                  <span>{project.visuals[0]}</span>
                </span>
                <span className="project-mobile-name">{project.title}</span>
                <span className="project-mobile-description">{project.premise}</span>
                <span className="project-mobile-subtext">
                  {project.facts.join(" · ")}
                </span>
                <span className="project-tablet-role">
                  {project.disciplines.join(" · ")}
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="projects-footer">
          <span>Three selected projects · 2026</span>
          <Link href="/work">
            View the full work index <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
