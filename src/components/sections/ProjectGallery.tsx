"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import type { LandingGalleryProject } from "@/content/landingProjects";
import styles from "./LandingProjectRail.module.css";

const DRAG_THRESHOLD_PX = 6;

type ProjectGalleryProps = {
  project: LandingGalleryProject;
};

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const didDrag = useRef(false);
  const dragStart = useRef({ pointerX: 0, scrollLeft: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const titleId = `${project.title.toLowerCase().replaceAll(" ", "-")}-title`;

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    didDrag.current = false;
    if (event.pointerType === "touch" || event.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;
    dragStart.current = { pointerX: event.clientX, scrollLeft: rail.scrollLeft };
    setIsDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const rail = railRef.current;
    if (!rail) return;
    if (Math.abs(event.clientX - dragStart.current.pointerX) > DRAG_THRESHOLD_PX) {
      didDrag.current = true;
      rail.setPointerCapture(event.pointerId);
    }
    rail.scrollLeft = dragStart.current.scrollLeft - (event.clientX - dragStart.current.pointerX);
    setHasInteracted(true);
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (rail?.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  }

  return (
    <article className={styles.galleryProject} aria-labelledby={titleId}>
      <header className={styles.galleryHeader}>
        <div>
          <h3 id={titleId}>
            <Link href={project.href}>{project.title}</Link>
          </h3>
          <ul className={styles.tags} aria-label={`${project.title} disciplines`}>
            {project.tags.map((tag, index) => (
              <li key={tag}>
                <span className={index === 0 ? styles.blueDot : styles.yellowDot} aria-hidden="true" />
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <p>{project.description}</p>
      </header>

      <div className={styles.galleryShell} data-interacted={hasInteracted}>
        <div
          ref={railRef}
          className={`${styles.galleryRail} ${isDragging ? styles.dragging : ""}`}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={(event) => { if (!event.currentTarget.hasPointerCapture(event.pointerId)) endDrag(event); }}
          onScroll={() => setHasInteracted(true)}
          role="region"
          aria-label={`${project.title} image gallery. Scroll horizontally to explore.`}
          tabIndex={0}
        >
          {project.images.map((image, index) => (
            <figure
              className={`${styles.galleryImage} ${styles[image.shape]} ${image.fit === "contain" ? styles.contain : ""}`}
              key={`${image.src}-${index}`}
            >
              <Link
                className={styles.imageLink}
                href={project.href}
                aria-label={`Explore ${project.title}`}
                draggable={false}
                onClick={(event) => { if (didDrag.current) event.preventDefault(); }}
              >
                <Image
                  alt={image.alt}
                  draggable={false}
                  fill
                  sizes="(max-width: 720px) 76vw, 46vw"
                  src={image.src}
                />
              </Link>
            </figure>
          ))}
        </div>
        <p className={styles.scrollHint} aria-hidden="true">
          Drag or scroll
        </p>
      </div>
    </article>
  );
}
