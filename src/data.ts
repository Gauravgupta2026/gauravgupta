// All editable site content lives here. To add a project or note, append to
// the relevant array. To swap an image, drop a file in /public/images and point
// `image` at it (see README).

/** Contact + social links surfaced in the hero meta row and footer. */
export const contact = {
  email: "gauravssa08@gmail.com",
  location: "Manipal, [KA]",
  socials: "#", // replace with your primary social URL
  github: "#",
};

export const summary =
  "Hey, I’m Gaurav. I build things because I’m curious, and I learn because I keep building things. Lately that means AI agents, LLMs, automation, and the occasional side project that starts at 11 PM and somehow becomes a weekend. I’m looking for my first job as an Associate Product Manager. I believe in products that are genuinely useful—and occasionally weird enough to make people smile. I get my kick in thinking — “What happens if I connect these two things?” I’m happiest when I have a rucksack on my back and a camera.";

/** A single step of the life-phases flowchart. */
export interface JourneyStep {
  aspiration: string;
  phase: string;
  /** Bottom-row fill color. Omitted for the current / ghost steps. */
  color?: string;
  /** The "I am here" step — rendered with the current-phase fill. */
  current?: boolean;
  /** A future / undecided step — rendered as a dashed transparent ghost box. */
  ghost?: boolean;
}

export const journey: JourneyStep[] = [
  { aspiration: "Fun & Football", phase: "Home, Assam", color: "#C9E4D3" },
  { aspiration: "Lawyer or Design?!", phase: "Confusion Phase", color: "#F1CED7" },
  { aspiration: "CSE @ MIT, Manipal", phase: "College Phase", color: "#CBDDF2" },
  { aspiration: "AI Engineer", phase: "Being Useful Phase", current: true },
  { aspiration: "Taking suggestions", phase: "TBD, Factory worker", ghost: true },
];

export const strengths: string[] = [
  "Equal parts engineer and product nerd.",
  "If the work isn’t polished, it isn’t mine.",
  "Can figure things out without a step-by-step guide.",
  "Chronically optimistic.",
];

export const weaknesses: string[] = [
  "I tend to over-engineer.",
  "I put a little too much time into research.",
  "Function best with a team around me.",
  "Chronically optimistic.",
];

/** A single image used on a project detail page (gallery tile or showcase). */
export interface ProjectImage {
  /** Optional file under /public/images. Falls back to a placeholder frame. */
  src?: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  meta: string;
  tag: string;
  /** Optional image under /public/images. Falls back to a placeholder frame. */
  image?: string;
  alt: string;

  // --- Detail-page fields. Each section renders only when its field is set, so
  // a project with just the card fields still works. ---
  /** Centered statement shown under the title on the detail page. */
  tagline?: string;
  /** Scattered photo gallery near the top of the detail page. */
  gallery?: ProjectImage[];
  techStack?: string[];
  stakeholders?: string[];
  /** Bold lead line that opens the write-up. */
  statement?: string;
  /** Write-up paragraphs following the statement. */
  body?: string[];
  /** Large showcase image below the write-up. */
  cover?: ProjectImage;
}

export const projects: Project[] = [
  {
    id: "proj-sachetana",
    title: "Sachetana",
    meta: "A mental wellness companion",
    tag: "Product · 25",
    alt: "Sachetana app screens",
    tagline:
      "A calm, judgment-free space that helps students check in with how they actually feel — before it becomes a crisis.",
    gallery: [
      { alt: "Sachetana daily check-in screen" },
      { alt: "Sachetana mood timeline" },
      { alt: "Sachetana guided breathing session" },
      { alt: "Sachetana counsellor hand-off flow" },
    ],
    techStack: ["React Native", "Expo", "FastAPI", "Postgres", "OpenAI API"],
    stakeholders: ["Campus counselling cell", "Student wellness club", "Early student users"],
    statement:
      "I wanted mental-health support to feel like texting a friend, not filling out a clinical form.",
    body: [
      "Sachetana started as a 11 PM side project after watching friends bounce off the campus counselling system because the first step felt too heavy. The app reduces that first step to a single daily check-in, then quietly builds a picture of how someone is trending over time.",
      "The harder problem was trust. I designed the data model so nothing leaves the device unless a student explicitly chooses to share a summary with a counsellor, and the LLM responses are scoped to reflection prompts rather than advice — keeping a clear line between support and clinical care.",
    ],
    cover: { alt: "Sachetana product overview" },
  },
  {
    id: "proj-wylde",
    title: "Wylde",
    meta: "A party card game",
    tag: "Mobile · 24",
    alt: "Wylde party card game screens",
    tagline:
      "A chaotic, fast party card game built to get a room of strangers laughing in under a minute.",
    gallery: [
      { alt: "Wylde lobby screen" },
      { alt: "Wylde card reveal animation" },
      { alt: "Wylde scoreboard" },
      { alt: "Wylde players around a table" },
    ],
    techStack: ["Swift", "SwiftUI", "GameKit", "CloudKit"],
    stakeholders: ["Friends & playtesters", "Local game nights"],
    statement:
      "The whole design constraint was: no rulebook, no setup, just pass the phone and play.",
    body: [
      "Wylde came out of a frustration with party games that need ten minutes of explaining before the fun starts. Every interaction had to be self-explanatory, so I leaned on motion and sound to teach the rules instead of text.",
      "Running it on real game nights turned out to be the best eval I've shipped — I rewrote the card-shuffling logic three times after watching where laughter died down, which taught me more about pacing than any spec ever could.",
    ],
    cover: { alt: "Wylde gameplay showcase" },
  },
  {
    id: "proj-research",
    title: "Research Spotlight",
    meta: "Surfacing campus research",
    tag: "Web · 24",
    alt: "Research Spotlight web interface",
    tagline:
      "A searchable home for the research happening across campus, so good work stops disappearing into PDFs.",
    gallery: [
      { alt: "Research Spotlight landing page" },
      { alt: "Research Spotlight search results" },
      { alt: "Research Spotlight project detail" },
      { alt: "Research Spotlight faculty profile" },
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "Algolia"],
    stakeholders: ["Faculty", "Research office", "Prospective students"],
    statement:
      "Most campus research is brilliant and completely invisible — I wanted to fix the discovery problem, not the research.",
    body: [
      "The project indexes papers, theses, and project reports into a single searchable surface, with embeddings so a student can find related work without knowing the exact academic vocabulary.",
      "The interesting tradeoff was relevance versus recency. I ended up blending semantic search with a lightweight ranking on publication date so the freshest work surfaces without burying the foundational papers people actually cite.",
    ],
    cover: { alt: "Research Spotlight product showcase" },
  },
  {
    id: "proj-lucky",
    title: "Lucky Day",
    meta: "A daily mood journal",
    tag: "Product · 25",
    alt: "Lucky Day mood journal screens",
    tagline:
      "A one-tap journal that turns scattered daily feelings into a pattern you can actually see.",
    gallery: [
      { alt: "Lucky Day entry screen" },
      { alt: "Lucky Day mood calendar" },
      { alt: "Lucky Day weekly insights" },
      { alt: "Lucky Day streak view" },
    ],
    techStack: ["React", "Vite", "IndexedDB", "Recharts"],
    stakeholders: ["Self", "A handful of beta users"],
    statement:
      "I didn't want another journaling app I'd abandon in a week, so the cost of an entry had to be almost zero.",
    body: [
      "Lucky Day is fully local-first — every entry lives in IndexedDB on the device, which removed the account/login friction and made the privacy story trivial to explain.",
      "Once a few weeks of data accumulate, the app stitches entries into simple weekly insights. Building the charting layer taught me how much of 'insight' is really just choosing the right aggregation window for noisy, sparse data.",
    ],
    cover: { alt: "Lucky Day product showcase" },
  },
];

export interface Note {
  cat: string;
  title: string;
  href: string;
}

export const notes: Note[] = [
  { cat: "Essay", title: "Privacy articles", href: "#" },
  { cat: "Review", title: "Listerine", href: "#" },
  { cat: "Essay", title: "JJK : Souls x Ai", href: "#" },
  { cat: "Notes", title: "Intercultural Communication", href: "#" },
];
