// Keep entry state only for this document; a reload starts a fresh entrance.
let entered = false;

export function needsEntrance(): boolean {
  return new URLSearchParams(location.search).has("intro") || !entered;
}

export function markEntered(): void {
  entered = true;
}
