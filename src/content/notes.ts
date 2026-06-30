import type { NoteSource } from "@/components/ui/SourceIcon";

export type Note = {
  slug: string;
  label: string;
  title: string;
  source: NoteSource;
  /** External URL (Substack/Medium) or internal route (/notes/[slug]). */
  href: string;
};

/** Article rows for the Notes section. */
export const notes: Note[] = [
  {
    slug: "intercultural-communication",
    label: "Article",
    title: "Intercultural Communication",
    source: "substack",
    href: "/notes/intercultural-communication",
  },
  {
    slug: "designing-for-trust",
    label: "Article",
    title: "Designing for Trust",
    source: "medium",
    href: "/notes/designing-for-trust",
  },
  {
    slug: "notes-on-long-horizon-agents",
    label: "Article",
    title: "Notes on Long-Horizon Agents",
    source: "site",
    href: "/notes/notes-on-long-horizon-agents",
  },
  {
    slug: "building-rag-that-doesnt-lie",
    label: "Article",
    title: "Building RAG That Doesn't Lie",
    source: "substack",
    href: "/notes/building-rag-that-doesnt-lie",
  },
  {
    slug: "what-i-learned-shipping-solo",
    label: "Article",
    title: "What I Learned Shipping Solo",
    source: "medium",
    href: "/notes/what-i-learned-shipping-solo",
  },
];
