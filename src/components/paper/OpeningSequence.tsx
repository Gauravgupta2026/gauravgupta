"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { GreetingWindow } from "./GreetingWindow";
import styles from "./OpeningSequence.module.css";

const ENTRY_KEY = "portfolio-window-entered";
const SHUTTER_DURATION_MS = 950;
const GREETING_HOLD_MS = 700;
const subscribe = () => () => {};
const needsEntrance = () => {
  try {
    return new URLSearchParams(location.search).has("intro") || sessionStorage.getItem(ENTRY_KEY) !== "1";
  } catch {
    return true;
  }
};
const bootstrap = `try{if(!new URLSearchParams(location.search).has('intro')&&sessionStorage.getItem('${ENTRY_KEY}')==='1'){document.documentElement.dataset.greetingEntered='true'}}catch{}`;

export function OpeningSequence() {
  const needsEntry = useSyncExternalStore(subscribe, needsEntrance, () => true);
  const [dismissed, setDismissed] = useState(false);
  const [phase, setPhase] = useState<"waiting" | "opening" | "revealing">("waiting");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const active = needsEntry && !dismissed;

  const finish = useCallback(() => {
    dialogRef.current?.close();
    try { sessionStorage.setItem(ENTRY_KEY, "1"); } catch { /* Entry still works when storage is unavailable. */ }
    setDismissed(true);
    document.getElementById("home-title")?.focus({ preventScroll: true });
  }, []);

  useLayoutEffect(() => {
    if (!active) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    // Upgrade the server-painted entrance to a native modal so the page is inert.
    dialog.close();
    dialog.showModal();
    enterRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.documentElement.style.overflow = overflow;
    };
  }, [active]);

  useEffect(() => {
    if (!active || phase === "waiting") return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (phase === "revealing" && !reducedMotion) return;
    const timer = window.setTimeout(() => {
      if (reducedMotion) finish();
      else setPhase("revealing");
    }, reducedMotion ? 0 : SHUTTER_DURATION_MS + GREETING_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [active, phase, finish]);

  return <>
    <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
    <noscript><style>{`dialog.${styles.entrance}{display:none}`}</style></noscript>
    {active && <dialog ref={dialogRef} open className={styles.entrance} data-phase={phase} aria-label="Welcome to Gaurav’s portfolio" onCancel={event => { event.preventDefault(); finish(); }} onAnimationEnd={event => { if (event.target === event.currentTarget && phase === "revealing") finish(); }}>
      <div className={styles.composition}>
        <GreetingWindow open={phase !== "waiting"} />
        <button ref={enterRef} type="button" className={styles.enter} disabled={phase !== "waiting"} onClick={() => setPhase("opening")}>enter
          <svg aria-hidden="true" viewBox="0 0 32 5" width="32" height="5"><path d="M1 3 Q3 0 5 3 T9 3 T13 3 T17 3 T21 3 T25 3 T29 3 T31 3" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
        </button>
      </div>
    </dialog>}
  </>;
}
