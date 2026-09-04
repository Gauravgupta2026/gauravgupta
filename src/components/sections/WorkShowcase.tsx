"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { workIndex } from "@/content/workIndex";
import { getProjectDetail } from "@/content/projectDetails";

const SLIDE_MS = 2200;

/** Local /public/icons slug for each stack name — falls back to a plain dot
 *  when there's no logo mark (matches the old ProjectCard's convention). */
const STACK_ICON: Record<string, string> = {
  Swift: "swift",
  SwiftUI: "apple",
  GameKit: "apple",
  CloudKit: "apple",
  Convex: "convex",
  Claude: "claude",
  Figma: "figma",
};

/**
 * One case-study row: an auto-sliding photo on the left, info on the right
 * laid out in the reference's two-tier structure — index (+ status, as a
 * small tag) top-left, role/timeline cluster top-right, project name
 * bottom-left, stack cluster bottom-right. Role/timeline answers "what did
 * they own here"; stack answers "can they work in my stack" — the two
 * clusters that actually drive a hiring read, no overlap between them.
 * The whole row links out once a real case study exists; write-ups still in
 * progress render as static (no dead link).
 */
function ShowcaseRow({ entry }: { entry: (typeof workIndex)[number] }) {
  const project = getProjectDetail(entry.slug);
  const [slide, setSlide] = useState(0);
  const [holding, setHolding] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const gallery = project?.gallery ?? ["Photo"];

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || gallery.length <= 1) return;
    if (timer.current) clearInterval(timer.current);
    if (holding) return;
    timer.current = setInterval(() => {
      setSlide((s) => (s + 1) % gallery.length);
    }, SLIDE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [holding, gallery.length]);

  if (!project) return null;

  const isLive = entry.href !== "#";
  const role = project.meta?.find((m) => m.k === "ROLE")?.v;
  const timeline = project.meta?.find(
    (m) => m.k === "PERIOD" || m.k === "TIMELINE",
  )?.v;

  const rowClass = `group grid grid-cols-1 gap-[20px] border-t border-border-2 py-[28px] no-underline first:border-t-0 md:grid-cols-[280px_1fr] md:gap-[40px] md:py-[44px] ${
    isLive
      ? "text-inherit transition-opacity duration-300 hover:opacity-80"
      : "text-inherit"
  }`;

  const content = (
    <>
      {/* photo — auto-slides */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-border md:aspect-[3/4] md:h-[380px] md:w-[280px]">
        {gallery.map((label, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === slide ? 1 : 0 }}
          >
            <MediaPlaceholder
              label={label}
              seed={`${entry.slug}-${i}`}
              className="h-full w-full"
            />
          </div>
        ))}
        {gallery.length > 1 && (
          <div className="absolute bottom-[12px] left-[12px] flex gap-[6px]">
            {gallery.map((_, i) => (
              <span
                key={i}
                className={`h-[4px] w-[4px] rounded-full transition-colors duration-300 ${
                  i === slide ? "bg-lilac" : "bg-mute/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* info — index/status up top, name/stack down bottom */}
      <div className="flex flex-col justify-between md:min-h-[380px]">
        <div className="flex items-start justify-between gap-[20px]">
          <span className="flex items-center gap-[10px] font-mono text-[10px] tracking-[0.2em] text-faint">
            {entry.num}
            <span className="flex items-center gap-[6px] text-[8px] tracking-[0.14em] text-mute">
              {isLive && <span className="h-[4px] w-[4px] rounded-full bg-red" />}
              {entry.status}
            </span>
          </span>
          <div className="flex flex-col items-end gap-[4px] text-right">
            {role && (
              <>
                <span className="font-mono text-[9px] tracking-[0.24em] text-mute">
                  ROLE
                </span>
                <span className="text-[13px] leading-[18px] text-ink md:text-[14px]">
                  {role}
                </span>
              </>
            )}
            {timeline && (
              <span className="text-[13px] leading-[18px] text-mute-2 md:text-[14px]">
                {timeline}
              </span>
            )}
          </div>
        </div>

        <div className="mt-[20px] flex items-end justify-between gap-[20px] md:mt-0">
          <div>
            <div className="flex items-baseline gap-[10px] font-display text-[24px] font-light leading-[1.1] text-white md:text-[34px]">
              {entry.title}
              {isLive && (
                <span className="text-[16px] text-red opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-[22px]">
                  &#8599;
                </span>
              )}
            </div>
            <p className="m-0 mt-[8px] max-w-[400px] text-pretty font-display text-[12px] italic leading-[17px] text-mute-2 md:text-[13px] md:leading-[19px]">
              &ldquo;{project.statement}&rdquo;
            </p>
          </div>
          <div className="flex flex-col items-end gap-[8px] text-right">
            <span className="font-mono text-[9px] tracking-[0.24em] text-mute">
              STACK
            </span>
            <div className="flex items-center gap-[10px]">
              {project.techStack.map((t) =>
                STACK_ICON[t] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={t}
                    src={`/icons/${STACK_ICON[t]}.svg`}
                    alt={t}
                    title={t}
                    width={16}
                    height={16}
                    className="icon-mono h-[18px] w-[18px] opacity-90 transition-opacity duration-300 hover:opacity-100"
                  />
                ) : (
                  <span
                    key={t}
                    title={t}
                    className="h-[6px] w-[6px] rounded-full bg-mute"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (isLive) {
    return (
      <Link
        href={entry.href}
        onMouseEnter={() => setHolding(true)}
        onMouseLeave={() => setHolding(false)}
        className={rowClass}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      className={rowClass}
    >
      {content}
    </div>
  );
}

export function WorkShowcase() {
  return (
    <div className="flex flex-col">
      {workIndex.map((entry) => (
        <ShowcaseRow key={entry.num} entry={entry} />
      ))}
    </div>
  );
}
