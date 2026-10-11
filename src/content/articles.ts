import type { NoteSource } from "@/components/ui/SourceIcon";

/**
 * Article body is a list of blocks so prose and inline images interleave
 * naturally. Images with no `src` render as a striped placeholder (swap in a
 * real path under /public later). `width: "wide"` lets a figure break out
 * slightly past the reading column.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "ul"; items: string[] }
  | {
      type: "img";
      src?: string;
      alt: string;
      caption?: string;
      width?: "column" | "wide";
    };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  source: NoteSource;
  date: string;
  readingTime: string;
  /** External canonical (Substack/Medium); if set, the page can deep-link out. */
  canonical?: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "notes-on-long-horizon-agents",
    title: "Notes on Long-Horizon Agents",
    dek: "What actually breaks when an agent has to remember, plan, and recover across hundreds of steps — and the small architectural bets that keep it coherent.",
    source: "site",
    date: "Jun 2026",
    readingTime: "7 min read",
    body: [
      {
        type: "p",
        text: "Most agent demos live and die inside a single context window. The hard problems start one horizon later — when the task outlasts the model's working memory and the agent has to carry intent forward without a human holding its hand.",
      },
      {
        type: "p",
        text: "I've spent the last few months building Hermes, an agent that maintains a portfolio's experiment log and drafts release notes. It runs unattended for long stretches, so it has been a useful forcing function for thinking about memory, planning, and recovery as first-class concerns rather than afterthoughts.",
      },
      { type: "h2", text: "Memory is a retrieval problem, not a storage one" },
      {
        type: "p",
        text: "The naive move is to stuff everything into the prompt. It works until it doesn't — costs climb, latency creeps, and the model starts to lose the thread in the noise. The better framing is that memory is a retrieval problem: store cheaply, retrieve precisely, and only pay for the tokens that earn their place.",
      },
      {
        type: "img",
        alt: "Diagram of the agent's memory loop: ingest, summarize, index, retrieve.",
        caption: "The memory loop — ingest to a raw store, summarize, index, then retrieve only what the current step needs.",
        width: "wide",
      },
      {
        type: "p",
        text: "In practice that means a hot working set the agent reads first, a structured index it can scan, and a cold store it drills into only when the cheaper layers miss. The discipline is to stop at the first layer that resolves the query.",
      },
      { type: "h2", text: "Plans should be cheap to throw away" },
      {
        type: "p",
        text: "A long-horizon agent that commits hard to a plan is brittle. The world moves; a step fails; an assumption turns out wrong. The agents that hold up treat plans as disposable scaffolding — useful for the next few moves, rewritten freely when reality disagrees.",
      },
      {
        type: "quote",
        text: "The goal isn't a perfect plan. It's a system that notices when the plan is wrong fast enough to do something about it.",
      },
      { type: "h2", text: "What I'd tell my past self" },
      {
        type: "ul",
        items: [
          "Instrument the agent before you optimize it — you can't fix what you can't see.",
          "Summarize aggressively; a good summary is worth a thousand stale tokens.",
          "Make recovery a designed path, not an exception you hope never fires.",
        ],
      },
      {
        type: "p",
        text: "None of this is solved. But framing memory, planning, and recovery as the real surface area — rather than the model itself — has been the most useful shift in how I build.",
      },
    ],
  },
  {
    slug: "intercultural-communication",
    title: "Intercultural Communication",
    dek: "A short field guide to being understood across contexts you didn't grow up in.",
    source: "substack",
    date: "May 2026",
    readingTime: "4 min read",
    body: [
      {
        type: "p",
        text: "Clarity is not a fixed property of a sentence. It's a relationship between what you said and what the other person was primed to hear. Cross a cultural boundary and that priming shifts under your feet.",
      },
      {
        type: "p",
        text: "This is a placeholder body — swap in your real essay. The template handles headings, pull quotes, lists, and inline images so the reading experience stays calm and legible.",
      },
    ],
  },
  {
    slug: "designing-for-trust",
    title: "Designing for Trust",
    dek: "Trust is earned in the boring moments — the empty states, the error copy, the second time a thing just works.",
    source: "medium",
    date: "Apr 2026",
    readingTime: "5 min read",
    body: [
      {
        type: "p",
        text: "Users don't read your privacy policy. They watch how the product behaves when something goes wrong, and they decide — fast, mostly unconsciously — whether to keep trusting it.",
      },
      {
        type: "p",
        text: "This is a placeholder body — replace it with the real piece. The layout below adapts to whatever blocks you give it.",
      },
    ],
  },
  {
    slug: "building-rag-that-doesnt-lie",
    title: "Building RAG That Doesn't Lie",
    dek: "Retrieval is the easy half. The hard half is making the model admit when the answer isn't in the context.",
    source: "substack",
    date: "Mar 2026",
    readingTime: "6 min read",
    body: [
      {
        type: "p",
        text: "A retrieval-augmented system that confidently invents citations is worse than one that says 'I don't know.' Grounding is a product requirement, not a nice-to-have.",
      },
      {
        type: "p",
        text: "Placeholder body — your real article goes here.",
      },
    ],
  },
  {
    slug: "what-i-learned-shipping-solo",
    title: "What I Learned Shipping Solo",
    dek: "Eight projects, one person, and the unglamorous habits that made the difference.",
    source: "medium",
    date: "Feb 2026",
    readingTime: "5 min read",
    body: [
      {
        type: "p",
        text: "Shipping alone strips away the excuses. There's no one to hand the hard part to, which turns out to be the whole point.",
      },
      {
        type: "p",
        text: "Placeholder body — replace with the real reflection.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
