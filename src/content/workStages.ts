export type Tool = { name: string; slug: string };

export type WorkStage = {
  num: string;
  title: string;
  /** The one key statement — shown on the hover card. */
  call: string;
  metric: string;
  tools: Tool[];
};

/** Slugs match simpleicons.org. Copy verbatim from Landing.dc.html's STAGES data. */
export const workStages: WorkStage[] = [
  {
    num: "01",
    title: "Discovery",
    call: "I write the kill condition before the brief.",
    tools: [
      { name: "Notion", slug: "notion" },
      { name: "Figma", slug: "figma" },
      { name: "Miro", slug: "miro" },
      { name: "Claude", slug: "claude" },
    ],
    metric: "3 of 7 ideas killed before design",
  },
  {
    num: "02",
    title: "Delivery",
    call: "Ship the ugly version first, behind a flag.",
    tools: [
      { name: "Figma", slug: "figma" },
      { name: "GitHub", slug: "github" },
      { name: "Linear", slug: "linear" },
      { name: "Vercel", slug: "vercel" },
    ],
    metric: "9-day median, idea to prototype",
  },
  {
    num: "03",
    title: "Distribution",
    call: "One channel, seeded properly, instead of five announced at once.",
    tools: [
      { name: "TestFlight", slug: "apple" },
      { name: "Instagram", slug: "instagram" },
      { name: "X", slug: "x" },
      { name: "PostHog", slug: "posthog" },
    ],
    metric: "146+ beta users, zero ad spend",
  },
  {
    num: "04",
    title: "Iteration",
    call: "I delete features that tested well.",
    tools: [
      { name: "PostHog", slug: "posthog" },
      { name: "Metabase", slug: "metabase" },
      { name: "Linear", slug: "linear" },
      { name: "Google Sheets", slug: "googlesheets" },
    ],
    metric: "2 features cut, retention up",
  },
];
