export const EMAIL = "mailto:hey@gauravguptas.com";
/** Drop the PDF at public/Gaurav-Gupta-Resume.pdf. The sidebar and mobile menu link here. */
export const RESUME_FILENAME = "Gaurav-Gupta-Resume.pdf";
export const RESUME_HREF = `/${RESUME_FILENAME}`;
export const SOCIALS = [
  { label: "github", href: "https://github.com/Gauravgupta2026" },
  { label: "linkedin", href: "https://in.linkedin.com/in/gaurav-gupta-218a08202" },
] as const;

export const paperProjects = [
  { slug: "sachetana", title: "Sachetana", category: "student-wellness", purpose: "A little room to check in with yourself.", role: "Design & build · Team project", state: "Write-up in progress", image: "/assets/work/sachetana-wellness.jpg", detail: "/assets/work/sachetana-detail.jpg", alt: "Sachetana visual direction", paragraphs: ["Sachetana began with a problem brought from KMC to MIT: how could students have a quieter space to reflect?", "Our team explored a reflection app where the student reviews the response and decides what to save or share. I worked across design and development, moving between the interface and the implementation.", "We kept presenting the work at research competitions and won at MAHE Research Day. The full case study is still being put together; I want it to explain the constraints and unfinished parts as clearly as the design."] },
  { slug: "wylde", title: "Wylde", category: "party-game", purpose: "Pass the phone. Keep the room playing.", role: "Design & build · Solo project", state: "In build", image: "/assets/work/wylde-space.jpg", detail: "/assets/work/wylde-detail.jpg", alt: "Wylde visual direction", paragraphs: ["A party game has to earn its place in the room. Wylde explores how a first round can teach the rules without asking everyone to stop and read.", "I’m designing and building the iOS experience. The direction keeps scoring out of the way and puts the attention back on the people passing the phone.", "It is still in build. This page is a short introduction to the direction; the fuller write-up will follow the work."] },
  { slug: "lucky-day", title: "Lucky Day", category: "motion-and-haptics", purpose: "A small study in the feeling of an interaction.", role: "Design & build · Personal study", state: "Write-up in progress", image: "/assets/work/lucky-day-hero.jpg", detail: "/assets/work/lucky-day-detail.jpg", alt: "Lucky Day visual direction", paragraphs: ["A simple slot-machine interaction gave me room to study timing: how a reel slows, when the result arrives, and what a vibration adds to the moment.", "Spring motion and tactile feedback are the substance of this iOS study. I’m interested in how small decisions can make a screen feel like something you can touch.", "The write-up is in progress. I’m keeping this introduction focused on the question the experiment explores."] },
] as const;

export const stamps = [
  { title: "Hey, nice to see you here!", text: "I’m Gaurav. I design and build digital products in Bengaluru.", illustration: "house", color: "#f6f4e9" },
  { title: "Between an idea and a working thing.", text: "I like being close to both: working out an interaction, building it, and finding where it needs more care.", illustration: "phone", color: "#ecd1d9" },
  { title: "Learning by making.", text: "In Manipal, a go-kart team taught me about design, budgets, sponsors and making decisions together. Our kart finished fourth at Buddh International Circuit.", illustration: "kart", color: "#efedb5" },
  { title: "Different people. Different kinds of care.", text: "A party game keeps the room playing. A reflection app leaves sharing to the student. The person using the product gives the work its direction.", illustration: "flower", color: "#e99b75" },
  { title: "A lot still to make.", text: "One day, I want to build a design-led firm and back other builders. For now, I’m looking for a team where I can help shape a product and build it.", illustration: "cup", color: "#bfd6e6" },
] as const;

export const photoCollection = [
  { src: "/photos/beach-manipal.png", alt: "An evening on the beach in Manipal" },
  { src: "/assets/about.jpeg", alt: "Gaurav in a snow-covered mountain landscape" },
  { src: "/photos/mountains.png", alt: "A mountain landscape" },
] as const;

export const playgroundItems = [
  ...paperProjects.map(p => ({ src: p.image, alt: p.alt, title: p.title, caption: p.purpose, href: "/projects/" + p.slug, kind: "visual study" })),
  { src: "/assets/work/sachetana-detail.jpg", alt: "Sachetana visual study", title: "Room to reflect", caption: "A visual study for Sachetana.", href: "/projects/sachetana", kind: "product detail" },
  { src: "/assets/work/wylde-detail.jpg", alt: "Wylde visual study", title: "The first round", caption: "A visual study for Wylde.", href: "/projects/wylde", kind: "interaction study" },
  { src: "/assets/work/lucky-day-detail.jpg", alt: "Lucky Day visual study", title: "A little luck", caption: "A visual study for Lucky Day.", href: "/projects/lucky-day", kind: "motion study" },
  { src: "/photos/beach-manipal.png", alt: "Friends at the beach in Manipal", title: "After hours, Manipal", caption: "A moment away from the work.", kind: "photograph" },
  { src: "/assets/about.jpeg", alt: "Gaurav looking across a mountain landscape", title: "A different pace", caption: "A little space to look around.", kind: "photograph" },
  { src: "/photos/mountains.png", alt: "A mountain landscape", title: "Further out", caption: "Some things are worth stopping for.", kind: "photograph" },
] as const;

export const aboutParagraphs = [
  "I design and build digital products, with care for how they work and feel.",
  "I work across product design, interfaces, and code. My portfolio includes projects, prototypes, and experiments, along with the questions I’m still working through.",
  "Away from the screen, I make room for music, reading, poetry, sketching, and the outdoors. I want the work to stay ambitious without losing that side of me.",
] as const;

export const aboutPhoto = {
  src: "/assets/about.jpeg",
  alt: "Gaurav standing in a snow-covered mountain valley, looking out at the clouds",
  caption: "Gaurav Gupta · Away from the screen",
} as const;

export const aboutContext = [
  { name: "KPMG", detail: "Risk", period: "2026" },
  { name: "Volvo Group", detail: "Campus Ambassador", period: "2023 — 2025" },
  { name: "Product & design", detail: "Focus", period: "Current" },
  { name: "Bengaluru, IN", detail: "Location", period: "Current" },
] as const;
