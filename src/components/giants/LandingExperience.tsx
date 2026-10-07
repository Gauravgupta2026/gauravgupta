"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useLandingIntro } from "@/components/LandingIntroProvider";
import { EdnaOpening } from "./EdnaOpening";
import { SelectedWork } from "./SelectedWork";
import styles from "./EdnaOpening.module.css";

const LIGHT_PREFERENCE = "(prefers-color-scheme: light)";
function subscribeToColourPreference(onChange: () => void) {
  const preference = window.matchMedia(LIGHT_PREFERENCE);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}
const prefersLight = () => window.matchMedia(LIGHT_PREFERENCE).matches;
const darkFallback = () => false;

export function LandingExperience() {
  const { playIntro, finishIntro } = useLandingIntro();
  const light = useSyncExternalStore(subscribeToColourPreference, prefersLight, darkFallback);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    // Work links leave a fragment behind; reloading should replay the intro at the top.
    if (window.location.hash === "#selected-work") {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);
  const revealPage = useCallback(() => { setReady(true); finishIntro(); }, [finishIntro]);
  return (
    <div className={styles.experience} data-loading={playIntro && !ready} data-landing-theme={light ? "light" : "dark"}>
      <EdnaOpening skipIntro={!playIntro} onReveal={revealPage} theme={light ? "light" : "dark"} />
      <SelectedWork />
    </div>
  );
}
