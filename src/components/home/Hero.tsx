'use client';

import { useEffect, useRef } from 'react';
import { Nav } from '@/components/site/Nav';

const SCENE_LABEL = 'A 3D stadium bowl holding four years of Manipal. Snowy ranges fill the far stands, with trekkers, skiers and a glacier that meets the Arabian Sea. Student Plaza, End Point with its chai stall, and Royal Embassy stand on the right. On the red ground NCC cadets drill, a boxer shadow-boxes, a cyclist rides, and Gaurav fixes a go-kart and laps the bowl. Drag sideways or use the left and right arrow keys to turn it.';
const STORIES = [['kart', 'The kart'], ['trek', 'Summit day'], ['ski', 'First runs'], ['sp', 'SP steps'], ['endpoint', 'End Point'], ['ncc', 'NCC drill'], ['sea', 'The beach'], ['embassy', 'Royal Embassy']] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let unmount: (() => void) | undefined, cancelled = false;
    // Loaded after the page has painted: three.js and the scene are the heavy part.
    void Promise.all([import('@/scene/stadium'), document.fonts.ready]).then(async ([{ mountStadium }]) => {
      if (cancelled) return;
      const query = new URLSearchParams(location.search), showPanel = process.env.NODE_ENV === 'development' || query.has('tweak');
      const stop = await mountStadium(el, { showPanel, force: query.get('renderer') === 'webgl' ? 'webgl' : undefined });
      if (cancelled) stop(); else unmount = stop;
    });
    return () => { cancelled = true; unmount?.(); };
  }, []);

  return (
    <header className="hero" id="top" ref={root}>
      <canvas id="stars" aria-hidden="true" />
      <canvas id="gl" role="img" tabIndex={0} aria-label={SCENE_LABEL} />
      <div className="grain" />
      <svg className="hero-name" aria-hidden="true" />
      <div className="hero-copy">
        <h1 className="sr-only">Gaurav Gupta</h1>
        <p className="role">Associate product manager with a design habit.</p>
        <a className="next" href="#work">See the work</a>
      </div>
      <svg width="0" height="0" className="defs" aria-hidden="true">
        <filter id="lensGlass" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage id="lensMap" x="0" y="0" width="46" height="46" preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="lens-cursor" aria-hidden="true" />
      <div className="story" aria-live="polite">
        <span className="story-tag" />
        <ol className="story-list" />
        <button className="story-close" type="button">Back to the bowl</button>
      </div>
      <nav className="stories" aria-label="Stories in the scene">
        {STORIES.map(([id, label]) => <button key={id} type="button" data-story={id}>{label}</button>)}
      </nav>
      <Nav />
      <LensMap />
    </header>
  );
}

const LENS_MAP_SIZE = 128;

/** Draws the displacement map that makes the lens cursor bend what is behind it: strongest at the rim, calm in the middle. */
function LensMap() {
  useEffect(() => {
    const n = LENS_MAP_SIZE, cv = document.createElement('canvas'); cv.width = cv.height = n;
    const c = cv.getContext('2d'); if (!c) return;
    const img = c.createImageData(n, n);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const u = (i / (n - 1)) * 2 - 1, v = (j / (n - 1)) * 2 - 1, r = Math.hypot(u, v), k = (j * n + i) * 4, bend = r < 1 ? r ** 2.2 : 0;
      img.data.set([128 - u * bend * 127, 128 - v * bend * 127, 128, 255], k);
    }
    c.putImageData(img, 0, 0);
    document.getElementById('lensMap')?.setAttribute('href', cv.toDataURL());
  }, []);
  return null;
}
