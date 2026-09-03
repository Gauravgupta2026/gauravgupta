"use client";

import { useEffect, useRef, useState } from "react";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { selectedWork } from "@/content/selectedWork";

const AUTOPLAY_MS = 1700;

/**
 * Selected Work — numbered project list on the left, a sliding preview
 * track on the right. Hovering (desktop) or tapping (mobile) a project
 * switches the track; cards inside the active project autoplay unless the
 * panel is hovered or a tick is tapped.
 */
export function Projects() {
  const [active, setActive] = useState(0);
  const [card, setCard] = useState(0);
  const [holding, setHolding] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const cards = selectedWork[active].cards;

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    if (timer.current) clearInterval(timer.current);
    if (holding) return;

    timer.current = setInterval(() => {
      setCard((c) => (c + 1) % cards.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [holding, cards.length, active]);

  const selectProject = (i: number) => {
    if (i === active) return;
    setActive(i);
    setCard(0);
  };

  return (
    <Shell as="section" id="work" wide className="pt-[80px] md:pt-[130px]">
      <Reveal as="h2" className="m-0 font-display text-[34px] font-light leading-[1.05] tracking-[-0.008em] text-soft-ink md:text-[50px]">
        Selected Work
      </Reveal>
      <SectionDivider className="mt-[26px] md:mt-[45px]" />

      <div className="mt-[40px] grid grid-cols-1 gap-[32px] md:mt-[70px] md:grid-cols-[1fr_1fr] md:gap-[42px]">
        <div className="flex flex-col">
          {selectedWork.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onMouseEnter={() => selectProject(i)}
              onClick={() => selectProject(i)}
              className="flex items-baseline gap-0 border-b border-border-2 py-[20px] text-left md:h-[147px] md:border-0 md:py-0"
            >
              <span
                className={`w-[52px] font-mono text-[16px] leading-[40px] transition-colors duration-[450ms] md:w-[90px] md:text-[24px] ${
                  i === active ? "text-mute" : "text-faint"
                }`}
              >
                {p.num}
              </span>
              <span
                className={`font-display font-light leading-[40px] tracking-[-0.005em] transition-[color,font-size] duration-[450ms] ${
                  i === active
                    ? "text-[28px] text-white md:text-[44px]"
                    : "text-[24px] text-mute-3 md:text-[40px]"
                }`}
              >
                {p.title}
              </span>
            </button>
          ))}
        </div>

        <div
          onMouseEnter={() => setHolding(true)}
          onMouseLeave={() => setHolding(false)}
        >
          <div className="relative h-[420px] overflow-hidden md:h-[482px]">
          <div
            className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: `translate3d(-${card * 100}%,0,0)` }}
          >
            {cards.map((c, i) => (
              <div
                key={i}
                className="box-border flex h-full w-full min-w-0 flex-shrink-0 flex-col overflow-hidden bg-bg p-[24px] md:p-[32px]"
              >
                <div className="font-mono text-[10px] font-medium leading-[10px] tracking-[0.14em] text-mute-3 md:text-[11px] md:leading-[11px]">
                  {c.label}
                </div>

                {c.placeholder && (
                  <div className="mt-[20px] flex flex-1 items-end bg-[repeating-linear-gradient(135deg,#0a0a0a_0_8px,#141414_8px_16px)] p-[16px] md:mt-[24px]">
                    <div className="whitespace-pre-line font-mono text-[11px] leading-[16px] text-[#6f6f6f]">
                      {c.placeholder}
                    </div>
                  </div>
                )}

                {c.title && (
                  <div className="mt-[20px] text-pretty text-[18px] font-normal leading-[24px] tracking-[-0.01em] text-ink md:mt-[24px] md:text-[20px] md:leading-[27px]">
                    {c.title}
                  </div>
                )}
                {c.body && (
                  <div className="mt-[12px] text-pretty text-[13px] leading-[19px] text-[#9a9a9a] md:mt-[14px] md:text-[14px] md:leading-[21px]">
                    {c.body}
                  </div>
                )}
                {c.metric && (
                  <div className="mt-auto pt-[16px] text-[13px] leading-[13px] text-lilac md:pt-[20px] md:text-[14px] md:leading-[14px]">
                    {c.metric}
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>

          <div className="mt-[16px] flex gap-[8px]">
            {cards.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show card ${i + 1}`}
                onClick={() => setCard(i)}
                className="-my-[16px] flex h-[48px] flex-1 items-center py-[16px]"
              >
                <span
                  className={`h-[2px] w-full transition-colors duration-300 ${
                    i === card ? "bg-[#6b6b6b]" : "bg-black"
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
