import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
const checkAsset = async (asset) => {
  const resolved = path.resolve(root, 'public', asset.replace(/^\//, ''));
  if (!resolved.startsWith(path.join(root, 'public') + path.sep)) {
    errors.push('Asset path must stay inside public/.');
    return;
  }
  try { await access(resolved); }
  catch { errors.push(`Missing public asset: ${asset}`); }
};

const manifest = JSON.parse(await readFile(path.join(root, 'public/assets/manifest.json'), 'utf8'));
for (const asset of [manifest.background, ...manifest.poses.map((pose) => pose.src)]) await checkAsset(asset);
if (errors.length) {
  console.error(`Release blocked:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('Release configuration and local assets are ready.');
}
