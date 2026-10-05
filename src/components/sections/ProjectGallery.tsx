"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import type { LandingGalleryProject } from "@/content/landingProjects";
import styles from "./LandingProjectRail.module.css";

type ProjectGalleryProps = {
  project: LandingGalleryProject;
};

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ pointerX: 0, scrollLeft: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const titleId = `${project.title.toLowerCase().replaceAll(" ", "-")}-title`;

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const rail = railRef.current;
    if (!rail) return;
    dragStart.current = { pointerX: event.clientX, scrollLeft: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const rail = railRef.current;
    if (!rail) return;
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
              <Image
                alt={image.alt}
                draggable={false}
                fill
                sizes="(max-width: 720px) 76vw, 46vw"
                src={image.src}
              />
            </figure>
          ))}
        </div>
        <p className={styles.scrollHint} aria-hidden="true">
          Drag or scroll <span>→</span>
        </p>
      </div>
    </article>
  );
}
