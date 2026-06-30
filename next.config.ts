import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Pin Turbopack's workspace root to THIS project. Without this, a stray
// ~/pnpm-lock.yaml made Next infer the home directory as the root, so it
// watched/scanned all of $HOME — making dev startup and reloads crawl.
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
