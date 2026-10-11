"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { WINDOW_GEOMETRY as G } from "./windowGeometry";
import styles from "./GreetingWindow.module.css";

const place = (box: { x: number; y: number; w: number; h: number }): CSSProperties => ({
  left: `${box.x / G.window.w * 100}%`,
  top: `${box.y / G.window.h * 100}%`,
  width: `${box.w / G.window.w * 100}%`,
  height: `${box.h / G.window.h * 100}%`,
});

export function GreetingWindow({ open }: { open: boolean }) {
  return <div className={styles.window} data-open={open} role="img" aria-label="A painted blue window revealing hands joined in namaste">
    <span className={styles.scene}>
      <span className={styles.pane} style={place(G.panel)}>
        <Image className={styles.greeting} src="/opening/namaste-poster.png" alt="" fill sizes="138px" loading="eager" draggable={false} />
      </span>
      <Image className={styles.frame} src="/opening/window-frame.webp" alt="" width={G.window.w} height={G.window.h} sizes="(max-width: 767px) 150px, 166px" loading="eager" fetchPriority="high" />
      {(["left", "right"] as const).map(side => {
        const box = side === "left" ? G.shutterLeft : G.shutterRight;
        return <span key={side} className={`${styles.shutter} ${styles[side]}`} style={place(box)} aria-hidden="true">
          <span className={styles.front}><Image src={`/opening/shutter-${side}.webp`} alt="" width={box.w} height={box.h} sizes="100px" loading="eager" draggable={false} /></span>
          <span className={styles.back}><Image src={`/opening/shutter-${side}.webp`} alt="" width={box.w} height={box.h} sizes="100px" loading="eager" draggable={false} /></span>
        </span>;
      })}
    </span>
  </div>;
}
