#!/usr/bin/env node
/**
 * Pulls the signals the analytics reviewer reasons over, straight from PostHog,
 * and prints them as one JSON blob on stdout. The scheduled Claude/Codex
 * automation runs this, reads the JSON, decides what's worth a Linear issue,
 * and files rich write-ups via ./linear.mjs.
 *
 * This script does NOT decide anything — it only fetches. All judgement (is
 * this a real problem? what are the next moves?) is the agent's job.
 *
 * Reads (from env / .env.local):
 *   POSTHOG_PERSONAL_API_KEY   phx_...  — required. NOT the phc_ website key;
 *                                         a Personal API key with query read.
 *   POSTHOG_PROJECT_ID         numeric  — optional; auto-resolved if omitted.
 *   POSTHOG_HOST               defaults to https://us.i.posthog.com
 *
 * Usage:  node posthog-signals.mjs [--days 7]
 */

const HOST = (process.env.POSTHOG_HOST ?? "https://us.i.posthog.com").replace(
  /\/$/,
  "",
);
const PERSONAL_KEY = process.env.POSTHOG_PERSONAL_API_KEY;

// Lookback window for every query. One week smooths out day-of-week noise
// without dragging in stale, already-fixed issues.
const DEFAULT_DAYS = 7;

if (!PERSONAL_KEY) {
  console.error(
    "Missing POSTHOG_PERSONAL_API_KEY. Create one in PostHog → Settings →\n" +
      "Personal API keys (scopes: Query Read + Error tracking read), then put\n" +
      "it in .env.local. This is NOT the public phc_ website key.",
  );
  process.exit(1);
}

const daysArg = process.argv.indexOf("--days");
const DAYS = daysArg > -1 ? Number(process.argv[daysArg + 1]) : DEFAULT_DAYS;

const authHeaders = {
  Authorization: `Bearer ${PERSONAL_KEY}`,
  "Content-Type": "application/json",
};

/** Resolve the numeric project id once, unless the env pins it. */
async function resolveProjectId() {
  if (process.env.POSTHOG_PROJECT_ID) return process.env.POSTHOG_PROJECT_ID;

  const res = await fetch(`${HOST}/api/projects/@current/`, {
    headers: authHeaders,
  });
  if (!res.ok) {
    throw new Error(
      `Could not resolve project id (HTTP ${res.status}). Set POSTHOG_PROJECT_ID ` +
        `explicitly — find it in PostHog → Settings → Project.`,
    );
  }
  const body = await res.json();
  return body.id;
}

/** Run one HogQL query, return rows as arrays plus their column names. */
async function hogql(projectId, query) {
  const res = await fetch(`${HOST}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HogQL query failed (HTTP ${res.status}): ${text}`);
  }
  const body = await res.json();
  // Reshape [[a,b],...] + [colA,colB] into [{colA:a, colB:b}, ...] so the
  // agent reads self-describing objects instead of positional arrays.
  return (body.results ?? []).map((row) =>
    Object.fromEntries((body.columns ?? []).map((c, i) => [c, row[i]])),
  );
}

const WINDOW = `timestamp > now() - interval ${DAYS} day`;

const QUERIES = {
  // JS errors captured by PostHog error tracking, grouped so the agent sees
  // "this exact exception happened N times", not one row per occurrence.
  errors: `
    SELECT
      properties.$exception_type    AS type,
      properties.$exception_message AS message,
      count()                       AS occurrences,
      count(DISTINCT person_id)     AS affected_users,
      max(timestamp)                AS last_seen,
      any(properties.$current_url)  AS example_url
    FROM events
    WHERE event = '$exception' AND ${WINDOW}
    GROUP BY type, message
    ORDER BY occurrences DESC
    LIMIT 50`,

  // Traffic by page — context for everything else (an error on a high-traffic
  // page matters more than the same error on one nobody visits).
  topPages: `
    SELECT
      properties.$pathname      AS path,
      count()                   AS views,
      count(DISTINCT person_id) AS visitors
    FROM events
    WHERE event = '$pageview' AND ${WINDOW}
    GROUP BY path
    ORDER BY views DESC
    LIMIT 25`,

  // Where visitors come from — signal for what's working / worth doubling down.
  referrers: `
    SELECT
      properties.$referring_domain AS referrer,
      count()                      AS views,
      count(DISTINCT person_id)    AS visitors
    FROM events
    WHERE event = '$pageview' AND ${WINDOW}
    GROUP BY referrer
    ORDER BY views DESC
    LIMIT 20`,

  // Core Web Vitals averages — the performance "scope for improvement" signal.
  // Values are ms except CLS (unitless). Google "good" thresholds for the agent
  // to compare against: LCP<2500, INP<200, CLS<0.1, FCP<1800.
  // PostHog stores event properties as strings, so each vital is cast to float
  // before averaging — avg() rejects String arguments otherwise.
  webVitals: `
    SELECT
      round(avg(toFloat(properties.$web_vitals_LCP_value)))    AS lcp_ms,
      round(avg(toFloat(properties.$web_vitals_INP_value)))    AS inp_ms,
      round(avg(toFloat(properties.$web_vitals_FCP_value)))    AS fcp_ms,
      round(avg(toFloat(properties.$web_vitals_CLS_value)), 3) AS cls,
      count()                                                  AS samples
    FROM events
    WHERE event = '$web_vitals' AND ${WINDOW}`,
};

async function main() {
  const projectId = await resolveProjectId();
  const signals = { host: HOST, projectId, windowDays: DAYS, data: {} };

  for (const [name, query] of Object.entries(QUERIES)) {
    try {
      signals.data[name] = await hogql(projectId, query);
    } catch (err) {
      // One failing query (e.g. no web-vitals captured yet) shouldn't sink the
      // whole run — record the error and keep going.
      signals.data[name] = { error: err.message };
    }
  }

  process.stdout.write(JSON.stringify(signals, null, 2) + "\n");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
