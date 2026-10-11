export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const toRad = (deg: number): number => (deg * Math.PI) / 180;

/** Real auto-rickshaw body, metres. Used to predict how wide it looks at any yaw. */
export const BODY_LENGTH_M = 2.6;
export const BODY_WIDTH_M = 1.4;
export const BODY_HEIGHT_M = 1.7;
/** Distance from body centre back to the rear axle, metres. */
export const REAR_AXLE_BACK_M = 0.95;
/** Half the distance between the two rear wheels, metres. */
export const REAR_HALF_TRACK_M = 0.62;
/** How much the road plane is squashed on screen (low camera). */
export const GROUND_SQUASH = 0.22;

/** Width of the body's silhouette seen from the side-on camera at a given yaw. */
export function projectedWidth(yawDeg: number): number {
  const a = toRad(yawDeg);
  return BODY_LENGTH_M * Math.abs(Math.cos(a)) + BODY_WIDTH_M * Math.abs(Math.sin(a));
}

const MIN_SCALE_X = 0.55;
const MAX_SCALE_X = 1.08;

export interface PosePick<T> {
  pose: T;
  /** Horizontal squash that bridges the gap when no drawn pose is close. */
  scaleX: number;
}

/** Weight of the yaw gap in the pose cost. A full turn (90 degrees) costs 1. */
const YAW_COST_PER_DEGREE = 1 / 90;
/** Weight of the horizontal squash in the pose cost. */
const SQUASH_COST = 0.35;

/**
 * Chooses which drawn pose to show for a yaw angle.
 * The nearest pose wins, unless it would need a large squash to fit the turn.
 * With a full set of poses this is plain "nearest". With only side + rear it still
 * gives a believable turn, because the squash replaces the missing in-between art.
 */
export function pickPose<T extends { def: { yaw: number } }>(yawDeg: number, poses: readonly T[]): PosePick<T> {
  const target = projectedWidth(yawDeg);
  let best: PosePick<T> | undefined;
  let bestCost = Infinity;
  for (const pose of poses) {
    const scaleX = target / projectedWidth(pose.def.yaw);
    const cost = Math.abs(yawDeg - pose.def.yaw) * YAW_COST_PER_DEGREE + Math.abs(Math.log(scaleX)) * SQUASH_COST;
    if (cost < bestCost) {
      bestCost = cost;
      best = { pose, scaleX };
    }
  }
  if (!best) throw new Error('pickPose needs at least one pose');
  return { pose: best.pose, scaleX: clamp(best.scaleX, MIN_SCALE_X, MAX_SCALE_X) };
}

/**
 * Perspective scale for a vehicle driving away along the road.
 * `u` runs 0..1. The cubic term makes the acceleration feel abnormal:
 * slow at first, then it falls into the distance.
 */
export function recedeScale(u: number, quad: number, cubic: number): number {
  const t = clamp(u, 0, 1);
  return 1 / (1 + quad * t * t + cubic * t * t * t);
}

export interface GroundPoint {
  x: number;
  y: number;
}

/**
 * Screen position of the two rear wheels for a body at (cx, cy) with a yaw.
 * Ground coordinates: +x right, +z toward the camera. Forward at yaw 0 is +x,
 * and at yaw 90 it points away from the camera.
 */
export function rearWheelPoints(cx: number, cy: number, yawDeg: number, pxPerMetre: number): [GroundPoint, GroundPoint] {
  const a = toRad(yawDeg);
  const fwd = { x: Math.cos(a), z: -Math.sin(a) };
  const right = { x: Math.sin(a), z: Math.cos(a) };
  const axle = { x: -fwd.x * REAR_AXLE_BACK_M, z: -fwd.z * REAR_AXLE_BACK_M };
  const toScreen = (gx: number, gz: number): GroundPoint => ({
    x: cx + gx * pxPerMetre,
    y: cy + gz * pxPerMetre * GROUND_SQUASH,
  });
  return [
    toScreen(axle.x + right.x * REAR_HALF_TRACK_M, axle.z + right.z * REAR_HALF_TRACK_M),
    toScreen(axle.x - right.x * REAR_HALF_TRACK_M, axle.z - right.z * REAR_HALF_TRACK_M),
  ];
}

/** Deterministic pseudo-random generator so effects look the same on every run. */
export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
