export const EMAIL = "mailto:hey@gauravguptas.com";
/** Drop the PDF at public/Gaurav-Gupta-Resume.pdf. The sidebar and mobile menu link here. */
export const RESUME_FILENAME = "Gaurav-Gupta-Resume.pdf";
export const RESUME_HREF = `/${RESUME_FILENAME}`;
export const SOCIALS = [
  { label: "github", href: "https://github.com/Gauravgupta2026" },
  { label: "linkedin", href: "https://in.linkedin.com/in/gaurav-gupta-218a08202" },
] as const;

export const paperProjects = [
  { slug: "sachetana", title: "Sachetana", category: "student-wellness", purpose: "A quiet first step toward campus counselling.", role: "Design & build · Team of 3", state: "Closed", image: "/assets/sachetana/mockups/onboarding-duo.jpeg", detail: "/assets/sachetana/mockups/assessments.png", alt: "Two phones showing Sachetana's Get Started sheet and welcome screen", paragraphs: ["Sachetana started at a hackathon, where a doctor at KMC Manipal described a problem: MAHE students were not using the counselling services the campus already had.", "My team built a mobile app with a short questionnaire, human review of flagged responses, an SOS button and a path to the campus hospital. I led the interface and feature work and reviewed code from the two other developers.", "We won the hackathon and kept building. The college's backing ended and the project is closed. The case study covers what worked, what did not, and what I would fix."] },
  { slug: "wylde", title: "Wylde", category: "party-game", purpose: "Pass the phone. Keep the room playing.", role: "Design & build · Solo project", state: "In build", image: "/assets/work/wylde-space.jpg", detail: "/assets/work/wylde-detail.jpg", alt: "Wylde visual direction", paragraphs: ["A party game has to earn its place in the room. Wylde explores how a first round can teach the rules without asking everyone to stop and read.", "I’m designing and building the iOS experience. The direction keeps scoring out of the way and puts the attention back on the people passing the phone.", "It is still in build. This page is a short introduction to the direction; the fuller write-up will follow the work."] },
  { slug: "lucky-day", title: "Lucky Day", category: "motion-and-haptics", purpose: "A small study in the feeling of an interaction.", role: "Design & build · Personal study", state: "Write-up in progress", image: "/assets/work/lucky-day-hero.jpg", detail: "/assets/work/lucky-day-detail.jpg", alt: "Lucky Day visual direction", paragraphs: ["A simple slot-machine interaction gave me room to study timing: how a reel slows, when the result arrives, and what a vibration adds to the moment.", "Spring motion and tactile feedback are the substance of this iOS study. I’m interested in how small decisions can make a screen feel like something you can touch.", "The write-up is in progress. I’m keeping this introduction focused on the question the experiment explores."] },
] as const;

export const stamps = [
  { title: "Hey, nice to see you here!", text: "I’m Gaurav. I design and build digital products in Bengaluru.", illustration: "house", color: "#f6f4e9" },
  { title: "Between an idea and a working thing.", text: "I like being close to both: working out an interaction, building it, and finding where it needs more care.", illustration: "phone", color: "#ecd1d9" },
  { title: "Learning by making.", text: "In Manipal, a go-kart team taught me about design, budgets, sponsors and making decisions together. Our kart finished fourth at Buddh International Circuit.", illustration: "kart", color: "#efedb5" },
  { title: "Different people. Different kinds of care.", text: "A party game keeps the room playing. A student wellbeing app puts help within reach on the hardest day. The person using the product gives the work its direction.", illustration: "flower", color: "#e99b75" },
  { title: "A lot still to make.", text: "One day, I want to build a design-led firm and back other builders. For now, I’m looking for a team where I can help shape a product and build it.", illustration: "cup", color: "#bfd6e6" },
] as const;

export const photoCollection = [
  { src: "/photos/beach-manipal.png", alt: "An evening on the beach in Manipal" },
  { src: "/assets/about.jpeg", alt: "Gaurav in a snow-covered mountain landscape" },
  { src: "/photos/mountains.png", alt: "A mountain landscape" },
] as const;

/** Live experiments. Each `live` page is a self-contained build in public/, loaded in a dialog only while it is open. */
export const labsExperiments = [
  { src: "/labs/halftone-pearl/thumb.jpg", live: "/labs/halftone-pearl/index.html", alt: "A scallop shell open on a dark sea bed, with a pearl, drawn in dots of light", title: "Halftone Pearl", caption: "A scallop opens and a pearl lights up, drawn only with dots. Click to replay.", kind: "live experiment" },
  { src: "/labs/shell-keepsake/thumb.jpg", live: "/labs/shell-keepsake/index.html", alt: "A halftone shell, open, on paper", title: "Shell Keepsake", caption: "The same dot engine on paper: a shell opens and offers a pearl. Switch between light and dark.", kind: "live experiment" },
  { src: "/labs/petal-rush/thumb.jpg", live: "/labs/petal-rush/index.html", alt: "A single pink petal on a dark background", title: "Petal Rush", caption: "One wind carries a hundred real petals toward you, then leaves one at rest. Move the cursor to stir it.", kind: "live experiment" },
  { src: "/namma-auto/thumb.jpg", live: "/namma-auto/index.html", alt: "A small illustrated auto-rickshaw on a road", title: "Namma Auto", caption: "An auto-rickshaw scene, the same one as on the landing page.", kind: "live experiment" },
] as const;

/** Labs shows the live experiments only. Project visuals and photographs are not listed here. */
export const playgroundItems = labsExperiments;

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
