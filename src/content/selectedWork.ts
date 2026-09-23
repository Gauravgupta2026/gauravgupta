export type SelectedWorkProject = {
  slug: string;
  num: string;
  title: string;
  premise: string;
  disciplines: string[];
  facts: string[];
  visuals: string[];
};

/** Landing-page facts. Keep these consistent with the corresponding detail page. */
export const selectedWork: SelectedWorkProject[] = [
  {
    slug: "wylde",
    num: "01",
    title: "Wylde",
    premise: "A fast party game that gets a room playing before anyone has to explain the rules.",
    disciplines: ["Product strategy", "Game design", "iOS development"],
    facts: ["TestFlight", "Live playtests", "In active build · 2026"],
    visuals: ["Play", "Pace", "Shuffle", "Sound", "Haptics"],
  },
  {
    slug: "sachetana",
    num: "02",
    title: "Sachetana",
    premise: "A private mental-wellness space for students to check in without turning their worst days into a data product.",
    disciplines: ["Product engineering", "Experience design", "AI guardrails"],
    facts: ["iOS + web", "Private by default", "Write-up in progress"],
    visuals: ["Check-in", "Reflect", "Review", "Share", "Support"],
  },
  {
    slug: "lucky-day",
    num: "03",
    title: "Lucky Day",
    premise: "A compact study of how motion, timing, and haptics can make an interface feel physical.",
    disciplines: ["Interaction design", "Motion direction", "SwiftUI development"],
    facts: ["iOS", "Shipped experiment", "Reusable motion system"],
    visuals: ["Spin", "Spring", "Near miss", "Payout", "Reset"],
  },
];
