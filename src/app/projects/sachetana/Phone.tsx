import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./Sachetana.module.css";

/** An iPhone frame. Children render inside the screen and fill it. */
export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.phone} ${className}`}>
      <div className={styles.screen}>{children}</div>
      <span className={styles.island} aria-hidden />
    </div>
  );
}

/** Native size of the exported Figma screens, in px. */
export const SCREEN_WIDTH = 430;
export const SCREEN_HEIGHT = 932;

/** `x` and `y` place the mark, as percentages of the image. `tx` is the x of the thing it points at. A line joins the two. */
export type Callout = { n: number; x: number; y: number; tx?: number; text: string };

/** Numbered marks beside the thing they point at, never on top of it. */
export function Marks({ callouts }: { callouts: readonly Callout[] }) {
  return (
    <>
      {callouts.map((c) => (
        <span key={c.n} aria-hidden>
          {c.tx !== undefined && (
            <span className={styles.markLine} style={{ left: `${Math.min(c.x, c.tx)}%`, top: `${c.y}%`, width: `${Math.abs(c.tx - c.x)}%` }} />
          )}
          <span className={styles.mark} style={{ left: `${c.x}%`, top: `${c.y}%` }}>{c.n}</span>
        </span>
      ))}
    </>
  );
}

/** The legend under an image. Each number matches a mark. */
export function Legend({ callouts }: { callouts: readonly Callout[] }) {
  return (
    <ol className={styles.legend}>
      {callouts.map((c) => <li key={c.n}><span>{c.n}</span>{c.text}</li>)}
    </ol>
  );
}

type ScreenProps = { src: string; alt: string; width: number; height: number; callouts?: readonly Callout[]; priority?: boolean };

/** One iPhone, one screen, with numbered callouts. A tall screen shows its top. */
export function PhoneScreen({ src, alt, width, height, callouts = [], priority = false }: ScreenProps) {
  return (
    <Phone className={styles.phoneLarge}>
      <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes="320px" className={styles.screenImage} />
      <Marks callouts={callouts} />
    </Phone>
  );
}
