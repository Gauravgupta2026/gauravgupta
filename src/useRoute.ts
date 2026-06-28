import { useEffect, useState } from "react";

// A deliberately tiny hash-based router. The site deploys as a static bundle
// (`base: "./"`), so hash routing works on any host without server rewrites and
// without adding a dependency. In-page anchors (`#about`, `#projects`, `#top`)
// stay untouched — only `#/project/<id>` is treated as a separate page.

export type Route = { name: "home" } | { name: "project"; id: string };

const PROJECT_PREFIX = "#/project/";

/** Build the hash URL for a project detail page. */
export function projectPath(id: string): string {
  return `${PROJECT_PREFIX}${encodeURIComponent(id)}`;
}

/** Map the current location hash to a route. Unknown hashes fall back to home. */
export function parseHash(hash: string): Route {
  if (hash.startsWith(PROJECT_PREFIX)) {
    const id = decodeURIComponent(hash.slice(PROJECT_PREFIX.length));
    if (id) return { name: "project", id };
  }
  return { name: "home" };
}

/** Subscribe to hash changes and return the current route. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash)
  );

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}
