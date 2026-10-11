import { SITE } from './config';
import { pickPose } from './math';
import type { LoadedPose, Point, Rect } from './types';

/** Everything the director animates on the auto. Units: stage pixels and degrees. */
export interface RigState {
  /** Ground contact point of the vehicle. */
  x: number;
  y: number;
  /** Perspective scale. 1 = full size at the parked spot. */
  scale: number;
  /** 0 = side view, 90 = rear view. */
  yaw: number;
  /** Roll around the ground point. */
  tilt: number;
  /** Nose-up angle for the wheelie, seen from behind. */
  pitch: number;
  squashX: number;
  squashY: number;
  blur: number;
  opacity: number;
  /** Engine shake in pixels. */
  shake: number;
}

export function restingState(x: number, y: number): RigState {
  return { x, y, scale: 1, yaw: 0, tilt: 0, pitch: 0, squashX: 1, squashY: 1, blur: 0, opacity: 1, shake: 0 };
}

const PERSPECTIVE_PX = 1400;
const SIGN_TEXT_FILL = 0.9;
const SIGN_MAIN_HEIGHT_FILL = 0.52;
const SIGN_SUB_HEIGHT_FILL = 0.22;
const PLATE_WIDTH_FILL = 0.86;
const PLATE_HEIGHT_FILL = 0.78;
const SHADOW_WIDTH_FILL = 0.9;

interface PoseView {
  pose: LoadedPose;
  el: HTMLElement;
}

function div(className: string, text?: string): HTMLDivElement {
  const el = document.createElement('div');
  el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function place(el: HTMLElement, r: Rect): void {
  el.style.left = `${r.x * 100}%`;
  el.style.top = `${r.y * 100}%`;
  el.style.width = `${r.w * 100}%`;
  el.style.height = `${r.h * 100}%`;
}

/** Shrinks text until it fits the given width. */
function fitWidth(el: HTMLElement, maxWidth: number, maxFont: number): void {
  el.style.fontSize = `${maxFont}px`;
  const w = el.scrollWidth;
  if (w > maxWidth) el.style.fontSize = `${(maxFont * maxWidth) / w}px`;
}

/** The lit "FOR HIRE" window and the number plate, drawn over the rear artwork. */
class RearOverlay {
  private readonly sign: HTMLElement;
  private readonly plate: HTMLElement;
  private readonly fitJobs: Array<() => void> = [];

  constructor(view: HTMLElement, pose: LoadedPose) {
    const { signWindow, numberPlate } = pose.slots;
    this.sign = div('sign');
    this.plate = div('plate');

    if (signWindow) {
      place(this.sign, signWindow);
      const winW = signWindow.w * pose.width;
      const winH = signWindow.h * pose.height;
      const face = div('sign-face');
      const main = div('sign-main', SITE.signText);
      const sub = div('sign-sub', SITE.signTextKannada);
      face.append(main, sub);
      this.sign.append(face);
      view.append(this.sign);
      this.fitJobs.push(() => {
        fitWidth(main, winW * SIGN_TEXT_FILL, winH * SIGN_MAIN_HEIGHT_FILL);
        fitWidth(sub, winW * SIGN_TEXT_FILL, winH * SIGN_SUB_HEIGHT_FILL);
      });
    }

    if (numberPlate) {
      place(this.plate, numberPlate);
      const text = div('plate-text', SITE.numberPlate);
      this.plate.append(text);
      view.append(this.plate);
      const plateW = numberPlate.w * pose.width;
      const plateH = numberPlate.h * pose.height;
      this.fitJobs.push(() => fitWidth(text, plateW * PLATE_WIDTH_FILL, plateH * PLATE_HEIGHT_FILL));
    }
    this.fit();
  }

  /** Call again after web fonts load, because text widths change. */
  fit(): void {
    for (const job of this.fitJobs) job();
  }

  /** Opacity of the lit text and plate characters. */
  setLit(level: number): void {
    this.sign.style.opacity = String(level);
    this.plate.style.opacity = String(level);
  }
}

/** Builds the pose images and moves them. The director only changes numbers in a RigState. */
export class AutoRig {
  private readonly views: PoseView[];
  private current: PoseView | null = null;
  private lastShadowWidth = -1;
  readonly overlay: RearOverlay | null;

  constructor(
    private readonly root: HTMLElement,
    private readonly holder: HTMLElement,
    private readonly shadow: HTMLElement,
    poses: readonly LoadedPose[],
  ) {
    this.views = poses.map((pose) => {
      const el = div(`pose pose-${pose.def.id}`);
      el.style.width = `${pose.width}px`;
      el.style.height = `${pose.height}px`;
      el.style.left = `${-pose.anchorX * pose.width}px`;
      el.style.top = `${-pose.anchorY * pose.height}px`;
      el.style.transformOrigin = `${pose.anchorX * 100}% ${pose.anchorY * 100}%`;
      const img = pose.img.cloneNode(false) as HTMLImageElement;
      img.alt = '';
      img.draggable = false;
      el.append(img);
      this.holder.append(el);
      return { pose, el };
    });
    const rearView = this.views.find((v) => v.pose.def.id === 'rear');
    this.overlay = rearView ? new RearOverlay(rearView.el, rearView.pose) : null;
  }

  /** The drawn pose that is on screen now. */
  get currentPose(): LoadedPose {
    const view = this.current ?? this.views[0];
    if (!view) throw new Error('Rig has no poses');
    return view.pose;
  }

  /** Offset from the ground point to a spot on the current pose, before scale, in stage pixels. */
  localPoint(p: Point, squashX: number, squashY: number): { x: number; y: number } {
    const pose = this.currentPose;
    return {
      x: (p.x - pose.anchorX) * pose.width * squashX,
      y: (p.y - pose.anchorY) * pose.height * squashY,
    };
  }

  update(s: RigState, jitterX: number, jitterY: number): void {
    const { pose, scaleX } = this.pick(s.yaw);
    const view = this.views.find((v) => v.pose === pose);
    if (!view) return;
    if (view !== this.current) {
      this.current?.el.classList.remove('active');
      view.el.classList.add('active');
      this.current = view;
    }
    view.el.style.transform = `scaleX(${scaleX})`;

    this.root.style.transform = `translate(${s.x + jitterX}px, ${s.y + jitterY}px) scale(${s.scale})`;
    this.root.style.opacity = String(s.opacity);
    // Keep resting text in 2D; a permanent perspective layer can cache it at
    // the smaller pre-zoom resolution. Only the wheelie needs perspective.
    const pitchTransform = s.pitch === 0 ? '' : ` perspective(${PERSPECTIVE_PX}px) rotateX(${s.pitch}deg)`;
    this.holder.style.transform =
      `rotate(${s.tilt}deg)${pitchTransform} scale(${s.squashX}, ${s.squashY})`;
    this.holder.style.filter = s.blur > 0.05 ? `blur(${s.blur}px)` : 'none';

    const shadowWidth = Math.round(pose.width * scaleX * SHADOW_WIDTH_FILL);
    if (shadowWidth !== this.lastShadowWidth) {
      this.lastShadowWidth = shadowWidth;
      this.shadow.style.width = `${shadowWidth}px`;
      this.shadow.style.height = `${shadowWidth * 0.13}px`;
      this.shadow.style.left = `${-shadowWidth / 2}px`;
      this.shadow.style.top = `${-shadowWidth * 0.065}px`;
    }
    // The shadow stays flat on the ground when the nose lifts.
    this.shadow.style.opacity = String(Math.max(0, 1 - Math.abs(s.pitch) / 30) * Math.min(1, s.opacity * 1.2));
  }

  private pick(yaw: number): { pose: LoadedPose; scaleX: number } {
    const wrapped = this.views.map((v) => ({ def: v.pose.def, pose: v.pose }));
    const result = pickPose(yaw, wrapped);
    return { pose: result.pose.pose, scaleX: result.scaleX };
  }

  /** Re-measure text after fonts load. */
  refit(): void {
    this.overlay?.fit();
  }
}
