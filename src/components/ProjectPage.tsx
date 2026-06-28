import { contact, projects } from "../data";
import { projectPath } from "../useRoute";
import { ImageSlot } from "./ImageSlot";

/**
 * A project detail page. Each section renders only when the project supplies the
 * matching field in `data.ts`, so partially-filled projects degrade gracefully.
 */
export function ProjectPage({ id }: { id: string }) {
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="section projectpage projectpage--missing">
        <p className="projectpage__missing">That project doesn’t exist.</p>
        <a className="projectpage__back" href="#/">
          ← Back home
        </a>
      </main>
    );
  }

  const others = projects.filter((p) => p.id !== project.id);

  return (
    <main className="projectpage">
      <article className="section projectpage__inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span className="crumbs__sep" aria-hidden="true">
            ›
          </span>
          <a className="crumbs__current" href="#projects">
            Projects
          </a>
        </nav>

        <header className="projecthead">
          <h1 className="projecthead__title">
            {project.title}
            {project.meta ? <span> — {project.meta}</span> : null}
          </h1>
          {project.tagline ? (
            <p className="projecthead__tagline">{project.tagline}</p>
          ) : null}
        </header>

        {project.gallery?.length ? (
          <div className="gallery">
            {project.gallery.map((g, i) => (
              <figure className="gallery__item" key={i}>
                <ImageSlot src={g.src} alt={g.alt} fit="cover" placeholder="Photo" />
              </figure>
            ))}
          </div>
        ) : null}

        {project.techStack?.length || project.stakeholders?.length ? (
          <section className="projectinfo">
            {project.techStack?.length ? (
              <div className="projectinfo__col">
                <h2 className="projectinfo__title">Tech Stack</h2>
                <ul className="projectinfo__list">
                  {project.techStack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.stakeholders?.length ? (
              <div className="projectinfo__col">
                <h2 className="projectinfo__title">Stakeholders</h2>
                <ul className="projectinfo__list">
                  {project.stakeholders.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        {project.statement || project.body?.length ? (
          <section className="writeup">
            {project.statement ? (
              <p className="writeup__lead">{project.statement}</p>
            ) : null}
            {project.body?.map((para, i) => (
              <p className="writeup__body" key={i}>
                {para}
              </p>
            ))}
          </section>
        ) : null}

        {project.cover ? (
          <figure className="showcase">
            <ImageSlot
              src={project.cover.src}
              alt={project.cover.alt}
              fit="cover"
              placeholder="Project showcase"
            />
          </figure>
        ) : null}
      </article>

      {others.length ? (
        <section className="section nextproject">
          <h2 className="nextproject__title">Next Project</h2>
          <div className="nextproject__grid">
            {others.map((p) => (
              <a className="nextcard" href={projectPath(p.id)} key={p.id}>
                <div className="nextcard__frame">
                  <ImageSlot
                    src={p.image}
                    alt={p.alt}
                    fit="cover"
                    placeholder="Screens"
                  />
                </div>
                <span className="nextcard__pill">{p.title}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section projectcta">
        <p className="projectcta__title">Have a question about my work?</p>
        <a className="projectcta__link" href={`mailto:${contact.email}`}>
          Send over an email
        </a>
      </section>
    </main>
  );
}
