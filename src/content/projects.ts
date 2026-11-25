export interface Project { slug: string; name: string; meta: string; line: string; tone: 'cobalt' | 'vermilion' | 'bone'; phones: 1 | 2; feature?: boolean }

// Placeholder lines: Gaurav to fill in. Each entry gets a page at /work/<slug>.
export const PROJECTS: Project[] = [
  { slug: 'wylde', name: 'Wylde', meta: 'Product, Design', line: 'Building now.', tone: 'cobalt', phones: 2, feature: true },
  { slug: 'sachetana', name: 'Sachetana', meta: 'Case study soon', line: '', tone: 'vermilion', phones: 1 },
  { slug: 'lucky-day', name: 'Lucky Day', meta: 'Case study soon', line: '', tone: 'bone', phones: 1 },
];

export const findProject = (slug: string): Project | undefined => PROJECTS.find((p) => p.slug === slug);
