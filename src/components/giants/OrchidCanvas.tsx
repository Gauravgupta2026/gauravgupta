"use client";

import { useEffect, useRef } from "react";
import { OPENING, easeBetween } from "./openingTimeline";
import { lightFlowerPalette, LIGHT_FLOWER_DEFAULTS } from "./lightFlowerSettings";

const FRAME_INTERVAL = 1000 / 30;
const MAX_FRAME_ELAPSED_MS = 1000;
const MAX_PIXEL_RATIO = 1.6;
const TAU = Math.PI * 2;
const REFERENCE_BLOOM_SECONDS = 5;
const SAMPLE_MARGIN = .04;
// Diffuse glow needs fewer pixels than the crisp dot layer.
const GLOW_PIXEL_RATIO = .5;
const LIGHT_PALETTE = lightFlowerPalette(LIGHT_FLOWER_DEFAULTS);
type Dot = { x: number; y: number; radius: number; light: number; edge: number; center: number };

export function OrchidCanvas({ paused, skipIntro, onTime, theme }: { paused: boolean; skipIntro: boolean; onTime: (time: number) => void; theme: "light" | "dark" }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const playback = useRef({ paused, skipIntro, onTime, theme });
  const repaint = useRef<(() => void) | null>(null);
  useEffect(() => {
    playback.current = { paused, skipIntro, onTime, theme };
    repaint.current?.();
  }, [paused, skipIntro, onTime, theme]);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) { playback.current.onTime(OPENING.complete); return; }
    const glowCanvas = document.createElement("canvas");
    const glowContext = glowCanvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const source = new Image();
    let luminance: Uint8ClampedArray | undefined;
    let sourceWidth = 0, sourceHeight = 0;
    let width = 0, height = 0, spacing = 10;
    let frame = 0, previousTime = 0, previousFrame = 0, elapsed = 0;
    let visible = true, disposed = false;
    const sample = (u: number, v: number) => {
      if (!luminance || u < 0 || v < 0 || u > 1 || v > 1) return 0;
      const x = u * (sourceWidth - 1), y = v * (sourceHeight - 1);
      const left = Math.floor(x), top = Math.floor(y), fx = x - left, fy = y - top;
      const right = Math.min(left + 1, sourceWidth - 1), bottom = Math.min(top + 1, sourceHeight - 1);
      return (luminance[4 * (top * sourceWidth + left)] * (1 - fx) * (1 - fy)
        + luminance[4 * (top * sourceWidth + right)] * fx * (1 - fy)
        + luminance[4 * (bottom * sourceWidth + left)] * (1 - fx) * fy
        + luminance[4 * (bottom * sourceWidth + right)] * fx * fy) / 255;
    };
    const draw = () => {
      if (!luminance || !width || !height) return;
      const settings = LIGHT_FLOWER_DEFAULTS;
      const pitch = spacing * (playback.current.theme === "light" ? settings.dotSpacing : 1);
      const time = reduced.matches ? OPENING.complete : elapsed;
      playback.current.onTime(time);
      const progress = Math.min(time / OPENING.bloomEnd, 1);
      const bloom = 1 - Math.pow(1 - progress, 3);
      const motionTime = time * REFERENCE_BLOOM_SECONDS / OPENING.bloomEnd;
      const revealRadius = .04 + 1.3 * bloom;
      const referenceHeight = 812 + width * .105;
      const scale = Math.min(1, width / 840);
      const aspect = sourceWidth / sourceHeight;
      // Keep the reference motion equations; only fit the framing to short screens.
      const fullHeight = Math.min(referenceHeight * .72 * scale, height * .72, width * .9 / aspect);
      const flowerHeight = fullHeight * (.6 + .4 * bloom) * (1 + .018 * Math.sin(.5 * motionTime));
      const flowerWidth = flowerHeight * aspect;
      const centerX = width / 2 + Math.sin(motionTime * .22) * pitch * .6;
      const centerY = height * .5 + Math.cos(motionTime * .18) * pitch * .4;
      const silver: Dot[] = [], bright: Dot[] = [];
      // Visit only the flower's bounds; the margin includes the sampling ripples and dot radius.
      const halfWidth = flowerWidth * (.5 + SAMPLE_MARGIN) + pitch;
      const halfHeight = flowerHeight * (.5 + SAMPLE_MARGIN) + pitch;
      const firstColumn = Math.max(0, Math.floor((centerX - halfWidth) / pitch));
      const lastColumn = Math.min(Math.ceil(width / pitch), Math.ceil((centerX + halfWidth) / pitch));
      const firstRow = Math.max(0, Math.floor((centerY - halfHeight) / pitch));
      const lastRow = Math.min(Math.ceil(height / pitch), Math.ceil((centerY + halfHeight) / pitch));
      // Keep the same screen-aligned dot grid and motion equations.
      for (let row = firstRow; row <= lastRow; row++) for (let column = firstColumn; column <= lastColumn; column++) {
        const px = column * pitch + pitch / 2, py = row * pitch + pitch / 2;
        let u = (px - centerX) / flowerWidth + .5;
        let v = (py - centerY) / flowerHeight + .5;
        u += .013 * Math.sin(9 * v + .7 * motionTime);
        v += .013 * Math.sin(9 * u - .6 * motionTime + 1.3);
        let light = sample(u, v);
        if (light <= .02) continue;
        let edgeStrength = 0;
        if (playback.current.theme === "light" && settings.edgeDefinition > 0) {
          const du = pitch / flowerWidth, dv = pitch / flowerHeight;
          const neighbour = Math.min(sample(u - du, v), sample(u + du, v), sample(u, v - dv), sample(u, v + dv));
          edgeStrength = Math.min(1, Math.max(0, light - neighbour) * 3);
        }
        const centreStrength = playback.current.theme === "light" ? Math.exp(-((u - .5) ** 2 + (v - .56) ** 2) / .022) : 0;
        light *= .9 + .1 * Math.sin((px + py) * .05 + motionTime * 1.3);
        const nx = (px - centerX) / (.6 * flowerWidth);
        const ny = (py - centerY) / (.6 * flowerHeight);
        const angle = Math.atan2(ny, nx);
        const edge = Math.hypot(nx, ny) - (.1 * Math.sin(3 * angle) + .05 * Math.sin(7 * angle + 1));
        light *= 1 - easeBetween(revealRadius - .15, revealRadius + .15, edge);
        if (light < .04) continue;
        const radius = .62 * pitch * Math.pow(light, .72) * (playback.current.theme === "light" ? settings.dotSize : 1);
        if (radius < .35) continue;
        (light > .6 ? bright : silver).push({ x: px, y: py, radius, light, edge: edgeStrength, center: centreStrength });
      }
      const path = (dots: Iterable<Dot>, target = context) => {
        target.beginPath();
        for (const dot of dots) { target.moveTo(dot.x + dot.radius, dot.y); target.arc(dot.x, dot.y, dot.radius, 0, TAU); }
      };
      context.clearRect(0, 0, width, height);
      if (playback.current.theme === "light") {
        const palette = LIGHT_PALETTE;
        const edgeBands = settings.edgeDefinition > 0 ? 4 : 1;
        const groups: Dot[][] = Array.from({ length: palette.length * edgeBands }, () => []);
        for (const dot of [...silver, ...bright]) {
          const tone = Math.max(0, Math.min(1, .5 + (dot.light - .5) * settings.contrast - dot.center * settings.centerDepth));
          const band = Math.round(tone * (palette.length - 1));
          const edgeBand = Math.round(dot.edge * (edgeBands - 1));
          groups[band * edgeBands + edgeBand].push(dot);
        }
        element.style.filter = "none";
        if (glowContext && settings.glow > 0) {
          glowContext.clearRect(0, 0, width, height);
          path([...silver, ...bright], glowContext);
          glowContext.shadowColor = settings.shadow;
          glowContext.shadowBlur = pitch * settings.glow * GLOW_PIXEL_RATIO;
          glowContext.globalAlpha = settings.glow * .25;
          glowContext.fillStyle = settings.petal; glowContext.fill();
          context.drawImage(glowCanvas, 0, 0, width, height);
        }
        groups.forEach((dots, index) => {
          if (!dots.length) return;
          path(dots); context.fillStyle = palette[Math.floor(index / edgeBands)][index % edgeBands]; context.fill();
        });
      } else {
        path([...silver, ...bright]); context.shadowColor = "rgba(211,0,120,.55)"; context.shadowBlur = pitch * 1.1;
        context.fillStyle = "rgba(211,0,120,.35)"; context.fill(); context.shadowBlur = 0;
        path(silver); context.fillStyle = "#cfd4d9"; context.fill();
        path(bright); context.shadowColor = "rgba(255,255,255,.7)"; context.shadowBlur = pitch * 2;
        context.fillStyle = "#fff"; context.fill(); context.shadowBlur = 0;
        const tintProgress = easeBetween(...OPENING.pinkIn, time);
        const tint = tintProgress * .22;
        element.dataset.tint = tintProgress.toFixed(3);
        element.style.transition = "none";
        element.style.filter = `drop-shadow(0 0 22px rgba(150,0,78,${tintProgress * .9}))`;
        context.globalCompositeOperation = "source-atop"; context.fillStyle = `rgba(211,0,120,${tint})`;
        context.fillRect(0, 0, width, height); context.globalCompositeOperation = "source-over";
      }
    };
    const resize = () => {
      const bounds = element.getBoundingClientRect(); width = bounds.width; height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      const pixelWidth = Math.round(width * ratio), pixelHeight = Math.round(height * ratio);
      if (element.width !== pixelWidth || element.height !== pixelHeight) {
        element.width = pixelWidth; element.height = pixelHeight;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      const glowWidth = Math.ceil(width * GLOW_PIXEL_RATIO), glowHeight = Math.ceil(height * GLOW_PIXEL_RATIO);
      if (glowCanvas.width !== glowWidth || glowCanvas.height !== glowHeight) {
        glowCanvas.width = glowWidth; glowCanvas.height = glowHeight;
        glowContext?.setTransform(GLOW_PIXEL_RATIO, 0, 0, GLOW_PIXEL_RATIO, 0, 0);
      }
      const referenceHeight = 812 + width * .105;
      spacing = width < 840 ? Math.max(3, Math.round(referenceHeight / 96 * Math.min(1, width / 840))) : Math.max(5, Math.round(Math.min(width, referenceHeight) / 96));
      draw();
    };
    const animate = (timestamp: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden || playback.current.paused || reduced.matches) return;
      const delta = previousTime ? Math.min(timestamp - previousTime, MAX_FRAME_ELAPSED_MS) : 0; previousTime = timestamp;
      if (playback.current.skipIntro && elapsed < OPENING.complete) { elapsed = OPENING.complete; draw(); }
      if (visible && !document.hidden && !playback.current.paused && !reduced.matches) {
        elapsed += delta / 1000;
        if (timestamp - previousFrame >= FRAME_INTERVAL) { draw(); previousFrame = timestamp; }
      }
      frame = requestAnimationFrame(animate);
    };
    const syncPlayback = () => {
      cancelAnimationFrame(frame); frame = 0; previousTime = 0;
      if (playback.current.skipIntro) elapsed = Math.max(elapsed, OPENING.complete);
      if (visible && !document.hidden) draw();
      if (luminance && visible && !document.hidden && !playback.current.paused && !reduced.matches) frame = requestAnimationFrame(animate);
    };
    repaint.current = syncPlayback;
    source.onload = () => {
      if (disposed) return;
      const buffer = document.createElement("canvas"); buffer.width = source.width; buffer.height = source.height;
      const bufferContext = buffer.getContext("2d");
      if (!bufferContext) { playback.current.onTime(OPENING.complete); return; }
      bufferContext.drawImage(source, 0, 0);
      luminance = bufferContext.getImageData(0, 0, source.width, source.height).data;
      sourceWidth = source.width; sourceHeight = source.height; resize(); syncPlayback();
    };
    source.onerror = () => { if (!disposed) playback.current.onTime(OPENING.complete); };
    const observer = new ResizeObserver(resize); observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncPlayback(); }); intersection.observe(element);
    document.addEventListener("visibilitychange", syncPlayback);
    reduced.addEventListener("change", syncPlayback); source.src = "/media/orchid-luminance.png";
    return () => { repaint.current = null; disposed = true; cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); reduced.removeEventListener("change", syncPlayback); document.removeEventListener("visibilitychange", syncPlayback); source.onload = null; source.onerror = null; };
  }, []);
  return <canvas ref={canvas} aria-hidden="true" />;
}
