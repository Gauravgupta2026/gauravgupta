/**
 * Case-study content for /projects/[slug]. Keyed by the same slug as the
 * landing project cards. Copy is placeholder — edit freely. `gallery` and
 * `showcaseLabel` drive placeholder media frames; swap for real assets later.
 */
export type ProjectDetail = {
  slug: string;
  title: string;
  tagline: string;
  gallery: string[];
  techStack: string[];
  stakeholders: string[];
  statement: string;
  body: string[];
  showcaseLabel: string;
};

export const projectDetails: Record<string, ProjectDetail> = {
  wylde: {
    slug: "wylde",
    title: "Wylde — A party card game",
    tagline:
      "A chaotic, fast party card game built to get a room of strangers laughing in under a minute.",
    gallery: ["Photo", "Photo", "Photo", "Photo"],
    techStack: ["Swift", "SwiftUI", "GameKit", "CloudKit"],
    stakeholders: ["Friends & playtesters", "Local game nights"],
    statement:
      "The whole design constraint was: no rulebook, no setup, just pass the phone and play.",
    body: [
      "Wylde came out of a frustration with party games that need ten minutes of explaining before the fun starts. Every interaction had to be self-explanatory, so I leaned on motion and sound to teach the rules instead of text.",
      "Running it on real game nights turned out to be the best eval I've shipped — I rewrote the card-shuffling logic three times after watching where laughter died down, which taught me more about pacing than any spec ever could.",
    ],
    showcaseLabel: "Project showcase",
  },
  sachetana: {
    slug: "sachetana",
    title: "Sachetana — A mental wellness app",
    tagline:
      "A quiet, private space for students to check in with themselves — quick and unhurried by default.",
    gallery: ["Photo", "Photo", "Photo", "Photo"],
    techStack: ["Swift", "Convex", "Claude", "Figma"],
    stakeholders: ["Students", "Campus counsellors"],
    statement:
      "The constraint was trust: nothing leaves the device unless the student chooses it.",
    body: [
      "Sachetana started from interviews with students who wanted to reflect but distrusted apps that monetize their mood. Private-by-default wasn't a feature — it was the whole premise.",
      "On-device transcription and a gentle, unhurried flow let people journal in the moments they actually had, rather than the moments an app demanded.",
    ],
    showcaseLabel: "Project showcase",
  },
  "lucky-day": {
    slug: "lucky-day",
    title: "Lucky Day — A slot machine",
    tagline:
      "A playful study in motion, chance, and tactile feedback, built to feel good in the hand.",
    gallery: ["Photo", "Photo", "Photo", "Photo"],
    techStack: ["Swift", "SwiftUI"],
    stakeholders: ["Personal project", "Motion-design study"],
    statement:
      "Every pull had to feel weighty — chance you can feel in your thumb.",
    body: [
      "Lucky Day was an excuse to obsess over micro-interactions: the spring of the reels, the haptic on a near-miss, the timing of the payout.",
      "It's a small thing, but it's where I worked out a reusable motion vocabulary I now reach for across every project.",
    ],
    showcaseLabel: "Project showcase",
  },
  "new-project": {
    slug: "new-project",
    title: "New Project — Internal tool",
    tagline:
      "An internal tool to compress the team's daily workflow, currently in active build.",
    gallery: ["Photo", "Photo", "Photo", "Photo"],
    techStack: ["TypeScript", "Next.js", "Convex"],
    stakeholders: ["Internal team", "Operations"],
    statement: "Cut the daily busywork down to a single, honest dashboard.",
    body: [
      "This one is still being built. The goal is to collapse a scattered set of manual steps into one tool the team actually wants to open.",
      "Check back soon — the case study lands when it ships.",
    ],
    showcaseLabel: "In progress",
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}
