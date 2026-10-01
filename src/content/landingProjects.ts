export type ProjectGalleryImage = {
  src: string;
  alt: string;
  shape: "portrait" | "landscape" | "square" | "wide";
  fit?: "cover" | "contain";
};

export type LandingGalleryProject = {
  title: string;
  href: string;
  tags: readonly string[];
  description: string;
  images: readonly ProjectGalleryImage[];
};

export const FEATURED_PROJECT = {
  title: "Wylde",
  href: "/projects/wylde",
  eyebrow: "Featured project",
  headline: {
    before: "Make the room",
    emphasis: "play together.",
    after: "Built for the moments between plans.",
  },
  description:
    "Wylde is a social card game for the ten minutes after everyone sits down and nobody talks. One phone, one round and no instructions to read aloud.",
  proof: [
    {
      title: "Designed and built end to end.",
      body: "Product thinking, interface and implementation shaped as one system.",
    },
    {
      title: "The first round teaches the game.",
      body: "The interaction explains itself through play instead of a rules screen.",
    },
    {
      title: "Scoring stayed out.",
      body: "The room remains the focus; the phone only starts the conversation.",
    },
  ],
  media: {
    hero: "/assets/projects/lucky-day.jpg",
    heroAlt: "Two phones showing the colourful Wylde social card game",
  },
} as const;

export const LANDING_GALLERY_PROJECTS: readonly LandingGalleryProject[] = [
  {
    title: "Sachetana",
    href: "/projects/sachetana",
    tags: ["Wellbeing", "iOS"],
    description:
      "A private reflection space for students, bringing mood check-ins, journaling and careful AI boundaries into one calm experience.",
    images: [
      {
        src: "/assets/projects/sachetana.jpg",
        alt: "Two phones showing Sachetana's private reflection and mood check-in experience",
        shape: "landscape",
      },
      {
        src: "/assets/project-gallery/sachetana-morning.jpg",
        alt: "A soft blue morning mood check-in interface",
        shape: "portrait",
      },
      {
        src: "/assets/project-gallery/sachetana-envelope.jpg",
        alt: "An illustrated envelope with a flower seal on a green botanical background",
        shape: "portrait",
      },
      {
        src: "/assets/project-gallery/lotus-art.jpg",
        alt: "A white lotus held inside a painted gold circle",
        shape: "square",
      },
      {
        src: "/assets/project-gallery/newflower.jpg",
        alt: "A flower study supplied for Sachetana's visual world",
        shape: "landscape",
      },
    ],
  },
  {
    title: "Lucky Day",
    href: "/projects/lucky-day",
    tags: ["Interaction", "iOS"],
    description:
      "A tactile experiment in chance, timing and feedback, where every pull had to register through motion before it registered as a result.",
    images: [
      {
        src: "/assets/work/lucky-day-hero.jpg",
        alt: "Two phones displaying Lucky Day's dark celestial interface",
        shape: "wide",
      },
      {
        src: "/assets/project-gallery/glass-logo.jpg",
        alt: "A sculpted glass app icon on an electric blue background",
        shape: "square",
      },
      {
        src: "/assets/work/lucky-day-detail.jpg",
        alt: "Overlapping phone studies from the Lucky Day interaction system",
        shape: "landscape",
      },
      {
        src: "/assets/projects/wylde.jpg",
        alt: "A colourful interface and environment study",
        shape: "landscape",
      },
    ],
  },
  {
    title: "Research internship",
    href: "/work",
    tags: ["Product design", "Research"],
    description:
      "A research workspace that brought search, filtering and source context together so dense information became easier to scan and understand.",
    images: [
      {
        src: "/assets/work/internship-research.jpg",
        alt: "A research and search workspace displayed on a laptop",
        shape: "wide",
      },
      {
        src: "/assets/project-gallery/product-safety.jpg",
        alt: "A mobile account and safety dashboard held in two hands",
        shape: "portrait",
      },
      {
        src: "/assets/work/internship-detail.jpg",
        alt: "A detailed research workspace showing filters, sources and a selected result",
        shape: "landscape",
      },
      {
        src: "/assets/project-gallery/phone-pocket.jpg",
        alt: "A product interface shown on a phone tucked into a red pocket",
        shape: "wide",
      },
    ],
  },
] as const;
