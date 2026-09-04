"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { HalftoneField } from "@/components/ui/HalftoneField";

/**
 * Standalone feedback form — replaces the full SiteFooter on /work, /labs,
 * /projects/[slug], and /about. No backend: mirrors the reference's
 * local-state-only demo (draft in, "sent" confirmation out), matching
 * Wylde.dc.html. Carries the same CTA band as SiteFooter (see PR #12) so
 * the "seeking next role" callout is consistent site-wide, not just on /.
 */
export function ContactCard() {
  const [from, setFrom] = useState("");
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState<"from" | "body" | "">("");

  const canSend = draft.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    setSent(true);
    setDraft("");
  };

  return (
    <footer className="border-t border-divider">
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

      <div className="py-[40px] md:py-[68px]">
      <div className="mx-auto w-full max-w-shell px-[var(--side-pad)]">
        <div className="mx-auto w-full max-w-[640px] border border-border bg-surface p-[24px_20px] md:p-[35px_38px_37px]">
          <div
            className="grid grid-cols-[56px_1fr] items-center gap-[10px] border-b py-[12px] transition-colors duration-300 md:grid-cols-[67px_1fr]"
            style={{ borderColor: focus === "from" ? "#3a3a3a" : "#1c1c1c" }}
          >
            <span
              className="font-mono text-[8px] tracking-[0.24em] transition-colors duration-300"
              style={{ color: focus === "from" ? "#bdbbff" : "#5c5c5c" }}
            >
              FROM
            </span>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() => setFocus("from")}
              onBlur={() => setFocus("")}
              placeholder="you@somewhere.com"
              className="w-full border-none bg-transparent font-body text-[12px] text-ink outline-none placeholder:text-faint md:text-[13px]"
            />
          </div>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onFocus={() => setFocus("body")}
            onBlur={() => setFocus("")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Tell me where I got it wrong."
            className="h-[110px] w-full resize-none border-0 border-b bg-transparent py-[16px] font-body text-[13px] leading-[21px] text-ink outline-none transition-colors duration-300 placeholder:text-mute md:h-[128px] md:text-[14px] md:leading-[23px]"
            style={{ borderColor: focus === "body" ? "#3a3a3a" : "#1c1c1c" }}
          />

          <div className="flex items-center gap-[18px] pt-[18px]">
            <button
              type="button"
              onClick={send}
              disabled={!canSend}
              className="border px-[22px] py-[10px] font-mono text-[9px] tracking-[0.2em] transition-colors duration-300"
              style={{
                borderColor: canSend ? "#bdbbff" : "#262626",
                background: canSend ? "#bdbbff" : "transparent",
                color: canSend ? "#0b0b0b" : "#5c5c5c",
                cursor: canSend ? "pointer" : "default",
              }}
            >
              SEND
            </button>
            <span className="font-mono text-[8px] tracking-[0.2em] text-lilac">
              {sent ? "SENT — I'LL REPLY WITHIN A DAY" : ""}
            </span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
