import Link from "next/link";
import { SourceIcon } from "@/components/ui/SourceIcon";
import type { Note } from "@/content/notes";

/**
 * Article row. Hover tints the row, eases its inner padding outward, and fades
 * in the source icon (Substack / Medium / on-site).
 */
export function NoteRow({ note }: { note: Note }) {
  return (
    <Link
      href={note.href}
      className="group grid grid-cols-[1fr_auto] items-center gap-[24px] border-t border-ink/12 px-[8px] py-[24px] no-underline transition-[background-color,padding] duration-[350ms] last:border-b hover:bg-blue-tint hover:px-[20px] md:grid-cols-[120px_1fr_auto]"
    >
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-mute md:inline">
        {note.label}
      </span>
      <span className="flex items-center gap-[14px]">
        <span className="inline-flex opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100">
          <SourceIcon source={note.source} />
        </span>
        <span className="font-display text-[21px] text-ink">{note.title}</span>
      </span>
      <span className="font-mono text-[11px] text-blue">Read &rarr;</span>
    </Link>
  );
}
