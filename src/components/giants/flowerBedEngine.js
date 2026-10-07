import { FLOWER_BED_CONFIG } from "./flowerBedConfig";

/**
 * Flower rendering adapted from the supplied Hero-flower reference.
 * React owns the DOM; this module owns canvas resources and the animation loop.
 * @param {{root: HTMLElement, strip: HTMLDivElement, name: HTMLHeadingElement, role: HTMLParagraphElement, posterPhoto: HTMLCanvasElement, posterDots: HTMLCanvasElement, live: HTMLCanvasElement}} el
 */
export function createFlowerBed(el) {
  const C = FLOWER_BED_CONFIG;

    const P = JSON.parse(JSON.stringify(C)); // live, tweakable copy
    const S = {
      gl: null, gl2: false, ok: false, lost: false, fallback: false, reduced: false, glTried: false,
      paused: false, hidden: document.hidden, inView: true, dead: false,
      running: false, raf: 0, t: 0, lastDraw: 0, lastRaf: 0, perfSum: 0, perfN: 0, perfLevel: 0, frames: 0, avgMs: 0, liveShown: false, first: true,
      W: 1, H: 1, vw: 1, vh: 1, dpr: 1, cw: 1, ch: 1, tw: 1, th: 1, pitch: 7, fps: 30, mobile: false,
      map: new Float32Array(6),   // scale.x, scale.y, off.x, off.y, dispW (css), dispH (css)
      text: new Float32Array(4),  // name+role box in strip uv (x0, y0, x1, y1)
      gusts: new Float32Array(16), nGusts: 0, gust: 0, gustPrev: 0, level: 0,
      ptrIn: false, ptrX: 0.5, ptrAmt: 0, img: null, flex: null, nPts: 0,
    };
    const hex = (h) => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
    const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const lerp = (a, b, t) => a + (b - a) * t;
    let seed = P.seed; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const TAU = Math.PI * 2;

    // ── zones (JS mirror of the shader mask; used by the poster)
    const Z = {
      side: (x) => ss(P.zones.sideStart, P.zones.sideEnd, Math.abs(x - 0.5) * 2),
      bottom: (y) => ss(P.zones.bottomStart, P.zones.bottomEnd, y),
      H: (x, y) => Math.max(Z.side(x), Z.bottom(y)),
      top: (y) => ss(0, P.zones.topFade, y),
      dissolve: (x, y) => ss(0, P.zones.edgeDissolve, 1 - Math.abs(x - 0.5) * 2) * (1 - ss(P.zones.bottomDissolve[0], P.zones.bottomDissolve[1], y)),
    };

    // ── wind (JS side: gust schedule that repeats every loop, and the lagged motion level for the glow)
    function scheduleGusts() {
      const n = Math.max(1, Math.min(8, Math.round(P.loop / P.wind.gustEvery))), gap = P.loop / n;
      let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
      for (let i = 0; i < n; i++) S.gusts[i] = (i * gap + (r() - 0.5) * 2 * Math.min(P.wind.gustJitter, gap * 0.25) + P.loop) % P.loop;
      S.nGusts = n;
    }
    function gustAt(t) {
      let g = 0; const len = P.wind.gustMs / 1000;
      for (let i = 0; i < S.nGusts; i++) { const p = ((t - S.gusts[i]) % P.loop + P.loop) % P.loop / len; if (p < 1) { const v = Math.sin(Math.PI * p); g = Math.max(g, v * v); } }
      return g;
    }

    // ── shaders
    const NOISE = `
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0); m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}`;
    // Shared: strip uv → photo uv, and the breeze.
    const COMMON = `
const float TAU = 6.2831853;
uniform sampler2D uPhoto; uniform sampler2D uFlex;
uniform vec4 uMap;        // scale.xy, offset.xy  (strip uv → photo uv)
uniform vec4 uDisp;       // photo size on screen (css px) xy, strip size (css px) zw
uniform vec3 uPush;       // centre.xy, scale
uniform vec4 uWind;       // t, gust now, gust 1/30 s ago, amount
uniform vec4 uWave;       // 1/wavelength, period, patch cycles, patch drift
uniform vec4 uAmpA;       // top min/max, bokeh min/max  (css px, already width-scaled)
uniform vec4 uAmpB;       // back min/max, gust boost, patch floor
uniform vec4 uPtr;        // x, amount, radius, strength
vec2 toPhoto(vec2 su){ vec2 p = uMap.zw + su * uMap.xy; return uPush.xy + (p - uPush.xy) / uPush.z; }
// Breeze: a wave travelling left→right, scaled by drifting noise patches, plus scheduled gusts and the pointer.
float patchAt(float x, float t){
  float a = TAU * t / 20.0;
  return clamp(0.5 + 0.5 * snoise(vec2(x * uWave.z + uWave.w * cos(a), uWave.w * sin(a) + 3.7)), 0.0, 1.0);
}
vec2 breeze(vec3 flex, float x, float t, float gust, float patchS){
  float s = mix(uAmpB.w, 1.0, patchS);
  float amp = flex.r * mix(uAmpA.x, uAmpA.y, patchS) + flex.g * mix(uAmpA.z, uAmpA.w, patchS) + flex.b * mix(uAmpB.x, uAmpB.y, patchS);
  float d = (x - uPtr.x) / uPtr.z;
  float w = sin(TAU * (x * uWave.x - t / uWave.y)) * s + gust * uAmpB.z * (0.6 + 0.4 * patchS) + uPtr.y * uPtr.w * exp(-d * d);
  float v = 0.18 * sin(TAU * (x * uWave.x * 1.7 - t / uWave.y) + 1.1) * s;
  return amp * uWind.w * vec2(w, v);
}`;
    const VS = `ATTR vec2 aPos; VOUT vec2 vUv; void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;
    // trail: half-res feedback. rgb = max(current, previous·decay); a = bright-pass for the glow.
    const FS_TRAIL = `
uniform sampler2D uPrev;
uniform vec4 uBlur;   // k, max px, decay, first frame
uniform vec4 uTrailP; // shift (strip uv), glow threshold, mip bias, unused
uniform vec4 uTaps;
vec3 tapLine(vec2 p, float stepU, float bias){
  return (TEXB(uPhoto, p, bias).rgb * uTaps.x + TEXB(uPhoto, p + vec2(stepU, 0.0), bias).rgb * uTaps.y
        + TEXB(uPhoto, p + vec2(2.0 * stepU, 0.0), bias).rgb * uTaps.z + TEXB(uPhoto, p + vec2(3.0 * stepU, 0.0), bias).rgb * uTaps.w) / dot(uTaps, vec4(1.0));
}
void main(){
  vec2 su = vec2(vUv.x, 1.0 - vUv.y);
  vec2 pu = toPhoto(su);
  vec3 flex = TEX(uFlex, pu).rgb;
  float ps = patchAt(su.x, uWind.x);
  vec2 dN = breeze(flex, su.x, uWind.x, uWind.y, ps), dP = breeze(flex, su.x, uWind.x - 1.0 / 30.0, uWind.z, ps);
  float vel = (dN.x - dP.x) * 30.0;                         // px per second
  float len = min(abs(vel) * uBlur.x, uBlur.y);              // zero at rest
  vec3 cur = tapLine(pu - dN / uDisp.xy, sign(vel) * len / 3.0 / uDisp.x, uTrailP.z);
  vec4 prev = TEX(uPrev, vUv + vec2(uTrailP.x, 0.0)) * uBlur.z * (1.0 - uBlur.w); // shifted so trails stream left
  float bright = max(0.0, max(cur.r, max(cur.g, cur.b)) - uTrailP.y) / (1.0 - uTrailP.y);
  FRAG = vec4(max(cur, prev.rgb), max(bright, prev.a));
}`;
    // composite: photo zone (sharp + trail ghost + glow) → halftone zone → screen onto the page.
    const FS_MAIN = `
uniform sampler2D uTrail;
uniform vec2 uRes;           // device px of the strip canvas
uniform vec4 uZoneA;         // side start, side end, bottom start, bottom end
uniform vec4 uZoneB;         // edge dissolve, bottom dissolve start, end, top fade
uniform vec4 uDot;           // pitch (device px), gamma, desat, colour lift
uniform vec4 uDotB;          // halo alpha, halo bias, cell bias, min radius
uniform vec4 uGlow;          // strength (already risen), bias, unused, unused
uniform vec3 uGlowTint;
uniform vec4 uBlur;          // k, max px, unused, unused
uniform vec4 uTaps;
uniform vec4 uText;          // name/role box, strip uv
uniform vec4 uLook;          // beam cap, grain amount, grain seed, dither
uniform vec4 uIntro;         // photo, dots, unused, unused
uniform vec2 uPeak;          // knee, max
uniform float uDotC;         // max fill
uniform vec3 uBg;
float sideMask(float x){ return smoothstep(uZoneA.x, uZoneA.y, abs(x - 0.5) * 2.0); }
float H(vec2 su){ return max(sideMask(su.x), smoothstep(uZoneA.z, uZoneA.w, su.y)); }   // zone mask: 0 photo, 1 dots
float topFade(float y){ return smoothstep(0.0, uZoneB.w, y); }
float dissolve(vec2 su){ return smoothstep(0.0, uZoneB.x, 1.0 - abs(su.x - 0.5) * 2.0) * (1.0 - smoothstep(uZoneB.y, uZoneB.z, su.y)); }
vec4 trailBlur(vec2 uv, float bias){
#if HAS_MIPS
  return TEXB(uTrail, uv, bias);
#else
  vec2 o = exp2(bias) * 2.0 / uRes;
  return (TEX(uTrail, uv) + TEX(uTrail, uv + vec2(o.x, 0.0)) + TEX(uTrail, uv - vec2(o.x, 0.0)) + TEX(uTrail, uv + vec2(0.0, o.y)) + TEX(uTrail, uv - vec2(0.0, o.y))) * 0.2;
#endif
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
  vec2 fc = gl_FragCoord.xy;
  vec2 su = vec2(fc.x / uRes.x, 1.0 - fc.y / uRes.y);
  vec2 tuv = fc / uRes;                                     // trail texture uv (y up)
  float h = H(su), tf = topFade(su.y);
  // ── photo zone: displaced sharp photo with directional blur, plus the trail's ghost
  vec3 photo = vec3(0.0);
  if (h < 0.999) {
    vec2 pu = toPhoto(su);
    vec3 flex = TEX(uFlex, pu).rgb;
    float ps = patchAt(su.x, uWind.x);
    vec2 dN = breeze(flex, su.x, uWind.x, uWind.y, ps), dP = breeze(flex, su.x, uWind.x - 1.0 / 30.0, uWind.z, ps);
    float vel = (dN.x - dP.x) * 30.0, len = min(abs(vel) * uBlur.x, uBlur.y);
    vec2 q = pu - dN / uDisp.xy; float stepU = sign(vel) * len / 3.0 / uDisp.x;
    vec3 sharp = (TEX(uPhoto, q).rgb * uTaps.x + TEX(uPhoto, q + vec2(stepU, 0.0)).rgb * uTaps.y
                + TEX(uPhoto, q + vec2(2.0 * stepU, 0.0)).rgb * uTaps.z + TEX(uPhoto, q + vec2(3.0 * stepU, 0.0)).rgb * uTaps.w) / dot(uTaps, vec4(1.0));
    vec3 low = TEXB(uPhoto, q, 1.0).rgb;
    vec3 ghost = max(vec3(0.0), TEX(uTrail, tuv).rgb - low);   // long-exposure smear only
    photo = sharp + ghost;
    // glow between the flowers: blurred bright-pass, screened, tinted, photo zone only
    vec3 glow = uGlowTint * trailBlur(tuv, uGlow.y).a * uGlow.x;
    photo = 1.0 - (1.0 - photo) * (1.0 - glow);
  }
  photo *= (1.0 - h) * tf * uIntro.x;
  // ── halftone zone: fixed grid; each cell samples the half-res trail at its centre (cell-sized mip)
  vec3 dots = vec3(0.0);
  vec2 cell = (floor(fc / uDot.x) + 0.5) * uDot.x;
  vec2 csu = vec2(cell.x / uRes.x, 1.0 - cell.y / uRes.y);
  float ch = H(csu);
  if (ch > 0.001) {
    vec3 c = trailBlur(cell / uRes, uDotB.z).rgb;
    float b = max(c.r, max(c.g, c.b));
    float r = uDot.x * 0.5 * uDotC * pow(b, uDot.y) * dissolve(csu) * smoothstep(0.0, 0.6, ch) * topFade(csu.y);
    float d = length(fc - cell), aa = AAW(d);
    float cov = (1.0 - smoothstep(r - aa, r + aa, d)) * smoothstep(0.0, uDotB.w, r);
    vec3 col = mix(c, vec3(dot(c, vec3(0.2126, 0.7152, 0.0722))), uDot.z) / max(b, 0.06) * pow(b, uDot.w);
    dots = col * cov;
    dots += trailBlur(tuv, uDotB.y).rgb * uDotB.x * h * dissolve(su) * tf;   // faint halo, added "lighter"
    dots *= uIntro.y;
  }
  vec3 sig = photo + dots;
  float pk = max(sig.r, max(sig.g, sig.b));
  if (pk > uPeak.x) { float r = uPeak.y - uPeak.x; sig *= (uPeak.x + r * (1.0 - exp(-(pk - uPeak.x) / r))) / pk; }
  // keep the area behind the name and role dark
  float inText = (smoothstep(uText.x - 0.04, uText.x, su.x) * (1.0 - smoothstep(uText.z, uText.z + 0.04, su.x))) * (smoothstep(uText.y - 0.08, uText.y, su.y) * (1.0 - smoothstep(uText.w, uText.w + 0.08, su.y)));
  float m = max(sig.r, max(sig.g, sig.b));
  sig *= mix(1.0, min(1.0, uLook.x / max(m, 1e-4)), inText);
  // screen onto the page: the photo's blacks vanish into #0A0A0A
  vec3 o = 1.0 - (1.0 - uBg) * (1.0 - sig);
  // grain + dither, only where there is signal (no grey box)
  float present = smoothstep(0.004, 0.04, max(sig.r, max(sig.g, sig.b)));
  o += (hash(floor(fc / 1.5) + uLook.z * 7.31) - 0.5) * uLook.y * present;
  o += (hash(fc + 3.1) - 0.5) * uLook.w / 255.0 * present;
  FRAG = vec4(o, 1.0);
}`;
    // particles: dust in the beam and water glints, all periodic in the loop.
    const VS_PTS = `
ATTR vec4 aA; ATTR vec4 aB; ATTR vec3 aC;   // kind,x,y,size | params | colour
uniform vec4 uMap; uniform vec3 uPush; uniform float uT, uDpr;
uniform vec4 uCone; uniform vec2 uConeW; uniform vec4 uZoneA; uniform vec4 uZoneB;
VOUT vec4 vCol;
const float TAU = 6.2831853;
void main(){
  vec2 p = aA.yz; float a = 0.0;
  if (aA.x < 0.5) {
    float q = fract((uT + aB.y) / aB.x), s = aA.y - q * 0.2;
    float w = mix(uConeW.x, uConeW.y, clamp(s, 0.0, 1.0));
    p = uCone.xy + (uCone.zw - uCone.xy) * s + vec2(aA.z * w + q * 0.02 + 0.003 * sin(TAU * uT / (aB.x * 0.5) + aB.y * 7.0), 0.0);
    a = aB.z * sin(3.14159 * q) * smoothstep(0.05, 0.25, s) * (1.0 - smoothstep(0.8, 1.0, s));
  } else {
    a = aB.z * (0.5 + 0.5 * sin(TAU * uT / aB.x + aB.y)) * (0.6 + 0.4 * sin(TAU * uT / (aB.x * 0.5) + aB.y * 2.0));
  }
  vec2 su = (uPush.xy + (p - uPush.xy) * uPush.z - uMap.zw) / uMap.xy;
  float h = max(smoothstep(uZoneA.x, uZoneA.y, abs(su.x - 0.5) * 2.0), smoothstep(uZoneA.z, uZoneA.w, su.y));
  a *= (1.0 - h) * smoothstep(0.0, uZoneB.w, su.y);
  gl_Position = vec4(su.x * 2.0 - 1.0, 1.0 - su.y * 2.0, 0.0, 1.0);
  gl_PointSize = (aA.w + 2.0) * uDpr;
  vCol = vec4(aC, a);
}`;
    const FS_PTS = `
VIN vec4 vCol;
void main(){ float r = length(gl_PointCoord - 0.5); float a = (1.0 - smoothstep(0.15, 0.5, r)) * vCol.a; FRAG = vec4(vCol.rgb * a, a); }`;

    function header(gl2, frag, deriv) {
      const prec = '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n';
      if (gl2) return '#version 300 es\n' + prec + (frag ? 'out vec4 fragColor;\n#define FRAG fragColor\n#define TEX texture\n#define TEXB texture\n#define AAW(x) fwidth(x)\n#define HAS_MIPS 1\n#define VIN in\nin vec2 vUv;\n' : '#define ATTR in\n#define VOUT out\n#define TEX texture\n');
      return (frag ? (deriv ? '#extension GL_OES_standard_derivatives : enable\n#define AAW(x) fwidth(x)\n' : '#define AAW(x) 0.75\n') : '') + prec +
        (frag ? '#define FRAG gl_FragColor\n#define TEX texture2D\n#define TEXB texture2D\n#define HAS_MIPS 0\n#define VIN varying\nvarying vec2 vUv;\n' : '#define ATTR attribute\n#define VOUT varying\n#define TEX texture2D\n');
    }
    function program(gl, vs, fs) {
      const mk = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
      const p = gl.createProgram(); const vertex = mk(gl.VERTEX_SHADER, vs), fragment = mk(gl.FRAGMENT_SHADER, fs); gl.attachShader(p, vertex); gl.attachShader(p, fragment); gl.deleteShader(vertex); gl.deleteShader(fragment);
      gl.bindAttribLocation(p, 0, 'aPos'); gl.bindAttribLocation(p, 1, 'aA'); gl.bindAttribLocation(p, 2, 'aB'); gl.bindAttribLocation(p, 3, 'aC'); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
      const u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) { const nm = gl.getActiveUniform(p, i).name; u[nm] = gl.getUniformLocation(p, nm); }
      return { p, u };
    }

    // ── flex map: which pixels sway, baked once from the photo (r = flower tops, g = foreground bokeh, b = background)
    function bakeFlex(img) {
      const F = P.flex, w = F.res, h = Math.round(w / P.imageAspect), cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0, w, h);
      const px = g.getImageData(0, 0, w, h).data, ch = [new Float32Array(w * h), new Float32Array(w * h), new Float32Array(w * h)], tmp = new Float32Array(w * h);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x, j = i * 4, r = px[j] / 255, gg = px[j + 1] / 255, b = px[j + 2] / 255, u = x / w, v = y / h;
        const f = ss(F.lumLo, F.lumHi, Math.max(r, gg, b)) * ss(F.lavLo, F.lavHi, (r + b) * 0.5 - gg);
        const bokeh = (1 - ss(0.35, 0.5, u)) * ss(0.42, 0.55, v);              // big blurred blossoms, lower left
        const back = ss(0.55, 0.7, u) * (1 - ss(0.32, 0.45, v));              // far field, upper right
        ch[1][i] = f * bokeh; ch[2][i] = f * back * (1 - bokeh); ch[0][i] = f * (1 - bokeh) * (1 - back);
      }
      const R = F.blurPx;
      ch.forEach((m) => { for (let pass = 0; pass < 2; pass++) {
        for (let y = 0; y < h; y++) { let s = 0; for (let x = -R; x <= R; x++) s += m[y * w + Math.min(w - 1, Math.max(0, x))]; for (let x = 0; x < w; x++) { tmp[y * w + x] = s / (2 * R + 1); s += m[y * w + Math.min(w - 1, x + R + 1)] - m[y * w + Math.max(0, x - R)]; } }
        for (let x = 0; x < w; x++) { let s = 0; for (let y = -R; y <= R; y++) s += tmp[Math.min(h - 1, Math.max(0, y)) * w + x]; for (let y = 0; y < h; y++) { m[y * w + x] = s / (2 * R + 1); s += tmp[Math.min(h - 1, y + R + 1) * w + x] - tmp[Math.max(0, y - R) * w + x]; } }
      } });
      const out = new Uint8Array(w * h * 4);
      for (let i = 0; i < w * h; i++) { out[i * 4] = Math.min(255, ch[0][i] * 1.8 * 255); out[i * 4 + 1] = Math.min(255, ch[1][i] * 1.8 * 255); out[i * 4 + 2] = Math.min(255, ch[2][i] * 1.8 * 255); out[i * 4 + 3] = 255; }
      return { w, h, data: out };
    }

    // ── layout: strip size, cover map with the ridge rule, text box
    function measure() {
      const root = el.root;
      S.vw = window.innerWidth; S.vh = root.getBoundingClientRect().height; S.mobile = S.vw < P.breakpoint;

      const r = el.strip.getBoundingClientRect(), rr = root.getBoundingClientRect();
      S.W = Math.max(1, r.width); S.H = Math.max(1, r.height);
      S.dpr = Math.min(window.devicePixelRatio || 1, P.dprCap);
      S.cw = Math.round(S.W * S.dpr); S.ch = Math.round(S.H * S.dpr);
      S.tw = Math.max(1, Math.round(S.cw * P.trailScale)); S.th = Math.max(1, Math.round(S.ch * P.trailScale));
      S.pitch = S.mobile ? P.pitch.mobile : P.pitch.desktop;
      const base = S.mobile ? P.fps.mobile : P.fps.desktop;
      S.fps = S.perfLevel ? Math.min(base, P.fps.degraded) : base;
      // cover: fill the strip, centred in x; in y keep the ridge crest at or below the limit (closest to bottom-anchored that allows it)
      const ia = P.imageAspect, dispW = Math.max(S.W, S.H * ia), dispH = dispW / ia;
      const sx = S.W / dispW, sy = S.H / dispH, stripTop = r.top - rr.top;
      const limit = (S.mobile ? P.ridge.mobileMaxVh : P.ridge.maxVh) * S.vh;
      const maxOff = (stripTop + P.ridge.imgY * dispH - limit) / dispH;           // larger offsets lift the crest above the limit
      const oy = Math.max(0, Math.min(1 - sy, maxOff));
      S.map[0] = sx; S.map[1] = sy; S.map[2] = (1 - sx) / 2; S.map[3] = oy; S.map[4] = dispW; S.map[5] = dispH;
      S.ridgeVh = (stripTop + (P.ridge.imgY - oy) * dispH) / S.vh;
      const ink = (n) => { const g = document.createRange(); g.selectNodeContents(n); return g.getBoundingClientRect(); }; // the text itself, not the block box
      const a = ink(el.name), b = ink(el.role), pad = P.beam.padPx;
      S.text[0] = (Math.min(a.left, b.left) - pad - r.left) / S.W; S.text[2] = (Math.max(a.right, b.right) + pad - r.left) / S.W;
      S.text[1] = (a.top - pad - r.top) / S.H; S.text[3] = (b.bottom + pad - r.top) / S.H;
      S.roleBottomVh = (b.bottom - rr.top) / S.vh;
    }

    // ── poster: same crop and same zones, photo and dots on two layers (dots arrive 200 ms later)
    function drawPoster() {
      if (!S.img) return;
      const m = S.map, img = S.img, iw = img.naturalWidth, ih = img.naturalHeight;
      const pc = el.posterPhoto, dc = el.posterDots; pc.width = dc.width = S.cw; pc.height = dc.height = S.ch;
      const g = pc.getContext('2d');
      g.drawImage(img, m[2] * iw, m[3] * ih, m[0] * iw, m[1] * ih, 0, 0, S.cw, S.ch);
      g.globalCompositeOperation = 'screen'; g.globalAlpha = P.glow.strength * 0.6; g.filter = 'blur(' + Math.round(10 * S.dpr) + 'px)'; // poster stand-in for the glow
      g.drawImage(pc, 0, 0); g.filter = 'none'; g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
      const mw = Math.max(8, Math.round(S.W / 6)), mh = Math.max(8, Math.round(S.H / 6));
      const mc = document.createElement('canvas'); mc.width = mw; mc.height = mh;
      const mx = mc.getContext('2d'), md = mx.createImageData(mw, mh);
      for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) { const u = (x + 0.5) / mw, v = (y + 0.5) / mh; md.data[(y * mw + x) * 4 + 3] = 255 * (1 - Z.H(u, v)) * Z.top(v); }
      mx.putImageData(md, 0, 0);
      g.globalCompositeOperation = 'destination-in'; g.imageSmoothingEnabled = true; g.drawImage(mc, 0, 0, S.cw, S.ch); g.globalCompositeOperation = 'source-over';
      // dots: average colour per cell via a cell-sized downscale
      const pitch = S.pitch * S.dpr, nx = Math.ceil(S.cw / pitch), ny = Math.ceil(S.ch / pitch);
      const cc = document.createElement('canvas'); cc.width = nx; cc.height = ny;
      const cx = cc.getContext('2d', { willReadFrequently: true }); cx.imageSmoothingQuality = 'high';
      cx.drawImage(img, m[2] * iw, m[3] * ih, m[0] * iw, m[1] * ih, 0, ny - S.ch / pitch, S.cw / pitch, S.ch / pitch); // grid is anchored bottom-left
      const cd = cx.getImageData(0, 0, nx, ny).data, d = dc.getContext('2d'), Hd = P.halftone;
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const px = (i + 0.5) * pitch, pyUp = (j + 0.5) * pitch, u = px / S.cw, v = 1 - pyUp / S.ch;  // grid anchored bottom-left, like the shader
        const h = Z.H(u, v); if (h < 0.001) continue;
        const k = ((ny - 1 - j) * nx + i) * 4, r = cd[k] / 255, gg = cd[k + 1] / 255, b = cd[k + 2] / 255, br = Math.max(r, gg, b);
        const rad = pitch * 0.5 * Hd.maxFill * Math.pow(br, Hd.gamma) * Z.dissolve(u, v) * ss(0, 0.6, h) * Z.top(v);
        if (rad < Hd.minRadius) continue;
        const lum = 0.2126 * r + 0.7152 * gg + 0.0722 * b, f = Math.pow(br, Hd.colorLift) / Math.max(br, 0.06);
        const col = [r, gg, b].map((c) => Math.round(Math.min(1, (c + (lum - c) * Hd.desat) * f) * 255));
        d.fillStyle = 'rgb(' + col.join(',') + ')'; d.beginPath(); d.arc(px, S.ch - pyUp, rad, 0, TAU); d.fill();
      }
      d.globalCompositeOperation = 'lighter'; d.globalAlpha = Hd.haloAlpha; d.filter = 'blur(' + Math.round(pitch * 0.8) + 'px)'; // halo
      d.drawImage(dc, 0, 0); d.filter = 'none'; d.globalAlpha = 1; d.globalCompositeOperation = 'source-over';
      pc.dataset.ready = 'true';
    }

    // ── GL setup
    const G = { trail: null, main: null, pts: null, photo: null, flex: null, tex: [null, null], fbo: [null, null], src: 0, quad: null, ptsBuf: null };
    function initGL() {
      const attrs = { alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'low-power' };
      let gl = el.live.getContext('webgl2', attrs); const gl2 = !!gl;
      if (!gl) gl = el.live.getContext('webgl', attrs) || el.live.getContext('experimental-webgl', attrs);
      if (!gl) return false;
      S.gl = gl; S.gl2 = gl2;
      const deriv = gl2 || !!gl.getExtension('OES_standard_derivatives');
      try {
        G.trail = program(gl, header(gl2, false) + VS, header(gl2, true, deriv) + NOISE + COMMON + FS_TRAIL);
        G.main = program(gl, header(gl2, false) + VS, header(gl2, true, deriv) + NOISE + COMMON + FS_MAIN);
        G.pts = program(gl, header(gl2, false) + VS_PTS, header(gl2, true, deriv).replace('in vec2 vUv;\n', '').replace('varying vec2 vUv;\n', '') + FS_PTS);
      } catch (e) { console.warn('[field] shader error', e); return false; }
      G.quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, G.quad); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      G.photo = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, G.photo);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, S.img);
      texParams(gl, gl2); if (gl2) gl.generateMipmap(gl.TEXTURE_2D);
      G.flex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, G.flex); gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, S.flex.w, S.flex.h, 0, gl.RGBA, gl.UNSIGNED_BYTE, S.flex.data); texParams(gl, false);
      buildParticles(gl);
      el.live.addEventListener('webglcontextlost', onLost, false);
      return true;
    }
    function texParams(gl, mips) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mips ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    // ── particles: dust in the beam cone, water glints on real bright pixels
    function buildParticles(gl) {
      const data = [], push = (k, x, y, sz, b0, b1, b2, c) => data.push(k, x, y, sz, b0, b1, b2, 0, c[0], c[1], c[2]);
      const D = P.dust, dc = hex(D.color), n = S.mobile ? D.mobile : D.desktop;
      for (let i = 0; i < n; i++) push(0, lerp(0.25, 1.0, rnd()), lerp(-1, 1, rnd()), lerp(D.size[0], D.size[1], rnd()), D.lives[Math.floor(rnd() * D.lives.length)], rnd() * P.loop, lerp(D.alpha[0], D.alpha[1], rnd()), dc);
      const Wt = P.water, wc = hex(Wt.color), cv = document.createElement('canvas'), w = 320, h = Math.round(w / P.imageAspect); cv.width = w; cv.height = h;
      const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(S.img, 0, 0, w, h); const px = g.getImageData(0, 0, w, h).data;
      for (let k = 0, tries = 0; k < Wt.n && tries < 4000; tries++) {
        const u = lerp(Wt.box[0], Wt.box[1], rnd()), v = lerp(Wt.box[2], Wt.box[3], rnd()), j = (Math.floor(v * h) * w + Math.floor(u * w)) * 4;
        if (Math.max(px[j], px[j + 1], px[j + 2]) > 70) { push(1, u, v, lerp(Wt.size[0], Wt.size[1], rnd()), Wt.periods[Math.floor(rnd() * Wt.periods.length)], rnd() * TAU, lerp(Wt.alpha[0], Wt.alpha[1], rnd()), wc); k++; }
      }
      S.nPts = data.length / 11;
      G.ptsBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, G.ptsBuf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    }
    function sizeGL() {
      const gl = S.gl; if (!gl) return;
      el.live.width = S.cw; el.live.height = S.ch;
      for (let i = 0; i < 2; i++) {
        if (G.tex[i]) gl.deleteTexture(G.tex[i]); if (G.fbo[i]) gl.deleteFramebuffer(G.fbo[i]);
        const t = G.tex[i] = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, S.tw, S.th, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        texParams(gl, S.gl2); if (S.gl2) gl.generateMipmap(gl.TEXTURE_2D);
        const f = G.fbo[i] = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); S.first = true; setStatic();
    }
    // uniforms that change only on resize / tweak
    function setStatic() {
      const gl = S.gl; if (!gl) return;
      const W = P.wind, sc = S.W / W.refWidth, Zn = P.zones, Hd = P.halftone, bg = hex(P.bg), gt = hex(P.glow.tint), D = P.dust;
      const common = (u) => {
        gl.uniform1i(u.uPhoto, 0); gl.uniform1i(u.uFlex, 1);
        gl.uniform4f(u.uMap, S.map[0], S.map[1], S.map[2], S.map[3]); gl.uniform4f(u.uDisp, S.map[4], S.map[5], S.W, S.H);
        gl.uniform4f(u.uWave, 1 / W.wavelength, W.period, W.patchCycles, W.patchDrift);
        gl.uniform4f(u.uAmpA, W.ampTop[0] * sc, W.ampTop[1] * sc, W.ampBokeh[0] * sc, W.ampBokeh[1] * sc);
        gl.uniform4f(u.uAmpB, W.ampBack[0] * sc, W.ampBack[1] * sc, W.gustBoost, W.patchFloor);
        gl.uniform4f(u.uTaps, P.blur.weights[0], P.blur.weights[1], P.blur.weights[2], P.blur.weights[3]);
      };
      gl.useProgram(G.trail.p); common(G.trail.u); gl.uniform1i(G.trail.u.uPrev, 2);
      gl.uniform4f(G.trail.u.uTrailP, P.trail.shiftPx / S.W, P.glow.threshold, 1.0, 0);
      gl.useProgram(G.main.p); const u = G.main.u; common(u); gl.uniform1i(u.uTrail, 2);
      gl.uniform2f(u.uRes, S.cw, S.ch);
      gl.uniform4f(u.uZoneA, Zn.sideStart, Zn.sideEnd, Zn.bottomStart, Zn.bottomEnd);
      gl.uniform4f(u.uZoneB, Zn.edgeDissolve, Zn.bottomDissolve[0], Zn.bottomDissolve[1], Zn.topFade);
      const pitchDev = S.pitch * S.dpr;
      gl.uniform4f(u.uDot, pitchDev, Hd.gamma, Hd.desat, Hd.colorLift);
      gl.uniform4f(u.uDotB, Hd.haloAlpha, Hd.haloBias, Math.max(0, Math.log2(pitchDev * P.trailScale)), Hd.minRadius);
      gl.uniform3f(u.uGlowTint, gt[0], gt[1], gt[2]); gl.uniform3f(u.uBg, bg[0], bg[1], bg[2]);
      gl.uniform4f(u.uText, S.text[0], S.text[1], S.text[2], S.text[3]);
      gl.uniform2f(u.uPeak, P.peak.knee, P.peak.max); gl.uniform1f(u.uDotC, Hd.maxFill);
      gl.useProgram(G.pts.p); const q = G.pts.u;
      gl.uniform4f(q.uMap, S.map[0], S.map[1], S.map[2], S.map[3]); gl.uniform1f(q.uDpr, S.dpr);
      gl.uniform4f(q.uCone, D.from[0], D.from[1], D.to[0], D.to[1]); gl.uniform2f(q.uConeW, D.width[0], D.width[1]);
      gl.uniform4f(q.uZoneA, Zn.sideStart, Zn.sideEnd, Zn.bottomStart, Zn.bottomEnd); gl.uniform4f(q.uZoneB, Zn.edgeDissolve, Zn.bottomDissolve[0], Zn.bottomDissolve[1], Zn.topFade);
    }

    // ── composite: one frame (trail pass at half res, then the full strip, then particles)
    function render(t, introPhoto, introDots) {
      const gl = S.gl, dst = 1 - G.src, push = 1 + P.pushIn * 0.5 * (1 - Math.cos(TAU * t / P.loop));
      const decay = S.mobile && S.perfLevel ? 0 : lerp(P.trail.decayRest, P.trail.decayGust, S.gust);
      const ptrA = ss(0, 1, S.ptrAmt), cap = P.beam.dimTo, glow = P.glow.strength * (1 + P.glow.rise * S.level);
      const wind = (u) => {
        gl.uniform4f(u.uWind, t, S.gust, S.gustPrev, P.wind.amount);
        gl.uniform3f(u.uPush, P.pushCenter[0], P.pushCenter[1], push);
        gl.uniform4f(u.uPtr, S.ptrX, ptrA, P.pointer.radius, P.pointer.strength);
      };
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, G.photo);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, G.flex);
      gl.bindBuffer(gl.ARRAY_BUFFER, G.quad); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.disable(gl.BLEND);
      // trail
      gl.bindFramebuffer(gl.FRAMEBUFFER, G.fbo[dst]); gl.viewport(0, 0, S.tw, S.th);
      gl.useProgram(G.trail.p); wind(G.trail.u);
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, G.tex[G.src]);
      gl.uniform4f(G.trail.u.uBlur, P.blur.k, P.blur.maxPx, decay, S.first ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindTexture(gl.TEXTURE_2D, G.tex[dst]); if (S.gl2) gl.generateMipmap(gl.TEXTURE_2D);
      // strip
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, S.cw, S.ch);
      gl.useProgram(G.main.p); const u = G.main.u; wind(u);
      gl.uniform4f(u.uBlur, P.blur.k, P.blur.maxPx, 0, 0);
      gl.uniform4f(u.uGlow, glow, P.glow.bias, 0, 0);
      gl.uniform4f(u.uLook, cap, P.grain.amount, Math.floor(t * P.grain.fps), P.halftone.dither);
      gl.uniform4f(u.uIntro, introPhoto, introDots, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.disableVertexAttribArray(0);
      // particles
      if (S.nPts) {
        gl.enable(gl.BLEND); gl.blendFunc(gl.ONE_MINUS_DST_COLOR, gl.ONE); // screen
        gl.useProgram(G.pts.p); gl.uniform1f(G.pts.u.uT, t); gl.uniform3f(G.pts.u.uPush, P.pushCenter[0], P.pushCenter[1], push);
        gl.bindBuffer(gl.ARRAY_BUFFER, G.ptsBuf);
        gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 44, 0);
        gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 44, 16);
        gl.enableVertexAttribArray(3); gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 44, 32);
        gl.drawArrays(gl.POINTS, 0, S.nPts);
        gl.disableVertexAttribArray(1); gl.disableVertexAttribArray(2); gl.disableVertexAttribArray(3);
      }
      G.src = dst; S.first = false;
      if (!S.liveShown) { S.liveShown = true; el.live.style.opacity = '1'; }
    }

    // ── loop
    function step(dt, realDt) {
      S.t = (S.t + dt) % P.loop;
      S.gustPrev = gustAt(S.t - 1 / 30); S.gust = gustAt(S.t);
      S.level += (S.gust - S.level) * (1 - Math.exp(-realDt / (P.glow.lagMs / 1000)));   // 300 ms lag
      const rate = realDt * 1000 / P.pointer.rampMs; S.ptrAmt = S.ptrIn ? Math.min(1, S.ptrAmt + rate) : Math.max(0, S.ptrAmt - rate);
    }

    function tick(now) {
      S.raf = requestAnimationFrame(tick);
      if (S.lastRaf) { S.perfSum += now - S.lastRaf; S.perfN++; }
      S.lastRaf = now;
      if (S.perfN >= P.perf.window) {
        S.avgMs = S.perfSum / S.perfN; S.perfSum = 0; S.perfN = 0;
        if (S.avgMs > P.perf.budgetMs) {
          if (S.perfLevel === 0) { S.perfLevel = 1; S.fps = Math.min(S.fps, P.fps.degraded); }
          else { S.fallback = true; showPoster(); update(); return; }
        }
      }
      if (now - S.lastDraw < 1000 / S.fps - 1) return;
      const realDt = Math.min(now - S.lastDraw, 100) / 1000; S.lastDraw = now;
      step(realDt, realDt);
      render(S.t, 1, 1); S.frames++;
    }
    function showPoster() { el.live.style.opacity = '0'; S.liveShown = false; }
    function update() {
      const want = S.ok && !S.lost && !S.fallback && !S.reduced && !S.paused && !S.hidden && S.inView && !S.dead;
      if (want && !S.running) { S.running = true; S.lastRaf = 0; S.perfSum = 0; S.perfN = 0; S.lastDraw = performance.now() - 1000; S.raf = requestAnimationFrame(tick); }
      else if (!want && S.running) { S.running = false; cancelAnimationFrame(S.raf); }
    }
    function bootGL() { if (S.glTried || S.reduced || !S.img || !S.flex) return; S.glTried = true; S.ok = initGL(); if (S.ok) sizeGL(); }
    function onLost(e) { e.preventDefault(); S.lost = true; showPoster(); update(); }
    let rt = 0; function relayout() { clearTimeout(rt); rt = setTimeout(() => { if (S.dead || !S.img) return; measure(); drawPoster(); if (S.ok) { sizeGL(); if (!S.running && !S.reduced) render(S.t, 1, 1); } }, 80); }

    // ── input
    const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    S.reduced = !!(mq && mq.matches);
    const onMq = () => { S.reduced = mq.matches; if (S.reduced) showPoster(); else bootGL(); update(); };
    const onVis = () => { S.hidden = document.hidden; update(); };
    const onMove = (e) => { const r = el.strip.getBoundingClientRect(); S.ptrIn = e.clientY >= r.top && e.clientY <= r.bottom; S.ptrX = (e.clientX - r.left) / r.width; };
    const onLeave = () => { S.ptrIn = false; };
    if (mq && mq.addEventListener) mq.addEventListener('change', onMq);
    document.addEventListener('visibilitychange', onVis);
    el.root.addEventListener('pointermove', onMove, { passive: true });
    el.root.addEventListener('pointerleave', onLeave, { passive: true });
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((en) => { S.inView = en[en.length - 1].isIntersecting; update(); }) : null;
    if (io) io.observe(el.strip);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(relayout) : null;
    if (ro) ro.observe(el.root); else window.addEventListener('resize', relayout);


    // ── boot: poster first, then the live canvas
    scheduleGusts();
    const img = new Image(); img.decoding = 'async';
    img.onload = () => {
      if (S.dead) return;
      S.img = img; measure(); drawPoster();
      setTimeout(() => {
        if (S.dead) return;
        try { S.flex = bakeFlex(img); bootGL(); update(); }
        catch (error) { console.warn('[flower-bed] using static artwork', error); S.fallback = true; showPoster(); update(); }
      }, 0);
    };
    img.onerror = () => { if (!S.dead) el.root.dataset.flowerError = 'true'; };
    img.src = window.innerWidth < P.breakpoint ? P.src.mobile : P.src.desktop;


    return {
      setPaused(p) { S.paused = p; update(); },
      destroy() {
        S.dead = true; update(); clearTimeout(rt); img.onload = null; img.onerror = null;
        document.removeEventListener('visibilitychange', onVis);
        if (mq && mq.removeEventListener) mq.removeEventListener('change', onMq);
        el.root.removeEventListener('pointermove', onMove); el.root.removeEventListener('pointerleave', onLeave);
        el.live.removeEventListener('webglcontextlost', onLost);
        const gl = S.gl;
        if (gl) {
          for (const texture of [G.photo, G.flex, ...G.tex]) if (texture) gl.deleteTexture(texture);
          for (const framebuffer of G.fbo) if (framebuffer) gl.deleteFramebuffer(framebuffer);
          for (const buffer of [G.quad, G.ptsBuf]) if (buffer) gl.deleteBuffer(buffer);
          for (const program of [G.trail, G.main, G.pts]) if (program) gl.deleteProgram(program.p);
        }
        if (io) io.disconnect(); if (ro) ro.disconnect(); else window.removeEventListener('resize', relayout);
      },

    };
}
