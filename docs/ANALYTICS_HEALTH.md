# Analytics health — 7 October 2026

- [x] Confirm the current production domain through the successful GitHub deployment and live redirect: https://www.gauravguptas.com/.
- [x] Live PostHog configuration, recorder, error capture, web vitals and dead-click bundles load with HTTP 200. Event ingestion endpoints `/e/` and `/i/v0/e/` return HTTP 200; anonymous browser persistence exists. This confirms client initialization and delivery acceptance, not dashboard report correctness.
- [x] Fix initial pageview ordering. React child effects could call `capture` before the parent initialization effect; the installed SDK drops uninitialized captures. Initialize synchronously before hydration using Next.js `src/instrumentation-client.ts`.
- [x] Preserve manual App Router pageviews, error capture, web vitals, heatmaps, pageleave and anonymous profile policy. Deduplicate repeated effects for the same URL; revisiting a route still captures a new view.
- [x] End-to-end local collector test with a dummy public token: Home → Work → Home produced exactly three pageviews with the correct paths. No test events were sent to the production project.
- [x] Missing-key build remains valid and disables analytics. No private analytics credentials or tracking IDs are committed.
- [x] Public dashboard inspected: project 523979, dashboard 1889164; headline queries return zero, current date windows, no excluding properties, test-account filtering off. Shared results are cached and auto-refresh every 30 minutes.
- [x] After deployment 4acda28, live SDK is initialized, capture enabled, opt-out false; navigating Home → Work emits `$pageview` with `/work`, autocapture, heatmap and replay events. Event/replay ingestion returns HTTP 200; SDK response callbacks confirm JSON status `Ok` from both `/i/v0/e/` and `/s/`. Browser/server clocks agree.
- [ ] Authenticated PostHog dashboard/query verification: no personal API key or connected PostHog account is available in this session. Verify fresh events, replay visibility and reporting in the existing project; HTTP acceptance alone cannot establish those.

Keep PostHog as the single tracker for now. Product analytics includes one million events per month free: https://posthog.com/pricing. Google Analytics Standard is also free: https://marketingplatform.google.com/about/analytics/. Adding both is unnecessary for the current portfolio audit.

Collection scope is unchanged: no new identifiers, personal profiles or tracked inputs. Existing session replay and autocapture remain enabled as previously configured.

Gaurav will review the dashboard himself. Do not claim that transport acceptance establishes correct project routing or visible dashboard data. Project key matching and ingestion logs remain account-side checks; the shared link exposes neither.

Shared refresh behavior: https://posthog.com/docs/product-analytics/dashboards.
