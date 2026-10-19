/** Everything on the Sachetana page. Everything is from my own notes unless a source says otherwise. */

export const WEB = "/assets/sachetana/web";
export const ART = "/assets/sachetana/paintings";
export const MOCKUPS = "/assets/sachetana/mockups";

/** The four lines a hiring manager reads first. */
export const SUMMARY = [
  { k: "The problem", v: "MAHE, a university in Manipal, has about 50,000 students. Its campus already ran counselling and psychiatric services, but students did not use them." },
  { k: "What I built", v: "A mobile app. A student answers a short questionnaire. If the score is above a set benchmark, psychology interns review the answers. The app also has an SOS button and a link to book at the campus hospital." },
  { k: "What happened", v: "A doctor posed the problem at a hackathon, and we won. The college then asked for a campus-wide version and we built for about three months. About 80 to 100 students used it (my estimate). The college did not fund it, and the project is closed." },
  { k: "What I learned", v: "An app alone cannot carry this problem. The work moves to people: training, administration and running costs." },
];

export const ABOUT_FACTS = [
  { k: "My role", v: "UI, UX and features, in a team of 3" },
  { k: "Period", v: "2024 – 2025" },
  { k: "Product", v: "A mobile app and a web dashboard" },
  { k: "Built with", v: "Flutter, Supabase, Firebase, Next.js, Figma" },
];

export type MetricId = "reach" | "won" | "testers" | "iterations" | "samples" | "events";

/** Each number gets an illustration and a caption. `source` says how sure I am. */
export const METRICS: { id: MetricId; value: string; caption: string; source: string }[] = [
  { id: "reach", value: "80–100", caption: "students used the app file we shared, out of about 50,000 at MAHE. Each dot is 1,000 students.", source: "My estimate. No per-user analytics kept." },
  { id: "won", value: "1 of ~20", caption: "The hackathon had about 20 teams and gave us one month to build. We won.", source: "My records" },
  { id: "testers", value: "150+", caption: "people took part in testing: students, friends, judges and testers. Each figure stands for five people.", source: "My recollection" },
  { id: "iterations", value: "3–4", caption: "redesigns of the app, after testing prototypes with five or six friends.", source: "My recollection" },
  { id: "samples", value: "20+", caption: "flagged responses were reviewed by psychology interns during testing.", source: "My recollection" },
  { id: "events", value: "3", caption: "places we showed it: the hackathon, MAHE Research Day and the Manipal Entrepreneurship Summit.", source: "My recollection" },
];

export const FLOW_CAPTION = "How one questionnaire travels. Below the benchmark, nothing is shown and the student carries on. Above it, interns review the response on a dashboard. Critical cases go to a senior, and the student is told to book help at the hospital. SOS is a separate path.";

/** Prototype and final screen pairs, for the full-width band under the timeline. The band shows only when this has entries. */
export type Evolution = { id: string; label: string; before: { src: string; alt: string; width: number; height: number }; after: { src: string; alt: string; width: number; height: number } };
export const EVOLUTIONS: Evolution[] = [];

export const TIMELINE_CAPTION = "These are durations from memory. I kept no dated log, so the page shows how long each stage lasted, not when it happened.";

export type Story = {
  id: string;
  label: string;
  indexLabel: string;
  title: string;
  lead: string;
  paras: string[];
  /** One line about what the decision cost or could not do. */
  cost?: string;
  pull: string;
};

export const REASONS = [
  { id: "discovery", title: "Discovery", text: "Students did not know which services existed, where, or at what hours." },
  { id: "acceptance", title: "Acceptance", text: "Stigma and fear kept them away." },
  { id: "reach", title: "Reach", text: "Walking into a psychiatry ward is a big first step. There was no smaller one." },
] as const;

export const BET = {
  paras: [
    "A doctor at Kasturba Medical College (KMC), Manipal, posed this problem at a hackathon. About 20 teams competed and we had one month. Until then we only had prototypes. We won, and the college asked us to build it for the whole campus.",
  ],
  pull: "I thought an app would be enough of a bridge. I was wrong. This page is how I found out.",
};

/** The name and the logo. The meaning is from Sanskrit and Hindi dictionaries. The logo reading is mine. */
export const NAME = {
  label: "The name",
  title: "A name for a mind that is aware of itself.",
  lead: "Sachetana (सचेतन) is a Sanskrit and Hindi word for “conscious”.",
  paras: [
    "The name has two parts. Sa means “with”. Chetana means “consciousness”. Together they mean “with consciousness”: aware, awake, alert to what is going on inside you. A related Hindi word, sachet, means “aware”.",
    "The logo draws the same idea. The line starts as a tangle of loops that cross over each other. That is the complex thoughts of the brain. It then works its way out and ends as one smooth curve: the same thoughts, simplified and settled.",
  ],
  pull: "The logo starts in a tangle and ends in a curve.",
  source: "Meaning checked against Sanskrit and Hindi dictionary entries.",
  sourceHref: "https://www.wisdomlib.org/definition/sacetana",
};

export const STORIES: Story[] = [
  {
    id: "sos",
    label: "Decision 01",
    indexLabel: "SOS first",
    title: "Help comes before everything else.",
    lead: "SOS had to work for someone who is panicking.",
    paras: [
      "Pressing SOS calls the student’s emergency contact. The next call goes to the ambulance contact. Below the button are five campus contacts, from the Student Council to Hospital Reception.",
      "A student does not need a feature for the day everything is fine. They need one for the day it is not, and they need to reach it fast.",
    ],
    cost: "Booking inside the app was not possible. The appointment link opens the hospital’s own website, where the student books.",
    pull: "Help had to be the fastest thing in the app.",
  },
  {
    id: "flagging",
    label: "Decision 02",
    indexLabel: "Flagging",
    title: "Show nothing when the score is fine.",
    lead: "A result appears only when something is wrong, and then in a toned-down form.",
    paras: [
      "Each questionnaire starts with a plain explanation. This one is the anxiety check, built on GAD-7, a seven-question screening tool that doctors use. The app scores the answers. If the score is above a set benchmark, the response is flagged for review. If it is below, the student goes back to normal browsing.",
      "Counsellors asked us to flag only students above the benchmark, not those below. That meant fewer unnecessary records and less worry for students.",
    ],
    cost: "A student with a healthy score gets no confirmation of it.",
    pull: "There is no screen for a healthy score. That is the decision.",
  },
  {
    id: "privacy",
    label: "Decision 03",
    indexLabel: "Privacy key",
    title: "A name stays behind a key.",
    lead: "A student’s profile sat behind an alphanumeric key, a code of letters and numbers.",
    paras: [
      "Sign-up asks for a name, phone, email and password, and one question: are you a student? Behind the screen, the profile sat behind the key. Flagged responses went to a small group of psychology interns, who reported to their seniors. Only the three developers could reach the data.",
      "The key was the technical choice with the most effect on privacy. Collecting usage data about mental health is a legal grey area, so I collected less than I wanted to.",
    ],
    cost: "There was no separate consent step, and deleting a profile left the responses behind.",
    pull: "Only the three developers could reach the data.",
  },
  {
    id: "scope",
    label: "Decision 04",
    indexLabel: "Scope",
    title: "Four apps in one, cut to two.",
    lead: "The app had grown into a superapp trying to do everything.",
    paras: [
      "I listened to too much feedback and kept adding features until the app felt like a superapp trying to do everything. I cut the scope from four apps in one to two. Cutting it back was the fix.",
      "What stayed: a home screen that asks how you feel, a breathing exercise that takes sixty seconds, and a journal below it.",
    ],
    cost: "I later judged the journal not useful. Everything needed a network connection: if a service failed, the assessment was not recorded and the student returned to the home screen.",
    pull: "I listened to too much feedback.",
  },
];

export const SMALLER_CALLS = [
  { id: "sliders", title: "Sliders, not stars.", text: "Answers started as star ratings. After testing, I moved them to sliders and built a weighted scoring graph in a hexagonal matrix. Testing with friends also changed my aim: I stopped trying to make the app look creative and started solving the user’s problem. It cost more design and build time." },
  { id: "chatbot", title: "A chatbot that only explains.", text: "The app had a chatbot that explained terms, such as what anxiety is. If a student asked it for a solution, the reply was blocked and a warning showed. The cost: the app looked less impressive in demos." },
  { id: "profile", title: "No AI profile of each student.", text: "I considered an AI summary of each questionnaire, and an AI profile of each student built from their history. I did not ship the profile. The summary sat in a grey area between explaining a score and advising on it." },
];

export const TURN = [
  { title: "The backing", text: "The college said it would back the project, then did not fund it after several proposals. We stopped after about three months with no support." },
  { title: "The doubt", text: "A venture capitalist told us that an app cannot cure anxiety or depression, and that we should also build a physical peer-support club. That broke my confidence. He was right." },
  { title: "The end", text: "After we graduated, the college restarted the conversation. No business followed, and I stashed it again. I last touched it in December 2025." },
];
export const TURN_PULL = "The more I removed from the app, the more moved to the backend and to people. A team of developers cannot carry that alone.";

export const FIXES = [
  "No separate consent step. Everything was captured at once.",
  "A student could delete their profile, but their responses stayed in the database.",
  "All data sat on cloud services. I no longer remember the free plan’s retention rules.",
  "No privacy, security or clinical review took place. Safety feedback came from a panel of judges. That is feedback, not approval.",
  "Accessibility and language needs were not tested. The app was English only.",
  "I am not a lawyer. Nobody with legal training has checked this against India’s DPDP Act.",
];

/** Every fact, with where it comes from. */
export const RESULTS = [
  { fact: "About 20 teams entered the hackathon. We won.", source: "My records" },
  { fact: "I tested with five or six friends and redrew the flow three or four times.", source: "My recollection" },
  { fact: "More than 150 people took part in testing: students, friends, judges and testers.", source: "My recollection" },
  { fact: "More than 20 flagged samples were reviewed by psychology interns.", source: "My recollection" },
  { fact: "Shown at the hackathon, MAHE Research Day and the Manipal Entrepreneurship Summit.", source: "My recollection" },
  { fact: "About 80 to 100 students used the app file we shared.", source: "My estimate. No per-user analytics kept." },
  { fact: "A business proposal quoted about 50 lakh rupees to the university.", source: "Written by my co-founder" },
];

export const ROLES = [
  { who: "Gaurav Gupta", what: "UI and UX, feature work, system health checks, code review" },
  { who: "A teammate", what: "Breathing exercises, parts of the UI, authentication" },
  { who: "A teammate", what: "Assessments and the journal backend" },
  { who: "Psychology students", what: "Advice on how to measure anxiety, depression and substance use" },
  { who: "A medical advisor at KMC Manipal", what: "Raised the problem statement at the hackathon" },
];

export const PAINTINGS = [
  "Claude Monet, Water Lilies, 1906",
  "Claude Monet, Charing Cross Bridge, London, 1901",
  "James McNeill Whistler, Nocturne: Blue and Gold — Southampton Water, 1872",
];

/** The index. Only the current group shows its items. */
export const INDEX_GROUPS = [
  { id: "glance", label: "At a glance", items: [
    { id: "summary", label: "Summary" }, { id: "numbers", label: "The numbers" },
    { id: "timeline", label: "Prototype to app" }, { id: "screens", label: "The screens" },
  ] },
  { id: "story", label: "The story", items: [
    { id: "bet", label: "The bet" }, { id: "name", label: "The name" }, { id: "sos", label: "SOS first" }, { id: "flagging", label: "Flagging" },
    { id: "privacy", label: "Privacy key" }, { id: "scope", label: "Scope" }, { id: "smaller", label: "Smaller calls" }, { id: "turn", label: "The turn" },
  ] },
  { id: "after", label: "Gaps and facts", items: [{ id: "fixes", label: "What I’d fix" }, { id: "facts", label: "All the facts" }] },
  { id: "credits-group", label: "Credits", items: [{ id: "credits", label: "Credits" }] },
] as const;
