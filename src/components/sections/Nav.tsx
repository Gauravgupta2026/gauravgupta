"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Shell } from "@/components/Shell";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { projects } from "@/content/projects";
import { imageFor } from "@/content/images";

/**
 * Fixed nav. Fades and lifts on scroll down, settles back in shortly after
 * scrolling stops (mirrors the reference's om-onScroll behavior). WORK opens
 * a hover dropdown listing the first three projects.
 */
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      setMenuOpen(false);
      if (y > 60) setHidden(true);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => setHidden(false), 240);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  const openMenu = () => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    setMenuOpen(true);
  };
  const closeMenu = () => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    menuTimer.current = setTimeout(() => setMenuOpen(false), 120);
  };

  return (
    <nav
      className="fixed left-0 top-0 z-[60] w-full border-b border-border-2/60 bg-bg/70 py-[18px] font-mono text-[12px] font-normal tracking-[0.06em] text-mute backdrop-blur-md transition-[opacity,transform] duration-300 md:py-[24px] md:text-[13px]"
      style={
        hidden
          ? { opacity: 0, transform: "translate3d(0,-10px,0)" }
          : { opacity: 1, transform: "translate3d(0,0,0)" }
      }
    >
      <Shell wide className="relative flex items-center justify-between">
        <div className="flex items-center gap-[24px] md:gap-[64px]">
          {!isHome && (
            <Link
              href="/"
              title="Back to home"
              className="font-logo text-[32px] leading-none text-red no-underline transition-colors duration-300 hover:text-ink md:text-[34px]"
            >
              GG
            </Link>
          )}

          <div className="flex items-center gap-[24px] md:gap-[127px]">
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <Link
              href="/work"
              className={`-m-[10px] block p-[10px] no-underline transition-colors duration-300 ${menuOpen ? "text-ink" : "text-mute"}`}
            >
              WORK
            </Link>

            <div
              className="absolute left-0 top-[36px] w-[calc(100vw-44px)] max-w-[280px] pt-[12px] transition-[opacity,transform] duration-300 md:left-[-16px]"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen
                  ? "translate3d(0,0,0) scale(1)"
                  : "translate3d(0,-4px,0) scale(.96)",
                pointerEvents: menuOpen ? "auto" : "none",
                transformOrigin: "24px -8px",
              }}
            >
              <div className="relative rounded-xl border border-border bg-surface p-[10px] shadow-[0_20px_48px_rgba(0,0,0,.7)]">
                {projects.slice(0, 3).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="flex items-center gap-[12px] rounded-lg px-[6px] py-[8px] text-inherit no-underline transition-colors hover:bg-white/5"
                  >
                    <span
                      className="block h-[34px] w-[34px] flex-shrink-0 rounded-[6px] bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${imageFor(`nav-${p.slug}`, 68, 68)})`,
                      }}
                    />
                    <span className="min-w-0 flex-1 truncate text-[13px] text-ink">
                      {p.title}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.1em] text-faint">
                      {p.act.replace("Act.", "")}
                    </span>
                  </Link>
                ))}

                <Link
                  href="/work"
                  className="mt-[4px] flex items-center justify-between rounded-lg px-[6px] py-[8px] font-mono text-[10px] tracking-[0.14em] text-mute no-underline transition-colors hover:bg-white/5 hover:text-ink"
                >
                  <span>ALL WORK</span>
                  <span className="text-red">&#8599;</span>
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/labs"
            className="-m-[10px] block p-[10px] text-mute no-underline transition-colors duration-300 hover:text-ink"
          >
            LABS
          </Link>
          </div>
        </div>

        <div className="flex items-center gap-[16px] md:gap-[20px]">
          <Link
            href="/about"
            className="-m-[10px] block p-[10px] text-mute no-underline transition-colors duration-300 hover:text-ink"
          >
            ABOUT
          </Link>
          <ThemeToggle />
        </div>
      </Shell>
    </nav>
  );
}
