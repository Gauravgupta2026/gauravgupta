export type Note = {
  slug: string;
  title: string;
};

/** Three most recent articles from src/content/articles.ts — kept as a
 *  separate light list (title + slug only) so the landing teaser doesn't
 *  need the full article body. Landing.dc.html's placeholder titles never
 *  matched real articles once Phase 3 landed; these do. */
export const notes: Note[] = [
  {
    slug: "notes-on-long-horizon-agents",
    title: "Notes on Long-Horizon Agents",
  },
  {
    slug: "intercultural-communication",
    title: "Intercultural Communication",
  },
  {
    slug: "designing-for-trust",
    title: "Designing for Trust",
  },
];
