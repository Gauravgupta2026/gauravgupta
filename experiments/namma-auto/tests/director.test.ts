import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { gsap } from 'gsap';
import type { Sound } from '../src/audio';
import { Director, type DirectorUi } from '../src/director';
import type { Fx } from '../src/fx';
import type { AutoRig } from '../src/rig';
import type { Manifest } from '../src/types';

vi.mock('gsap', () => ({ gsap: {
  ticker: { add: vi.fn() }, set: vi.fn(), globalTimeline: { paused: vi.fn() },
  timeline: (options: { onComplete?: () => void } = {}) => {
    let timer: ReturnType<typeof setTimeout>;
    let end = 0;
    const timeline = {
      to: (_target: unknown, values: { duration?: number }, at = 0) => {
        end = Math.max(end, at + (values.duration ?? 0));
        clearTimeout(timer);
        timer = setTimeout(() => options.onComplete?.(), end * 1000);
        return timeline;
      },
      set: () => timeline, call: () => timeline, kill: () => clearTimeout(timer),
    };
    return timeline;
  },
  delayedCall: (seconds: number, callback: () => void) => {
    const timer = setTimeout(callback, seconds * 1000);
    return { kill: () => clearTimeout(timer) };
  },
} }));
function setup(start = true) {
  const show = vi.fn();
  const autoButton = { setAttribute: vi.fn(), toggleAttribute: vi.fn() };
  const manifest = { scene: { centerX: 0.5, groundY: 0.7, autoHeight: 400, vanishingPoint: { x: 0.5, y: 0.3 } } } as Manifest;
  const rig = { currentPose: { width: 400 }, overlay: { setLit: vi.fn() } } as unknown as AutoRig;
  const fx = { clearAll: vi.fn(), setAmbient: vi.fn() } as unknown as Fx;
  const sound = { unlock: vi.fn(), engineOn: vi.fn(), engineOff: vi.fn(), setRpm: vi.fn(), setActive: vi.fn() } as unknown as Sound;
  const director = new Director(manifest, rig, fx, sound, show, { autoButton, glint: {} } as unknown as DirectorUi);
  if (start) director.start();
  return { director, show, autoButton };
}
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('window', { matchMedia: () => ({ matches: true }), location: { hash: '#contact' } });
  vi.stubGlobal('document', { body: { dataset: {} } });
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
describe('hiring requires a second tap', () => {
  it('waits for the hero to become active before starting its arrival or timeout', () => {
    const { director, show } = setup(false);
    director.setActive(false);
    vi.advanceTimersByTime(20000);
    expect(director.currentPhase).toBe('loading');
    director.setActive(true);
    expect(director.currentPhase).toBe('idle');
    expect(show).not.toHaveBeenCalled();
  });
  it('leaves after inactivity without navigating, even with a contact hash', () => {
    const { director, show, autoButton } = setup();
    vi.advanceTimersByTime(12000);
    expect(director.currentPhase).toBe('departed');
    expect(show).not.toHaveBeenCalled();
    expect(autoButton.toggleAttribute).toHaveBeenLastCalledWith('disabled', true);
  });
  it('resets the timeout after the first tap and leaves without navigating', () => {
    const { director, show } = setup();
    vi.advanceTimersByTime(10000);
    director.tap();
    vi.advanceTimersByTime(2000);
    expect(director.currentPhase).toBe('presenting');
    vi.advanceTimersByTime(10000);
    expect(director.currentPhase).toBe('departed');
    expect(show).not.toHaveBeenCalled();
  });
  it('waits for the second-tap animation and ignores repeated taps during it', () => {
    vi.stubGlobal('window', { matchMedia: () => ({ matches: false }) });
    const { director, show } = setup();
    vi.advanceTimersByTime(2400);
    expect(director.currentPhase).toBe('idle');
    director.tap();
    vi.advanceTimersByTime(2500);
    expect(director.currentPhase).toBe('presenting');
    director.tap(); director.tap();
    director.setActive(false);
    expect(gsap.globalTimeline.paused).toHaveBeenLastCalledWith(false);
    vi.advanceTimersByTime(549);
    expect(show).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(show).toHaveBeenCalledExactlyOnceWith();
    vi.advanceTimersByTime(15000);
    expect(show).toHaveBeenCalledTimes(1);
  });
  it('opens the contact page after a second tap and cancels the timeout', () => {
    const { director, show } = setup();
    director.tap(); director.tap(); director.tap();
    vi.advanceTimersByTime(15000);
    expect(director.currentPhase).toBe('hired');
    expect(show).toHaveBeenCalledExactlyOnceWith();
  });
});
