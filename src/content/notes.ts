export type Note = {
  slug: string;
  title: string;
};

/** Copy verbatim from Landing.dc.html's NOTES data. */
export const notes: Note[] = [
  {
    slug: "how-a-constraint-changes-the-shape-of-a-product",
    title: "How a constraint changes the shape of a product",
  },
  {
    slug: "what-i-look-for-before-i-start-prototyping",
    title: "What I look for before I start prototyping",
  },
  {
    slug: "the-smallest-thing-that-removes-the-friction",
    title: "The smallest thing that removes the friction",
  },
];
