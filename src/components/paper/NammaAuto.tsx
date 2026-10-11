"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./NammaAuto.module.css";

const ADAPTER_URL = "/namma-auto/embed.js";
const SCENE_URL = "/namma-auto/index.html";

interface AutoController {
  destroy: () => void;
  setActive: (active: boolean) => void;
}
interface AutoAdapter {
  mountNammaAuto: (container: HTMLElement, src: string, onHire: () => void, active: boolean) => AutoController;
}

export function NammaAuto({ className }: { className: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let loading = false;
    let controller: AutoController | undefined;
    let onScreen = true;
    const entrance = document.querySelector('dialog[aria-label="Welcome to Gaurav’s portfolio"]');
    const heroReady = () => !entrance?.isConnected || !entrance.hasAttribute('open');
    const active = () => heroReady() && onScreen && !document.hidden;
    const syncActivity = () => controller?.setActive(active());
    const loadAuto = () => {
      if (loading) return;
      loading = true;
      // Fetch during the window opening; animate only when the hero is available.
      void import(/* webpackIgnore: true */ ADAPTER_URL).then((adapter: AutoAdapter) => {
        if (!cancelled && containerRef.current) {
          controller = adapter.mountNammaAuto(containerRef.current, SCENE_URL, () => router.push("/about#contact"), active());
        }
      }).catch(error => console.error("Could not load Namma Auto", error));
    };
    const observer = new MutationObserver(() => {
      if (heroReady() || entrance?.getAttribute('data-phase') !== 'waiting') loadAuto();
      syncActivity();
      if (heroReady()) observer.disconnect();
    });
    if (!heroReady()) {
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['open', 'data-phase'] });
      if (entrance?.getAttribute('data-phase') !== 'waiting') loadAuto();
    } else loadAuto();
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncActivity();
    });
    if (containerRef.current) visibility.observe(containerRef.current);
    document.addEventListener('visibilitychange', syncActivity);
    return () => {
      cancelled = true;
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', syncActivity);
      controller?.destroy();
    };
  }, [router]);

  return <div ref={containerRef} className={`${styles.slot} ${className}`} />;
}
