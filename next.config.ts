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
  async headers() {
    return [
      { source: "/namma-auto/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      // The manifest selects the current hashed art; always check for its latest version.
      { source: "/namma-auto/assets/manifest.json", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
    ];
  },
  // The contact card now closes the About page.
  async redirects() {
    return [{ source: "/contact", destination: "/about#contact", permanent: false }];
  },
};

export default nextConfig;
