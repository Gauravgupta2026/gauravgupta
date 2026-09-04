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
      <div className="no-scrollbar flex snap-x snap-proximity gap-[14px] overflow-x-auto pb-[8px] md:gap-[18px]">
        {aboutGallery.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpen(photo)}
            className="group relative h-[220px] w-[160px] flex-shrink-0 snap-start overflow-hidden border border-border md:h-[320px] md:w-[230px]"
          >
            <div
              className="absolute inset-0 grayscale transition-[filter] duration-500 group-hover:grayscale-0"
              style={{ background: photo.gradient }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-[12px] left-[12px] font-mono text-[9px] tracking-[0.14em] text-mute-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
          {open && <div className="absolute inset-0" style={{ background: open.gradient }} />}
          <div className="absolute bottom-[-32px] left-0 font-mono text-[10px] tracking-[0.2em] text-mute">
            {open?.caption}
          </div>
        </div>
      </div>
    </>
  );
}
