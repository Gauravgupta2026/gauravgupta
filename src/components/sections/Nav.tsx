"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const COLLAPSE_SCROLL_Y = 48;

const MENU_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#notes", label: "Notes" },
  { href: "/labs", label: "Labs" },
  { href: "/about#experience", label: "Resume" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeScrolled, setHomeScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const collapsed = pathname !== "/" || homeScrolled;

  useEffect(() => {
    if (pathname !== "/") return;

    const updateNav = () => setHomeScrolled(window.scrollY > COLLAPSE_SCROLL_Y);
    const animationFrame = window.requestAnimationFrame(updateNav);
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateNav);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

    };

    const menuButton = menuButtonRef.current;
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`site-nav${collapsed ? " is-collapsed" : ""}${menuOpen ? " is-menu-open" : ""}`}
      data-collapsed={collapsed ? "true" : "false"}
      data-menu-open={menuOpen ? "true" : "false"}
      aria-label="Primary navigation"
    >
      <div className="site-nav-left">
        <Link href="/work" onClick={closeMenu}>Work</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
      </div>

      <Link href="/" className="site-nav-name" aria-label="Gaurav Gupta, home" onClick={closeMenu}>
        <span>Gaurav</span>
        <span>Gupta</span>
      </Link>

      <div className="site-nav-right">
        <Link href="/about#experience" onClick={closeMenu}>Resume</Link>
        <Link href="/#contact" onClick={closeMenu}>Say hello</Link>
      </div>

      <div className="site-nav-controls">
        <button
          ref={menuButtonRef}
          type="button"
          className="site-nav-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="site-nav-menu-label">Menu</span>
          <span className="site-nav-menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className="site-nav-mobile-menu"
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Site menu"
      >
        <div className="site-nav-menu-header">
          <Link href="/" className="site-nav-menu-brand" onClick={closeMenu}>
            <span>Gaurav</span>
            <span>Gupta</span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="site-nav-menu-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="site-nav-menu-links">
          {MENU_LINKS.map((item) => (
            <Link href={item.href} onClick={closeMenu} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="site-nav-menu-contact">
          <span>Let&rsquo;s build something thoughtful.</span>
          <a href="mailto:hey@gauravguptas.com">hey@gauravguptas.com</a>
        </div>

        <div className="site-nav-menu-theme-control">
          <ThemeToggle className="site-nav-menu-theme-toggle" iconOnly />
        </div>
      </div>
    </nav>
  );
}
