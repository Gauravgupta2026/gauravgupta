/** Rectangle in fractions (0..1) of an image's width and height. */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Point in fractions (0..1) of an image's width and height. */
export interface Point {
  x: number;
  y: number;
}

/**
 * Places where code draws on top of the artwork, as fractions of the trimmed image.
 * They survive any export size. Measure them once per art set.
 */
export interface PoseSlots {
  /** The black rear glass. "FOR HIRE" is lit up here. */
  signWindow?: Rect;
  /** The yellow number plate. */
  numberPlate?: Rect;
  /** Where exhaust smoke and backfire sparks leave the vehicle. */
  exhaust?: Point;
}

export type PoseId = 'side' | 'q1' | 'q2' | 'rear';

export interface PoseDef {
  id: PoseId;
  /** Degrees. 0 = pure side view, 90 = pure rear view. */
  yaw: number;
  src: string;
  /** Fraction of image width where the vehicle's vertical axis sits. Default 0.5. */
  anchorX?: number;
  /** Fraction of image height where the ground contact point sits. Default 1. */
  anchorY?: number;
  slots?: PoseSlots;
}

export interface Manifest {
  scene: {
    /** Vanishing point of the road, fractions of the stage. */
    vanishingPoint: Point;
    /** Where the wheels touch the road, fraction of stage height. */
    groundY: number;
    /** Horizontal centre of the road, fraction of stage width. */
    centerX: number;
    /** Visual height of the vehicle (ground to roof) in stage pixels. */
    autoHeight: number;
  };
  background: string;
  poses: PoseDef[];
}

export interface LoadedPose {
  def: PoseDef;
  img: HTMLImageElement;
  slots: PoseSlots;
  anchorX: number;
  anchorY: number;
  /** Rendered size in stage pixels at scale 1. */
  width: number;
  height: number;
}
