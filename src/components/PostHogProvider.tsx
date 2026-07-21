"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";

/**
 * PostHog analytics + error tracking for the portfolio.
 *
 * Everything here is gated on NEXT_PUBLIC_POSTHOG_KEY: with no key set (local
 * dev before signup, or a preview without the env var) the whole thing is a
 * no-op — posthog never initializes and no events are sent. That keeps the
 * build green and the console clean until the project is actually wired up.
 *
 * Pageviews are captured MANUALLY (capture_pageview: false). The App Router
 * does client-side navigation, so PostHog's automatic pageview — which only
 * fires on hard loads — would miss every in-app route change. The
 * PageviewTracker below re-fires $pageview whenever the path or query changes.
 */

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return; // no key → analytics disabled

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // handled by PageviewTracker for App Router
      capture_pageleave: true, // session duration + scroll depth on $pageleave
      // Don't create a (billable) person profile for every anonymous visitor;
      // still captures all their events for analytics + session replay.
      person_profiles: "identified_only",
      // Extra signal for the weekly analytics-to-Linear automation:
      capture_dead_clicks: true, // taps on non-interactive elements = UX friction
      capture_exceptions: true, // client-side errors → $exception events
      capture_performance: { web_vitals: true }, // per-route LCP / CLS / INP
      enable_heatmaps: true, // aggregate click/scroll heatmaps
    });
  }, []);

  if (!POSTHOG_KEY) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}

/**
 * Fires a $pageview on every route change. Reads useSearchParams, which forces
 * a Suspense boundary (its parent above), so the rest of the tree isn't opted
 * into client-side rendering.
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const client = usePostHog();

  useEffect(() => {
    if (!pathname || !client) return;

    let url = window.origin + pathname;
    const query = searchParams?.toString();
    if (query) url += `?${query}`;

    client.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, client]);

  return null;
}
