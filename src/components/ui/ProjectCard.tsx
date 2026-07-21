/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { StackItem } from "@/components/ui/SignalCard";

export type MetaItem = { label: string; value: string };

export type Project = {
  /** Route slug → /projects/[slug]. */
  slug: string;
  act: string;
  /** WIP-style acts render in blue. */
  accentAct?: boolean;
  title: string;
  subtitle: string;
  quote: string;
  cta: string;
  href?: string;
  imageLabel: string;
  meta: MetaItem[];
  /** Icon-backed where `slug` matches a file in /public/icons; text-only otherwise. */
  stack: StackItem[];
};

/**
 * Three-column project card: left copy · center scroll-wipe image · right meta
 * rail. Collapses to a single column under 768px.
 */
export function ProjectCard({ project }: { project: Project }) {
  const {
    slug,
    act,
    accentAct,
    title,
    subtitle,
    quote,
    cta,
    href,
    imageLabel,
    meta,
    stack,
  } = project;
  const target = href ?? `/projects/${slug}`;

  return (
    <div className="grid grid-cols-1 border border-ink/12 bg-card md:grid-cols-[1fr_1.1fr_0.8fr]">
      {/* left — copy */}
      <div className="flex flex-col p-[24px] md:p-[34px]">
        <div
          className={`mb-[22px] font-mono text-[9px] uppercase tracking-[0.2em] ${
            accentAct ? "text-blue" : "text-mute"
          }`}
        >
          {act}
        </div>
        <h3 className="m-0 mb-[8px] font-display text-[28px] font-medium text-ink md:text-[34px]">
          {title}
        </h3>
        <div className="mb-[20px] font-mono text-[11px] text-soft-ink">
          {subtitle}
        </div>
        <p className="m-0 mb-auto font-display text-[16px] italic leading-[1.55] text-[#46443e]">
          &ldquo;{quote}&rdquo;
        </p>
        <Link
          href={target}
          className="group/cta mt-[26px] inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.08em] text-blue no-underline"
        >
          {cta}
          <span className="transition-transform duration-300 group-hover/cta:translate-x-[5px]">
            &rarr;
          </span>
        </Link>
      </div>

      {/* center — scroll-wipe image */}
      <div className="relative min-h-[230px] overflow-hidden bg-[#0c0c0c] md:min-h-[300px]">
        <ClipReveal className="absolute inset-0">
          <MediaPlaceholder label={imageLabel} className="h-full w-full" />
        </ClipReveal>
      </div>

      {/* right — meta rail */}
      <div className="flex flex-col border-t border-ink/12 md:border-t-0">
        {meta.map((m) => (
          <div key={m.label} className="border-b border-ink/10 p-[22px_24px] md:p-[26px_28px]">
            <div className="mb-[10px] font-mono text-[9px] uppercase tracking-[0.2em] text-mute">
              {m.label}
            </div>
            <div className="font-display text-[20px] text-ink">{m.value}</div>
          </div>
        ))}
        <div className="p-[22px_24px] md:p-[26px_28px]">
          <div className="mb-[16px] font-mono text-[9px] uppercase tracking-[0.2em] text-mute">
            Stack
          </div>
          <div className="flex flex-wrap gap-x-[18px] gap-y-[14px]">
            {stack.map((s) => (
              <div key={s.name} className="flex items-center gap-[8px]">
                {s.slug ? (
                  <img
                    src={`/icons/${s.slug}.svg`}
                    alt=""
                    width={20}
                    height={20}
                    className="opacity-90"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="h-[6px] w-[6px] rounded-full bg-ink/25"
                  />
                )}
                <span className="font-mono text-[11px] text-soft-ink">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
