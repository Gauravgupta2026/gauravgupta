"use client";

import { useEffect, useState } from "react";

type ThemeToggleProps = {
  className?: string;
  iconOnly?: boolean;
  showLabel?: boolean;
};

/** A persistent light/dark control shared by the nav and footer. */
export function ThemeToggle({ className = "", iconOnly = false, showLabel = false }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      setDark(document.documentElement.getAttribute("data-theme") === "dark");
    };

    queueMicrotask(syncTheme);
    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
    // Canvas-drawn graphics (e.g. HalftoneField) can't react to the
    // [data-theme] attribute via CSS — they redraw on this event instead.
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className={`theme-toggle ${className}`.trim()}
      data-dark={dark ? "true" : "false"}
    >
      {iconOnly ? (
        dark ? (
          <svg className="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg className="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        )
      ) : (
        <>
          {showLabel && <span className="theme-toggle-label">{dark ? "Light mode" : "Night mode"}</span>}
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-toggle-thumb" />
          </span>
        </>
      )}
    </button>
  );
}
