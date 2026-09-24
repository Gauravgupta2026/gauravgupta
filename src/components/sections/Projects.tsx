"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { selectedWork } from "@/content/selectedWork";

const AUTOPLAY_MS = 1700;

export function Projects() {
  const [active, setActive] = useState(0);
  const [card, setCard] = useState(0);
  const [holding, setHolding] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const cards = selectedWork[active].cards;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || holding) return;

    timer.current = setInterval(() => {
      setCard((current) => (current + 1) % cards.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [holding, cards.length, active]);

  const selectProject = (index: number) => {
    if (index === active) return;
    setActive(index);
    setCard(0);
  };

  return (
    <Shell
      as="section"
      id="work"
      wide
      className="bg-white pb-[120px] pt-[180px] text-ink md:pb-[180px] md:pt-[260px]"
      data-browser-theme-color="#ffffff"
    >
      <Reveal
        as="h2"
        className="m-0 text-center font-display text-[46px] font-medium leading-[.95] tracking-[-0.04em] text-ink md:text-[72px]"
      >
        Every Project Starts Somewhere
      </Reveal>
      <SectionDivider className="mt-[64px] md:mt-[100px]" />

      <div className="mt-[40px] grid grid-cols-1 gap-[32px] md:mt-[70px] md:grid-cols-[1fr_1fr] md:gap-[42px]">
        <div className="flex flex-col">
          {selectedWork.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => selectProject(index)}
              onFocus={() => selectProject(index)}
              className="flex items-baseline gap-0 border-b border-black/15 py-[20px] text-left no-underline md:h-[147px] md:border-0 md:py-0"
            >
              <span
                className={`w-[52px] font-mono text-[15px] leading-[37px] transition-colors duration-[450ms] md:w-[90px] md:text-[19px] ${
                  index === active ? "text-zinc-700" : "text-zinc-400"
                }`}
              >
                {project.num}
              </span>
              <span
                className={`font-display font-medium leading-[37px] tracking-[-0.02em] transition-[color,font-size] duration-[450ms] ${
                  index === active
                    ? "text-[27px] text-ink md:text-[38px]"
                    : "text-[23px] text-zinc-400 md:text-[32px]"
                }`}
              >
                {project.title}
              </span>
            </Link>
          ))}
        </div>

        <div
          onMouseEnter={() => setHolding(true)}
          onMouseLeave={() => setHolding(false)}
          onFocusCapture={() => setHolding(true)}
          onBlurCapture={() => setHolding(false)}
        >
          <div className="relative h-[420px] overflow-hidden md:h-[482px]">
            <div
              className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ transform: `translate3d(-${card * 100}%,0,0)` }}
            >
              {cards.map((preview, index) => (
                <div
                  key={preview.label}
                  className="box-border flex h-full w-full min-w-0 flex-shrink-0 flex-col overflow-hidden bg-[#f1f0ec] p-[24px] md:p-[32px]"
                >
                  <div className="font-mono text-[9px] font-medium leading-[9px] tracking-[0.14em] text-zinc-500">
                    {preview.label}
                  </div>

                  {preview.placeholder && (
                    <MediaPlaceholder
                      label={preview.label}
                      seed={`${selectedWork[active].slug}-${index}`}
                      align="bottom-left"
                      className="mt-[20px] flex-1 md:mt-[24px]"
                    />
                  )}

                  {preview.title && (
                    <div className="mt-[20px] text-pretty font-display text-[24px] font-medium leading-[1.08] tracking-[-0.02em] text-ink md:mt-[24px] md:text-[30px]">
                      {preview.title}
                    </div>
                  )}
                  {preview.body && (
                    <div className="mt-[14px] max-w-[44ch] text-pretty text-[13px] leading-[20px] text-zinc-600">
                      {preview.body}
                    </div>
                  )}
                  {preview.metric && (
                    <div className="mt-auto pt-[16px] font-mono text-[11px] uppercase tracking-[.08em] text-zinc-600 md:pt-[20px]">
                      {preview.metric}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[16px] flex gap-[8px]">
            {cards.map((preview, index) => (
              <button
                key={preview.label}
                type="button"
                aria-label={`Show ${preview.label.toLowerCase()}`}
                onClick={() => setCard(index)}
                className="-my-[16px] flex h-[48px] flex-1 items-center py-[16px]"
              >
                <span
                  className={`h-[2px] w-full transition-colors duration-300 ${
                    index === card ? "bg-zinc-900" : "bg-zinc-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
