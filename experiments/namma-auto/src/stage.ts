import { VIEW } from './constants';
import type { Point } from './types';

export interface StageFit {
  /** Screen pixels per stage pixel. */
  readonly scale: number;
  /** Converts stage pixels to viewport pixels. */
  toScreen: (x: number, y: number) => Point;
}

/**
 * Maps the stage onto the square art box. The box size is a CSS value (`--art-size`),
 * so this reads the real pixel size and re-reads it when the window changes.
 */
export function fitStage(art: HTMLElement, stage: HTMLElement): StageFit {
  const fit = {
    scale: 1,
    toScreen: (x: number, y: number): Point => ({ x, y }),
  };

  const apply = (): void => {
    const rect = art.getBoundingClientRect();
    const scale = rect.width / VIEW.size;
    fit.scale = scale;
    fit.toScreen = (x, y) => ({ x: rect.left + (x - VIEW.x) * scale, y: rect.top + (y - VIEW.y) * scale });
    stage.style.transform = `scale(${scale}) translate(${-VIEW.x}px, ${-VIEW.y}px)`;
  };

  apply();
  window.addEventListener('resize', apply);
  window.visualViewport?.addEventListener('resize', apply);
  return fit;
}
