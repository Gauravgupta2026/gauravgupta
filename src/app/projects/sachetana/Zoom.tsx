"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import styles from "./Sachetana.module.css";

type ZoomProps = {
  src: string;
  alt: string;
  /** Native size of the image. The enlarged view shows it at up to `maxWidth`. */
  width: number;
  height: number;
  maxWidth: number;
  caption: string;
  /** What the reader clicks. */
  children: ReactNode;
};

/** A button that opens the image large in a native dialog. Tall images scroll inside it. */
export function Zoom({ src, alt, width, height, maxWidth, caption, children }: ZoomProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={opener} type="button" className={styles.zoomTrigger} aria-label={`Enlarge: ${alt}`} onClick={() => dialog.current?.showModal()}>
        {children}
        <span className={styles.zoomHint} aria-hidden>Enlarge</span>
      </button>
      <dialog
        ref={dialog}
        className={styles.zoomDialog}
        aria-label={alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onClose={() => opener.current?.focus()}
      >
        <button type="button" className={styles.zoomClose} onClick={() => dialog.current?.close()}>Close</button>
        <figure className={styles.zoomFigure} style={{ maxWidth }}>
          <div className={styles.zoomScroll}>
            <Image src={src} alt={alt} width={width} height={height} sizes={`(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`} unoptimized={src.endsWith(".svg")} />
          </div>
          <figcaption className={styles.label}>{caption}</figcaption>
        </figure>
      </dialog>
    </>
  );
}
