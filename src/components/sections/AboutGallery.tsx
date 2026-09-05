"use client";

import { useEffect, useState } from "react";
import { aboutGallery, type GalleryPhoto } from "@/content/aboutGallery";

/**
 * Horizontal-scroll photo strip. At rest every tile is grayscale; tapping
 * one lifts it to full color and scale while the backdrop dims + blurs —
 * the rest of the strip stays visible (and still grayscale) through the
 * blur, so the tap reads as "this one," not a full-screen takeover.
 */
export function AboutGallery() {
  const [open, setOpen] = useState<GalleryPhoto | null>(null);

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
      {/* Full-bleed: left edge lines up with the page's content column via
          --side-pad, right edge scrolls out past the viewport instead of
          stopping at the shell's max-width, so the strip reads as running
          the full length of the page rather than a boxed-in row. */}
      <div
        className="no-scrollbar flex snap-x snap-proximity gap-[14px] overflow-x-auto pb-[8px] md:gap-[18px]"
        style={{
          // Matches Shell's centered 1375px track + side-pad exactly, so
          // the first tile lines up with the heading above it even past
          // that track's width, instead of only working up to 1375px.
          paddingLeft: "max(var(--side-pad), calc((100% - 1375px) / 2 + var(--side-pad)))",
          paddingRight: "24px",
        }}
      >
        {aboutGallery.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpen(photo)}
            className="group relative h-[165px] w-[120px] flex-shrink-0 snap-start overflow-hidden border border-border md:h-[255px] md:w-[188px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.image}
              alt={photo.caption}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-[12px] left-[12px] font-mono text-[10px] tracking-[0.14em] text-mute-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {photo.caption}
            </span>
          </button>
        ))}
      </div>

      <div
        onClick={() => setOpen(null)}
        className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-[rgba(6,6,6,.6)] backdrop-blur-[12px] transition-opacity duration-[420ms]"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          className="relative aspect-[3/4] w-[76vw] max-w-[460px] border border-border transition-transform duration-[550ms] ease-[cubic-bezier(.16,1.02,.24,1)]"
          style={{ transform: open ? "scale(1)" : "scale(.9)" }}
        >
          {open && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={open.image}
              alt={open.caption}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute bottom-[-32px] left-0 font-mono text-[12px] tracking-[0.2em] text-mute">
            {open?.caption}
          </div>
        </div>
      </div>
    </>
  );
}
