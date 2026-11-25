'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { applyTheme, DEFAULT_THEME, isTheme, THEMES, type Theme } from '@/lib/theme';

const LABELS: Record<Theme, string> = { dark: 'Dark', light: 'Light', hybrid: 'Hybrid' };

const subscribe = (fn: () => void) => { window.addEventListener('themechange', fn); return () => window.removeEventListener('themechange', fn); };
const read = (): Theme => { const t = document.documentElement.dataset.theme; return isTheme(t) ? t : DEFAULT_THEME; };

export function Footer() {
  const theme = useSyncExternalStore(subscribe, read, () => DEFAULT_THEME);
  return (
    <footer className="foot">
      <p>© 2026 Gaurav Gupta, Bengaluru</p>
      <div className="themes" role="group" aria-label="Colour theme">
        {THEMES.map((t) => <button key={t} type="button" aria-pressed={theme === t} onClick={() => applyTheme(t)}>{LABELS[t]}</button>)}
      </div>
      <Link href="/">Back to the bowl</Link>
    </footer>
  );
}
