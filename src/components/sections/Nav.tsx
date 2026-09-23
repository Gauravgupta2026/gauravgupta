"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`site-nav${menuOpen ? " is-menu-open" : ""}`}
      data-menu-open={menuOpen ? "true" : "false"}
      aria-label="Primary navigation"
    >
      <Link href="/about" className="site-nav-left" onClick={closeMenu}>
        About
      </Link>

      <Link href="/" className="site-nav-name" aria-label="Gaurav Gupta, home" onClick={closeMenu}>
        <span>Gaurav</span>
        <span>Gupta</span>
      </Link>

      <div className="site-nav-right">
        <Link href="/about#experience" onClick={closeMenu}>Resume</Link>
        <Link href="/#contact" onClick={closeMenu}>Contact</Link>
      </div>

      <button
        type="button"
        className="site-nav-menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span>{menuOpen ? "Close" : "Menu"}</span>
      </button>

      <div id="mobile-navigation" className="site-nav-mobile-menu" aria-hidden={!menuOpen}>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/about#experience" onClick={closeMenu}>Resume</Link>
        <Link href="/#contact" onClick={closeMenu}>Contact</Link>
      </div>
    </nav>
  );
}
