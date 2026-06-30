import { Shell } from "@/components/Shell";

/** Thin meta strip under the hero: Socials · BLR · Send an email. */
export function MetaBar() {
  return (
    <Shell wide className="flex items-center justify-between border-b border-ink/10 py-[30px]">
      <a
        href="#"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink no-underline transition-colors duration-300 hover:text-blue"
      >
        Socials
      </a>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
        BLR
      </span>
      <a
        href="mailto:hello@example.com"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink no-underline transition-colors duration-300 hover:text-blue"
      >
        Send an email
      </a>
    </Shell>
  );
}
