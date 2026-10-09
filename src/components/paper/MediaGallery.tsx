"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { playgroundItems } from "@/content/paperPortfolio";
import styles from "./Paper.module.css";
type Item = { src: string; alt: string; title: string; caption: string; href?: string; kind: string };
export function MediaGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Item | null>(null);
  const source = useRef<HTMLButtonElement | null>(null);
  const close = () => { dialog.current?.close(); source.current?.focus({ preventScroll: true }); };
  return <>
    <div className={styles.gallery}>{playgroundItems.map(item => <button className={styles.tile} key={item.title} aria-label={`Enlarge: ${item.title}`} onClick={e => { source.current = e.currentTarget; setSelected(item); dialog.current?.showModal(); }}>
      <Image src={item.src} alt={item.alt} width={1000} height={750} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 47vw, 40vw" className={styles.tileImage} />
      <span className={styles.tileCaption}>{item.title}<span>/{item.kind}</span></span>
    </button>)}</div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={selected ? selected.title : "Enlarged artwork"} onClick={e => { if (e.target === e.currentTarget) close(); }} onClose={() => source.current?.focus({ preventScroll: true })}>
      <button className={styles.close} aria-label="Close enlarged view" onClick={close}>×</button>
      {selected && <figure><Image src={selected.src} alt={selected.alt} width={1400} height={1000} sizes="90vw" /><figcaption><strong>{selected.title}</strong><p>{selected.caption}</p>{selected.href && <Link href={selected.href} onClick={close}>read the project</Link>}</figcaption></figure>}
    </dialog>
  </>;
}
