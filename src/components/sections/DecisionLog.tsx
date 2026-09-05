"use client";

import { useState } from "react";
import type { DecisionFork } from "@/content/projectDetails";

/**
 * Decision log — one fork per row, tap/click to expand its argument inline
 * (chose / rejected / cost / evidence), same accordion language as the FAQ
 * section further down this page. Replaces an earlier list+detail-panel
 * layout: that repeated the question text in both places and, on mobile,
 * left the detail panel visually disconnected from the row you'd picked.
 */
export function DecisionLog({ forks }: { forks: DecisionFork[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-[24px] flex flex-col md:mt-[32px]">
      {forks.map((f, i) => {
        const isOpen = i === open;
        return (
          <div key={f.num} className="border-t border-border-2">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="grid w-full cursor-pointer grid-cols-[1fr_28px] items-start gap-[16px] py-[16px] text-left md:grid-cols-[1fr_32px] md:gap-[24px] md:py-[24px]"
            >
              <span className="flex flex-col gap-[6px] md:gap-[8px]">
                <span
                  className={`font-mono text-[10px] tracking-[0.24em] transition-colors duration-300 md:text-[10px] ${
                    isOpen ? "text-lilac" : "text-faint"
                  }`}
                >
                  FORK {f.num}
                </span>
                <span
                  className={`text-pretty text-[17px] leading-[23px] tracking-[-0.01em] transition-colors duration-300 md:text-[22px] md:leading-[28px] ${
                    isOpen ? "text-white" : "text-mute-3"
                  }`}
                >
                  {f.q}
                </span>
              </span>
              <span
                className={`justify-self-end font-mono text-[16px] leading-[23px] transition-[transform,color] duration-300 md:text-[18px] md:leading-[28px] ${
                  isOpen ? "rotate-45 text-lilac" : "rotate-0 text-faint"
                }`}
              >
                +
              </span>
            </button>

            <div
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ maxHeight: isOpen ? "560px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div className="flex flex-col gap-[16px] border-l-2 border-lilac/25 py-[4px] pb-[24px] pl-[16px] md:gap-[20px] md:pb-[32px] md:pl-[24px]">
                <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 md:gap-[24px]">
                  <div className="flex flex-col gap-[8px]">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-lilac md:text-[10px]">
                      WE CHOSE
                    </span>
                    <span className="text-pretty text-[15px] leading-[22px] text-white md:text-[16px] md:leading-[24px]">
                      {f.chose}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-faint md:text-[10px]">
                      WE TURNED DOWN
                    </span>
                    <span className="text-pretty text-[15px] leading-[22px] text-mute-2 md:text-[16px] md:leading-[24px]">
                      {f.rejected}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-[14px] border-t border-border-2 pt-[14px] sm:grid-cols-2 md:gap-[24px] md:pt-[20px]">
                  <div className="flex flex-col gap-[8px]">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-mute md:text-[10px]">
                      WHAT IT COST
                    </span>
                    <span className="text-pretty text-[14px] leading-[21px] text-soft-ink md:text-[14px] md:leading-[21px]">
                      {f.cost}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-mute md:text-[10px]">
                      EVIDENCE
                    </span>
                    <span className="text-pretty text-[14px] leading-[21px] text-soft-ink md:text-[14px] md:leading-[21px]">
                      {f.evidence}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-border-2" />
    </div>
  );
}
