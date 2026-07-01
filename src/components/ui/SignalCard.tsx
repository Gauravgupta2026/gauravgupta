/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

/** Shared card label (mono, tracked, muted). */
function CardLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-[30px] font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- Variant 1 */

export type Stat = { value: string; label: ReactNode; accent?: boolean };

/** "Proof of building" — stat list. Hover lifts the card + reveals the arrow. */
export function StatCard({
  label = "Project Stats",
  stats,
  cta,
  href = "#projects",
}: {
  label?: string;
  stats: Stat[];
  cta?: string;
  href?: string;
}) {
  return (
    <div className="group relative flex h-full flex-col border border-ink/10 bg-card p-[30px_30px_26px] transition-[border-color,transform] duration-[400ms] ease-out hover:-translate-y-[3px] hover:border-blue">
      <CardLabel>{label}</CardLabel>
      <div className="flex flex-1 flex-col gap-[22px]">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-[14px] ${
              i < stats.length - 1 ? "border-b border-ink/10 pb-[18px]" : ""
            }`}
          >
            <span
              className={`w-[78px] shrink-0 font-display text-[46px] font-normal leading-[0.9] ${
                s.accent ? "text-blue" : "text-ink"
              }`}
            >
              {s.value}
            </span>
            <span className="font-mono text-[11px] leading-[1.5] text-soft-ink">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      {cta && (
        <a
          href={href}
          className="mt-[26px] inline-flex items-center gap-[6px] font-mono text-[11px] tracking-[0.08em] text-blue no-underline"
        >
          {cta}
          <span className="opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100">
            &rarr;
          </span>
        </a>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Variant 2 */

/** "Currently exploring" — list with a live pulse dot. */
export function ExploringCard({
  label = "Currently exploring",
  items,
}: {
  label?: string;
  items: string[];
}) {
  return (
    <div className="relative flex h-full flex-col border border-blue/15 bg-blue-tint p-[30px] transition-transform duration-[400ms] ease-out hover:-translate-y-[3px]">
      <div className="mb-[30px] flex items-center gap-[8px]">
        <span className="h-[7px] w-[7px] rounded-full bg-blue animate-blink" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue">
          {label}
        </span>
      </div>
      <div className="flex flex-1 flex-col">
        {items.map((item, i) => (
          <div
            key={item}
            className={`py-[13px] font-display text-[24px] leading-[1.35] text-ink ${
              i < items.length - 1 ? "border-b border-blue/12" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Variant 3 */

export type StackItem = { name: string; slug?: string; mono?: string };

/** "Primary stack" — icon grid. simple-icons via CDN; mono fallback badge. */
export function StackCard({
  label = "Primary stack",
  items,
}: {
  label?: string;
  items: StackItem[];
}) {
  return (
    <div className="relative flex h-full flex-col border border-ink/10 bg-card p-[30px] transition-[border-color,transform] duration-[400ms] ease-out hover:-translate-y-[3px] hover:border-blue">
      <CardLabel>{label}</CardLabel>
      <div className="grid flex-1 grid-cols-3 content-start gap-x-[12px] gap-y-[24px]">
        {items.map((it) => (
          <div key={it.name} className="flex flex-col items-start gap-[9px]">
            {it.slug ? (
              <img
                src={`/icons/${it.slug}.svg`}
                alt={it.name}
                width={26}
                height={26}
                className="opacity-90"
              />
            ) : (
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border-[1.5px] border-ink font-mono text-[11px] font-semibold text-ink">
                {it.mono}
              </span>
            )}
            <span className="font-mono text-[10px] text-soft-ink">
              {it.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
