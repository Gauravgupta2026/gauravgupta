"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const LandingIntroContext = createContext<{ playIntro: boolean; finishIntro: () => void } | null>(null);

export function LandingIntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [intro, setIntro] = useState({ path: pathname, finished: pathname !== "/" });
  // A route change consumes the opening, even if the visitor leaves mid-animation.
  if (intro.path !== pathname) setIntro({ path: pathname, finished: true });
  const finishIntro = useCallback(() => setIntro(current => current.finished ? current : { ...current, finished: true }), []);
  return <LandingIntroContext.Provider value={{ playIntro: !intro.finished, finishIntro }}>
    {children}
  </LandingIntroContext.Provider>;
}

export function useLandingIntro() {
  const context = useContext(LandingIntroContext);
  if (!context) throw new Error("Landing intro requires the site layout provider");
  return context;
}
