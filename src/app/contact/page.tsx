import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';

export const metadata: Metadata = { title: 'Say hello' };

export default function Page() {
  return <PageShell title="Say hello" lead="Contact details are on the way." />;
}
