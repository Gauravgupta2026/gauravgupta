export type LabItem = {
  kind: string;
  title: string;
  description: string;
  state: string;
};

export const labsItems: readonly LabItem[] = [
  { kind: "FILM", title: "Kart build, night shift", description: "A late-night look inside the kart workshop.", state: "Archive" },
  { kind: "EXPERIMENT", title: "Two-hour plans", description: "Short plans for making a first version.", state: "Testing" },
  { kind: "INTERFACE", title: "Evidence-gated approvals", description: "Exploring decisions that wait for evidence.", state: "Prototype" },
  { kind: "SKETCH", title: "Photo-first forms", description: "Exploring forms that start with a photograph.", state: "Prototype" },
  { kind: "MOTION", title: "Loop study, 12 frames", description: "A small study in repeating motion.", state: "Shelved" },
  { kind: "FILM", title: "Workshop, Manipal", description: "Scenes from the workshop in Manipal.", state: "Archive" },
  { kind: "TOOL", title: "Kill-condition template", description: "A template for deciding when to stop an idea.", state: "In use" },
  { kind: "WRITING", title: "Notes on friction", description: "Where interactions get in the way.", state: "Ongoing" },
  { kind: "SKETCH", title: "Deck that teaches its rules", description: "Exploring how the first round can teach the game.", state: "Shelved" },
];

export const labsQuestions = [
  { question: "What belongs in Labs?", answer: "Experiments, sketches, motion studies, and tools that are still taking shape. Some are active. Others stay here as an archive." },
  { question: "How is this different from selected work?", answer: "Selected work explains a product and the decisions behind it. Labs is a place for smaller questions, unfinished directions, and things worth trying." },
  { question: "Can I try an experiment?", answer: "Email me the name of the experiment. I can tell you its current state and whether there is a version you can try." },
  { question: "Can we explore an idea together?", answer: "Yes. Tell me the question you want to explore and what you have tried so far. Send a note to hey@gauravguptas.com." },
] as const;
