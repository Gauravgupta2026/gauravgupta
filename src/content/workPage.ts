export type WorkImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type WorkProject = {
  slug: string;
  title: string;
  premise: string;
  contribution: string;
  factLabel: string;
  fact: string;
  href?: string;
  images: readonly WorkImage[];
};

const galleryImages = {
  g: { src: '/assets/work/placeholders/g.jpg', alt: 'a black geometric G on a pale background', width: 736, height: 736 },
  fgh: { src: '/assets/work/placeholders/fgh.jpg', alt: 'a green mobile website concept', width: 1200, height: 1599 },
  nk: { src: '/assets/work/placeholders/nk.jpg', alt: 'a dark mobile interface with illustrated notes', width: 1080, height: 630 },
  ss: { src: '/assets/work/placeholders/ss.jpg', alt: 'a light appointment interface', width: 736, height: 920 },
  dots: { src: '/assets/work/placeholders/dots.jpg', alt: 'four colourful illustrated characters', width: 564, height: 557 },
  tap: { src: '/assets/work/placeholders/tap.jpg', alt: 'a colourful TapTap icon on a phone', width: 640, height: 640 },
  fluzz: { src: '/assets/work/placeholders/fluzz.jpg', alt: 'a playful phone interface with colourful shapes', width: 1200, height: 2263 },
} as const satisfies Record<string, WorkImage>;

export const WORK_PROJECTS: readonly WorkProject[] = [
  {
    slug: 'wylde', title: 'Wylde',
    premise: 'A party card game that gets a room playing without a rulebook.',
    contribution: 'Design + build · Solo project', factLabel: 'Interaction', fact: 'The first round teaches the game',
    href: '/projects/wylde',
    images: [galleryImages.dots,galleryImages.nk,galleryImages.tap,galleryImages.fluzz,galleryImages.g],
  },
  {
    slug: 'sachetana', title: 'Sachetana',
    premise: 'A reflection app for students, with control over what they share.',
    contribution: 'Design + build · Team project', factLabel: 'Recognition', fact: 'MAHE Research Day · Team winner',
    href: '/projects/sachetana',
    images: [galleryImages.fgh,galleryImages.ss,galleryImages.g,galleryImages.nk],
  },
  {
    slug: 'lucky-day', title: 'Lucky Day',
    premise: 'A slot-machine game exploring motion, timing, and tactile feedback.',
    contribution: 'Design + build · Personal project', factLabel: 'Craft', fact: 'Spring motion + tactile feedback',
    href: '/projects/lucky-day',
    images: [galleryImages.fluzz,galleryImages.tap,galleryImages.dots,galleryImages.nk],
  },
  {
    slug: 'research-internship', title: 'Research internship',
    premise: 'A research workspace that keeps source context close to the results.',
    contribution: 'Product design · Research + prototyping', factLabel: 'Scope', fact: 'Search, filters + source context',
    images: [galleryImages.ss,galleryImages.nk,galleryImages.fgh],
  },
];

export const WORK_QUESTIONS = [
  {
    id: 'role', question: 'What kind of role are you looking for?',
    answer: 'I’m looking for a design engineering role. I want to help a team define a product and build it. I’m interested in problems that are still taking shape.',
  },
  {
    id: 'contribution', question: 'What did you personally do on these projects?',
    answer: 'I designed and built Wylde and Lucky Day. Sachetana was a team project at MIT, based on a problem from KMC. I worked on its design and build with the team. My research internship focused on product design and prototypes.',
  },
  {
    id: 'more', question: 'Can I see more than the images shown here?',
    answer: 'Yes. Open a project’s case study to read about the problem and the design decisions. Email me if you want to discuss a project in more detail.',
  },
  {
    id: 'contact', question: 'What should I include when I contact you?',
    answer: 'Tell me about your team, the problem, and the role you have in mind. Send your note to hey@gauravguptas.com.',
  },
] as const;
