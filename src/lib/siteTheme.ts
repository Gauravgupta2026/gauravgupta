export type SiteThemeName = "light" | "dark";
// Only choices made through the current footer control override the device.
// The legacy `theme` key can contain stale preferences from older layouts.
export const THEME_STORAGE_KEY = "portfolio-theme";
export const THEME_BACKGROUND = { light: "#fdfafb", dark: "#0a0a0a" };
export const THEME_BOOTSTRAP = `(()=>{let t;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.querySelectorAll('meta[name=theme-color]').forEach(m=>m.content=t==='dark'?'${THEME_BACKGROUND.dark}':'${THEME_BACKGROUND.light}')})()`;
