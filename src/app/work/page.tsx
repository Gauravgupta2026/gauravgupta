import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { ProjectGrid } from '@/components/site/ProjectGrid';

export const metadata: Metadata = { title: 'Work' };

export default function Page() {
  return <PageShell title="Work"><ProjectGrid /></PageShell>;
}
