'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { mountLines } from '@/lib/lines';

export function Closing() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => (root.current ? mountLines(root.current) : undefined), []);
  return (
    <section className="sky-story" ref={root} aria-labelledby="sky-line">
      <div className="sky-stage">
        <canvas aria-hidden="true" />
        <div className="sky-cta">
          <h2 id="sky-line"><span>Different people, different rhythms.</span> <span>Somehow, we met here.</span></h2>
          <p>Let&rsquo;s make something beautiful.</p>
          <div className="actions"><Link className="say" href="/contact">Say hello</Link><Link className="ghost" href="/resume">View resume</Link></div>
        </div>
      </div>
      {/* The link target sits at the end of the scroll, where the drawing is complete and the buttons are live. */}
      <span className="sky-end" id="hello" />
    </section>
  );
}
