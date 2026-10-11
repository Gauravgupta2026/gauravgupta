import { VIEW } from './constants';
import { clamp, mulberry32 } from './math';

export type Tint = 'dust' | 'smoke';
export type Layer = 'back' | 'front';

interface Palette {
  base: string;
  shade: string;
  highlight: string;
  ink: string;
}

const PALETTES: Record<Tint, Palette> = {
  dust: { base: '#f1ddb4', shade: '#cfa777', highlight: '#fff3d9', ink: 'rgba(96,58,30,0.5)' },
  smoke: { base: '#e6e2e8', shade: '#aea9ba', highlight: '#ffffff', ink: 'rgba(40,36,70,0.45)' },
};

const PUFF_SPRITE_PX = 256;
const PUFF_VARIANTS = 4;
const PUFF_BLOBS = 8;
const MAX_PUFFS = 260;
const MAX_PETALS = 90;
const AMBIENT_PETALS = 14;
const PETAL_COLOURS = ['#e4146b', '#ff3d8b', '#ff7a00', '#ffb000'] as const;
const SPARK_COLOURS = ['#fff1a8', '#ffc83d', '#ff8a1f'] as const;
const SKID_COLOUR = 'rgba(28, 16, 10, 1)';
const SPEED_LINE_COLOUR = '42, 26, 18';
const SPEED_LINE_MAX = 54;
/** The art is small on screen, so loose bits are drawn large in stage units to stay visible. */
const PETAL_MIN_PX = 30;
const PETAL_RANGE_PX = 22;
const PETAL_GRAVITY = 600;
const SPARK_GRAVITY = 1100;

interface Puff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  grow: number;
  age: number;
  life: number;
  alpha: number;
  rot: number;
  vr: number;
  drag: number;
  sprite: HTMLCanvasElement;
  layer: Layer;
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  phase: number;
  age: number;
  life: number;
  colour: string;
  layer: Layer;
  ambient: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  len: number;
}

interface Ring {
  x: number;
  y: number;
  rx: number;
  ry: number;
  age: number;
  life: number;
  width: number;
}

export interface PuffOptions {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  size: number;
  grow?: number;
  life?: number;
  alpha?: number;
  drag?: number;
  tint?: Tint;
  layer?: Layer;
}

type Ctx = CanvasRenderingContext2D;

/** A canvas that covers the visible square. Drawing code keeps using stage coordinates. */
function context(canvas: HTMLCanvasElement, resolution: number): Ctx {
  canvas.width = Math.round(VIEW.size * resolution);
  canvas.height = Math.round(VIEW.size * resolution);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D is not available in this browser');
  ctx.setTransform(resolution, 0, 0, resolution, -VIEW.x * resolution, -VIEW.y * resolution);
  return ctx;
}

const clearView = (g: Ctx): void => g.clearRect(VIEW.x, VIEW.y, VIEW.size, VIEW.size);

/**
 * One painted puff: a ring of overlapping circles with an ink edge, a shade tone and
 * a light tone. Flat shapes match the gouache look of the artwork better than a blur.
 */
function buildPuffSprite(rand: () => number, palette: Palette): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = PUFF_SPRITE_PX;
  canvas.height = PUFF_SPRITE_PX;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('Canvas 2D is not available in this browser');
  const c = PUFF_SPRITE_PX / 2;

  const blobs = Array.from({ length: PUFF_BLOBS }, (_, i) => {
    const angle = (i / PUFF_BLOBS) * Math.PI * 2 + rand() * 0.6;
    const dist = 38 + rand() * 24;
    return { x: c + Math.cos(angle) * dist, y: c + Math.sin(angle) * dist * 0.85, r: 34 + rand() * 20 };
  });
  blobs.push({ x: c, y: c, r: 58 });

  const paint = (colour: string, dx: number, dy: number, grow: number): void => {
    g.fillStyle = colour;
    for (const b of blobs) {
      g.beginPath();
      g.arc(b.x + dx, b.y + dy, Math.max(4, b.r + grow), 0, Math.PI * 2);
      g.fill();
    }
  };

  paint(palette.ink, 0, 0, 3.5);
  paint(palette.shade, 0, 0, 0);
  g.globalCompositeOperation = 'source-atop';
  paint(palette.base, -9, -11, -9);
  paint(palette.highlight, -22, -26, -24);
  return canvas;
}

/** Everything that moves on the canvases: smoke, dust, petals, sparks, skid marks, speed lines. */
export class Fx {
  private readonly back: Ctx;
  private readonly front: Ctx;
  private readonly ground: Ctx;
  private readonly sprites: Record<Tint, HTMLCanvasElement[]>;
  private readonly rand = mulberry32(2026);
  private readonly puffs: Puff[] = [];
  private readonly petals: Petal[] = [];
  private readonly sparks: Spark[] = [];
  private readonly rings: Ring[] = [];
  private speed = 0;
  private speedCx = VIEW.x + VIEW.size / 2;
  private speedCy = VIEW.y + VIEW.size / 2;
  private ambient = true;

  /** `resolution` is canvas pixels per stage pixel. Keep it low: the art is small on screen. */
  constructor(back: HTMLCanvasElement, front: HTMLCanvasElement, ground: HTMLCanvasElement, resolution: number) {
    this.back = context(back, resolution);
    this.front = context(front, resolution);
    this.ground = context(ground, resolution);
    const make = (tint: Tint): HTMLCanvasElement[] =>
      Array.from({ length: PUFF_VARIANTS }, () => buildPuffSprite(this.rand, PALETTES[tint]));
    this.sprites = { dust: make('dust'), smoke: make('smoke') };
    for (let i = 0; i < AMBIENT_PETALS; i += 1) this.spawnAmbientPetal(true);
  }

  /** Turns the slow drifting petals on or off. */
  setAmbient(on: boolean): void {
    this.ambient = on;
    if (!on) {
      for (let i = this.petals.length - 1; i >= 0; i -= 1) {
        if (this.petals[i]?.ambient) this.petals.splice(i, 1);
      }
    }
  }

  /** 0..1 strength of the speed lines, radiating from (cx, cy). */
  setSpeedLines(strength: number, cx: number, cy: number): void {
    this.speed = clamp(strength, 0, 1);
    this.speedCx = cx;
    this.speedCy = cy;
  }

  puff(o: PuffOptions): void {
    const tint = o.tint ?? 'dust';
    const list = this.sprites[tint];
    const sprite = list[Math.floor(this.rand() * list.length)];
    if (!sprite) return;
    if (this.puffs.length >= MAX_PUFFS) this.puffs.shift();
    this.puffs.push({
      x: o.x,
      y: o.y,
      vx: o.vx ?? 0,
      vy: o.vy ?? 0,
      size: o.size,
      grow: o.grow ?? o.size * 1.2,
      age: 0,
      life: o.life ?? 1.1,
      alpha: o.alpha ?? 0.9,
      rot: this.rand() * Math.PI * 2,
      vr: (this.rand() - 0.5) * 0.9,
      drag: o.drag ?? 1.6,
      sprite,
      layer: o.layer ?? 'back',
    });
  }

  /** A burst of loose petals thrown outward, for drifts and launches. */
  petalBurst(x: number, y: number, count: number, force: number): void {
    for (let i = 0; i < count; i += 1) {
      if (this.petals.length >= MAX_PETALS) break;
      const angle = -Math.PI * (0.1 + this.rand() * 0.8);
      const speed = force * (0.4 + this.rand() * 0.8);
      this.petals.push(this.makePetal(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, false));
    }
  }

  sparksBurst(x: number, y: number, count: number, dirX: number, spread: number): void {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.atan2(-0.25, dirX) + (this.rand() - 0.5) * spread;
      const speed = 500 + this.rand() * 900;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        age: 0,
        life: 0.22 + this.rand() * 0.25,
        len: 40 + this.rand() * 70,
      });
    }
  }

  ring(x: number, y: number, rx: number, life = 0.55): void {
    this.rings.push({ x, y, rx, ry: rx * 0.22, age: 0, life, width: 26 });
  }

  /** Draws one piece of tyre mark on the permanent ground layer. */
  skid(ax: number, ay: number, bx: number, by: number, width: number, alpha: number): void {
    const g = this.ground;
    g.globalAlpha = alpha;
    g.strokeStyle = SKID_COLOUR;
    g.lineCap = 'round';
    g.lineWidth = width;
    g.beginPath();
    g.moveTo(ax, ay);
    g.lineTo(bx, by);
    g.stroke();
    g.globalAlpha = 1;
  }

  clearGround(): void {
    clearView(this.ground);
  }

  clearAll(): void {
    this.puffs.length = 0;
    this.sparks.length = 0;
    this.rings.length = 0;
    for (let i = this.petals.length - 1; i >= 0; i -= 1) {
      if (!this.petals[i]?.ambient) this.petals.splice(i, 1);
    }
    this.speed = 0;
    this.clearGround();
  }

  update(dt: number): void {
    clearView(this.back);
    clearView(this.front);
    this.stepPuffs(dt);
    this.stepPetals(dt);
    this.stepSparks(dt);
    this.stepRings(dt);
    this.drawSpeedLines();
  }

  private ctxFor(layer: Layer): Ctx {
    return layer === 'back' ? this.back : this.front;
  }

  private stepPuffs(dt: number): void {
    for (let i = this.puffs.length - 1; i >= 0; i -= 1) {
      const p = this.puffs[i];
      if (!p) continue;
      p.age += dt;
      if (p.age >= p.life) {
        this.puffs.splice(i, 1);
        continue;
      }
      const damp = Math.exp(-p.drag * dt);
      p.vx *= damp;
      p.vy *= damp;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      const t = p.age / p.life;
      const size = p.size + p.grow * (1 - (1 - t) * (1 - t));
      const fadeIn = Math.min(1, p.age / 0.07);
      const fadeOut = 1 - t * t;
      const g = this.ctxFor(p.layer);
      g.save();
      g.globalAlpha = p.alpha * fadeIn * fadeOut;
      g.translate(p.x, p.y);
      g.rotate(p.rot);
      g.drawImage(p.sprite, -size / 2, -size / 2, size, size);
      g.restore();
    }
  }

  private makePetal(x: number, y: number, vx: number, vy: number, ambient: boolean): Petal {
    return {
      x,
      y,
      vx,
      vy,
      rot: this.rand() * Math.PI * 2,
      vr: (this.rand() - 0.5) * 5,
      size: PETAL_MIN_PX + this.rand() * PETAL_RANGE_PX,
      phase: this.rand() * Math.PI * 2,
      age: 0,
      life: ambient ? Infinity : 2.4 + this.rand() * 1.4,
      colour: PETAL_COLOURS[Math.floor(this.rand() * PETAL_COLOURS.length)] ?? '#e4146b',
      layer: this.rand() < 0.35 ? 'front' : 'back',
      ambient,
    };
  }

  private spawnAmbientPetal(anywhere: boolean): void {
    const y = anywhere ? VIEW.y + this.rand() * VIEW.size : VIEW.y - 30;
    const x = VIEW.x + this.rand() * VIEW.size;
    const p = this.makePetal(x, y, 35 + this.rand() * 60, 90 + this.rand() * 90, true);
    this.petals.push(p);
  }

  private stepPetals(dt: number): void {
    for (let i = this.petals.length - 1; i >= 0; i -= 1) {
      const p = this.petals[i];
      if (!p) continue;
      p.age += dt;
      p.phase += dt * 3.2;
      if (p.ambient) {
        p.x += (p.vx + Math.sin(p.phase * 0.7) * 50) * dt;
        p.y += p.vy * dt;
        if (p.y > VIEW.y + VIEW.size + 30 || p.x > VIEW.x + VIEW.size + 40) {
          if (this.ambient) {
            p.x = VIEW.x + this.rand() * VIEW.size * 0.9 - 40;
            p.y = VIEW.y - 30;
          } else {
            this.petals.splice(i, 1);
            continue;
          }
        }
      } else {
        if (p.age >= p.life) {
          this.petals.splice(i, 1);
          continue;
        }
        p.vy += PETAL_GRAVITY * dt;
        p.vx *= Math.exp(-0.9 * dt);
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
      p.rot += p.vr * dt;
      this.drawPetal(p);
    }
  }

  private drawPetal(p: Petal): void {
    const g = this.ctxFor(p.layer);
    const flutter = Math.cos(p.phase);
    const fade = p.ambient ? 1 : clamp(1 - (p.age - (p.life - 0.6)) / 0.6, 0, 1);
    g.save();
    g.globalAlpha = 0.95 * fade;
    g.translate(p.x, p.y);
    g.rotate(p.rot);
    g.scale(0.35 + Math.abs(flutter) * 0.65, 1);
    g.fillStyle = p.colour;
    g.beginPath();
    g.moveTo(0, -p.size);
    g.quadraticCurveTo(p.size * 0.95, -p.size * 0.1, 0, p.size);
    g.quadraticCurveTo(-p.size * 0.95, -p.size * 0.1, 0, -p.size);
    g.fill();
    g.strokeStyle = 'rgba(80, 8, 40, 0.35)';
    g.lineWidth = 1.2;
    g.beginPath();
    g.moveTo(0, -p.size * 0.7);
    g.lineTo(0, p.size * 0.6);
    g.stroke();
    g.restore();
  }

  private stepSparks(dt: number): void {
    const g = this.front;
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.lineCap = 'round';
    for (let i = this.sparks.length - 1; i >= 0; i -= 1) {
      const s = this.sparks[i];
      if (!s) continue;
      s.age += dt;
      if (s.age >= s.life) {
        this.sparks.splice(i, 1);
        continue;
      }
      s.vy += SPARK_GRAVITY * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      const t = s.age / s.life;
      const speed = Math.hypot(s.vx, s.vy) || 1;
      g.strokeStyle = SPARK_COLOURS[Math.min(SPARK_COLOURS.length - 1, Math.floor(t * SPARK_COLOURS.length))] ?? '#ffc83d';
      g.globalAlpha = 1 - t;
      g.lineWidth = 14 - t * 9;
      g.beginPath();
      g.moveTo(s.x, s.y);
      g.lineTo(s.x - (s.vx / speed) * s.len, s.y - (s.vy / speed) * s.len);
      g.stroke();
    }
    g.restore();
  }

  private stepRings(dt: number): void {
    const g = this.back;
    for (let i = this.rings.length - 1; i >= 0; i -= 1) {
      const r = this.rings[i];
      if (!r) continue;
      r.age += dt;
      if (r.age >= r.life) {
        this.rings.splice(i, 1);
        continue;
      }
      const t = r.age / r.life;
      const e = 1 - (1 - t) * (1 - t);
      g.save();
      g.globalAlpha = (1 - t) * 0.4;
      g.strokeStyle = '#2a1a12';
      g.lineWidth = r.width * (1 - t) + 2;
      g.beginPath();
      g.ellipse(r.x, r.y, r.rx * (0.2 + e * 1.4), r.ry * (0.2 + e * 1.4), 0, 0, Math.PI * 2);
      g.stroke();
      g.restore();
    }
  }

  private drawSpeedLines(): void {
    if (this.speed < 0.02) return;
    const g = this.front;
    const count = Math.round(SPEED_LINE_MAX * this.speed);
    g.save();
    g.lineCap = 'round';
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const near = 160 + Math.random() * 560;
      const far = near + 200 + Math.random() * 600 * this.speed;
      g.strokeStyle = `rgba(${SPEED_LINE_COLOUR}, ${0.06 + Math.random() * 0.22 * this.speed})`;
      g.lineWidth = 6 + Math.random() * 14;
      g.beginPath();
      g.moveTo(this.speedCx + Math.cos(angle) * near, this.speedCy + Math.sin(angle) * near);
      g.lineTo(this.speedCx + Math.cos(angle) * far, this.speedCy + Math.sin(angle) * far);
      g.stroke();
    }
    g.restore();
  }
}
