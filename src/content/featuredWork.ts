export const featuredWork = [
  { slug: "sachetana", title: "Sachetana", purpose: "A quiet first step toward campus counselling.", context: "Student mental health · Mobile & web · Closed", focus: "The design problem: make the help a student needs on their worst day the fastest thing to reach.", image: "/assets/sachetana/mockups/onboarding-duo.jpeg" },
  { slug: "wylde", title: "Wylde", purpose: "Less explaining. More playing.", context: "Party card game · iOS", focus: "The design problem: help a room of people start playing without stopping to read a rulebook.", image: null },
  { slug: "lucky-day", title: "Lucky Day", purpose: "An interaction you can feel.", context: "Slot-machine study · iOS", focus: "The design problem: use timing, spring motion and haptics to give an on-screen interaction weight.", image: null },
] as const;

export type FeaturedProject = (typeof featuredWork)[number];
