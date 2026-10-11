import { STAGE_H } from './constants';
import type { LoadedPose, Manifest } from './types';

const DEFAULT_ANCHOR_X = 0.5;
const DEFAULT_ANCHOR_Y = 1;

export const assetUrl = (path: string): string => `${import.meta.env.BASE_URL}${path}`;

async function loadImage(path: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.decoding = 'async';
  img.src = assetUrl(path);
  try {
    await img.decode();
  } catch {
    throw new Error(`Could not load image: ${path}`);
  }
  return img;
}

export interface SceneAssets {
  manifest: Manifest;
  background: HTMLImageElement;
  poses: LoadedPose[];
}

/** Loads the manifest and every image it names. */
export async function loadAssets(): Promise<SceneAssets> {
  const res = await fetch(assetUrl('assets/manifest.json'));
  if (!res.ok) throw new Error(`Could not load manifest (${res.status})`);
  const manifest = (await res.json()) as Manifest;

  const [background, ...poseImages] = await Promise.all([
    loadImage(manifest.background),
    ...manifest.poses.map((p) => loadImage(p.src)),
  ]);

  const height = manifest.scene.autoHeight;
  const poses = manifest.poses
    .map((def, i): LoadedPose => {
      const img = poseImages[i];
      if (!img) throw new Error(`Missing image for pose ${def.id}`);
      return {
        def,
        img,
        slots: def.slots ?? {},
        anchorX: def.anchorX ?? DEFAULT_ANCHOR_X,
        anchorY: def.anchorY ?? DEFAULT_ANCHOR_Y,
        width: height * (img.naturalWidth / img.naturalHeight),
        height,
      };
    })
    .sort((a, b) => a.def.yaw - b.def.yaw);

  if (!background) throw new Error('Missing background image');
  if (poses.length < 2) throw new Error('Need at least two poses (side and rear)');
  if (STAGE_H <= 0) throw new Error('Invalid stage size');
  return { manifest, background, poses };
}
