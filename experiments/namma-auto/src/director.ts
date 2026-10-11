import { gsap } from 'gsap';
import type { Sound } from './audio';
import { STAGE_H, STAGE_W } from './constants';
import type { Fx } from './fx';
import { BODY_HEIGHT_M, recedeScale, rearWheelPoints } from './math';
import { type AutoRig, type RigState, restingState } from './rig';
import type { Manifest, Point } from './types';

export type Phase = 'loading' | 'intro' | 'idle' | 'drift' | 'presenting' | 'launch' | 'hired' | 'departed';

export interface DirectorUi {
  world: HTMLElement;
  /** Gets a spoken label that follows the current step. */
  autoButton: HTMLElement;
  glint: HTMLElement;
  /** Converts stage pixels to viewport pixels. */
  toScreen: (x: number, y: number) => Point;
}

/** All timing and distance numbers in one place. Seconds, stage pixels, degrees. */
const TUNE = {
  idleShake: 0.7,
  /** The auto hops and honks by itself, so people know to tap it. */
  firstNudge: 2.2,
  nudgeEvery: 7,
  inactivitySeconds: 12,
  hire: { duration: 0.55, lift: 24, scale: 0.94 },
  nudgeHop: 16,

  intro: { offscreenMargin: 90, duration: 1.55, brakeAt: 0.95, nose: 2.4 },

  drift: {
    anticipate: 0.32,
    launchAt: 0.32,
    launchDuration: 0.3,
    launchForward: 120,
    launchYaw: 20,
    slideAt: 0.55,
    slideDuration: 0.78,
    overshootYaw: 94,
    settleAt: 1.33,
    settleDuration: 0.5,
    restYaw: 90,
    restScale: 1.04,
    restDrop: 14,
    lean: -5,
    skidOn: 0.5,
    skidOff: 1.5,
    revealAt: 1.9,
    readyAt: 2.5,
  },

  launch: {
    revAt: 0.3,
    revDuration: 0.75,
    popAt: 1.05,
    pitch: -13,
    departAt: 1.35,
    departDuration: 1.75,
    quad: 10,
    cubic: 22,
    weave: 26,
    vanishAt: 3.0,
    popBackfireAt: [0.62, 0.78, 0.93],
  },

  skidWidthMetres: 0.07,
  skidAlpha: 0.5,
  dustPerSecond: 46,
  trailPerSecond: 52,
  exhaustIdleRate: 1.1,
  exhaustRevRate: 22,
} as const;

interface Camera {
  zoom: number;
  x: number;
  y: number;
  shake: number;
}

interface Flags {
  exhaustRate: number;
  skid: number;
  trail: number;
  /** 0..1 progress of the drive-away. */
  u: number;
}

const MAX_FRAME_S = 0.05;
const PHASE_LABELS: Record<Phase, string> = {
  loading: 'Loading',
  intro: 'The auto is arriving',
  idle: 'Tap the auto',
  drift: 'The auto is turning',
  presenting: 'The auto is for hire. Tap it to hire',
  launch: 'The auto is leaving',
  hired: 'Opening the contact page',
  departed: 'The auto has left',
};
/** Camera push-in on the rear window, so the sign is easier to read in a small square. */
const PRESENT_ZOOM = 2.2;
const PRESENT_ZOOM_S = 0.9;

export class Director {
  private phase: Phase = 'loading';
  private active = true;
  private started = false;
  private readonly s: RigState;
  private readonly cam: Camera = { zoom: 1, x: 0, y: 0, shake: 0 };
  private readonly flags: Flags = { exhaustRate: TUNE.exhaustIdleRate, skid: 0, trail: 0, u: 0 };
  private readonly acc = { exhaust: 0, dust: 0, trail: 0 };
  private lastWheels: [Point, Point] | null = null;
  private main: gsap.core.Timeline | null = null;
  private departureCall: gsap.core.Tween | null = null;
  private nudgeCall: gsap.core.Tween | null = null;
  private launchFrom = { x: 0, y: 0, scale: 1 };
  private readonly cx: number;
  private readonly gy: number;
  private readonly vp: Point;
  private readonly pxPerMetre: number;
  private readonly reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(
    manifest: Manifest,
    private readonly rig: AutoRig,
    private readonly fx: Fx,
    private readonly sound: Sound,
    private readonly onHire: () => void,
    private readonly ui: DirectorUi,
  ) {
    const { scene } = manifest;
    this.cx = STAGE_W * scene.centerX;
    this.gy = STAGE_H * scene.groundY;
    this.vp = { x: STAGE_W * scene.vanishingPoint.x, y: STAGE_H * scene.vanishingPoint.y };
    this.pxPerMetre = scene.autoHeight / BODY_HEIGHT_M;
    this.s = restingState(this.cx, this.gy);
    gsap.ticker.add((_time, deltaMs) => this.frame(Math.min(deltaMs / 1000, MAX_FRAME_S)));
  }

  get currentPhase(): Phase {
    return this.phase;
  }

  // ---------------------------------------------------------------- phases

  private setPhase(phase: Phase): void {
    this.phase = phase;
    document.body.dataset.state = phase;
    this.ui.autoButton.setAttribute('aria-label', PHASE_LABELS[phase]);
    this.ui.autoButton.toggleAttribute('disabled', phase === 'departed' || phase === 'hired');
  }

  setActive(active: boolean): void {
    this.active = active;
    // Once hiring is confirmed, scrolling away must not strand navigation.
    gsap.globalTimeline.paused(!active && this.phase !== 'hired');
    this.sound.setActive(active);
    if (active && !this.started) this.start();
  }

  /** The auto rolls in from the left and parks. Starts the whole piece. */
  start(): void {
    this.started = true;
    this.arrive();
  }

  tap(): void {
    this.sound.unlock();
    if (this.phase === 'idle') this.drift();
    else if (this.phase === 'presenting') {
      this.clearIdleCalls();
      this.setPhase('hired');
      this.sound.engineOff(TUNE.hire.duration);
      if (this.reduced) this.onHire();
      else {
        this.main?.kill();
        this.main = gsap.timeline({ onComplete: this.onHire })
          .to(this.s, { y: this.s.y - TUNE.hire.lift, scale: this.s.scale * TUNE.hire.scale, opacity: 0, duration: TUNE.hire.duration, ease: 'power2.inOut' });
      }
    }
  }

  private resetScene(): void {
    this.main?.kill();
    this.clearIdleCalls();
    Object.assign(this.s, restingState(this.cx, this.gy));
    Object.assign(this.cam, { zoom: 1, x: 0, y: 0, shake: 0 });
    Object.assign(this.flags, { exhaustRate: TUNE.exhaustIdleRate, skid: 0, trail: 0, u: 0 });
    this.lastWheels = null;
    this.fx.clearAll();
    this.fx.setAmbient(!this.reduced);
    this.rig.overlay?.setLit(0);
    gsap.set(this.ui.glint, { autoAlpha: 0, scale: 0 });
  }

  private arrive(): void {
    this.resetScene();
    this.setPhase('intro');
    const side = this.rig.currentPose;
    const startX = -(side.width / 2) - TUNE.intro.offscreenMargin;
    this.s.x = this.reduced ? this.cx : startX;
    this.s.shake = TUNE.idleShake * 3;
    this.s.opacity = this.reduced ? 1 : 0;

    if (this.reduced) {
      this.enterIdle();
      return;
    }
    const i = TUNE.intro;
    this.flags.trail = 1;
    this.sound.engineOn();
    this.sound.setRpm(0.55, 1);
    this.main = gsap
      .timeline({ onComplete: () => this.enterIdle() })
      .to(this.s, { x: this.cx, duration: i.duration, ease: 'power3.out' }, 0)
      .to(this.s, { opacity: 1, duration: 0.45, ease: 'power1.out' }, 0)
      .to(this.s, { tilt: i.nose, duration: 0.45, ease: 'power2.in' }, i.brakeAt)
      .to(this.s, { tilt: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' }, i.brakeAt + 0.45)
      .set(this.flags, { skid: 1 }, i.brakeAt + 0.1)
      .set(this.flags, { skid: 0, trail: 0 }, i.brakeAt + 0.55)
      .call(() => this.sound.skid(0.5), [], i.brakeAt + 0.1)
      .to(this.s, { shake: TUNE.idleShake, duration: 0.6 }, i.brakeAt + 0.5)
      .call(() => this.sound.setRpm(0, 1, 0.3), [], i.brakeAt + 0.4);
  }

  private enterIdle(): void {
    this.setPhase('idle');
    this.s.shake = this.reduced ? 0 : TUNE.idleShake;
    this.flags.exhaustRate = this.reduced ? 0 : TUNE.exhaustIdleRate;
    this.sound.engineOn();
    this.sound.setRpm(0, 1);
    this.scheduleNudge(TUNE.firstNudge);
    this.scheduleDeparture();
  }

  // ------------------------------------------------------------ hint & nudge

  private clearIdleCalls(): void {
    this.nudgeCall?.kill();
    this.nudgeCall = null;
    this.departureCall?.kill();
    this.departureCall = null;
  }

  private scheduleDeparture(): void {
    this.departureCall = gsap.delayedCall(TUNE.inactivitySeconds, () => {
      if (this.phase === 'idle' || this.phase === 'presenting') this.launch();
    });
  }

  /** Now and then the auto hops and honks, so people know it is alive. */
  private scheduleNudge(delay: number): void {
    if (this.reduced) return;
    this.nudgeCall?.kill();
    this.nudgeCall = gsap.delayedCall(delay, () => {
      if (this.phase !== 'idle' && this.phase !== 'presenting') return;
      this.sound.honk(2);
      gsap
        .timeline()
        .to(this.s, { y: `-=${TUNE.nudgeHop}`, squashY: 1.015, duration: 0.12, ease: 'power2.out' })
        .to(this.s, { y: `+=${TUNE.nudgeHop}`, squashY: 0.985, duration: 0.14, ease: 'power2.in' })
        .to(this.s, { squashY: 1, duration: 0.4, ease: 'elastic.out(1,0.35)' })
        .to(this.s, { y: `-=${TUNE.nudgeHop * 0.6}`, duration: 0.1, ease: 'power2.out' }, 0.2)
        .to(this.s, { y: `+=${TUNE.nudgeHop * 0.6}`, duration: 0.12, ease: 'power2.in' }, 0.3);
      this.scheduleNudge(TUNE.nudgeEvery);
    });
  }

  // -------------------------------------------------------------- tap one

  private drift(): void {
    this.clearIdleCalls();
    this.setPhase('drift');
    if (this.reduced) {
      this.s.yaw = TUNE.drift.restYaw;
      this.s.y = this.gy + TUNE.drift.restDrop;
      this.s.scale = TUNE.drift.restScale;
      this.revealSign();
      this.enterPresenting();
      return;
    }
    const d = TUNE.drift;
    const { s, cam, flags, cx, gy } = this;
    const restY = gy + d.restDrop;
    this.sound.setRpm(0.5, 1, 0.1);
    this.main = gsap
      .timeline({ onComplete: () => this.enterPresenting() })
      // 1. The auto rocks back and revs.
      .to(s, { tilt: -2.4, squashY: 0.985, x: cx - 16, shake: 3, duration: d.anticipate, ease: 'power2.out' }, 0)
      .to(cam, { zoom: 1.045, duration: 0.9, ease: 'sine.inOut' }, 0)
      .call(() => {
        this.sound.setRpm(1, 1.2, 0.15);
        this.exhaustBurst(10);
      }, [], 0.05)
      // 2. It lunges forward and starts to turn.
      .to(s, { x: cx + d.launchForward, yaw: d.launchYaw, tilt: 1.4, squashY: 1, shake: 2, duration: d.launchDuration, ease: 'power2.in' }, d.launchAt)
      .set(flags, { skid: 1 }, d.skidOn)
      .call(() => {
        this.sound.skid(1.15);
        this.fx.petalBurst(s.x, s.y - 40, 16, 520);
      }, [], d.skidOn)
      .to(cam, { shake: 7, duration: 0.15 }, d.skidOn)
      // 3. The back swings round past the line.
      .to(s, { yaw: d.overshootYaw, duration: d.slideDuration, ease: 'power2.inOut' }, d.slideAt)
      .to(s, { x: cx + 30, y: restY - 4, scale: 1.03, duration: d.slideDuration, ease: 'power2.out' }, d.slideAt + 0.05)
      .to(s, { tilt: d.lean, duration: 0.35, ease: 'sine.out' }, d.slideAt + 0.05)
      .to(s, { blur: 2, duration: 0.22, ease: 'sine.in' }, d.slideAt + 0.12)
      .to(s, { blur: 0, duration: 0.3, ease: 'sine.out' }, d.slideAt + 0.4)
      // 4. Counter-steer, settle, bounce on the springs.
      .to(s, { yaw: d.restYaw, duration: d.settleDuration, ease: 'power3.out' }, d.settleAt)
      .to(s, { x: cx, y: restY, scale: d.restScale, duration: d.settleDuration, ease: 'power3.out' }, d.settleAt + 0.07)
      .to(s, { tilt: 0, duration: 0.9, ease: 'elastic.out(1,0.35)' }, d.settleAt + 0.05)
      .to(s, { squashY: 0.965, duration: 0.12, ease: 'power2.out' }, d.settleAt + 0.05)
      .to(s, { squashY: 1, duration: 0.7, ease: 'elastic.out(1,0.3)' }, d.settleAt + 0.17)
      .set(flags, { skid: 0 }, d.skidOff)
      .to(cam, { shake: 0, zoom: 1, x: 0, duration: 0.7, ease: 'power2.out' }, d.settleAt + 0.07)
      .to(s, { shake: TUNE.idleShake, duration: 0.5 }, d.skidOff)
      .call(() => this.sound.setRpm(0, 1, 0.35), [], d.skidOff)
      // 5. Lights come on.
      .call(() => this.revealSign(), [], d.revealAt)
      .to({}, { duration: d.readyAt - d.revealAt }, d.revealAt);
  }

  /** The black rear glass lights up like an old neon sign. */
  private revealSign(): void {
    const overlay = this.rig.overlay;
    if (!overlay) return;
    if (this.reduced) {
      overlay.setLit(1);
      this.cam.zoom = PRESENT_ZOOM;
      return;
    }
    const flicker: Array<[number, number]> = [
      [0, 0.9],
      [0.07, 0.15],
      [0.14, 1],
      [0.27, 0.3],
      [0.33, 1],
      [0.46, 0.7],
      [0.5, 1],
    ];
    const tl = gsap.timeline();
    for (const [at, level] of flicker) tl.call(() => overlay.setLit(level), [], at);
    this.sound.honk(1);
    gsap.to(this.cam, { zoom: PRESENT_ZOOM, duration: PRESENT_ZOOM_S, ease: 'power2.inOut', overwrite: 'auto' });
  }

  private enterPresenting(): void {
    this.setPhase('presenting');
    this.s.shake = this.reduced ? 0 : TUNE.idleShake;
    this.flags.exhaustRate = this.reduced ? 0 : TUNE.exhaustIdleRate;
    this.scheduleNudge(TUNE.nudgeEvery);
    this.scheduleDeparture();
  }

  // -------------------------------------------------------------- tap two

  private launch(): void {
    this.clearIdleCalls();
    this.setPhase('launch');
    if (this.reduced) {
      this.s.opacity = 0;
      this.finishDeparture();
      return;
    }

    const l = TUNE.launch;
    const { s, cam, flags } = this;
    this.launchFrom = { x: s.x, y: s.y, scale: s.scale };
    const from = this.launchFrom;
    const rate = { v: TUNE.exhaustIdleRate };

    this.main = gsap
      .timeline({ onComplete: () => this.finishDeparture() })
      // The engine screams, the rear squats, the exhaust pops.
      .call(() => this.sound.launch(l.revDuration + 0.2, l.departDuration + 0.4), [], l.revAt)
      .to(s, { shake: 9, squashY: 0.955, y: from.y + 6, duration: l.revDuration, ease: 'power1.in' }, l.revAt)
      .to(rate, { v: TUNE.exhaustRevRate, duration: 0.5, onUpdate: () => (flags.exhaustRate = rate.v) }, l.revAt)
      .to(cam, { shake: 4, zoom: PRESENT_ZOOM * 1.06, duration: 0.5 }, l.revAt)
      // The front wheel pops up.
      .to(s, { pitch: l.pitch, squashY: 1.02, duration: 0.3, ease: 'back.out(2)' }, l.popAt)
      .call(() => this.launchBlast(), [], l.popAt)
      .to(cam, { zoom: PRESENT_ZOOM * 0.97, shake: 11, duration: 0.25, ease: 'power2.out' }, l.popAt)
      .to(cam, { zoom: 1, shake: 2, duration: 1.5, ease: 'power2.inOut' }, l.popAt + 0.3)
      .to(s, { shake: 0, squashY: 1, duration: 0.3 }, l.popAt + 0.1)
      // The drive-away along the road.
      .set(flags, { trail: 1 }, l.departAt)
      .to(flags, { u: 1, duration: l.departDuration, ease: 'power1.in', onUpdate: () => this.applyRecede() }, l.departAt)
      .to(s, { pitch: 0, duration: 0.5, ease: 'power2.inOut' }, l.departAt + 0.35)
      .to(s, { blur: 2.6, duration: 1.2, ease: 'power1.in' }, l.departAt + 0.3)
      .call(() => this.vanish(), [], l.vanishAt)
      .to(s, { opacity: 0, duration: 0.16, ease: 'power1.in' }, l.vanishAt);

    for (const at of l.popBackfireAt) {
      this.main.call(() => this.backfire(), [], at);
    }
    // Speed lines fade in with the pop and out as the auto shrinks.
    const lines = { v: 0 };
    const vpX = this.vp.x;
    const vpY = this.vp.y;
    this.main
      .to(lines, { v: 1, duration: 0.5, ease: 'power1.in', onUpdate: () => this.fx.setSpeedLines(lines.v * 0.9, vpX, vpY) }, l.popAt + 0.1)
      .to(lines, { v: 0, duration: 0.6, ease: 'power1.out', onUpdate: () => this.fx.setSpeedLines(lines.v * 0.9, vpX, vpY) }, l.vanishAt - 0.4);
  }

  /** Moves the auto along the road toward the vanishing point. */
  private applyRecede(): void {
    const { s, flags, vp, launchFrom: from } = this;
    const l = TUNE.launch;
    const k = recedeScale(flags.u, l.quad, l.cubic);
    s.scale = from.scale * k;
    s.x = vp.x + (from.x - vp.x) * k + Math.sin(flags.u * 9) * l.weave * k;
    s.y = vp.y + (from.y - vp.y) * k;
  }

  private launchBlast(): void {
    const { s } = this;
    const pxm = this.pxPerMetre * s.scale;
    const [a, b] = rearWheelPoints(s.x, s.y, s.yaw, pxm);
    for (const w of [a, b]) {
      for (let i = 0; i < 9; i += 1) {
        this.fx.puff({
          x: w.x + (Math.random() - 0.5) * 50,
          y: w.y - 10,
          vx: (w.x < s.x ? -1 : 1) * (80 + Math.random() * 360),
          vy: -60 - Math.random() * 160,
          size: 150 * s.scale,
          grow: 380 * s.scale,
          life: 1.1 + Math.random() * 0.8,
          alpha: 0.95,
          layer: i % 3 === 0 ? 'front' : 'back',
        });
      }
    }
    this.fx.ring(s.x, s.y, 360 * s.scale, 0.65);
    this.fx.petalBurst(s.x, s.y - 30, 28, 780);
  }

  private backfire(): void {
    this.sound.backfire();
    const p = this.exhaustPoint();
    this.fx.sparksBurst(p.x, p.y, 14, 0.2, 1.6);
    this.exhaustBurst(5);
    this.cam.shake = Math.max(this.cam.shake, 6);
  }

  private vanish(): void {
    const { glint } = this.ui;
    const at = this.ui.toScreen(this.vp.x, this.vp.y);
    glint.style.left = `${at.x}px`;
    glint.style.top = `${at.y}px`;
    this.sound.ding();
    gsap
      .timeline()
      .set(glint, { autoAlpha: 1, scale: 0, rotation: 0 })
      .to(glint, { scale: 1, rotation: 45, duration: 0.3, ease: 'back.out(3)' })
      .to(glint, { scale: 0, autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, 0.32);

  }

  private finishDeparture(): void {
    this.flags.exhaustRate = 0;
    this.flags.trail = 0;
    this.sound.engineOff(0.4);
    this.setPhase('departed');
  }

  // ---------------------------------------------------------------- frame

  private exhaustPoint(): Point {
    const { s } = this;
    const slot = this.rig.currentPose.slots.exhaust ?? { x: 0.5, y: 0.9 };
    const local = this.rig.localPoint(slot, s.squashX, s.squashY);
    return { x: s.x + local.x * s.scale, y: s.y + local.y * s.scale };
  }

  private exhaustBurst(count: number): void {
    for (let i = 0; i < count; i += 1) this.exhaustPuff(1.6);
  }

  private exhaustPuff(strength = 1): void {
    const { s } = this;
    const p = this.exhaustPoint();
    const yaw = (s.yaw * Math.PI) / 180;
    const backX = -Math.cos(yaw);
    this.fx.puff({
      x: p.x,
      y: p.y,
      vx: backX * (50 + Math.random() * 90) * strength + (Math.random() - 0.5) * 30,
      vy: -(35 + Math.random() * 60) * strength,
      size: 44 * s.scale * strength,
      grow: 120 * s.scale * strength,
      life: 1 + Math.random() * 0.5,
      alpha: 0.6,
      tint: 'smoke',
      layer: s.yaw > 60 ? 'front' : 'back',
    });
  }

  private emit(dt: number): void {
    const { s, flags, acc, fx } = this;
    const pxm = this.pxPerMetre * s.scale;

    if (flags.exhaustRate > 0 && s.opacity > 0.3) {
      acc.exhaust += flags.exhaustRate * dt;
      while (acc.exhaust >= 1) {
        acc.exhaust -= 1;
        this.exhaustPuff();
      }
    }

    if (flags.skid > 0) {
      const wheels = rearWheelPoints(s.x, s.y, s.yaw, pxm);
      const last = this.lastWheels;
      if (last) {
        const width = TUNE.skidWidthMetres * pxm;
        fx.skid(last[0].x, last[0].y, wheels[0].x, wheels[0].y, width, TUNE.skidAlpha);
        fx.skid(last[1].x, last[1].y, wheels[1].x, wheels[1].y, width, TUNE.skidAlpha);
      }
      this.lastWheels = wheels;
      acc.dust += TUNE.dustPerSecond * dt;
      while (acc.dust >= 1) {
        acc.dust -= 1;
        const w = wheels[Math.random() < 0.5 ? 0 : 1];
        fx.puff({
          x: w.x,
          y: w.y - 8,
          vx: (Math.random() - 0.5) * 160 - Math.cos((s.yaw * Math.PI) / 180) * 60,
          vy: -30 - Math.random() * 90,
          size: 110 * s.scale,
          grow: 270 * s.scale,
          life: 1 + Math.random() * 0.7,
          alpha: 0.88,
          layer: Math.random() < 0.3 ? 'front' : 'back',
        });
      }
    } else {
      this.lastWheels = null;
    }

    if (flags.trail > 0 && s.opacity > 0.2) {
      const wheels = rearWheelPoints(s.x, s.y, s.yaw, pxm);
      acc.trail += TUNE.trailPerSecond * dt;
      while (acc.trail >= 1) {
        acc.trail -= 1;
        const w = wheels[Math.random() < 0.5 ? 0 : 1];
        fx.puff({
          x: w.x,
          y: w.y - 4,
          vx: (Math.random() - 0.5) * 70,
          vy: -10 - Math.random() * 40,
          size: 90 * Math.max(s.scale, 0.05),
          grow: 220 * Math.max(s.scale, 0.05),
          life: 1.1 + Math.random() * 0.9,
          alpha: 0.8,
          layer: 'back',
        });
      }
    }
  }

  private frame(dt: number): void {
    if (!this.active || this.phase === 'loading') return;
    const { s, cam, ui } = this;
    const t = performance.now() / 1000;
    const jx = (Math.sin(t * 71.3) + Math.sin(t * 43.7) * 0.6) * s.shake;
    const jy = (Math.sin(t * 59.1) + Math.cos(t * 37.9) * 0.6) * s.shake * 0.8;
    this.rig.update(s, jx, jy);

    const shakeX = (Math.random() - 0.5) * 2 * cam.shake;
    const shakeY = (Math.random() - 0.5) * 2 * cam.shake;
    ui.world.style.transform = `translate3d(${cam.x + shakeX}px, ${cam.y + shakeY}px, 0) scale(${cam.zoom})`;

    this.emit(dt);
    this.fx.update(dt);
  }
}
