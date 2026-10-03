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
      "The moments I care about in a product often happen between the obvious ones. How someone learns what to do next. Whether a response arrives when they expect it. Whether they feel in control. These are the details I want to notice, and make room for in the work.",
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
      "The person using the product gives the work its direction. In a party game, that means keeping the room playing. In a reflection app, it means leaving the decision to share with the student. The same attention can lead to very different designs.",
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
      "I want to build a design-led firm one day, and help other builders get their ideas into people’s hands. That starts with the work in front of me: asking better questions, making decisions with a team, and carrying a design far enough to find out whether it works.",
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
