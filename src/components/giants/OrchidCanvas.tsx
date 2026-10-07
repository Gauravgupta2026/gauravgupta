"use client";

import { useEffect, useRef } from "react";
import { OPENING, easeBetween } from "./openingTimeline";
import { lightFlowerPalette, LIGHT_FLOWER_DEFAULTS } from "./lightFlowerSettings";

const FRAME_INTERVAL = 1000 / 30;
const MAX_PIXEL_RATIO = 1.6;
const TAU = Math.PI * 2;
const REFERENCE_BLOOM_SECONDS = 5;
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
      const pixel = (column: number, row: number) => luminance![4 * (row * sourceWidth + column)] / 255;
      return pixel(left, top) * (1 - fx) * (1 - fy) + pixel(right, top) * fx * (1 - fy)
        + pixel(left, bottom) * (1 - fx) * fy + pixel(right, bottom) * fx * fy;
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
      const centerY = height * (width <= 440 ? .588 : .5) + Math.cos(motionTime * .18) * pitch * .4;
      const silver: Dot[] = [], bright: Dot[] = [];
      const columns = Math.ceil(width / pitch) + 1, rows = Math.ceil(height / pitch) + 1;
      // Sample a fixed screen grid: radial reveal, breathing, ripples and luminance match Edna's renderer.
      for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
        const px = column * pitch + pitch / 2, py = row * pitch + pitch / 2;
        let u = (px - centerX) / flowerWidth + .5;
        let v = (py - centerY) / flowerHeight + .5;
        u += .013 * Math.sin(9 * v + .7 * motionTime);
        v += .013 * Math.sin(9 * u - .6 * motionTime + 1.3);
        let light = sample(u, v);
        let edgeStrength = 0;
        if (playback.current.theme === "light" && light > .02) {
          const du = pitch / flowerWidth, dv = pitch / flowerHeight;
          const neighbour = Math.min(sample(u - du, v), sample(u + du, v), sample(u, v - dv), sample(u, v + dv));
          edgeStrength = Math.min(1, Math.max(0, light - neighbour) * 3);
        }
        const centreStrength = playback.current.theme === "light" ? Math.exp(-((u - .5) ** 2 + (v - .56) ** 2) / .022) : 0;
        if (light <= .02) continue;
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
      const path = (dots: Iterable<Dot>) => {
        context.beginPath();
        for (const dot of dots) { context.moveTo(dot.x + dot.radius, dot.y); context.arc(dot.x, dot.y, dot.radius, 0, TAU); }
      };
      context.clearRect(0, 0, width, height);
      if (playback.current.theme === "light") {
        const palette = LIGHT_PALETTE;
        const groups: Dot[][] = Array.from({ length: palette.length * 4 }, () => []);
        for (const dot of [...silver, ...bright]) {
          const tone = Math.max(0, Math.min(1, .5 + (dot.light - .5) * settings.contrast - dot.center * settings.centerDepth));
          const band = Math.round(tone * (palette.length - 1));
          const edgeBand = Math.round(dot.edge * 3);
          groups[band * 4 + edgeBand].push(dot);
        }
        element.style.filter = "none";
        path([...silver, ...bright]);
        context.shadowColor = settings.shadow;
        context.shadowBlur = pitch * settings.glow;
        context.globalAlpha = settings.glow * .25;
        context.fillStyle = settings.petal; context.fill();
        context.globalAlpha = 1; context.shadowBlur = 0;
        groups.forEach((dots, index) => {
          if (!dots.length) return;
          path(dots); context.fillStyle = palette[Math.floor(index / 4)][index % 4]; context.fill();
        });
      } else {
        path([...silver, ...bright]); context.shadowColor = "rgba(211,0,120,.55)"; context.shadowBlur = pitch * 1.1;
        context.fillStyle = "rgba(211,0,120,.35)"; context.fill(); context.shadowBlur = 0;
        path(silver); context.fillStyle = "#cfd4d9"; context.fill();
        path(bright); context.shadowColor = "rgba(255,255,255,.7)"; context.shadowBlur = pitch * 2;
        context.fillStyle = "#fff"; context.fill(); context.shadowBlur = 0;
        const tint = easeBetween(4.15, 6.75, motionTime) * .22;
        element.style.transition = "filter 1.5s ease";
        element.style.filter = `drop-shadow(0 0 22px rgba(150,0,78,${motionTime >= 5.8 ? .9 : 0}))`;
        context.globalCompositeOperation = "source-atop"; context.fillStyle = `rgba(211,0,120,${tint})`;
        context.fillRect(0, 0, width, height); context.globalCompositeOperation = "source-over";
      }
    };
    repaint.current = draw;
    const resize = () => {
      const bounds = element.getBoundingClientRect(); width = bounds.width; height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const referenceHeight = 812 + width * .105;
      spacing = width < 840 ? Math.max(3, Math.round(referenceHeight / 96 * Math.min(1, width / 840))) : Math.max(5, Math.round(Math.min(width, referenceHeight) / 96));
      draw();
    };
    const animate = (timestamp: number) => {
      const delta = previousTime ? Math.min(timestamp - previousTime, 100) : 0; previousTime = timestamp;
      if (playback.current.skipIntro && elapsed < OPENING.complete) { elapsed = OPENING.complete; draw(); }
      if (visible && !document.hidden && !playback.current.paused && !reduced.matches) {
        elapsed += delta / 1000;
        if (elapsed < OPENING.complete || timestamp - previousFrame >= FRAME_INTERVAL) { draw(); previousFrame = timestamp; }
      }
      frame = requestAnimationFrame(animate);
    };
    source.onload = () => {
      if (disposed) return;
      const buffer = document.createElement("canvas"); buffer.width = source.width; buffer.height = source.height;
      const bufferContext = buffer.getContext("2d");
      if (!bufferContext) { playback.current.onTime(OPENING.complete); return; }
      bufferContext.drawImage(source, 0, 0);
      luminance = bufferContext.getImageData(0, 0, source.width, source.height).data;
      sourceWidth = source.width; sourceHeight = source.height; resize(); frame = requestAnimationFrame(animate);
    };
    source.onerror = () => { if (!disposed) playback.current.onTime(OPENING.complete); };
    const observer = new ResizeObserver(resize); observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); intersection.observe(element);
    reduced.addEventListener("change", draw); source.src = "/media/orchid-luminance.png";
    return () => { repaint.current = null; disposed = true; cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); reduced.removeEventListener("change", draw); source.onload = null; source.onerror = null; };
  }, []);
  return <canvas ref={canvas} aria-hidden="true" />;
}
