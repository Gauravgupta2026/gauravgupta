export const featuredWork = [
  { slug: "sachetana", title: "Sachetana", purpose: "A private check-in for a difficult day.", context: "Student wellness · iOS & web", focus: "The design problem: make reflection feel unhurried, with privacy at the centre of the experience.", image: "/assets/projects/sachetana.jpg" },
  { slug: "wylde", title: "Wylde", purpose: "Less explaining. More playing.", context: "Party card game · iOS", focus: "The design problem: help a room of people start playing without stopping to read a rulebook.", image: null },
  { slug: "lucky-day", title: "Lucky Day", purpose: "An interaction you can feel.", context: "Slot-machine study · iOS", focus: "The design problem: use timing, spring motion and haptics to give an on-screen interaction weight.", image: null },
] as const;

export type FeaturedProject = (typeof featuredWork)[number];
