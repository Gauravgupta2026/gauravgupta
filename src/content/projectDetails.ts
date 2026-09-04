/**
 * Case-study content for /projects/[slug]. Keyed by the same slug as the
 * landing project cards.
 *
 * Two templates (see `case-study-must-have.md`):
 *   - "ai"    → full AI-engineering rigor spine: Real Problem → Before/After →
 *              AI Workflow → Evaluation → Guardrails → Business.
 *   - "craft" → lighter design/craft narrative: Real Problem → Before/After →
 *              Process → Business.
 *
 * Every narrative block is a `Section` (heading + paragraphs). `proof` links
 * (demo / Loom / eval sheet / user feedback) are optional and only render when
 * populated — swap in real URLs as they exist. `gallery` / `showcaseLabel`
 * drive placeholder media frames; swap for real assets later.
 */

/** A titled narrative block. `body` paragraphs render in order. */
export type Section = {
  heading: string;
  body: string[];
};

/** "Must-have" proof of a shipped, real project. Every field is optional. */
export type ProofLinks = {
  /** Working demo (TestFlight, deployed URL, App Store). */
  demo?: string;
  /** Loom / video walkthrough. */
  loom?: string;
  /** Public eval sheet (scoring rubric + runs). */
  evalSheet?: string;
  /** One line on feedback from real users. */
  feedback?: string;
};

/** Role / period / platform-style facts shown in the meta row up top. */
export type MetaField = { k: string; v: string };

/** One entry in the decision log — a fork the project could have taken. */
export type DecisionFork = {
  num: string;
  q: string;
  chose: string;
  rejected: string;
  cost: string;
  evidence: string;
};

export type Faq = { q: string; a: string };

/** One row in the artefacts / trigger files list. */
export type FileArtifact = {
  name: string;
  d: string;
  kind: string;
  action: string;
  href?: string;
};

type BaseDetail = {
  slug: string;
  title: string;
  tagline: string;
  gallery: string[];
  techStack: string[];
  stakeholders: string[];
  /** The one-line design constraint / pull quote. */
  statement: string;
  showcaseLabel: string;
  proof?: ProofLinks;
  /** Real User Problem — root cause + who feels it. */
  realProblem: Section;
  /** Before & After — the world before this shipped vs. after. */
  beforeAfter: Section;
  /** Business — what it saves, improves, or earns. */
  business: Section;
  /** Role / period / platform facts — renders as a top meta row when present. */
  meta?: MetaField[];
  /** Decision log — forks worth showing. Only "CASE STUDY"-ready projects carry this. */
  forks?: DecisionFork[];
  faqs?: Faq[];
  /** Artefacts & trigger files — real project documents, worth linking. */
  files?: FileArtifact[];
};

/** AI product: carries the full evaluation + guardrails spine. */
export type AiDetail = BaseDetail & {
  kind: "ai";
  /** AI Workflow — input, output, and where the human stays in the loop. */
  aiWorkflow: Section;
  /** Evaluation — how you know the AI output is actually good. */
  evaluation: Section;
  /** Guardrails & Failure Modes — where it can break, and the fallback. */
  guardrails: Section;
};

/** Craft / design project: process narrative instead of the AI spine. */
export type CraftDetail = BaseDetail & {
  kind: "craft";
  /** Process — how the thing was actually made. */
  process: Section;
};

export type ProjectDetail = AiDetail | CraftDetail;

export const projectDetails: Record<string, ProjectDetail> = {
  sachetana: {
    kind: "ai",
    slug: "sachetana",
    title: "Sachetana — A mental wellness app",
    tagline:
      "A quiet, private space for students to check in with themselves — quick and unhurried by default.",
    gallery: ["Photo", "Photo", "Photo", "Photo"],
    techStack: ["Swift", "Convex", "Claude", "Figma"],
    stakeholders: ["Students", "Campus counsellors"],
    statement:
      "The constraint was trust: nothing leaves the device unless the student chooses it.",
    meta: [
      { k: "ROLE", v: "Design + build, solo" },
      { k: "PERIOD", v: "6 months" },
      { k: "PLATFORM", v: "iOS · Web" },
      { k: "STATUS", v: "Write-up in progress" },
    ],
    proof: {
      feedback:
        "Shaped from interviews with students who'd deleted every other journaling app.",
    },
    realProblem: {
      heading: "The real problem",
      body: [
        "Students wanted a place to reflect, but every app they'd tried treated their mood as a data product. The root cause wasn't a missing feature — it was distrust. Once you assume the app is selling your worst days, no amount of gentle copy earns the check-in.",
        "The user story I kept coming back to: \"As a student having a rough week, I want to get my thoughts out without wondering who's reading them, so I actually open the app instead of bottling it up.\"",
      ],
    },
    beforeAfter: {
      heading: "Before & after",
      body: [
        "Before: journaling meant either a clinical intake form or an app that uploaded every word to reflect it back with ads attached. Both raised the cost of a single honest sentence.",
        "After: a two-tap voice or text check-in that transcribes on-device and stays there. The student, not the server, decides what — if anything — is ever shared.",
      ],
    },
    aiWorkflow: {
      heading: "AI workflow",
      body: [
        "Input: a short spoken or typed check-in, transcribed on-device so raw audio never leaves the phone. Output: a gentle reflection that mirrors what the student said back to them and surfaces one soft prompt — never a diagnosis, never advice.",
        "Human in the loop is the whole point. The model drafts; the student reviews and approves before anything is saved or shared. Counsellors only ever see what a student explicitly hands them.",
      ],
    },
    evaluation: {
      heading: "How I know it's good",
      body: [
        "I scored model responses against a small rubric: does it reflect without diagnosing, stay warm without being saccharine, and avoid any clinical claim? Each check-in sample got a pass/fail on those three, reviewed alongside a campus counsellor.",
        "Responses that drifted into advice-giving — even helpful-sounding advice — failed the rubric outright. Reflecting is the job; prescribing is out of scope by design.",
      ],
    },
    guardrails: {
      heading: "Guardrails & failure modes",
      body: [
        "The dangerous failure mode is a wellness app improvising around a crisis. So crisis language never touches the model: it's caught on-device and routed straight to real helpline resources, with no AI in the path.",
        "Everything the model does see is redacted on-device first. If transcription or the model call fails, the check-in still saves as plain text — the student never loses what they wrote.",
      ],
    },
    business: {
      heading: "Business impact",
      body: [
        "For a campus, the value is earlier signal at lower cost: students self-reflect before a problem reaches the counselling office, and counsellors spend intake time on the students who opted to share rather than on cold forms.",
        "Trust is the moat. An app students actually keep open is worth more than one with more features they refuse to touch.",
      ],
    },
    showcaseLabel: "Project showcase",
  },
  wylde: {
    kind: "craft",
    slug: "wylde",
    title: "Wylde — A party card game",
    tagline:
      "A chaotic, fast party card game built to get a room of strangers laughing in under a minute.",
    gallery: ["Photo", "Photo", "Photo", "Photo"],
    techStack: ["Swift", "SwiftUI", "GameKit", "CloudKit"],
    stakeholders: ["Friends & playtesters", "Local game nights"],
    statement:
      "No rulebook, no setup, just pass the phone and play.",
    meta: [
      { k: "ROLE", v: "Design + build, solo" },
      { k: "PERIOD", v: "2026 — in build" },
      { k: "PLATFORM", v: "iOS · TestFlight" },
      { k: "PLAYERS", v: "4–8, pass and play" },
    ],
    proof: {
      feedback:
        "Rewrote the shuffle logic three times after watching where laughter died on real game nights.",
    },
    realProblem: {
      heading: "The real problem",
      body: [
        "Party games have a cold-start problem: ten minutes of someone reading rules aloud before anyone has fun. The root cause is that the rules live in text, so the game can't start until everyone's read the same page.",
        "The story that drove it: \"As the person who brought the game, I want strangers laughing before I've finished explaining, so the night doesn't stall on setup.\"",
      ],
    },
    beforeAfter: {
      heading: "Before & after",
      body: [
        "Before: a rulebook, a setup ritual, and a host doing tech support for their own party.",
        "After: pass the phone, and the game teaches itself through motion and sound. The first round is the tutorial and nobody notices.",
      ],
    },
    process: {
      heading: "Process",
      body: [
        "Every interaction had to be self-explanatory, so I leaned on motion and sound to teach the rules instead of text. If a card needed a caption to make sense, the interaction was wrong.",
        "Real game nights were the best eval I've shipped. I rewrote the card-shuffling logic three times after watching where laughter died down — pacing is something you can only see on faces, not in a spec.",
      ],
    },
    business: {
      heading: "Why it matters",
      body: [
        "A party game lives or dies on whether it comes back out of the drawer. Killing the setup tax is what turns a one-time play into a regular one — retention, but for a coffee-table game.",
      ],
    },
    forks: [
      {
        num: "01",
        q: "Rules in a book, or taught by playing?",
        chose:
          "The first round is the tutorial. Card design and pacing carry every rule — no page anyone has to read aloud.",
        rejected:
          "A printed rules card, the format almost every party game ships with.",
        cost:
          "The first three cards do a lot of work to earn their keep — get the pacing wrong and the game looks broken, not unexplained.",
        evidence:
          "Playtesters handed a rules card still asked what to do. The card wasn't the thing being read.",
      },
      {
        num: "02",
        q: "Keep score, or don't?",
        chose:
          "No scoring. The loop is the reward — a card lands or it doesn't, and the room moves on.",
        rejected:
          "A running score with a winner at the end, the default for card games.",
        cost:
          "Some players expect a winner and ask for one. There isn't a satisfying answer yet.",
        evidence:
          "Score turned a warm-up into a competition. People stopped talking to each other and started tracking points.",
      },
      {
        num: "03",
        q: "How much does shuffle randomness matter?",
        chose:
          "Hand-tuned shuffle weighting, rewritten three times after watching real game nights.",
        rejected:
          "A true random shuffle — simpler to build, mathematically \"fair.\"",
        cost:
          "More code to maintain, and \"fair by feel\" is harder to defend than fair by math.",
        evidence:
          "True-random runs produced dead stretches. Laughter tracked the rewritten weighting, not the coin-flip version.",
      },
    ],
    faqs: [
      {
        q: "Do I need to read a rulebook?",
        a: "No. The first round teaches the loop by making you play it. If a card needs a caption to make sense, that's a bug.",
      },
      {
        q: "Is there a winner?",
        a: "Not yet, on purpose. Testing showed scoring made people play to win instead of talking to each other. That's the open question I'm still sitting with.",
      },
      {
        q: "How many players?",
        a: "Built and tuned for four to eight — pass the phone works best in a room that size.",
      },
      {
        q: "What stops the shuffle from repeating a card too soon?",
        a: "It's weighted against that. Early versions used a pure random shuffle and it produced dead stretches; the current weighting rules out immediate repeats.",
      },
      {
        q: "Is it on the App Store?",
        a: "Not yet — it's in active build. Write to me if you want in on the next playtest.",
      },
    ],
    files: [
      {
        name: "no-rulebook.md",
        d: "The one line written before the brief: if a stranger needs the rules explained twice, the card failed.",
        kind: "MARKDOWN",
        action: "READ",
      },
      {
        name: "shuffle-log.csv",
        d: "Every shuffle-weighting pass, with which game night flagged it.",
        kind: "DATASET",
        action: "OPEN",
      },
      {
        name: "card-deck.fig",
        d: "Full deck art and layout, including the cards we cut.",
        kind: "FIGMA",
        action: "VIEW",
      },
      {
        name: "playtest-notes-12.pdf",
        d: "Session notes from all twelve game nights, coded by where laughter died.",
        kind: "PDF",
        action: "READ",
      },
      {
        name: "scoring-prototype.swift",
        d: "The scoring build we cut, kept for the record.",
        kind: "CODE",
        action: "OPEN",
      },
    ],
    showcaseLabel: "Project showcase",
  },
  "lucky-day": {
    kind: "craft",
    slug: "lucky-day",
    title: "Lucky Day — A slot machine",
    tagline:
      "A playful study in motion, chance, and tactile feedback, built to feel good in the hand.",
    gallery: ["Photo", "Photo", "Photo", "Photo"],
    techStack: ["Swift", "SwiftUI"],
    stakeholders: ["Personal project", "Motion-design study"],
    statement:
      "Every pull had to feel weighty — chance you can feel in your thumb.",
    meta: [
      { k: "ROLE", v: "Design + build, solo" },
      { k: "PERIOD", v: "2026" },
      { k: "PLATFORM", v: "iOS" },
      { k: "STATUS", v: "Write-up in progress" },
    ],
    realProblem: {
      heading: "The real problem",
      body: [
        "Most on-screen \"chance\" feels weightless — a number changes and nothing in your body registers the risk. I wanted to solve for the opposite: make a pull feel like it cost something, so a near-miss actually stings.",
      ],
    },
    beforeAfter: {
      heading: "Before & after",
      body: [
        "Before: reels that just animate to a result, indistinguishable from a loading spinner.",
        "After: reels with spring, weight, and a haptic on the near-miss — the outcome is felt in the thumb a beat before it's read on screen.",
      ],
    },
    process: {
      heading: "Process",
      body: [
        "Lucky Day was an excuse to obsess over micro-interactions: the spring of the reels, the haptic on a near-miss, the timing of the payout. I tuned each one by feel, not by number.",
        "It's a small thing, but it's where I worked out a reusable motion vocabulary I now reach for across every project.",
      ],
    },
    business: {
      heading: "Why it matters",
      body: [
        "The payoff wasn't the slot machine — it was the motion vocabulary that came out of it, which now makes every other project feel more alive for almost no extra cost.",
      ],
    },
    showcaseLabel: "Project showcase",
  },
  "new-project": {
    kind: "craft",
    slug: "new-project",
    title: "New Project — Internal tool",
    tagline:
      "An internal tool to compress the team's daily workflow, currently in active build.",
    gallery: ["Photo", "Photo", "Photo", "Photo"],
    techStack: ["TypeScript", "Next.js", "Convex"],
    stakeholders: ["Internal team", "Operations"],
    statement: "Cut the daily busywork down to a single, honest dashboard.",
    meta: [
      { k: "ROLE", v: "Design + build, solo" },
      { k: "PERIOD", v: "2026 — in build" },
      { k: "PLATFORM", v: "Web" },
      { k: "STATUS", v: "Building" },
    ],
    realProblem: {
      heading: "The real problem",
      body: [
        "The team's day is scattered across a handful of manual steps and tabs. The root cause isn't any single slow tool — it's the switching between them, which is where the time and the mistakes actually leak.",
      ],
    },
    beforeAfter: {
      heading: "Before & after",
      body: [
        "Before: a checklist of manual steps spread across tools, each one a place to forget something.",
        "After (in progress): one dashboard the team actually wants to open, with the busywork collapsed into it.",
      ],
    },
    process: {
      heading: "Process",
      body: [
        "This one is still being built. The case study lands when it ships — with the real before/after numbers, not promises.",
      ],
    },
    business: {
      heading: "Why it matters",
      body: [
        "Every manual step removed is time the team gets back and an error class that stops happening. The target is honest minutes saved per day, measured after launch.",
      ],
    },
    showcaseLabel: "In progress",
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}
