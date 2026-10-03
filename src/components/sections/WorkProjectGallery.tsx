"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { WorkProject } from "@/content/workPage";
import styles from "./WorkProjectGallery.module.css";

const PREVIEW_DELAY_MS = 180;
const PREVIEW_WIDTH = 560;
const PREVIEW_HEIGHT = 320;
const VIEWPORT_GUTTER = 24;
const MIN_PREVIEW_VIEWPORT_HEIGHT = 700;
const PREVIEW_GAP = 16;
const ROW_SPEED_PX_PER_SECOND = 32;
const MINIMUM_SEQUENCE_WIDTH = 1600;
const DESKTOP_THUMBNAIL_HEIGHT = 144;
const THUMBNAIL_GAP = 10;

type Preview = { index: number; left: number; top: number; width: number; height: number };

export function WorkProjectGallery({ project, priority = false }: { project: WorkProject; priority?: boolean }) {
  const railRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const restoringFocusRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [duration, setDuration] = useState<number | null>(null);
  // Fill a wide row before repeating it, with a different starting image in each pass.
  const cycleWidth = project.images.reduce((width, image) => width + DESKTOP_THUMBNAIL_HEIGHT * image.width / image.height + THUMBNAIL_GAP, 0);
  const repeats = Math.ceil(MINIMUM_SEQUENCE_WIDTH / cycleWidth);
  const sequence = Array.from({ length: repeats }, (_, pass) =>
    project.images.map((_, index) => (index + pass) % project.images.length)
  ).flat();

  function clearTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  function dismissPreview() {
    clearTimer();
    setPreview(null);
  }

  function showPreview(index: number, button: HTMLButtonElement, delayed: boolean) {
    clearTimer();
    const show = () => {
      if (window.innerHeight < MIN_PREVIEW_VIEWPORT_HEIGHT || dialogRef.current?.open) return;
      const rect = button.getBoundingClientRect();
      const image = project.images[index];
      const scale = Math.min(PREVIEW_WIDTH / image.width, PREVIEW_HEIGHT / image.height,
        (window.innerWidth - VIEWPORT_GUTTER * 2) / image.width);
      const width = image.width * scale;
      const height = image.height * scale;
      const left = Math.max(VIEWPORT_GUTTER, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - VIEWPORT_GUTTER));
      const above = rect.top - height - PREVIEW_GAP;
      const top = above >= 88 ? above : rect.bottom + PREVIEW_GAP;
      if (top + height > window.innerHeight - VIEWPORT_GUTTER) return;
      setPreview({ index, left, top, width, height });
    };
    if (delayed) timerRef.current = setTimeout(show, PREVIEW_DELAY_MS);
    else show();
  }

  useEffect(() => {
    const sequence = sequenceRef.current;
    if (!sequence) return;
    const measure = () => setDuration(sequence.getBoundingClientRect().width / ROW_SPEED_PX_PER_SECOND);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(sequence);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const closePreview = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPreview(null);
    };
    const keyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closePreview(); };
    window.addEventListener("scroll", closePreview, true);
    window.addEventListener("resize", closePreview);
    window.addEventListener("keydown", keyDown);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("scroll", closePreview, true);
      window.removeEventListener("resize", closePreview);
      window.removeEventListener("keydown", keyDown);
    };
  }, []);

  useEffect(() => {
    if (!viewerOpen) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => { body.style.overflow = previousOverflow; };
  }, [viewerOpen]);

  function openImage(index: number, button: HTMLButtonElement) {
    dismissPreview();
    triggerRef.current = button;
    setSelected(index);
    setViewerOpen(true);
    dialogRef.current?.showModal();
  }

  function changeImage(direction: number) {
    setSelected(current => (current + direction + project.images.length) % project.images.length);
  }

  const selectedImage = project.images[selected];
  const previewImage = preview ? project.images[preview.index] : null;

  return (
    <div className={styles.gallery}>
      <div ref={railRef} className={styles.rail} role="region" aria-label={`${project.title} image gallery`}>
        <div className={styles.track} data-paused={!visible || !pageVisible || viewerOpen || duration === null}
          style={{ animationDuration: `${duration ?? cycleWidth * repeats / ROW_SPEED_PX_PER_SECOND}s` }}>
          {[0, 1].map(copy => (
            <div key={copy} ref={copy === 0 ? sequenceRef : undefined} className={styles.sequence} data-copy={copy}>
              {sequence.map((index, position) => {
                const image = project.images[index];
                return <button
                  type="button" key={position} className={styles.thumbnail} tabIndex={copy === 1 ? -1 : undefined}
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                  aria-label={`Open ${project.title} image ${index + 1} of ${project.images.length}`}
                  aria-haspopup="dialog"
                  onPointerEnter={event => { if (event.pointerType === "mouse") showPreview(index, event.currentTarget, true); }}
                  onPointerLeave={event => { if (document.activeElement !== event.currentTarget) dismissPreview(); }}
                  onFocus={event => { if (!restoringFocusRef.current) showPreview(index, event.currentTarget, false); }}
                  onBlur={dismissPreview}
                  onClick={event => openImage(index, event.currentTarget)}
                >
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 320px, 250px" priority={priority && position === 0 && copy === 0} draggable={false} />
                </button>;
              })}
            </div>
          ))}
        </div>
      </div>
      {preview && previewImage && createPortal(
        <div className={styles.preview} style={{ left: preview.left, top: preview.top, width: preview.width, height: preview.height }} aria-hidden="true">
          <Image src={previewImage.src} alt="" fill sizes="560px" />
        </div>, document.body
      )}
      <dialog
        ref={dialogRef} className={styles.dialog} aria-labelledby={`${project.slug}-viewer-title`}
        onClose={() => {
          dismissPreview();
          setViewerOpen(false);
          restoringFocusRef.current = true;
          triggerRef.current?.focus({ preventScroll: true });
          restoringFocusRef.current = false;
        }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); changeImage(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); changeImage(1); }
        }}
        onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
      >
        <div className={styles.viewer}>
          <header>
            <h2 id={`${project.slug}-viewer-title`}>{project.title}</h2>
            <button type="button" autoFocus aria-label="Close image viewer" onClick={() => dialogRef.current?.close()}>×</button>
          </header>
          <div className={styles.viewerImage}>
            <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="(max-width: 768px) 90vw, 900px" />
          </div>
          <footer>
            <button type="button" aria-label="Previous image" onClick={() => changeImage(-1)}>Previous</button>
            <p aria-live="polite">{selected + 1} / {project.images.length}</p>
            <button type="button" aria-label="Next image" onClick={() => changeImage(1)}>Next</button>
          </footer>
        </div>
      </dialog>
    </div>
  );
}
