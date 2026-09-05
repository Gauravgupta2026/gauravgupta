"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "gg_initials_wall";
const MAX_LEN = 3;
const FONTS = ["font-display italic", "font-mono", "font-logo"];
const COLORS = ["text-ink", "text-mute-2", "text-lilac", "text-red"];

/** A few names so the wall isn't empty on a fresh browser. */
const SEED = ["GG", "AK", "R", "MJ", "SK", "TJ", "PV", "NR"];

function pseudoRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return (h: number) => {
    h = (h ^ (h << 13)) | 0;
    h = (h ^ (h >>> 17)) | 0;
    h = (h ^ (h << 5)) | 0;
    return (h >>> 0) / 4294967295;
  };
}

/** Deterministic look for a given initials string + its position in the list. */
function styleFor(text: string, i: number) {
  const rand = pseudoRandom(`${text}-${i}`);
  const r1 = rand(i);
  const r2 = rand(i + 1);
  const r3 = rand(i + 2);
  const r4 = rand(i + 3);
  return {
    font: FONTS[Math.floor(r1 * FONTS.length)],
    color: COLORS[Math.floor(r2 * COLORS.length)],
    size: 22 + Math.floor(r3 * 40), // 22–62px
    translateY: (r4 - 0.5) * 26, // -13..13px, the "floating" scatter
    duration: 4 + r1 * 3, // 4–7s bob cycle
    delay: r2 * 3,
  };
}

/**
 * The initials wall — a no-backend, this-browser-only guestbook. A visitor
 * leaves 2–3 initials; it joins a horizontally scrolling strip of everyone
 * else's, each rendered in one of three site fonts, floating at a slightly
 * different size/height so the wall reads as organic, not a grid.
 */
export function InitialsWall() {
  const [entries, setEntries] = useState<string[]>(SEED);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored) && stored.length) {
        setEntries([...SEED, ...stored]);
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = value.trim().toUpperCase().slice(0, MAX_LEN);
    if (!initials) return;
    const next = [...entries, initials];
    setEntries(next);
    setValue("");
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      const list = Array.isArray(stored) ? stored : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, initials]));
    } catch {
      // ignore — the entry still renders for this session
    }
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ left: scrollRef.current.scrollWidth, behavior: "smooth" });
    });
  };

  return (
    <div>
      <form onSubmit={add} className="flex items-center gap-[10px]">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, MAX_LEN))}
          placeholder="YOU"
          maxLength={MAX_LEN}
          className="h-[34px] w-[74px] border border-border-2 bg-transparent px-[10px] text-center font-mono text-[15px] uppercase tracking-[0.1em] text-ink outline-none placeholder:text-faint focus:border-lilac"
        />
        <button
          type="submit"
          className="h-[34px] border border-border-2 px-[16px] font-mono text-[10px] tracking-[0.2em] text-mute transition-colors duration-300 hover:border-lilac hover:text-ink"
        >
          LEAVE YOUR MARK
        </button>
      </form>

      <div
        ref={scrollRef}
        className="no-scrollbar mt-[20px] flex h-[110px] items-center gap-[28px] overflow-x-auto md:h-[140px] md:gap-[40px]"
      >
        {entries.map((text, i) => {
          const s = styleFor(text, i);
          return (
            <span
              key={`${text}-${i}`}
              className={`animate-float-initial flex-shrink-0 select-none ${s.font} ${s.color}`}
              style={
                {
                  fontSize: `${s.size}px`,
                  lineHeight: 1,
                  "--float-y": `${s.translateY}px`,
                  animationDuration: `${s.duration}s`,
                  animationDelay: `${s.delay}s`,
                } as React.CSSProperties
              }
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
