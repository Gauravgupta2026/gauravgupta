/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { workStages, type WorkStage } from "@/content/workStages";

function StageCardBody({ stage }: { stage: WorkStage }) {
  return (
    <div className="shader-card w-full rounded-[20px] border border-white/10 p-[26px] shadow-[0_40px_80px_rgba(0,0,0,.55)]">
      <p className="m-0 text-pretty font-display text-[21px] font-light leading-[1.3] text-white md:text-[23px]">
        {stage.call}
      </p>

      <div className="mt-[20px] flex items-center gap-[10px]">
        {stage.tools.map((t) => (
          <span
            key={t.slug}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-white/[0.06] ring-1 ring-white/10"
          >
            <img
              src={`https://cdn.simpleicons.org/${t.slug}/f3f3f3`}
              alt={t.name}
              title={t.name}
              width={15}
              height={15}
              className="opacity-85"
            />
          </span>
        ))}
      </div>

      <div className="mt-[20px] inline-flex items-center gap-[8px] rounded-full border border-lilac/25 bg-lilac/10 px-[13px] py-[7px] text-[12px] leading-none text-lilac-soft">
        <span className="h-[5px] w-[5px] rounded-full bg-lilac" />
        {stage.metric}
      </div>
    </div>
  );
}

/**
 * "Work is the story" — full-width 2x2 grid.
 *
 * Desktop (md+): hovering a pointer scales a shader-gradient card straight
 * out of it — top-row pointers pop the card downward, bottom-row pointers
 * pop it upward. It's a transient overlay (like any tooltip/popover), so a
 * brief partial overlap with the row it pops toward while active is normal
 * and expected — the card carries its own opaque surface + shadow so it
 * always reads clearly above whatever's behind it.
 *
 * Mobile: no room to float, so tapping expands the card inline right under
 * that pointer via a grid-template-rows 0fr→1fr transition instead.
 */
export function HowIWork() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Shell as="section" id="process" wide className="pt-[80px] md:pt-[130px]">
      <Reveal
        as="h2"
        className="m-0 font-display text-[34px] font-light leading-[1.05] tracking-[-0.008em] text-white md:text-[50px]"
      >
        Work is the story
      </Reveal>
      <SectionDivider className="mt-[26px] md:mt-[45px]" />

      <div className="mt-[48px] grid grid-cols-2 gap-x-[24px] gap-y-[48px] pb-[60px] sm:gap-x-[42px] md:mt-[80px] md:gap-y-[140px] md:pb-[100px]">
        {workStages.map((s, i) => {
          const isOpen = active === i;
          const popDown = i < 2;
          const popRight = i % 2 === 1;
          return (
            <div key={s.num} className="relative">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                onClick={() => setActive(i)}
                className="flex w-full items-baseline gap-[10px] border-b border-border-2 py-[18px] text-left sm:gap-[18px] md:border-0 md:py-0"
              >
                <span className="font-mono text-[14px] leading-[40px] text-faint sm:text-[16px] md:text-[24px]">
                  {s.num}
                </span>
                <span className="font-body text-[19px] tracking-[-0.02em] text-white sm:text-[24px] md:text-[36px]">
                  {s.title}
                </span>
              </button>

              {/* Mobile: inline accordion, no floating overlay. */}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.22,1.4,.36,1)] md:hidden"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="pb-[18px] pt-[4px]">
                    <StageCardBody stage={s} />
                  </div>
                </div>
              </div>

              {/* Desktop: floating popup, scales straight out of the pointer. */}
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                className={`pointer-events-none absolute z-20 hidden w-[320px] scale-90 opacity-0 transition-[transform,opacity] duration-250 ease-[cubic-bezier(.22,1.4,.36,1)] md:block ${
                  popDown
                    ? "top-full mt-[18px] origin-top"
                    : "bottom-full mb-[18px] origin-bottom"
                } ${popRight ? "right-0" : "left-0"}`}
                style={
                  isOpen
                    ? { opacity: 1, transform: "scale(1)", pointerEvents: "auto" }
                    : undefined
                }
              >
                <StageCardBody stage={s} />
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
