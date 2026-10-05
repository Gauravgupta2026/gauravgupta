"use client";

import { useEffect, useRef } from "react";

const INVITATION_PEEL = 0.025;
const COMMIT_THRESHOLD = 0.4;
const MESH_COLUMNS = 160;
const MESH_ROWS = 100;

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
uniform float u_progress;
out vec2 v_uv;
out float v_fold;
out float v_crease;

void main() {
  float distanceFromCorner = (1.0 - a_position.x) + (1.0 - a_position.y);
  float crease = u_progress * 2.12;
  float pastCrease = max(crease - distanceFromCorner, 0.0);
  float fold = smoothstep(0.0, 0.32, pastCrease);

  vec2 position = a_position;
  position -= vec2(pastCrease);

  float curl = sin(clamp(pastCrease / 0.32, 0.0, 1.0) * 3.14159265);
  position -= vec2(curl * 0.022);

  gl_Position = vec4(position.x * 2.0 - 1.0, 1.0 - position.y * 2.0, 0.0, 1.0);
  v_uv = a_position;
  v_fold = fold;
  v_crease = pastCrease;
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform float u_progress;
uniform sampler2D u_story;
in vec2 v_uv;
in float v_fold;
in float v_crease;
out vec4 outColor;

void main() {
  vec4 story = texture(u_story, v_uv);
  float creaseHighlight = exp(-v_crease * 48.0) * step(0.0001, v_crease) * 0.13;
  float foldedShade = smoothstep(0.05, 0.9, v_fold) * 0.1;
  vec3 film = vec3(0.965, 0.965, 0.97);
  film = mix(film, story.rgb, story.a * 0.88);
  film += creaseHighlight;
  film -= foldedShade;

  float departure = 1.0 - smoothstep(0.88, 0.995, u_progress);
  float opacity = mix(0.91, 0.975, v_fold);
  outColor = vec4(film, opacity * departure);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create the photo-film shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader) ?? "Unknown shader error.";
    gl.deleteShader(shader);
    throw new Error(error);
  }
  return shader;
}

function createMesh(gl: WebGL2RenderingContext) {
  const vertices = new Float32Array((MESH_COLUMNS + 1) * (MESH_ROWS + 1) * 2);
  const indices = new Uint16Array(MESH_COLUMNS * MESH_ROWS * 6);

  let vertexOffset = 0;
  for (let row = 0; row <= MESH_ROWS; row += 1) {
    for (let column = 0; column <= MESH_COLUMNS; column += 1) {
      vertices[vertexOffset++] = column / MESH_COLUMNS;
      vertices[vertexOffset++] = row / MESH_ROWS;
    }
  }

  let indexOffset = 0;
  for (let row = 0; row < MESH_ROWS; row += 1) {
    for (let column = 0; column < MESH_COLUMNS; column += 1) {
      const topLeft = row * (MESH_COLUMNS + 1) + column;
      const topRight = topLeft + 1;
      const bottomLeft = topLeft + MESH_COLUMNS + 1;
      const bottomRight = bottomLeft + 1;
      indices.set(
        [topLeft, bottomLeft, topRight, topRight, bottomLeft, bottomRight],
        indexOffset,
      );
      indexOffset += 6;
    }
  }

  const vertexBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  if (!vertexBuffer || !indexBuffer) throw new Error("Could not create the photo-film mesh.");
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  return { vertexBuffer, indexBuffer, indexCount: indices.length };
}

function wrapStory(context: CanvasRenderingContext2D, story: string, maxWidth: number) {
  const lines: string[] = [];
  let line = "";

  for (const word of story.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function updateStoryTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  story: string,
  cssWidth: number,
  cssHeight: number,
  pixelRatio: number,
) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = Math.max(1, Math.round(cssWidth * pixelRatio));
  textureCanvas.height = Math.max(1, Math.round(cssHeight * pixelRatio));
  const context = textureCanvas.getContext("2d");
  if (!context) return;

  context.scale(pixelRatio, pixelRatio);
  const fontSize = Math.max(15, Math.min(21, cssWidth * 0.019));
  const lineHeight = fontSize * 1.48;
  const maxWidth = Math.min(cssWidth * 0.58, 620);
  const fontFamily = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-newsreader")
    .trim();
  context.font = `400 ${fontSize}px ${fontFamily || "Georgia"}, Georgia, serif`;
  context.fillStyle = "rgba(39, 39, 42, 0.82)";
  context.textBaseline = "top";

  const lines = wrapStory(context, story, maxWidth);
  const textHeight = lines.length * lineHeight;
  const startX = (cssWidth - maxWidth) / 2;
  const startY = Math.max(cssHeight * 0.26, (cssHeight - textHeight) / 2);
  lines.forEach((line, index) => {
    context.fillText(line, startX, startY + index * lineHeight);
  });

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
}

type WebGLPeelFilmProps = {
  story: string;
  screenNumber: number;
};

export function WebGLPeelFilm({ story, screenNumber }: WebGLPeelFilmProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef(INVITATION_PEEL);
  const revealRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = canvas?.parentElement;
    if (!canvas || !frame) return;

    let cleanup: (() => void) | undefined;

    const initialize = () => {
      if (cleanup) return;
      const gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });
      if (!gl) {
        canvas.style.display = "none";
        return;
      }

      try {
        const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        const program = gl.createProgram();
        if (!program) throw new Error("Could not create the photo-film program.");
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) ?? "Unknown WebGL link error.");
        }

        const mesh = createMesh(gl);
        const storyTexture = gl.createTexture();
        if (!storyTexture) throw new Error("Could not create the story texture.");
        const position = gl.getAttribLocation(program, "a_position");
        const progress = gl.getUniformLocation(program, "u_progress");
        const storySampler = gl.getUniformLocation(program, "u_story");
        if (position < 0 || !progress || !storySampler) {
          throw new Error("Missing photo-film shader inputs.");
        }

        let animationFrame = 0;
        let currentProgress = INVITATION_PEEL;
        let previousFrameTime = performance.now();
        let dragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let dragStartProgress = INVITATION_PEEL;
        let disposed = false;
        let revealed = false;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, storyTexture);
        gl.uniform1i(storySampler, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        const finishReveal = () => {
          revealed = true;
          canvas.style.visibility = "hidden";
          canvas.style.pointerEvents = "none";
          if (controlRef.current) controlRef.current.disabled = true;
        };

        const render = (time = performance.now()) => {
          animationFrame = 0;
          if (disposed || revealed) return;
          const elapsed = Math.min(32, time - previousFrameTime);
          previousFrameTime = time;
          const smoothing = reduceMotion ? 1 : 1 - Math.exp(-elapsed * 0.018);
          currentProgress += (progressRef.current - currentProgress) * smoothing;
          if (Math.abs(progressRef.current - currentProgress) < 0.0005) {
            currentProgress = progressRef.current;
          }

          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform1f(progress, currentProgress);
          gl.drawElements(gl.TRIANGLES, mesh.indexCount, gl.UNSIGNED_SHORT, 0);

          if (progressRef.current === 1 && currentProgress > 0.995) {
            finishReveal();
            return;
          }
          if (Math.abs(progressRef.current - currentProgress) >= 0.0005) {
            animationFrame = window.requestAnimationFrame(render);
          }
        };

        const requestRender = () => {
          if (animationFrame || revealed) return;
          previousFrameTime = performance.now();
          animationFrame = window.requestAnimationFrame(render);
        };

        const setProgress = (value: number) => {
          progressRef.current = Math.max(INVITATION_PEEL, Math.min(1, value));
          requestRender();
        };

        revealRef.current = () => setProgress(1);

        const pointFrom = (event: PointerEvent) => {
          const bounds = canvas.getBoundingClientRect();
          return { bounds, x: event.clientX - bounds.left, y: event.clientY - bounds.top };
        };

        const isNearHandle = (x: number, y: number, width: number, height: number) => {
          const crease = progressRef.current * 1.06;
          const handleX = (1 - crease) * width;
          const handleY = (1 - crease) * height;
          const reach = Math.max(72, Math.min(width, height) * 0.16);
          return Math.hypot(x - handleX, y - handleY) <= reach;
        };

        const onPointerDown = (event: PointerEvent) => {
          if (!event.isPrimary || event.button !== 0) return;
          const { bounds, x, y } = pointFrom(event);
          if (!isNearHandle(x, y, bounds.width, bounds.height)) return;
          dragging = true;
          dragStartX = x;
          dragStartY = y;
          dragStartProgress = progressRef.current;
          canvas.setPointerCapture(event.pointerId);
          canvas.style.cursor = "grabbing";
          event.preventDefault();
        };

        const onPointerMove = (event: PointerEvent) => {
          const { bounds, x, y } = pointFrom(event);
          if (!dragging) {
            canvas.style.cursor = isNearHandle(x, y, bounds.width, bounds.height)
              ? "grab"
              : "default";
            return;
          }
          const horizontalPull = (dragStartX - x) / bounds.width;
          const verticalPull = (dragStartY - y) / bounds.height;
          setProgress(dragStartProgress + (horizontalPull + verticalPull) / 1.35);
          event.preventDefault();
        };

        const finishDrag = (event: PointerEvent) => {
          if (!dragging) return;
          dragging = false;
          canvas.style.cursor = "default";
          if (canvas.hasPointerCapture(event.pointerId)) {
            canvas.releasePointerCapture(event.pointerId);
          }
          setProgress(progressRef.current >= COMMIT_THRESHOLD ? 1 : INVITATION_PEEL);
        };

        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerup", finishDrag);
        canvas.addEventListener("pointercancel", finishDrag);

        const resize = () => {
          const bounds = frame.getBoundingClientRect();
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
          const width = Math.max(1, Math.round(bounds.width * pixelRatio));
          const height = Math.max(1, Math.round(bounds.height * pixelRatio));
          if (canvas.width === width && canvas.height === height) return;
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
          updateStoryTexture(gl, storyTexture, story, bounds.width, bounds.height, pixelRatio);
          requestRender();
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(frame);
        resize();
        render();

        cleanup = () => {
          disposed = true;
          if (animationFrame) window.cancelAnimationFrame(animationFrame);
          resizeObserver.disconnect();
          canvas.removeEventListener("pointerdown", onPointerDown);
          canvas.removeEventListener("pointermove", onPointerMove);
          canvas.removeEventListener("pointerup", finishDrag);
          canvas.removeEventListener("pointercancel", finishDrag);
          gl.deleteTexture(storyTexture);
          gl.deleteBuffer(mesh.vertexBuffer);
          gl.deleteBuffer(mesh.indexBuffer);
          gl.deleteProgram(program);
          revealRef.current = () => undefined;
        };
      } catch {
        canvas.style.display = "none";
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        initialize();
        observer.disconnect();
      },
      { rootMargin: "240px" },
    );
    observer.observe(frame);
    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [story]);

  return (
    <>
      <p className="sr-only">{story}</p>
      <canvas
        ref={canvasRef}
        className="about-gallery-film"
        aria-hidden="true"
        data-screen={screenNumber}
      />
      <button
        ref={controlRef}
        type="button"
        className="about-gallery-keyboard-control sr-only focus:not-sr-only"
        onClick={() => revealRef.current()}
        aria-label={`Reveal the photographs in section ${screenNumber}`}
      >
        Reveal photographs
      </button>
    </>
  );
}
