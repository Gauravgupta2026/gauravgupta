"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { WINDOW_GEOMETRY as G } from "./windowGeometry";
import styles from "./GreetingWindow.module.css";

const place = (box: { x: number; y: number; w: number; h: number }): CSSProperties => ({
  left: `${box.x / G.window.w * 100}%`,
  top: `${box.y / G.window.h * 100}%`,
  width: `${box.w / G.window.w * 100}%`,
  height: `${box.h / G.window.h * 100}%`,
});

export function GreetingWindow() {
  const [open, setOpen] = useState(false);
  return <button type="button" className={styles.window} data-open={open} aria-expanded={open} aria-label={open ? "Close the greeting window" : "Open the greeting window"} title={open ? "Close the window" : "Open the window"} onClick={() => setOpen(value => !value)}>
    <span className={styles.scene}>
      <span className={styles.pane} style={place(G.panel)}>
        <span className={styles.greeting}>Namaste</span>
      </span>
      <Image className={styles.frame} src="/opening/window-frame.webp" alt="" width={G.window.w} height={G.window.h} unoptimized />
      {(["left", "right"] as const).map(side => {
        const box = side === "left" ? G.shutterLeft : G.shutterRight;
        return <span key={side} className={`${styles.shutter} ${styles[side]}`} style={place(box)} aria-hidden="true">
          <span className={styles.front}><Image src={`/opening/shutter-${side}.webp`} alt="" width={box.w} height={box.h} unoptimized draggable={false} /></span>
          <span className={styles.back}><Image src={`/opening/shutter-${side}.webp`} alt="" width={box.w} height={box.h} unoptimized draggable={false} /></span>
        </span>;
      })}
    </span>
  </button>;
}
