#!/usr/bin/env node
/**
 * Thin Linear GraphQL CLI for the analytics reviewer. Three commands:
 *
 *   node linear.mjs teams
 *       List teams + ids (one-time, to confirm LINEAR_TEAM resolves).
 *
 *   node linear.mjs list
 *       Print open/started issues in the team as JSON. The agent reads this to
 *       DEDUP — don't file an issue that already exists.
 *
 *   node linear.mjs create --title "..." --body-file path/to/body.md [--label bug]
 *       Create an issue. Body is Markdown (Linear renders it). Prints the new
 *       issue's identifier + url as JSON.
 *
 * Reads (from env / .env.local):
 *   LINEAR_API_KEY   lin_api_...  — required, a SECRET (never NEXT_PUBLIC_).
 *   LINEAR_TEAM      team name or key (e.g. "Portfolio" or "POR") — required
 *                    for `list` and `create`.
 */

import { readFileSync } from "node:fs";

const API = "https://api.linear.app/graphql";
const KEY = process.env.LINEAR_API_KEY;
const TEAM = process.env.LINEAR_TEAM;

if (!KEY) {
  console.error(
    "Missing LINEAR_API_KEY. Create one in Linear → Settings → Security &\n" +
      "access → Personal API keys, then put it in .env.local (no NEXT_PUBLIC_ —\n" +
      "it is a secret).",
  );
  process.exit(1);
}

/** POST a GraphQL query. Linear wants the raw key in Authorization (no Bearer). */
async function gql(query, variables = {}) {
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (body.errors) {
    throw new Error(`Linear API error: ${JSON.stringify(body.errors)}`);
  }
  return body.data;
}

/** Resolve LINEAR_TEAM (name or key) to a team id. */
async function resolveTeam() {
  if (!TEAM) throw new Error("Set LINEAR_TEAM (team name or key) in .env.local.");
  const data = await gql(`query { teams { nodes { id name key } } }`);
  const team = data.teams.nodes.find(
    (t) => t.key === TEAM || t.name.toLowerCase() === TEAM.toLowerCase(),
  );
  if (!team) {
    const available = data.teams.nodes.map((t) => `${t.name} (${t.key})`).join(", ");
    throw new Error(`No team matching "${TEAM}". Available: ${available}`);
  }
  return team.id;
}

/** Read a CLI flag value: --flag value. */
function flag(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
}

async function cmdTeams() {
  const data = await gql(`query { teams { nodes { id name key } } }`);
  process.stdout.write(JSON.stringify(data.teams.nodes, null, 2) + "\n");
}

async function cmdList() {
  const teamId = await resolveTeam();
  // Only unstarted/started issues — completed/canceled ones shouldn't block a
  // fresh filing, and closed noise would bloat the dedup context.
  const data = await gql(
    `query ($teamId: ID!) {
      issues(
        first: 100
        filter: {
          team: { id: { eq: $teamId } }
          state: { type: { in: ["triage", "backlog", "unstarted", "started"] } }
        }
        orderBy: updatedAt
      ) {
        nodes { identifier title url state { name } createdAt }
      }
    }`,
    { teamId },
  );
  process.stdout.write(JSON.stringify(data.issues.nodes, null, 2) + "\n");
}

async function cmdCreate() {
  const title = flag("--title");
  const bodyFile = flag("--body-file");
  const inlineBody = flag("--body");
  const labelName = flag("--label");

  if (!title || (!bodyFile && !inlineBody)) {
    throw new Error(
      'create requires --title and one of --body-file <path> / --body "<text>".',
    );
  }
  const description = bodyFile ? readFileSync(bodyFile, "utf8") : inlineBody;
  const teamId = await resolveTeam();

  // Optional label: resolve name → id within the team, skip if not found.
  let labelIds;
  if (labelName) {
    const data = await gql(
      `query ($teamId: String!) {
        team(id: $teamId) { labels { nodes { id name } } }
      }`,
      { teamId },
    );
    const label = data.team.labels.nodes.find(
      (l) => l.name.toLowerCase() === labelName.toLowerCase(),
    );
    if (label) labelIds = [label.id];
  }

  const data = await gql(
    `mutation ($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        success
        issue { identifier url title }
      }
    }`,
    { input: { teamId, title, description, ...(labelIds ? { labelIds } : {}) } },
  );

  if (!data.issueCreate.success) throw new Error("Linear issueCreate failed.");
  process.stdout.write(JSON.stringify(data.issueCreate.issue, null, 2) + "\n");
}

const COMMANDS = { teams: cmdTeams, list: cmdList, create: cmdCreate };

const cmd = process.argv[2];
const handler = COMMANDS[cmd];
if (!handler) {
  console.error(`Unknown command "${cmd ?? ""}". Use: teams | list | create`);
  process.exit(1);
}
handler().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
