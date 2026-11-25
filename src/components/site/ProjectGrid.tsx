import Link from 'next/link';
import { PROJECTS } from '@/content/projects';

export function ProjectGrid() {
  return (
    <ul className="p-grid">
      {PROJECTS.map((p, i) => (
        <li key={p.slug} className={p.feature ? 'p-card feature' : 'p-card'}>
          <Link href={`/work/${p.slug}`}>
            <div className={`p-img c-${p.tone}`}>{Array.from({ length: p.phones }, (_, k) => <i key={k} className="phone" aria-hidden="true" />)}</div>
            <div className="p-cap"><h3><span className="idx">{String(i + 1).padStart(2, '0')}</span>{p.name}</h3><span>{p.meta}</span></div>
            {p.line && <p className="p-line">{p.line}</p>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
