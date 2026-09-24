/** A single preview card in a project's sliding track. */
export type PreviewCard = {
  label: string;
  title?: string;
  body?: string;
  placeholder?: string;
  metric?: string;
};

export type SelectedWorkProject = {
  slug: string;
  num: string;
  title: string;
  cards: PreviewCard[];
};

/** Copy from the approved Work-section implementation. */
export const selectedWork: SelectedWorkProject[] = [
  {
    slug: "sachetana",
    num: "01",
    title: "Sachetana",
    cards: [
      {
        label: "PREMISE",
        title: "A quiet, private space for students to check in.",
        body: "Voice or text reflections stay on the device unless the student explicitly chooses to share them.",
      },
      {
        label: "BEHIND THE SCENES",
        placeholder: "// check-in and journal flow",
      },
      {
        label: "A DECISION, AND WHY",
        title: "The student stays in control.",
        body: "The model can reflect, but the student reviews and approves everything before it is saved or shared.",
      },
      {
        label: "WHAT WE DIDN'T SHIP",
        title: "Cloud-first storage.",
        body: "Trust was the core constraint, so sensitive reflections remain local instead of becoming another server-side profile.",
      },
    ],
  },
  {
    slug: "wylde",
    num: "02",
    title: "Wylde",
    cards: [
      {
        label: "PREMISE",
        title: "A party game that starts before the rules are explained.",
        body: "Pass the phone and play—the first round teaches the loop through motion, sound, and pacing.",
      },
      {
        label: "BEHIND THE SCENES",
        placeholder: "// playtest build and card studies",
      },
      {
        label: "A DECISION, AND WHY",
        title: "The first round is the tutorial.",
        body: "If a card needs a caption to make sense, the interaction is wrong. The game teaches itself by being played.",
      },
      {
        label: "WHAT WE DIDN'T SHIP",
        title: "Scoring.",
        body: "Points turned a warm-up into a competition. People stopped talking to each other and started tracking the score.",
      },
    ],
  },
  {
    slug: "lucky-day",
    num: "03",
    title: "Lucky Day",
    cards: [
      {
        label: "PREMISE",
        title: "A study in motion, chance, and tactile feedback.",
        body: "Every pull had to feel weighty, with spring timing and haptics making the result register in the thumb.",
        metric: "iOS · shipped experiment",
      },
      {
        label: "BEHIND THE SCENES",
        placeholder: "// reel, spring and haptic studies",
      },
      {
        label: "A DECISION, AND WHY",
        title: "Tune by feel, not by number.",
        body: "The reels, near-miss, and payout were adjusted together until the motion felt physical rather than decorative.",
      },
      {
        label: "WHAT WE DIDN'T SHIP",
        title: "A weightless result.",
        body: "A number changing on screen felt like a loading spinner, so the final build makes chance readable through motion first.",
      },
    ],
  },
];
