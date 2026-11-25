import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';

export const metadata: Metadata = { title: 'Resume' };

export default function Page() {
  return <PageShell title="Resume" lead="The resume is on the way." />;
}
