import Link from "next/link";
import { WORK_PROJECTS, WORK_QUESTIONS } from "@/content/workPage";
import { WorkProjectGallery } from "./WorkProjectGallery";
import styles from "./WorkEditorial.module.css";

export function WorkEditorial() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.opening}>
          <h1>Ideas, worked through.</h1>
          <p className={styles.introduction}>
            I design and build digital products, from the first question to the
            details of the interaction. These projects span student wellbeing,
            social play, and research tools.
          </p>
        </header>

        <section className={styles.projects} aria-label="Selected projects">
          {WORK_PROJECTS.map((project, index) => (
            <article key={project.slug} aria-labelledby={`${project.slug}-heading`}>
              <header className={styles.projectHeader}>
                <h2 id={`${project.slug}-heading`}>
                  {project.href ? <Link href={project.href}>{project.title}</Link> : project.title}
                </h2>
                <p className={styles.premise}>{project.premise}</p>
                <p className={styles.meta}><span>Contribution</span>{project.contribution}</p>
                <p className={styles.meta}><span>{project.factLabel}</span>{project.fact}</p>
              </header>
              <WorkProjectGallery project={project} priority={index === 0} />
              <div className={styles.projectDetails}>
                <div>
                  <p className={styles.decision}><span>Design choice</span>{project.decision}</p>
                  {project.evidence && <p className={styles.evidence}>{project.evidence}</p>}
                </div>
                {project.href && (
                  <Link className={styles.projectLink} href={project.href}>Explore {project.title}</Link>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className={styles.questions} aria-labelledby="work-questions-title">
          <h2 id="work-questions-title">A few questions</h2>
          <div>
            {WORK_QUESTIONS.map((item) => (
              <details key={item.id} className={styles.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="work-contact" className={styles.contactCard} aria-labelledby="work-contact-title">
          <h2 id="work-contact-title">Have something in mind?</h2>
          <p>Tell me what you’re trying to make, and where you need someone who can design and build.</p>
          <a className={styles.contactButton} href="mailto:hey@gauravguptas.com">Get in touch.</a>
          <a className={styles.email} href="mailto:hey@gauravguptas.com">hey@gauravguptas.com</a>
        </section>
      </div>
    </div>
  );
}
