/*
 * WebGPU where the browser has it, WebGL where it does not. Each is its own chunk, so a device downloads only the one
 * it uses. The adapter is checked before the canvas is touched: a canvas can only ever belong to one of the two.
 */
async function hasWebGPU() {
  try { return Boolean(navigator.gpu && (await navigator.gpu.requestAdapter())); } catch { return false; }
}

export async function createRenderer(canvas, { antialias, force }) {
  const options = { canvas, antialias, alpha: true, powerPreference: 'high-performance' };
  if (force !== 'webgl' && await hasWebGPU()) {
    const { WebGPURenderer } = await import('./renderer-webgpu');
    const renderer = new WebGPURenderer(options); await renderer.init();
    return renderer;
  }
  const { WebGLRenderer } = await import('./renderer-webgl');
  return new WebGLRenderer(options);
}
