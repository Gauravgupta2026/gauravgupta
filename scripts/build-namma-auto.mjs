import { cp, mkdir, rm, readFile, writeFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";

const root = fileURLToPath(new URL("../", import.meta.url));
const app = path.join(root, "experiments/namma-auto");
const destination = path.join(root, "public/namma-auto");
for (const args of [["ci"], ["run", "release"]]) {
  const result = spawnSync("npm", args, { cwd: app, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
// Replace only this integration's generated output after a successful release build.
await rm(destination, { recursive: true, force: true });
await cp(path.join(app, "dist"), destination, { recursive: true });
// Preserve full-resolution source art; export only the resolution this small scene needs.
const sharp = createRequire(path.join(app, 'package.json'))('sharp');
const manifestPath = path.join(destination, 'assets/manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const imageExports = [[manifest, 'background', 900], ...manifest.poses.map(pose => [pose, 'src', 720])];
let originalBytes = 0;
let optimizedBytes = 0;
for (const [record, key, width] of imageExports) {
  const source = path.join(destination, record[key]);
  originalBytes += (await stat(source)).size;
  const bytes = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 90 }).toBuffer();
  optimizedBytes += bytes.length;
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  const file = `${path.basename(source, '.webp')}-${hash}.webp`;
  await writeFile(path.join(destination, 'assets', file), bytes);
  await rm(source);
  record[key] = `assets/${file}`;
}
await writeFile(manifestPath, JSON.stringify(manifest));
console.log(`Auto image bytes: ${originalBytes} → ${optimizedBytes}`);
const licenses = path.join(destination, "licenses");
await mkdir(licenses);
for (const font of ["baloo-tamma-2", "oswald", "rozha-one"]) {
  await cp(path.join(app, "node_modules/@fontsource", font, "LICENSE"), path.join(licenses, `${font}.txt`));
}
console.log("Updated public/namma-auto from the validated source experiment.");
