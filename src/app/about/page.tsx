import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  return <PageShell title="About" lead="This page is being written." />;
}
