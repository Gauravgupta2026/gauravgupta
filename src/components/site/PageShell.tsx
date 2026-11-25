import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Nav } from './Nav';

/** Frame for every page except the landing page. */
export function PageShell({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <div className="shell">
      <Nav />
      <main>
        <header className="page-head"><h1>{title}</h1>{lead && <p>{lead}</p>}</header>
        {children}
      </main>
      <Footer />
    </div>
  );
}
