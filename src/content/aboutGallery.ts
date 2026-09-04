/** Horizontal gallery placeholders — tinted so grayscale↔color is visible
 *  before real photos are swapped in. Swap `gradient` out once real images
 *  land; `caption` stays as the tap-open label either way. */
export type GalleryPhoto = {
  id: string;
  caption: string;
  gradient: string;
};

export const aboutGallery: GalleryPhoto[] = [
  { id: "01", caption: "Manipal, night shift", gradient: "linear-gradient(135deg,#8a8a8a 0%,#2a2a2a 100%)" },
  { id: "02", caption: "Go-kart build", gradient: "linear-gradient(135deg,#d10000 0%,#3a0a0a 100%)" },
  { id: "03", caption: "Workshop table", gradient: "linear-gradient(135deg,#bdbbff 0%,#3a3a6b 100%)" },
  { id: "04", caption: "Between builds", gradient: "linear-gradient(135deg,#5a5a5a 0%,#151515 100%)" },
  { id: "05", caption: "Sketchbook, 2am", gradient: "linear-gradient(135deg,#d6d5ff 0%,#2a2a4a 100%)" },
  { id: "06", caption: "Team, race day", gradient: "linear-gradient(135deg,#a83232 0%,#1a1a1a 100%)" },
  { id: "07", caption: "Somewhere outdoors", gradient: "linear-gradient(135deg,#7c7c7c 0%,#0d0d0d 100%)" },
];
