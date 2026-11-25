import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChaiScene, KartScene, SeatScene, ShoreScene, TrekScene } from './scenes';

interface Tile { id: string; title: string; text: string; scene: ReactNode; link?: { href: string; label: string } }

// Draft copy for Gaurav to rewrite.
const TILES: Tile[] = [
  { id: 'trek', title: 'Decide when to turn back', text: 'On a trek we set a turnaround time before we leave. Before I build, I agree on what would make us stop.', scene: <TrekScene /> },
  { id: 'kart', title: 'One more lap', text: 'My college go-kart never stayed fixed. Ship it, drive it, find the next fix.', scene: <KartScene /> },
  { id: 'shore', title: 'Where two sides meet', text: 'I stand between design and engineering: sketch the flow, then talk through the edge cases.', scene: <ShoreScene /> },
  { id: 'chai', title: 'Bring a half idea', text: 'A portfolio, a product, a trek plan. I will tell you honestly what I think. Chai is on me.', scene: <ChaiScene /> },
  { id: 'seat', title: 'Save me a seat', text: 'I am building Wylde in Bengaluru and looking for my next team.', scene: <SeatScene />, link: { href: '/contact', label: 'Say hello' } },
];

/** The story as a wall of posters. Each one is a place from the stadium and one thing it taught. */
export function Story() {
  return (
    <section className="story-wall" id="about" aria-labelledby="story-title">
      <h2 id="story-title">I like being close to both sides of a product: working out an interaction, and finding where it needs more care.</h2>
      <ul className="tiles">
        {TILES.map((t) => (
          <li key={t.id} className={`tile t-${t.id}`}>
            {t.scene}
            <div className="tile-text">
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              {t.link && <Link href={t.link.href}>{t.link.label}</Link>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
