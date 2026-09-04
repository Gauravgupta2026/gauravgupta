import { imageFor } from "@/content/images";

/** Horizontal gallery — stock photos standing in until real ones are shot;
 *  `caption` stays as the tap-open label either way. */
export type GalleryPhoto = {
  id: string;
  caption: string;
  image: string;
};

const CAPTIONS = [
  "Manipal, night shift",
  "Go-kart build",
  "Workshop table",
  "Between builds",
  "Sketchbook, 2am",
  "Team, race day",
  "Somewhere outdoors",
];

export const aboutGallery: GalleryPhoto[] = CAPTIONS.map((caption, i) => ({
  id: String(i + 1).padStart(2, "0"),
  caption,
  image: imageFor(`about-${caption}`, 460, 640),
}));
