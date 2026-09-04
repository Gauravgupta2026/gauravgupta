import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { DecisionLog } from "@/components/sections/DecisionLog";
import { ArtifactFiles } from "@/components/sections/ArtifactFiles";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { MetaRow } from "@/components/ui/MetaRow";
import { NumberedSection } from "@/components/ui/NumberedSection";
import {
  projectDetails,
  getProjectDetail,
  type ProjectDetail,
  type Section,
} from "@/content/projectDetails";
import { projects } from "@/content/projects";

/**
 * Ordered narrative sections per template. AI projects carry the full
 * evaluation + guardrails spine; craft projects swap that for a single
 * process block. Order matches `case-study-must-have.md`.
 */
function narrativeSections(project: ProjectDetail): Section[] {
  const sections: Section[] = [project.realProblem, project.beforeAfter];
  if (project.kind === "ai") {
    sections.push(project.aiWorkflow, project.evaluation, project.guardrails);
  } else {
    sections.push(project.process);
  }
  sections.push(project.business);
  return sections;
}

const PROOF_LABELS: Record<string, string> = {
  demo: "Working demo",
  loom: "Watch the walkthrough",
  evalSheet: "Eval sheet",
};

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} — Gaurav Gupta`, description: project.tagline };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);

  // Section numbers run past the narrative spine into whichever optional
  // blocks (decision log, results, FAQ) this project has.
  const sections = narrativeSections(project);
  let nextNum = sections.length;
  const forksNum = project.forks ? ++nextNum : 0;
  const filesNum = project.files ? ++nextNum : 0;
  const faqsNum = project.faqs ? ++nextNum : 0;

  return (
    <main>
      <Nav />

      <Shell as="header" wide className="pb-[28px] pt-[80px] md:pb-[56px] md:pt-[145px]">
        <nav className="flex items-center gap-[8px] font-mono text-[8px] uppercase tracking-[0.14em] md:text-[9px]">
          <Link
            href="/"
            className="text-mute no-underline transition-colors duration-300 hover:text-lilac"
          >
            Home
          </Link>
          <span className="text-faint">&rsaquo;</span>
          <Link href="/work" className="text-lilac no-underline">
            Work
          </Link>
        </nav>

        <Reveal
          as="h1"
          delay={60}
          className="m-0 mt-[16px] text-pretty font-display text-[26px] font-light leading-[1.08] tracking-[-0.02em] text-white md:mt-[34px] md:text-[64px] md:leading-[61px]"
        >
          {project.title}
        </Reveal>
        <Reveal
          as="p"
          delay={120}
          className="m-0 mt-[12px] max-w-[677px] text-pretty text-[11px] leading-[17px] text-mute-2 md:mt-[28px] md:text-[16px] md:leading-[26px]"
        >
          {project.tagline}
        </Reveal>

        {project.meta && (
          <div className="mt-[22px] md:mt-[48px]">
            <MetaRow items={project.meta} />
          </div>
        )}
      </Shell>

      {/* offset photo gallery */}
      <Shell wide>
        <div className="grid grid-cols-2 gap-[8px] md:grid-cols-4 md:gap-[22px]">
          {project.gallery.map((label, i) => (
            <MediaPlaceholder
              key={i}
              label={label}
              seed={`${slug}-gallery-${i}`}
              className={`aspect-[3/4] w-full border border-border ${
                i % 2 === 1 ? "md:mt-[48px]" : ""
              }`}
            />
          ))}
        </div>
      </Shell>

      {/* tech stack + stakeholders */}
      <Shell wide className="mt-[36px] md:mt-[80px]">
        <div className="grid grid-cols-1 gap-[18px] border-t border-border-2 pt-[20px] sm:grid-cols-2 sm:gap-[40px] md:pt-[36px]">
          <div>
            <h2 className="m-0 mb-[10px] font-mono text-[7px] tracking-[0.24em] text-mute md:mb-[18px] md:text-[8px]">
              Tech stack
            </h2>
            <ul className="m-0 flex list-none flex-col gap-[6px] p-0 md:gap-[10px]">
              {project.techStack.map((t) => (
                <li key={t} className="text-[10px] text-soft-ink md:text-[12px]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="m-0 mb-[10px] font-mono text-[7px] tracking-[0.24em] text-mute md:mb-[18px] md:text-[8px]">
              Stakeholders
            </h2>
            <ul className="m-0 flex list-none flex-col gap-[6px] p-0 md:gap-[10px]">
              {project.stakeholders.map((s) => (
                <li key={s} className="text-[10px] text-soft-ink md:text-[12px]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Shell>

      {/* statement pull-quote */}
      <Shell wide className="mt-[32px] md:mt-[72px]">
        <p className="m-0 max-w-[820px] text-pretty font-display text-[15px] font-light italic leading-[1.35] text-white md:text-[26px]">
          &ldquo;{project.statement}&rdquo;
        </p>
      </Shell>

      {/* proof bar — renders only populated must-have links */}
      {project.proof && (
        <Shell wide className="mt-[18px] md:mt-[28px]">
          <div className="flex flex-col gap-[10px] border border-border bg-surface p-[16px] md:gap-[14px] md:p-[24px]">
            {(["demo", "loom", "evalSheet"] as const).some(
              (k) => project.proof?.[k],
            ) && (
              <div className="flex flex-wrap gap-x-[16px] gap-y-[8px]">
                {(["demo", "loom", "evalSheet"] as const).map((key) => {
                  const href = project.proof?.[key];
                  if (!href) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[8px] uppercase tracking-[0.14em] text-lilac no-underline transition-opacity hover:opacity-70 md:text-[9px]"
                    >
                      {PROOF_LABELS[key]} &rarr;
                    </a>
                  );
                })}
              </div>
            )}
            {project.proof.feedback && (
              <p className="m-0 text-[10px] leading-[15px] text-mute-2 md:text-[10px] md:leading-[18px]">
                {project.proof.feedback}
              </p>
            )}
          </div>
        </Shell>
      )}

      {/* narrative sections (framework spine) — single reading column.
          Two-up only earns its place for genuinely parallel short items
          (see DecisionLog's chose/rejected); continuous prose reads
          top-to-bottom, not left-right. */}
      <Shell wide>
        {sections.map((section, i) => (
          <NumberedSection key={section.heading} num={pad(i + 1)} title={section.heading}>
            <div className="mt-[32px] flex max-w-[720px] flex-col gap-[16px] md:mt-[40px]">
              {section.body.map((para, i) => (
                <p
                  key={i}
                  className="m-0 text-pretty text-[13px] leading-[21px] text-soft-ink md:text-[15px] md:leading-[24px]"
                >
                  {para}
                </p>
              ))}
            </div>
          </NumberedSection>
        ))}

        {project.forks && (
          <NumberedSection
            num={pad(forksNum)}
            title="Decision log"
            intro="Forks that changed the product. Pick one to see what we chose, what we turned down, and what the choice cost us."
          >
            <DecisionLog forks={project.forks} />
          </NumberedSection>
        )}

        {project.files && (
          <NumberedSection num={pad(filesNum)} title="Artefacts & trigger files">
            <ArtifactFiles files={project.files} />
          </NumberedSection>
        )}

        {project.faqs && (
          <NumberedSection num={pad(faqsNum)} title="Questions I get asked">
            <FaqAccordion faqs={project.faqs} />
          </NumberedSection>
        )}
      </Shell>

      {/* wide showcase */}
      <Shell wide className="mt-[80px] md:mt-[110px]">
        <MediaPlaceholder
          label={project.showcaseLabel}
          seed={`${slug}-showcase`}
          className="aspect-[4/5] w-full border border-border md:aspect-[16/9]"
        />
      </Shell>

      {/* next project */}
      <Shell wide className="mt-[80px] md:mt-[110px]">
        <SectionDivider className="mb-[56px] md:mb-[72px]" />
        <Reveal
          as="h2"
          className="m-0 mb-[24px] font-display text-[21px] font-light text-white md:mb-[28px] md:text-[27px]"
        >
          Next project
        </Reveal>
        <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group relative block overflow-hidden border border-border bg-surface no-underline transition-transform duration-300 hover:-translate-y-[3px]"
            >
              <MediaPlaceholder
                label="Screens"
                seed={`${p.slug}-next`}
                className="aspect-[4/3] w-full"
              />
              <span className="absolute bottom-[16px] left-[16px] inline-flex border border-border bg-bg px-[14px] py-[7px] font-mono text-[9px] text-ink">
                {p.title}
              </span>
            </Link>
          ))}
        </div>
      </Shell>

    </main>
  );
}
