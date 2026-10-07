"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect, useRef } from "react";

// The SDK initializes before hydration in instrumentation-client.ts.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!POSTHOG_KEY) return <>{children}</>;
  return <PHProvider client={posthog}>
    <Suspense fallback={null}><PageviewTracker /></Suspense>
    {children}
  </PHProvider>;
}

function PageviewTracker() {
  const pathname = usePathname();
  const query = useSearchParams()?.toString();
  const client = usePostHog();
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !client) return;
    const url = window.origin + pathname + (query ? `?${query}` : "");
    // Avoid duplicate effect runs while preserving Home → Work → Home visits.
    if (lastUrl.current === url) return;
    lastUrl.current = url;
    client.capture("$pageview", { $current_url: url });
  }, [pathname, query, client]);
  return null;
}
