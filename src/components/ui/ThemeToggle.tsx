"use client";

import { useEffect, useState } from "react";

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

/** A persistent light/dark control shared by the nav and footer. */
export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
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
      {showLabel && <span className="theme-toggle-label">{dark ? "Light mode" : "Night mode"}</span>}
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
