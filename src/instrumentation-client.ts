import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Initialize before hydration: first pageviews and early errors must not race init.
if (key) {
  try {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",
      capture_dead_clicks: true,
      capture_exceptions: true,
      capture_performance: { web_vitals: true },
      enable_heatmaps: true,
    });
  } catch {
    console.warn("Analytics initialization failed; the site remains available.");
  }
}
