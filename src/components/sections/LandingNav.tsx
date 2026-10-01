"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./LandingOpening.module.css";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/labs", label: "Labs" },
  { href: "/about", label: "About" },
] as const;

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <nav ref={nav} className={styles.nav} aria-label="Primary navigation">
      <div className={styles.desktopLinks}>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link
        href="/"
        className={styles.brand}
        onClick={close}
        aria-label="Gaurav Gupta, home"
      >
        <span aria-hidden="true" />
        Gaurav Gupta
      </Link>
      <div className={styles.actions}>
        <a href="mailto:hey@gauravguptas.com" className={styles.contactAction}>
          Say hello
        </a>
        <Link href="/about#experience" className={styles.resumeAction}>
          Resume
        </Link>
      </div>
      <button
        ref={toggle}
        type="button"
        className={styles.menuToggle}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="landing-navigation"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <>
          <button
            type="button"
            className={styles.mobileBackdrop}
            aria-label="Close navigation"
            onClick={close}
          />
          <div ref={menu} id="landing-navigation" className={styles.mobileMenu}>
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={close}>
                {link.label}
              </Link>
            ))}
            <a href="mailto:hey@gauravguptas.com" onClick={close}>Say hello</a>
            <Link href="/about#experience" onClick={close}>Resume</Link>
          </div>
        </>
      )}
    </nav>
  );
}
