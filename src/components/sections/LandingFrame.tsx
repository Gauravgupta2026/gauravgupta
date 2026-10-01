import type { ReactNode } from "react";
import { ViewportThemeColor } from "@/components/sections/ViewportThemeColor";
import styles from "./LandingFrame.module.css";

/** Full-width editorial surface with section-aware mobile browser color. */
export function LandingFrame({ children }: { children: ReactNode }) {
  return (
    <div className={`landing-frame ${styles.flush}`}>
      <ViewportThemeColor />
      {children}
    </div>
  );
}
