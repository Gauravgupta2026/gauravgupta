/** Logical stage size. All artwork positions use these units. */
export const STAGE_W = 1080;
export const STAGE_H = 1920;

/**
 * The visible square, in stage pixels. CSS scales it to the real art size (4cm by default).
 * It is wider than the stage so the auto has air on both sides and the road fades out inside it.
 */
export const VIEW = { x: -160, y: 552, size: 1400 } as const;
