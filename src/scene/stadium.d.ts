/** Builds the stadium inside `root` (the hero element). Resolves to a function that tears it down. `force` picks a renderer for testing. */
export function mountStadium(root: HTMLElement, options?: { showPanel?: boolean; force?: 'webgl' }): Promise<() => void>;
