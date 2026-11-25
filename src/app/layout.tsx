import type { Metadata, Viewport } from 'next';
import { Caprasimo, Instrument_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import { DEFAULT_THEME, THEME_BOOT } from '@/lib/theme';
import './globals.css';

const display = Caprasimo({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const text = Instrument_Sans({ subsets: ['latin'], variable: '--font-text' });

export const metadata: Metadata = {
  title: { default: 'Gaurav Gupta, Associate Product Manager', template: '%s · Gaurav Gupta' },
  description: 'Gaurav Gupta is an Associate Product Manager with a design habit, based in Bengaluru.',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#07060a' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The boot script sets data-theme before React hydrates, so the attribute may differ from the server's.
    <html lang="en" data-theme={DEFAULT_THEME} className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} /></head>
      <body>{children}</body>
    </html>
  );
}
