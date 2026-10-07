/** Existing experiment labels. Preview media has not yet been supplied. */
export type LabItem = {
  kind: string;
  title: string;
  state: string;
};

export const labsItems: LabItem[] = [
  { kind: "FILM", title: "Kart build, night shift", state: "Archive" },
  { kind: "SKETCH", title: "Photo-first forms", state: "Prototype" },
  { kind: "TOOL", title: "Kill-condition template", state: "In use" },
  { kind: "EXPERIMENT", title: "Two-hour plans", state: "Testing" },
  { kind: "MOTION", title: "Loop study, 12 frames", state: "Shelved" },
  { kind: "WRITING", title: "Notes on friction", state: "Ongoing" },
  { kind: "INTERFACE", title: "Evidence-gated approvals", state: "Prototype" },
  { kind: "FILM", title: "Workshop, Manipal", state: "Archive" },
  { kind: "SKETCH", title: "Deck that teaches its rules", state: "Shelved" },
];
