export type AboutGalleryPhoto = {
  src: string;
  alt: string;
};

export type AboutGalleryScreen = {
  story: string;
  photos: AboutGalleryPhoto[];
};

export const aboutGalleryScreens: AboutGalleryScreen[] = [
  {
    story:
      "The parts of life I want to remember are rarely the loud ones. They are the pets finding the softest seat, a song worked out slowly at the piano, ink settling into paper, a trail with nowhere urgent to be, and a book held open long after the tea has gone cold.",
    photos: [
    { src: "/photos/about/01-pets-home.jpg", alt: "A dog resting at home beside its person" },
    { src: "/photos/about/02-piano.jpg", alt: "Hands playing piano in a quiet room" },
    { src: "/photos/about/03-sketching.jpg", alt: "A hand drawing in an open sketchbook" },
    { src: "/photos/about/04-outdoors.jpg", alt: "A person walking a tree-lined trail" },
    { src: "/photos/about/05-reading.jpg", alt: "Hands holding an open book beside a window" },
    { src: "/photos/about/06-tools.jpg", alt: "Drawing and making tools on a worktable" },
    ],
  },
  {
    story:
      "I keep returning to small rituals. Putting a record on. Taking a notebook outside. Walking until the noise settles. Reading beneath a warm lamp. Making space for play. None of it is especially grand, but together these moments keep the vibrant side of me close.",
    photos: [
    { src: "/photos/about/07-cat-window.jpg", alt: "A cat watching the street from a windowsill" },
    { src: "/photos/about/08-vinyl.jpg", alt: "A record turning on a well-used record player" },
    { src: "/photos/about/09-notebook-outdoors.jpg", alt: "A sketchbook open on a bench outdoors" },
    { src: "/photos/about/10-trail.jpg", alt: "Boots paused on a rocky walking trail" },
    { src: "/photos/about/11-dog-play.jpg", alt: "A dog playing with a ball in a garden" },
    { src: "/photos/about/12-reading-lamp.jpg", alt: "A book left open under a reading lamp" },
    ],
  },
  {
    story:
      "I am trying to leave room for the person I am becoming. Someone who sketches more, works with his hands, stays curious, reads widely, and keeps going outdoors. The plan is unfinished by design. There are tools I still want to make, things I want to learn, and more pages to fill.",
    photos: [
    { src: "/photos/about/13-ink-study.jpg", alt: "Ink tests and loose lines in a sketchbook" },
    { src: "/photos/about/14-trees.jpg", alt: "A quiet path beneath tall trees" },
    { src: "/photos/about/15-workbench.jpg", alt: "Small hand tools arranged across a workbench" },
    { src: "/photos/about/16-piano-keys.jpg", alt: "A close view of piano keys and a musician's hands" },
    { src: "/photos/about/17-open-book.jpg", alt: "An open book held in a sunlit reading chair" },
    { src: "/photos/about/18-pets-rest.jpg", alt: "A pet curled up on a blanket at home" },
    ],
  },
];
