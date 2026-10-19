import type { Project } from "@/components/ui/ProjectCard";

/** Project copy is verbatim from the reference — edit freely. */
export const projects: Project[] = [
  {
    slug: "sachetana",
    act: "Act.01",
    title: "Sachetana",
    subtitle: "A student mental health app",
    quote:
      "Built so MAHE students could find campus counselling and reach it with less friction. Closed after the college's backing ended.",
    cta: "View Case Study",
    imageLabel: "[ APP SCREENS ]",
    meta: [
      { label: "Role", value: "Design + Build" },
      { label: "Timeline", value: "2024 – 2025 · Closed" },
    ],
    stack: [
      { name: "Flutter", slug: "flutter" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Supabase", slug: "supabase" },
      { name: "Firebase" },
    ],
  },
  {
    slug: "wylde",
    act: "Act.02",
    title: "Wylde",
    subtitle: "A party game",
    quote: "A fast, social party game built for the energy of a room.",
    cta: "View Case Study",
    imageLabel: "[ APP SCREENS ]",
    meta: [
      { label: "Role", value: "Design + Build" },
      { label: "Platform", value: "iOS · 2026" },
    ],
    stack: [
      { name: "Codex", slug: "codex" },
      { name: "Supabase", slug: "supabase" },
      { name: "Swift", slug: "swift" },
    ],
  },
  {
    slug: "lucky-day",
    act: "Act.03",
    title: "Lucky Day",
    subtitle: "Slot machine",
    quote: "A playful study in motion, chance, and tactile feedback.",
    cta: "View Case Study",
    imageLabel: "[ APP SCREENS ]",
    meta: [
      { label: "Role", value: "Design + Build" },
      { label: "Platform", value: "iOS · 2026" },
    ],
    stack: [
      { name: "Swift", slug: "swift" },
      { name: "SwiftUI" },
    ],
  },
  {
    slug: "new-project",
    act: "WIP",
    accentAct: true,
    title: "New Project",
    subtitle: "Internal tool",
    quote: "An internal tool to compress the team's daily workflow.",
    cta: "Coming soon",
    imageLabel: "[ IN PROGRESS ]",
    meta: [
      { label: "Role", value: "Design + Build" },
      { label: "Status", value: "Building · 2026" },
    ],
    stack: [
      { name: "TypeScript", slug: "typescript" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Convex", slug: "convex" },
    ],
  },
];
