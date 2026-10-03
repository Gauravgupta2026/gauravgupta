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
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="grid w-full cursor-pointer grid-cols-[1fr_28px] items-baseline gap-[16px] py-[16px] text-left md:grid-cols-[1fr_32px] md:gap-[24px] md:py-[30px]"
            >
              <span
                className={`text-pretty text-[calc(14px*var(--mobile-type-scale,1))] leading-[calc(20px*var(--mobile-type-scale,1))] tracking-[-0.01em] transition-colors duration-300 md:text-[calc(19px*var(--mobile-type-scale,1))] md:leading-[calc(26px*var(--mobile-type-scale,1))] ${
                  isOpen ? "text-ink" : "text-soft-ink"
                }`}
              >
                {f.q}
              </span>
              <span
                className={`justify-self-end font-body text-[calc(13px*var(--mobile-type-scale,1))] transition-[transform,color] duration-300 md:text-[calc(14px*var(--mobile-type-scale,1))] ${
                  isOpen ? "rotate-45 text-lilac" : "rotate-0 text-faint"
                }`}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-opacity duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ maxHeight: isOpen ? "none" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div className="max-w-[720px] text-pretty pb-[14px] text-[calc(15px*var(--mobile-type-scale,1))] leading-[calc(23px*var(--mobile-type-scale,1))] text-mute-2 md:pb-[20px] md:text-[calc(16px*var(--mobile-type-scale,1))] md:leading-[calc(24px*var(--mobile-type-scale,1))]">
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
