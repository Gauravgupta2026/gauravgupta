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

/** Copy verbatim from Landing.dc.html's PROJECTS data. */
export const selectedWork: SelectedWorkProject[] = [
  {
    slug: "sachetana",
    num: "01",
    title: "Sachetana",
    cards: [
      {
        label: "PREMISE",
        title: "A civic-reporting flow for one Manipal ward.",
        body: "Built so a first-time user finishes a report in under 90 seconds, on a bad connection.",
      },
      {
        label: "BEHIND THE SCENES",
        placeholder: "// screenshot of Sachetana in use",
      },
      {
        label: "A DECISION, AND WHY",
        title: "Photo first, form second.",
        body: "The camera opens on launch. Time, place and category are read off the photo, so the form starts three quarters filled.",
      },
      {
        label: "WHAT WE DIDN'T SHIP",
        title: "A map-pin picker.",
        body: "Testing showed people report where they are standing, not where they are pointing. The pin only added a step to get wrong.",
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
        title: "An app for fun times.",
        body: "One tap from “someone should do something” to a plan with a time on it. No group chat required.",
      },
      {
        label: "BEHIND THE SCENES",
        placeholder: "// drop a build screenshot or\n// a shot of the wall of stickies here",
      },
      {
        label: "A DECISION, AND WHY",
        title: "Plans expire.",
        body: "Anything not confirmed within two hours disappears. The feed is never a graveyard, so opening it always costs nothing.",
      },
      {
        label: "WHAT WE DIDN'T SHIP",
        title: "Groups you create up front.",
        body: "It moved all the work back onto the organiser — which is exactly the friction we started out to remove.",
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
        title:
          "A card game for the ten minutes after everyone sits down and nobody talks.",
        body: "One deck, one loop, no rules to read out loud.",
        metric: "146+ beta users",
      },
      {
        label: "BEHIND THE SCENES",
        placeholder: "// drop a photo of the printed\n// paper prototype deck here",
      },
      {
        label: "A DECISION, AND WHY",
        title: "No rulebook.",
        body: "The first three cards teach the loop by making you play it, so the game explains itself and nobody has to be the referee.",
      },
      {
        label: "WHAT WE DIDN'T SHIP",
        title: "Scoring.",
        body: "Points turned a warm-up into a competition. People started playing to win and stopped talking to each other.",
      },
    ],
  },
];
