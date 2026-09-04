"use client";

import { useState } from "react";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { DitherField } from "@/components/ui/DitherField";
import { HalftoneField } from "@/components/ui/HalftoneField";
import { ManipalClock } from "@/components/ui/ManipalClock";
import { footerIndex, footerSocial } from "@/content/footer";

const MAIL = "hello@gg.studio";

/**
 * The big contact block + dither field, the footer link grid, and the
 * bottom bar. New dark-theme footer for the Phase 1 landing page — the
 * shared `Footer.tsx` component still serves the not-yet-migrated pages
 * (About, old Notes/Projects templates) until they move to this design.
 */
export function SiteFooter() {
  const [copied, setCopied] = useState(false);

  const copyMail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) navigator.clipboard.writeText(MAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1900);
  };

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="mt-[80px] border-t border-divider md:mt-[130px]">
      <div className="relative overflow-hidden border-b border-border bg-surface">
        <HalftoneField />
        <Shell wide className="relative py-[34px] md:py-[46px]">
          <div className="max-w-[560px]">
            <h2 className="m-0 font-display text-[clamp(30px,4.5vw,44px)] font-light leading-[1.05] tracking-[-0.01em] text-white">
              Let&apos;s build something.
            </h2>
            <p className="mt-[16px] max-w-[420px] text-[15px] leading-[1.6] text-mute-2">
              Open to product design work, and to arguments about scope.
            </p>
            <div className="mt-[28px] flex flex-wrap gap-[12px]">
              <a
                href="/resume.pdf"
                className="inline-flex h-[38px] items-center gap-[8px] rounded-full bg-white px-[16px] text-[13px] font-medium text-bg no-underline transition-colors duration-200 hover:bg-lilac-soft"
              >
                <span className="h-[8px] w-[8px] rounded-[2px] bg-red" aria-hidden="true" />
                Download Resume
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[38px] items-center rounded-full border border-border px-[16px] text-[13px] font-medium text-ink no-underline transition-colors duration-200 hover:border-divider hover:text-white"
              >
                Check GitHub.
              </a>
            </div>
          </div>
        </Shell>
      </div>

      <div className="relative overflow-hidden">
        <DitherField />
        <Shell wide className="relative py-[64px] md:py-[96px]">
          <div className="font-mono text-[10px] tracking-[0.24em] text-mute">
            SAY HELLO
          </div>
          <a
            href={`mailto:${MAIL}`}
            onClick={copyMail}
            className="mt-[20px] block text-pretty break-all font-display text-[clamp(40px,10vw,116px)] font-light leading-[0.96] tracking-[-0.03em] text-white no-underline transition-colors duration-300 hover:text-lilac md:mt-[26px]"
          >
            {copied ? "copied ✓" : MAIL}
          </a>
          <div className="mt-[22px] flex items-baseline gap-[14px] font-mono text-[11px] tracking-[0.2em] text-faint md:mt-[30px]">
            <span className="text-red">&#9679;</span>
            <span>{copied ? "ADDRESS ON YOUR CLIPBOARD" : ""}</span>
          </div>
        </Shell>
      </div>

      <div className="h-px w-full bg-border-2" />

      <Shell
        wide
        className="grid grid-cols-1 gap-[40px] py-[56px] sm:grid-cols-3 md:py-[80px]"
      >
        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] text-mute">
            INDEX
          </div>
          <div className="mt-[24px] flex flex-col gap-[14px] md:mt-[26px] md:gap-[16px]">
            {footerIndex.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="flex items-baseline gap-[12px] text-[20px] tracking-[-0.01em] text-ink no-underline transition-colors duration-300 hover:text-lilac md:text-[24px]"
              >
                <span className="font-mono text-[11px] text-faint">{l.num}</span>
                <span>{l.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] text-mute">
            ELSEWHERE
          </div>
          <div className="mt-[24px] flex flex-col gap-[14px] md:mt-[26px] md:gap-[16px]">
            {footerSocial.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="text-[20px] tracking-[-0.01em] text-ink no-underline transition-colors duration-300 hover:text-lilac md:text-[24px]"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] text-mute">
            CURRENTLY
          </div>
          <div className="mt-[24px] text-pretty font-display text-[22px] italic font-light leading-[1.3] text-[#f4f4f4] md:mt-[26px] md:text-[27px]">
            Building, mostly. Reading, sometimes. Sleeping, rarely.
          </div>
          <div className="mt-[24px] grid grid-cols-[110px_1fr] gap-y-[12px] font-mono text-[11px] tracking-[0.14em] text-mute md:mt-[28px]">
            <span className="text-faint">MANIPAL, IN</span>
            <ManipalClock />
            <span className="text-faint">REPLIES IN</span>
            <span className="text-ink">UNDER 24H</span>
          </div>
        </div>
      </Shell>

      <div className="h-px w-full bg-border-2" />

      <Shell
        wide
        className="flex flex-wrap items-center gap-x-[30px] gap-y-[14px] py-[28px] font-mono text-[11px] tracking-[0.2em] text-faint md:py-[36px]"
      >
        <span className="font-logo text-[32px] leading-none text-red md:text-[40px]">
          GG
        </span>
        <span>&copy; 2026 &mdash; ALL RIGHTS RESERVED</span>
        <a
          href="#top"
          onClick={toTop}
          className="text-ink no-underline transition-colors duration-300 hover:text-lilac sm:ml-auto"
        >
          BACK TO TOP &uarr;
        </a>
      </Shell>
    </footer>
  );
}
