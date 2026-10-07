"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

import { THEME_STORAGE_KEY, THEME_BACKGROUND, type SiteThemeName as Theme } from "@/lib/siteTheme";
const DARK_PREFERENCE = "(prefers-color-scheme: dark)";

function resolveTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch { /* Device preference still works when storage is unavailable. */ }
  return window.matchMedia(DARK_PREFERENCE).matches ? "dark" : "light";
}
function applyTheme() {
  const theme = resolveTheme();
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => {
    meta.content = THEME_BACKGROUND[theme];
  });
  window.dispatchEvent(new Event("site-theme-applied"));
}
function subscribe(onChange: () => void) {
  window.addEventListener("site-theme-applied", onChange);
  return () => window.removeEventListener("site-theme-applied", onChange);
}
export function useSiteTheme(): Theme {
  return useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "dark" ? "dark" : "light", () => "dark");
}
export function setSiteTheme(theme: Theme) {
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* Keep the current document usable without persistence. */ }
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => { meta.content = THEME_BACKGROUND[theme]; });
  window.dispatchEvent(new Event("site-theme-applied"));
}
export function SiteTheme() {
  const pathname = usePathname();
  useEffect(() => {
    applyTheme();
    const preference = window.matchMedia(DARK_PREFERENCE);
    preference.addEventListener("change", applyTheme);
    window.addEventListener("storage", applyTheme);
    window.addEventListener("themechange", applyTheme);
    return () => {
      preference.removeEventListener("change", applyTheme);
      window.removeEventListener("storage", applyTheme);
      window.removeEventListener("themechange", applyTheme);
    };
  }, [pathname]);
  return null;
}
