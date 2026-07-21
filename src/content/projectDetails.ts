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
