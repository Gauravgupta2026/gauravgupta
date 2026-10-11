/** Mount inside the hero artwork slot and accept hiring only from this frame. */
export function mountNammaAuto(container, src, onHire, active = true) {
  const url = new URL(src, location.href);
  if (url.origin !== location.origin) throw new Error('Namma Auto must be hosted on the portfolio origin.');
  url.searchParams.set('embed', '1');
  url.searchParams.set('wait', '1');
  const frame = document.createElement('iframe');
  frame.className = 'namma-auto-frame';
  frame.title = 'Namma Auto — tap to hire';
  frame.src = url.href;
  const sendActivity = () => frame.contentWindow?.postMessage({ type: 'namma-auto:activity', active }, url.origin);
  frame.addEventListener('load', sendActivity);
  container.classList.add('namma-auto-slot');
  container.append(frame);
  const onMessage = (event) => {
    if (event.origin !== url.origin || event.source !== frame.contentWindow) return;
    if (event.data?.type === 'namma-auto:hire') onHire();
  };
  window.addEventListener('message', onMessage);
  return {
    setActive(next) {
      active = next;
      sendActivity();
    },
    destroy() {
      window.removeEventListener('message', onMessage);
      frame.removeEventListener('load', sendActivity);
      frame.remove();
      container.classList.remove('namma-auto-slot');
    },
  };
}
