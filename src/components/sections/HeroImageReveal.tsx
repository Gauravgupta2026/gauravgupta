"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** The optional hero image reveal, currently not mounted by Hero. */
export function HeroImageReveal() {
  const [open, setOpen] = useState(false);
  const portalRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOutside = (event: PointerEvent) => {
      if (!portalRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <button
      ref={portalRef}
      type="button"
      className={`hero-portal${open ? " is-open" : ""}`}
      aria-expanded={open}
      aria-label="Reveal the photograph"
      onClick={() => {
        if (window.matchMedia("(hover: hover)").matches) return;
        setOpen((current) => !current);
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) setOpen(true);
      }}
      onBlur={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          event.currentTarget.blur();
        }
      }}
    >
      <Image
        src="/assets/hero-ascii-landscape.png"
        alt="A person walking through an ASCII-text mountain landscape"
        width={1512}
        height={702}
        sizes="100vw"
        className="hero-portal-image"
      />
    </button>
  );
}
