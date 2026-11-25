import * as THREE from 'three';

/*
 * The scene is built from ~1,900 small rigid meshes (limbs, bricks, seats). Drawn one by one, each costs a draw call, and
 * that is what makes weak devices stutter. Here they are merged into a handful of big meshes. Every original mesh becomes
 * one "bone": its vertices follow its own matrix, so animation code keeps moving the same objects as before. Both the
 * WebGPU and the WebGL renderer support skinning natively, so this needs no custom shaders.
 */
const MAX_BONES = 1000;                          // 64 KB of 4×4 matrices: the uniform-buffer size WebGPU guarantees
const ZERO = new Float32Array(16);

/** Bone matrices are the source meshes' own world matrices. Hidden meshes collapse to a point. */
class RigidSkeleton extends THREE.Skeleton {
  constructor(sources) { super(sources, sources.map(() => new THREE.Matrix4())); this.sources = sources; }
  calculateInverses() { /* rest pose is identity: vertices are stored in each mesh's local space */ }
  update() {
    const out = this.boneMatrices; if (!out) return;
    for (let i = 0; i < this.sources.length; i++) {
      let shown = true; for (let o = this.sources[i]; o; o = o.parent) if (!o.visible) { shown = false; break; }
      if (shown) this.sources[i].matrixWorld.toArray(out, i * 16); else out.set(ZERO, i * 16);
    }
    if (this.boneTexture) this.boneTexture.needsUpdate = true;
  }
}

const canBatch = (o, skip) => {
  const m = o.material;
  return o.isMesh && !o.isInstancedMesh && !o.isSkinnedMesh && !Array.isArray(m) && !skip.has(o) && !skip.has(m)
    && (m.isMeshStandardMaterial || m.isMeshBasicMaterial) && !m.transparent && !m.map && !m.vertexColors && !m.emissiveMap
    && (!m.emissive || m.emissive.getHex() === 0 || m.emissiveIntensity === 0) && o.matrixWorld.determinant() > 0;
};

/** Merge every eligible mesh under `scene`. `skip` holds meshes or materials that change at run time. */
export function batchRigid(scene, skip) {
  scene.updateMatrixWorld(true);
  const groups = new Map();
  scene.traverse((o) => {
    if (!canBatch(o, skip)) return;
    const m = o.material, key = [m.type, m.side, m.flatShading, m.roughness > 0.6, m.metalness > 0.3, o.castShadow, o.receiveShadow].join();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(o);
  });
  const made = [];
  for (const list of groups.values()) for (let at = 0; at < list.length; at += MAX_BONES) made.push(merge(list.slice(at, at + MAX_BONES)));
  made.forEach((m) => scene.add(m));
  return made;
}

function merge(list) {
  const parts = list.map((o) => (o.geometry.index ? o.geometry.toNonIndexed() : o.geometry)), total = parts.reduce((n, g) => n + g.attributes.position.count, 0);
  const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3), col = new Float32Array(total * 3), idx = new Uint16Array(total * 4), wgt = new Float32Array(total * 4);
  let v = 0;
  parts.forEach((g, b) => {
    const n = g.attributes.position.count, c = list[b].material.color;
    if (!g.attributes.normal) g.computeVertexNormals();
    pos.set(g.attributes.position.array.subarray(0, n * 3), v * 3); nor.set(g.attributes.normal.array.subarray(0, n * 3), v * 3);
    for (let i = v; i < v + n; i++) { col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; idx[i * 4] = b; wgt[i * 4] = 1; }
    v += n;
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('skinIndex', new THREE.BufferAttribute(idx, 4)); geo.setAttribute('skinWeight', new THREE.BufferAttribute(wgt, 4));
  const first = list[0], mat = first.material.clone(); mat.color.set(0xffffff); mat.vertexColors = true;
  const mesh = new THREE.SkinnedMesh(geo, mat);
  mesh.castShadow = first.castShadow; mesh.receiveShadow = first.receiveShadow; mesh.frustumCulled = false; mesh.matrixAutoUpdate = false;
  mesh.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40); mesh.boundingBox = new THREE.Box3(new THREE.Vector3(-40, -40, -40), new THREE.Vector3(40, 40, 40));
  mesh.bind(new RigidSkeleton(list), new THREE.Matrix4());
  list.forEach((o) => o.layers.disableAll());      // still animated, no longer drawn on its own
  return mesh;
}
