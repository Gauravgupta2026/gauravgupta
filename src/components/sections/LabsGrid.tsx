"use client";

import { useEffect, useState } from "react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { labsItems, type LabItem } from "@/content/labsItems";

const COLUMNS: LabItem[][] = [0, 1, 2].map((col) =>
  labsItems.filter((item) => item.col === col),
);

/** Mobile tiles run shorter than desktop — keyed by the reference's `h` value. */
const HEIGHT_CLASS: Record<number, string> = {
  447: "h-[154px] md:h-[219px]",
  363: "h-[126px] md:h-[178px]",
  279: "h-[98px] md:h-[137px]",
};

/**
 * Three-column tile grid — hover reveals kind/title/state over a
 * grayscale-to-color image; click opens a fullscreen lightbox. Collapses to
 * one column on mobile, where the overlay is always visible (no hover).
 */
export function LabsGrid() {
  const [open, setOpen] = useState<LabItem | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 sm:gap-[18px] md:grid-cols-3 md:gap-[24px]">
        {COLUMNS.map((column, i) => (
          <div key={i} className="flex flex-col gap-[14px] md:gap-[24px]">
            {column.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setOpen(item)}
                className={`group relative box-border w-full cursor-zoom-in overflow-hidden border border-border bg-[#101010] text-left transition-colors duration-[450ms] hover:border-[#3a3a3a] ${HEIGHT_CLASS[item.h]}`}
              >
                <MediaPlaceholder
                  label={item.kind}
                  seed={item.title}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-0 flex flex-col justify-end gap-[4px] bg-gradient-to-t from-[rgba(6,6,6,.86)] via-[rgba(6,6,6,.2)] via-46% to-[rgba(6,6,6,0)] p-[12px_14px] opacity-100 transition-opacity duration-300 md:gap-[8px] md:p-[20px_22px] md:opacity-0 md:group-hover:opacity-100">
                  <div className="font-mono text-[8px] tracking-[0.24em] text-mute md:text-[8px]">
                    {item.kind}
                  </div>
                  <div className="font-display text-[15px] font-light leading-[18px] text-white md:text-[22px] md:leading-[22px]">
                    {item.title}
                  </div>
                  <div className="text-[10px] leading-[10px] text-lilac md:text-[10px] md:leading-[10px]">
                    {item.state}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div
        onClick={() => setOpen(null)}
        className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-[rgba(6,6,6,.8)] backdrop-blur-2xl backdrop-saturate-[.9] transition-opacity duration-[420ms]"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          className="relative h-[68vh] w-[88vw] max-w-[1180px] transition-transform duration-[620ms] md:h-[80vh] md:w-[84vw]"
          style={{ transform: open ? "scale(1)" : "scale(.92)" }}
        >
          {open && (
            <MediaPlaceholder
              label={open.kind}
              seed={open.title}
              className="absolute inset-0 h-full w-full"
            />
          )}
          <div className="absolute bottom-[-40px] left-0 right-0 flex flex-wrap items-baseline gap-[10px] md:bottom-[-54px] md:gap-[20px]">
            <span className="font-display text-[17px] font-light leading-[21px] text-white md:text-[22px] md:leading-[22px]">
              {open?.title}
            </span>
            <span className="font-mono text-[8px] tracking-[0.24em] text-mute md:text-[8px]">
              {open?.kind}
            </span>
            <span className="ml-auto font-mono text-[9px] tracking-[0.2em] text-lilac md:text-[9px]">
              {open?.state}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
