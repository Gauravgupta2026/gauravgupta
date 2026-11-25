import Link from 'next/link';
import { PageShell } from '@/components/site/PageShell';

export default function NotFound() {
  return <PageShell title="Off the map"><p className="page-note">There is no page here. <Link href="/">Back to the bowl</Link></p></PageShell>;
}
