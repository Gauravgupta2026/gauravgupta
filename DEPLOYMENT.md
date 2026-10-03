# Experiments deployment

This branch serves the alternate landing page at `/`. The original landing page remains in the `portfolio-release` PR targeting `main`.

## Vercel setup

1. Create a separate Vercel project named `gauravgupta-experiments` and import `Gauravgupta2026/gauravgupta`.
2. Select Next.js, leave the root directory as `.`, and use the default npm build settings.
3. In Settings > Environments > Production > Branch Tracking, set the branch to `experiments` before deploying production.
4. Add `NEXT_PUBLIC_SITE_URL=https://experiments.gauravguptas.com` to the Production environment, then redeploy the latest `experiments` commit.
5. In Settings > Domains, add `experiments.gauravguptas.com`. Add the exact CNAME record Vercel provides at your DNS provider, then wait for Valid Configuration and HTTPS.

Keep the existing production project and its `main` branch connection unchanged. Analytics are optional; no secrets are copied from the other project. The experiments site requests no indexing through page metadata and robots.txt.
