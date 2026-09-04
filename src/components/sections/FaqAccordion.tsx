"use client";

import { useState } from "react";
import type { Faq } from "@/content/projectDetails";

/** Click-to-expand FAQ list, one row open at a time. */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className="mt-[28px] flex flex-col md:mt-[44px]">
      {faqs.map((f, i) => {
        const isOpen = i === open;
        return (
          <div key={f.q} className="border-t border-border-2">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="grid w-full cursor-pointer grid-cols-[1fr_28px] items-baseline gap-[16px] py-[16px] text-left md:grid-cols-[1fr_32px] md:gap-[24px] md:py-[30px]"
            >
              <span
                className={`text-pretty text-[12px] leading-[17px] tracking-[-0.01em] transition-colors duration-300 md:text-[19px] md:leading-[26px] ${
                  isOpen ? "text-white" : "text-soft-ink"
                }`}
              >
                {f.q}
              </span>
              <span
                className={`justify-self-end font-mono text-[11px] transition-[transform,color] duration-300 md:text-[14px] ${
                  isOpen ? "rotate-45 text-lilac" : "rotate-0 text-faint"
                }`}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ maxHeight: isOpen ? "260px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div className="max-w-[720px] text-pretty pb-[14px] text-[10px] leading-[16px] text-mute-2 md:pb-[20px] md:text-[14px] md:leading-[23px]">
                {f.a}
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-border-2" />
    </div>
  );
}
