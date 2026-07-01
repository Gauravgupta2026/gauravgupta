import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { NoteRow } from "@/components/ui/NoteRow";
import { notes } from "@/content/notes";

export function Notes() {
  return (
    <Shell as="section" id="notes" className="pt-[90px] md:pt-[150px]">
      <Reveal
        as="h2"
        className="m-0 mb-[36px] text-center font-display text-[28px] font-normal italic tracking-[-0.01em] text-ink md:mb-[50px] md:text-[38px]"
      >
        Notes
      </Reveal>
      <Reveal>
        {notes.map((note) => (
          <NoteRow key={note.slug} note={note} />
        ))}
      </Reveal>
    </Shell>
  );
}
