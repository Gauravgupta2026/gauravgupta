import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ContactBand } from "@/components/sections/ContactBand";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { projectDetails, getProjectDetail } from "@/content/projectDetails";
import { projects } from "@/content/projects";

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

const READING_COL = "mx-auto max-w-[640px]";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Nav />

      <Shell as="main" className="pt-[24px] md:pt-[40px]">
        {/* header */}
        <Reveal className={`${READING_COL} text-center`}>
          <nav className="flex items-center justify-center gap-[8px] font-mono text-[11px] uppercase tracking-[0.14em]">
            <Link
              href="/"
              className="text-mute no-underline transition-colors hover:text-blue"
            >
              Home
            </Link>
            <span className="text-mute opacity-60">&rsaquo;</span>
            <Link href="/#projects" className="text-blue no-underline">
              Projects
            </Link>
          </nav>
          <h1 className="m-0 mt-[26px] font-display text-[clamp(30px,5vw,40px)] font-normal leading-[1.12] text-ink">
            {project.title}
          </h1>
          <p className="m-0 mx-auto mt-[18px] max-w-[440px] font-mono text-[12px] leading-[1.7] text-soft-ink">
            {project.tagline}
          </p>
        </Reveal>

        {/* offset photo gallery */}
        <Reveal className="mt-[64px] grid grid-cols-2 gap-[18px] md:grid-cols-4 md:gap-[22px]">
          {project.gallery.map((label, i) => (
            <PhotoFrame
              key={i}
              label={label}
              className={`aspect-[3/4] w-full ${
                i % 2 === 1 ? "md:mt-[48px]" : ""
              }`}
            />
          ))}
        </Reveal>

        {/* tech stack + stakeholders */}
        <Reveal className={`${READING_COL} mt-[80px]`}>
          <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-2">
            <div>
              <h2 className="m-0 mb-[18px] font-mono text-[13px] font-semibold text-ink">
                Tech Stack
              </h2>
              <ul className="m-0 flex list-none flex-col gap-[8px] p-0">
                {project.techStack.map((t) => (
                  <li key={t} className="font-mono text-[12px] text-soft-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="m-0 mb-[18px] font-mono text-[13px] font-semibold text-ink">
                Stakeholders
              </h2>
              <ul className="m-0 flex list-none flex-col gap-[8px] p-0">
                {project.stakeholders.map((s) => (
                  <li key={s} className="font-mono text-[12px] text-soft-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* statement + body */}
        <Reveal className={`${READING_COL} mt-[72px]`}>
          <p className="m-0 font-mono text-[19px] font-medium leading-[1.5] text-ink">
            {project.statement}
          </p>
          <div className="mt-[28px] flex flex-col gap-[20px]">
            {project.body.map((para, i) => (
              <p
                key={i}
                className="m-0 font-mono text-[12.5px] leading-[1.85] text-soft-ink"
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/* wide showcase */}
        <Reveal className="mt-[64px]">
          <PhotoFrame
            label={project.showcaseLabel}
            className="aspect-[4/5] w-full md:aspect-[16/11]"
          />
        </Reveal>

        {/* next project */}
        <div className="mt-[96px]">
          <Reveal
            as="h2"
            className="m-0 mb-[28px] font-display text-[30px] font-normal text-ink"
          >
            Next Project
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group relative block overflow-hidden rounded-[16px] border border-ink/10 bg-card no-underline transition-transform duration-300 hover:-translate-y-[3px]"
              >
                <div className="flex aspect-[4/3] items-center justify-center">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-mute">
                    Screens
                  </span>
                </div>
                <span className="absolute bottom-[16px] left-[16px] inline-flex rounded-full border border-ink/15 bg-cream px-[14px] py-[7px] font-mono text-[11px] text-ink">
                  {p.title}
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </Shell>

      <ContactBand />
      <Footer />
    </>
  );
}
