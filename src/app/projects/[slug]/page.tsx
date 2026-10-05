import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtifactFiles } from "@/components/sections/ArtifactFiles";
import { DecisionLog } from "@/components/sections/DecisionLog";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Nav } from "@/components/sections/Nav";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { getProjectDetail, projectDetails, type ProjectDetail, type Section } from "@/content/projectDetails";
import { projects } from "@/content/projects";
import styles from "./ProjectCaseStudy.module.css";

const PROJECT_MEDIA: Record<string, { hero: string; detail: string }> = {
  sachetana: { hero: "/assets/work/sachetana-wellness.jpg", detail: "/assets/work/sachetana-detail.jpg" },
  wylde: { hero: "/assets/work/wylde-space.jpg", detail: "/assets/work/wylde-detail.jpg" },
  "lucky-day": { hero: "/assets/work/lucky-day-hero.jpg", detail: "/assets/work/lucky-day-detail.jpg" },
};

const PROOF_LABELS = { demo: "Working demo", loom: "Watch the walkthrough", evalSheet: "Eval sheet" } as const;
const pad = (value: number) => String(value).padStart(2, "0");

function narrativeSections(project: ProjectDetail): Section[] {
  const result: Section[] = [project.realProblem, project.beforeAfter];
  if (project.kind === "ai") result.push(project.aiWorkflow, project.evaluation, project.guardrails);
  else result.push(project.process);
  result.push(project.business);
  return result;
}

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} — Gaurav Gupta`, description: project.tagline };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) notFound();

  const sections = narrativeSections(project);
  const media = PROJECT_MEDIA[slug];
  const others = projects.filter((item) => item.slug !== slug).slice(0, 3);
  let nextSectionNumber = sections.length;
  const forksNumber = project.forks ? ++nextSectionNumber : 0;
  const filesNumber = project.files ? ++nextSectionNumber : 0;
  const faqsNumber = project.faqs ? ++nextSectionNumber : 0;

  return (
    <main className={styles.page}>
      <Nav />
      <article>
        <header className={styles.header}>
          <div className={styles.kicker}>
            <Link href="/work">Selected work</Link>
            <span>Case study / 2026</span>
          </div>
          <h1>{project.title}</h1>
          <p className={styles.standfirst}>{project.tagline}</p>
          {project.meta && (
            <dl className={styles.meta}>
              {project.meta.map((item) => <div key={item.k}><dt>{item.k}</dt><dd>{item.v}</dd></div>)}
            </dl>
          )}
        </header>

        <figure className={styles.leadVisual}>
          {media ? (
            <Image src={media.hero} alt={`${project.title} project overview`} fill priority sizes="(max-width: 720px) calc(100vw - 40px), 760px" />
          ) : (
            <MediaPlaceholder label={project.showcaseLabel} seed={`${slug}-lead`} className={styles.placeholder} />
          )}
        </figure>

        <aside className={styles.principle}>
          <span>The product principle</span>
          <p>{project.statement}</p>
        </aside>

        <div className={styles.readingColumn}>
          <section className={styles.contextGrid}>
            <div><span>Tech stack</span><p>{project.techStack.join(" · ")}</p></div>
            <div><span>Built with</span><p>{project.stakeholders.join(" · ")}</p></div>
          </section>

          {project.proof && (
            <section className={styles.proof} aria-label="Project proof">
              <div className={styles.proofLinks}>
                {(Object.keys(PROOF_LABELS) as Array<keyof typeof PROOF_LABELS>).map((key) => {
                  const href = project.proof?.[key];
                  return href ? <a key={key} href={href} target="_blank" rel="noopener noreferrer">{PROOF_LABELS[key]} ↗</a> : null;
                })}
              </div>
              {project.proof.feedback && <p>{project.proof.feedback}</p>}
            </section>
          )}

          {sections.map((section, index) => (
            <section className={styles.storySection} key={section.heading}>
              <span>{pad(index + 1)} / {section.heading}</span>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>

        {media && (
          <figure className={styles.detailVisual}>
            <Image src={media.detail} alt={`${project.title} interface detail`} fill sizes="(max-width: 720px) calc(100vw - 40px), 900px" />
          </figure>
        )}

        <div className={styles.supportingSections}>
          {project.forks && <section><span>{pad(forksNumber)} / Decisions</span><h2>Decision log</h2><DecisionLog forks={project.forks} /></section>}
          {project.files && <section><span>{pad(filesNumber)} / Process</span><h2>Artefacts &amp; trigger files</h2><ArtifactFiles files={project.files} /></section>}
          {project.faqs && <section><span>{pad(faqsNumber)} / Questions</span><h2>Questions I get asked</h2><FaqAccordion faqs={project.faqs} /></section>}
        </div>

        <footer className={styles.nextProjects}>
          <span>Continue exploring</span>
          <h2>Next project</h2>
          <div>{others.map((item) => <Link href={`/projects/${item.slug}`} key={item.slug}><span>{item.title}</span><i aria-hidden="true">↗</i></Link>)}</div>
        </footer>
      </article>
    </main>
  );
}
