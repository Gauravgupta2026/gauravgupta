"use client";

import { useRef, useState } from "react";
import { useGalleryNavigation } from "./useGalleryNavigation";
import { labsItems } from "@/content/labsItems";
import { LabArtwork } from "./LabArtwork";
import styles from "./LabsGrid.module.css";
import { CollectionFilter } from "@/components/ui/CollectionFilter";
import presentation from "@/components/ui/ProjectPresentation.module.css";

const FILTERS = [
  { key: "all", label: "All experiments" },
  { key: "prototype", label: "Prototypes" },
  { key: "progress", label: "In progress" },
  { key: "shelf", label: "On the shelf" },
] as const;
type LabFilter = (typeof FILTERS)[number]["key"];
const belongsTo = (state: string, filter: LabFilter) => filter === "all" ||
  (filter === "prototype" && state === "Prototype") ||
  (filter === "progress" && ["Testing", "Ongoing", "In use"].includes(state)) ||
  (filter === "shelf" && ["Archive", "Shelved"].includes(state));

export function LabsGrid() {
  const [filter, setFilter] = useState<LabFilter>("all");
  const { gallery, edges, move } = useGalleryNavigation(filter);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const open = (index: number, button: HTMLButtonElement) => { trigger.current = button; setSelected(index); dialog.current?.showModal(); };
  const visible = labsItems.map((lab, index) => ({ lab, index })).filter(({ lab }) => belongsTo(lab.state, filter));
  const item = selected === null ? null : labsItems[selected];

  return (
    <section id="page-gallery" className={styles.section} aria-label="Experiments">
      <div className={styles.toolbar}>
        <CollectionFilter options={FILTERS} value={filter} onChange={key => setFilter(key as LabFilter)} label="Filter experiments" />
        <nav aria-label="Browse experiments">
          <button onClick={() => move(-1)} disabled={edges.start} aria-label="Previous experiment"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6" /></svg></button>
          <button onClick={() => move(1)} disabled={edges.end} aria-label="Next experiment"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></button>
        </nav>
      </div>
      <div ref={gallery} className={styles.gallery} tabIndex={0} role="region" aria-label="Experiment gallery">
        <ol className={styles.track}>
          {visible.map(({ lab, index }) => (
            <li key={lab.title} className={styles.tile}>
              <button className={`${styles.preview} ${presentation.frame}`} onClick={event => open(index, event.currentTarget)} aria-label={`Enlarge preview: ${lab.title}`}>
                <LabArtwork variant={index} id={`lab-${index}`} />
              </button>
              <div className={styles.caption}><h2 className={presentation.title}>{lab.title}</h2><p className={presentation.facts}>{lab.kind.toLowerCase()} · {lab.state}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="lab-dialog-title" onClose={() => { setSelected(null); trigger.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.dialogBody}>
          <button className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close preview">Close <span aria-hidden="true">×</span></button>
          {item && selected !== null && <>
            <div className={styles.dialogArt}><LabArtwork variant={selected} id={`dialog-${selected}`} /></div>
            <h2 id="lab-dialog-title">{item.title}</h2>
            <p>{item.kind.toLowerCase()} · {item.state}</p>
          </>}
        </div>
      </dialog>
    </section>
  );
}
