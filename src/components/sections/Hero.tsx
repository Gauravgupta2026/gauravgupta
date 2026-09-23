"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Hero() {
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
    <header id="top" className="hero-stage" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-statement">
        <span>I make beautifully useful</span>
        <span>things</span>
      </h1>

      <button
        ref={portalRef}
        type="button"
        className={`hero-portal${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-label="Reveal the landscape"
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

      <div className="hero-intro">
        <p className="hero-intro-kicker">Product, design, and code</p>
        <p>
          I look for what gets in the way, then make it easier to use.
        </p>
        <p>
          Right now, I’m building <Link href="/projects/wylde">Wylde</Link>, exploring
          long-horizon agents, and looking for a product role.
        </p>
      </div>

      <div className="hero-foot">
        <span>Bengaluru, India</span>
        <a href="mailto:hey@gauravguptas.com">Say hello</a>
      </div>
    </header>
  );
}
