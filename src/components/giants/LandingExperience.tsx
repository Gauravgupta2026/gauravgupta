"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
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
  const light = useSyncExternalStore(subscribeToColourPreference, prefersLight, darkFallback);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready && window.location.hash === "#selected-work") document.getElementById("selected-work")?.scrollIntoView();
  }, [ready]);
  const revealPage = useCallback(() => setReady(true), []);
  return (
    <div className={styles.experience} data-loading={!ready} data-landing-theme={light ? "light" : "dark"}>
      <EdnaOpening onReveal={revealPage} theme={light ? "light" : "dark"} />
      {ready && <SelectedWork />}
    </div>
  );
}
