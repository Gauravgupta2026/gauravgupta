export const THEMES = ['dark', 'light', 'hybrid'] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = 'dark';
export const THEME_KEY = 'gg-theme';

export const isTheme = (v: unknown): v is Theme => THEMES.some((t) => t === v);

/** Runs before first paint, so a saved theme never flashes the wrong colours. */
export const THEME_BOOT = `try{var t=localStorage.getItem('${THEME_KEY}');if(${JSON.stringify(THEMES)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(THEME_KEY, theme); } catch { /* storage blocked: the choice lasts for this visit */ }
  const hero = getComputedStyle(document.documentElement).getPropertyValue('--hero-bg').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', hero);
  window.dispatchEvent(new Event('themechange'));
}
