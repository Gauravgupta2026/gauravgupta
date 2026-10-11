import '@fontsource/baloo-tamma-2/kannada-800.css';
import '@fontsource/oswald/latin-600.css';
import '@fontsource/rozha-one/latin-400.css';
import { gsap } from 'gsap';
import { Sound } from './audio';
import { assetUrl, loadAssets } from './assets';
import { hire, observeActivity } from './embed';
import { STAGE_H, STAGE_W, VIEW } from './constants';
import { clamp } from './math';
import { Director } from './director';
import { Fx } from './fx';
import { AutoRig } from './rig';
import { fitStage } from './stage';
import './style.css';

const FONT_TIMEOUT_MS = 2500;
const LOADER_FADE_S = 0.5;
const CANVAS_OVERSAMPLE = 1.6;
const MIN_CANVAS_RESOLUTION = 0.2;
/** The road image is enlarged about the vanishing point so it fills the whole square. */
const SCENE_SCALE = 1.3;

function must<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element #${id}`);
  return node as T;
}

/** Wait for web fonts, but never block the show for long. */
async function fontsReady(): Promise<void> {
  const loads = Promise.all([
    document.fonts.load('400 18px "Auto Montreal"'),
    document.fonts.load('400 40px "Rozha One"'),
    document.fonts.load('800 24px "Baloo Tamma 2"', 'ಬಾಡಿಗೆಗೆ'),
    document.fonts.load('600 20px Oswald'),
  ]);
  const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, FONT_TIMEOUT_MS));
  await Promise.race([loads, timeout]);
}

function setupSoundButton(button: HTMLElement, sound: Sound): void {
  const render = (): void => {
    button.setAttribute('aria-pressed', String(!sound.isMuted));
    button.setAttribute('aria-label', sound.isMuted ? 'Sound off. Turn sound on' : 'Sound on. Turn sound off');
    button.classList.toggle('off', sound.isMuted);
  };
  button.addEventListener('click', () => {
    sound.unlock();
    sound.setMuted(!sound.isMuted);
    if (!sound.isMuted) sound.honk(1);
    render();
  });
  render();
}

/** `?size=12cm` overrides the art size for this visit. Only plain CSS lengths are accepted. */
function applySizeOverride(): void {
  const size = new URLSearchParams(window.location.search).get('size');
  if (size && /^\d+(\.\d+)?(cm|mm|px|vmin|vw|vh)$/.test(size)) {
    document.documentElement.style.setProperty('--art-size', size);
  }
}

async function boot(): Promise<void> {
  applySizeOverride();
  const stage = must('stage');
  const loader = must('loader');
  const [assets] = await Promise.all([loadAssets(), fontsReady()]);

  const fit = fitStage(must('art'), stage);
  const { manifest } = assets;

  must<HTMLImageElement>('scene').src = assetUrl(manifest.background);

  const vpX = STAGE_W * manifest.scene.vanishingPoint.x;
  const vpY = STAGE_H * manifest.scene.vanishingPoint.y;
  // Enlarge the road about the vanishing point, and tell the CSS mask where the square sits
  // in the image's own (unscaled) units.
  const scene = must<HTMLImageElement>('scene');
  scene.style.transformOrigin = `${vpX}px ${vpY}px`;
  scene.style.transform = `scale(${SCENE_SCALE})`;
  scene.style.setProperty('--mask-x', `${vpX + (VIEW.x - vpX) / SCENE_SCALE}px`);
  scene.style.setProperty('--mask-y', `${vpY + (VIEW.y - vpY) / SCENE_SCALE}px`);
  scene.style.setProperty('--mask-size', `${VIEW.size / SCENE_SCALE}px`);


  const sound = new Sound();
  // The art is small on screen, so canvases can be far smaller than the stage.
  const resolution = clamp(fit.scale * window.devicePixelRatio * CANVAS_OVERSAMPLE, MIN_CANVAS_RESOLUTION, 1);
  const fx = new Fx(must('fxBack'), must('fxFront'), must('ground'), resolution);
  const rig = new AutoRig(must('rig'), must('autoBtn'), must('shadow'), assets.poses);
  rig.refit();

  const director = new Director(manifest, rig, fx, sound, hire, {
    world: must('world'),
    autoButton: must('autoBtn'),
    glint: must('glint'),
    toScreen: (x, y) => fit.toScreen(x, y),
  });

  must('autoBtn').addEventListener('click', () => director.tap());
  must('hirePrompt').addEventListener('click', () => director.tap());
  setupSoundButton(must('soundBtn'), sound);

  if (import.meta.env.DEV) (window as unknown as { __auto: Director }).__auto = director;

  observeActivity(active => director.setActive(active));
  gsap.to(loader, {
    autoAlpha: 0,
    duration: LOADER_FADE_S,
    ease: 'power1.out',
    onComplete: () => loader.remove(),
  });
}

boot().catch((err: unknown) => {
  console.error(err);
  const loader = document.getElementById('loader');
  if (loader) loader.textContent = 'Could not load. Please refresh.';
});
