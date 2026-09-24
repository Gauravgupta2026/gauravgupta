import type { ReactNode } from "react";
import { ViewportThemeColor } from "@/components/sections/ViewportThemeColor";

/** Full-width editorial surface with a fixed dark device surround at the top. */
export function LandingFrame({ children }: { children: ReactNode }) {
  return (
    <div className="landing-frame">
      <ViewportThemeColor />
      {children}
    </div>
  );
}
