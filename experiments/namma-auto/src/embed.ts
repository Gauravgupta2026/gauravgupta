/** The auto and portfolio are hosted on the same origin. */
const embedded = window.parent !== window && new URLSearchParams(location.search).get('embed') === '1';
if (embedded) document.documentElement.classList.add('embedded');

export function hire(): void {
  if (embedded) window.parent.postMessage({ type: 'namma-auto:hire' }, location.origin);
  else location.assign('/about#contact');
}

let active = !embedded || new URLSearchParams(location.search).get('wait') !== '1';
const listeners = new Set<(active: boolean) => void>();
window.addEventListener('message', (event: MessageEvent) => {
  if (!embedded || event.origin !== location.origin || event.source !== window.parent) return;
  if (event.data?.type !== 'namma-auto:activity' || typeof event.data.active !== 'boolean') return;
  active = event.data.active;
  for (const listener of listeners) listener(active);
});
export function observeActivity(listener: (active: boolean) => void): void {
  listeners.add(listener);
  listener(active);
}
