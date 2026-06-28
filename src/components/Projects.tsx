import { projects } from "../data";
import { projectPath } from "../useRoute";
import { ImageSlot } from "./ImageSlot";

export function Projects() {
  return (
    <section className="section projects" id="projects">
      <h2 className="projects__title">
        Projects &amp;
        <br />
        Case Study
      </h2>
      <div className="projects__grid">
        {projects.map((p) => (
          <a className="project" href={projectPath(p.id)} key={p.id}>
            <div className="project__frame">
              <ImageSlot
                src={p.image}
                alt={p.alt}
                fit="cover"
                placeholder="Screens"
              />
            </div>
            <div className="project__head">
              <span className="project__name">{p.title}</span>
              <span className="project__tag">{p.tag}</span>
            </div>
            <div className="project__meta">{p.meta}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
