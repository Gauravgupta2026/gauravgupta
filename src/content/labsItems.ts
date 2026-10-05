/** Copy verbatim from Labs.dc.html's `ITEMS` data. Real imagery TBD — swapped
 *  in for MediaPlaceholder in the meantime. */
export type LabItem = {
  col: 0 | 1 | 2;
  /** Tile height in px — varies per item to build the masonry rhythm. */
  h: number;
  kind: string;
  title: string;
  state: string;
};

export const labsItems: LabItem[] = [
  { col: 0, h: 447, kind: "FILM", title: "Kart build, night shift", state: "Archive" },
  { col: 0, h: 279, kind: "SKETCH", title: "Photo-first forms", state: "Prototype" },
  { col: 0, h: 363, kind: "TOOL", title: "Kill-condition template", state: "In use" },
  { col: 1, h: 279, kind: "EXPERIMENT", title: "Two-hour plans", state: "Testing" },
  { col: 1, h: 447, kind: "MOTION", title: "Loop study, 12 frames", state: "Shelved" },
  { col: 1, h: 363, kind: "WRITING", title: "Notes on friction", state: "Ongoing" },
  { col: 2, h: 363, kind: "INTERFACE", title: "Evidence-gated approvals", state: "Prototype" },
  { col: 2, h: 279, kind: "FILM", title: "Workshop, Manipal", state: "Archive" },
  { col: 2, h: 447, kind: "SKETCH", title: "Deck that teaches its rules", state: "Shelved" },
];
