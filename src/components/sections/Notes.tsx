import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { notes } from "@/content/notes";

/** Notes teaser rows — label · title · "Read →". Full copy lands in Phase 3. */
export function Notes() {
  return (
    <Shell as="section" id="notes" wide className="pt-[80px] md:pt-[130px]">
      <Reveal
        as="h2"
        className="m-0 font-display text-[31px] font-light leading-[1.05] tracking-[-0.008em] text-white md:text-[40px]"
      >
        Notes
      </Reveal>
      <SectionDivider className="mt-[26px] md:mt-[45px]" />

      <div className="mt-[20px] md:mt-[32px]">
        {notes.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="grid grid-cols-1 gap-y-[4px] border-b border-border-2 py-[16px] text-inherit no-underline transition-opacity hover:opacity-78 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-y-0 md:py-[22px]"
          >
            <div className="font-mono text-[9px] tracking-[0.12em] text-mute-3">
              ARTICLE
            </div>
            <div className="text-pretty text-[14px] tracking-[-0.01em] text-white md:text-[14px]">
              {note.title}
            </div>
            <div className="text-[12px] text-lilac md:text-[11px]">
              Read &rarr;
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
