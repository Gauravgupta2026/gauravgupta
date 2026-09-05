"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { footerIndex, footerSocial } from "@/content/footer";

/**
 * Standard footer with the feedback form folded into the same row —
 * identity on the left, the form centered between, INDEX/ELSEWHERE on the
 * right — rather than a separate card stacked above the footer. Used on
 * /work, /labs, /projects/[slug], and /about. No backend: mirrors the
 * reference's local-state-only demo (draft in, "sent" confirmation out),
 * matching Wylde.dc.html.
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
      <Shell
        wide
        className="grid grid-cols-1 gap-[40px] py-[64px] sm:grid-cols-[1fr_1.3fr_1fr] md:gap-[32px] md:py-[96px]"
      >
        <div>
          <span className="font-logo text-[41px] leading-none text-red md:text-[42px]">
            GG
          </span>
          <div className="mt-[26px] font-mono text-[12px] tracking-[0.24em] text-mute">
            INDEX
          </div>
          <div className="mt-[22px] flex flex-col gap-[14px]">
            {footerIndex.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="text-[16px] text-soft-ink no-underline transition-colors duration-300 hover:text-lilac"
              >
                {l.name}
              </a>
            ))}
          </div>
        </div>

        <div className="border border-border bg-surface p-[20px_18px] md:p-[26px_28px]">
          <div
            className="grid grid-cols-[50px_1fr] items-center gap-[10px] border-b py-[10px] transition-colors duration-300"
            style={{ borderColor: focus === "from" ? "#3a3a3a" : "#1c1c1c" }}
          >
            <span
              className="font-mono text-[9px] tracking-[0.24em] transition-colors duration-300"
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
              className="w-full border-none bg-transparent font-body text-[14px] text-ink outline-none placeholder:text-faint md:text-[13px]"
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
            className="h-[80px] w-full resize-none border-0 border-b bg-transparent py-[14px] font-body text-[15px] leading-[24px] text-ink outline-none transition-colors duration-300 placeholder:text-mute md:h-[90px] md:text-[14px] md:leading-[23px]"
            style={{ borderColor: focus === "body" ? "#3a3a3a" : "#1c1c1c" }}
          />

          <div className="flex items-center gap-[18px] pt-[16px]">
            <button
              type="button"
              onClick={send}
              disabled={!canSend}
              className="border px-[20px] py-[9px] font-mono text-[10px] tracking-[0.2em] transition-colors duration-300"
              style={{
                borderColor: canSend ? "#bdbbff" : "#262626",
                background: canSend ? "#bdbbff" : "transparent",
                color: canSend ? "#0b0b0b" : "#5c5c5c",
                cursor: canSend ? "pointer" : "default",
              }}
            >
              SEND
            </button>
            <span className="font-mono text-[9px] tracking-[0.2em] text-lilac">
              {sent ? "SENT — I'LL REPLY WITHIN A DAY" : ""}
            </span>
          </div>
        </div>

        <div className="sm:text-right">
          <div className="font-mono text-[12px] tracking-[0.24em] text-mute">
            ELSEWHERE
          </div>
          <div className="mt-[22px] flex flex-col gap-[14px]">
            {footerSocial.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="text-[16px] text-soft-ink no-underline transition-colors duration-300 hover:text-lilac"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </Shell>

      <Shell
        wide
        className="flex flex-wrap items-center gap-x-[20px] gap-y-[10px] py-[28px] font-mono text-[12px] tracking-[0.18em] text-faint md:py-[36px]"
      >
        <span>&copy; 2026 Gaurav Gupta</span>
        <span className="sm:ml-auto">DESIGNED &amp; BUILT SOLO</span>
      </Shell>
    </footer>
  );
}
