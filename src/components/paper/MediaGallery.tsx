"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { playgroundItems } from "@/content/paperPortfolio";
import styles from "./Paper.module.css";
import labs from "./Labs.module.css";
type Item = { src: string; alt: string; title: string; caption: string; href?: string; kind: string };

export function MediaGallery() {
  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Item | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const source = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const target = rail.current; if (!target) return;
    const update = () => setEdges({ start: target.scrollLeft <= 1, end: target.scrollLeft + target.clientWidth >= target.scrollWidth - 1 });
    update();
    target.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update); observer.observe(target);
    return () => { target.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  const move = (direction: number) => {
    const target = rail.current; if (!target) return;
    const items = [...target.children] as HTMLElement[];
    const current = items.findIndex(item => item.offsetLeft - target.offsetLeft >= target.scrollLeft - 1);
    const next = items[Math.max(0, Math.min(items.length - 1, current + direction))];
    if (next) target.scrollTo({ left: next.offsetLeft - target.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const close = () => { dialog.current?.close(); source.current?.focus({ preventScroll: true }); };
  return <>
    <div className={labs.controls}><span>Studies &amp; experiments · {String(playgroundItems.length).padStart(2, "0")}</span><div><button disabled={edges.start} aria-label="Previous experiments" onClick={() => move(-1)}>←</button><button disabled={edges.end} aria-label="Next experiments" onClick={() => move(1)}>→</button></div></div>
    <div ref={rail} className={labs.rail} role="region" aria-label="Design experiments, scroll horizontally" tabIndex={0}>
      {playgroundItems.map((item,index) => <button className={`${labs.tile} ${index % 3 === 1 ? labs.narrow : ""}`} key={item.title} aria-label={`Enlarge: ${item.title}`} onClick={e => { source.current = e.currentTarget; setSelected(item); dialog.current?.showModal(); }}>
        <span className={labs.media}><Image src={item.src} alt={item.alt} width={1000} height={750} sizes="(max-width: 767px) 78vw, 360px" /></span>
        <span className={labs.title}>{item.title}<span aria-hidden="true">↗</span></span>
        <span className={labs.caption}>{item.caption}</span>
        <span className={labs.kind}>{item.kind}</span>
      </button>)}
    </div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={selected ? selected.title : "Enlarged artwork"} onClick={e => { if (e.target === e.currentTarget) close(); }} onClose={() => source.current?.focus({ preventScroll: true })}>
      <button className={styles.close} aria-label="Close enlarged view" onClick={close}>×</button>
      {selected && <figure><Image src={selected.src} alt={selected.alt} width={1400} height={1000} sizes="90vw" /><figcaption><strong>{selected.title}</strong><p>{selected.caption}</p>{selected.href && <Link href={selected.href} onClick={close}>Read the project ↗</Link>}</figcaption></figure>}
    </dialog>
  </>;
}
