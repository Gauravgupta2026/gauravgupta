import { describe, expect, it } from 'vitest';
import { pickPose, projectedWidth, recedeScale, rearWheelPoints } from '../src/math';

const pose = (id: string, yaw: number) => ({ id, def: { yaw } });
const full = [pose('side', 0), pose('q1', 30), pose('q2', 60), pose('rear', 90)];
const sparse = [pose('side', 0), pose('rear', 90)];

describe('pickPose', () => {
  it('returns the exact pose at its own yaw with no squash', () => {
    for (const p of full) {
      const pick = pickPose(p.def.yaw, full);
      expect(pick.pose.id).toBe(p.id);
      expect(pick.scaleX).toBeCloseTo(1, 5);
    }
  });

  it('uses the nearest pose in a full set', () => {
    expect(pickPose(10, full).pose.id).toBe('side');
    expect(pickPose(20, full).pose.id).toBe('q1');
    expect(pickPose(80, full).pose.id).toBe('rear');
  });

  it('bridges a sparse set with side first, rear last', () => {
    expect(pickPose(10, sparse).pose.id).toBe('side');
    expect(pickPose(88, sparse).pose.id).toBe('rear');
  });

  it('never returns an extreme squash', () => {
    for (let yaw = 0; yaw <= 100; yaw += 5) {
      const { scaleX } = pickPose(yaw, sparse);
      expect(scaleX).toBeGreaterThanOrEqual(0.55);
      expect(scaleX).toBeLessThanOrEqual(1.08);
    }
  });
});

describe('projectedWidth', () => {
  it('is longest-ish side-on and narrowest from behind', () => {
    expect(projectedWidth(0)).toBeGreaterThan(projectedWidth(90));
  });
});

describe('recedeScale', () => {
  it('starts at 1, ends small, and never grows', () => {
    expect(recedeScale(0, 10, 22)).toBe(1);
    expect(recedeScale(1, 10, 22)).toBeCloseTo(1 / 33, 5);
    let prev = 1;
    for (let u = 0.05; u <= 1; u += 0.05) {
      const s = recedeScale(u, 10, 22);
      expect(s).toBeLessThan(prev);
      prev = s;
    }
  });
});

describe('rearWheelPoints', () => {
  it('puts both wheels left of centre when the auto faces right', () => {
    const [a, b] = rearWheelPoints(500, 1400, 0, 300);
    expect(a.x).toBeLessThan(500);
    expect(b.x).toBeLessThan(500);
    expect(a.y).toBeGreaterThan(b.y);
  });

  it('spreads the wheels left and right when seen from behind', () => {
    const [a, b] = rearWheelPoints(500, 1400, 90, 300);
    expect(Math.abs(a.x - b.x)).toBeGreaterThan(300);
    expect(a.y).toBeGreaterThan(1400);
  });
});
