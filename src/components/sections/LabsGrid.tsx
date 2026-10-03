"use client";

import { useEffect, useRef, useState } from "react";
import { labsItems, type LabItem } from "@/content/labsItems";
import { imageFor } from "@/content/images";
import styles from "./LabsGrid.module.css";
import viewerStyles from "./WorkProjectGallery.module.css";

export function LabsGrid() {
  const [selected, setSelected] = useState<LabItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);

  function open(item: LabItem, button: HTMLButtonElement) {
    trigger.current = button;
    setSelected(item);
    dialog.current?.showModal();
  }

  return (
    <>
      <section className={styles.grid} aria-label="Lab experiments">
        {labsItems.map(item => (
          <article key={item.title} className={styles.card}>
            <button type="button" className={styles.open} aria-haspopup="dialog"
              aria-label={`Open ${item.title}`} onClick={event => open(item, event.currentTarget)}>
              {/* Keep the existing photo pool and seeds while the lab artwork is collected. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.image} src={imageFor(item.title, 900, 600)} alt="" loading="lazy" />
              <span className={styles.title}>{item.title}</span>
              <span className={styles.description}>{item.description}</span>
            </button>
          </article>
        ))}
      </section>
      <dialog ref={dialog} className={viewerStyles.dialog} aria-labelledby="labs-viewer-title"
        onClose={() => { setSelected(null); trigger.current?.focus({ preventScroll: true }); }}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={viewerStyles.viewer}>
          <header>
            <h2 id="labs-viewer-title">{selected?.title}</h2>
            <button type="button" autoFocus aria-label="Close experiment preview" onClick={() => dialog.current?.close()}>×</button>
          </header>
          <div className={viewerStyles.viewerImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {selected && <img src={imageFor(selected.title, 1500, 1000)} alt={selected.title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
          </div>
          <p className={styles.viewerMeta}>{selected?.kind} · {selected?.state}</p>
          <p className={styles.viewerMeta}>{selected?.description}</p>
        </div>
      </dialog>
    </>
  );
}
