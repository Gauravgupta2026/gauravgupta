"use client";

import { useCallback, useEffect, useState } from "react";
import { EdnaOpening } from "./EdnaOpening";
import { SelectedWork } from "./SelectedWork";
import styles from "./EdnaOpening.module.css";

export function LandingExperience() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready && window.location.hash === "#selected-work") document.getElementById("selected-work")?.scrollIntoView();
  }, [ready]);
  const revealPage = useCallback(() => setReady(true), []);
  return (
    <div className={styles.experience} data-loading={!ready}>
      <EdnaOpening onReveal={revealPage} />
      {ready && <SelectedWork />}
    </div>
  );
}
