import { BOIL_STEP_MS } from "./scribble";

/**
 * Renders one hand-drawn stroke as its stacked boil variants.
 *
 * All variants draw on simultaneously (identical dash animation), while the
 * boil cycles which single variant is opaque at any instant. The net effect is
 * a line that writes itself on *and* wobbles — the same thing a cel animator
 * gets for free by redrawing the frame.
 *
 * `pathLength="1"` normalizes every variant's dash geometry to a 0..1 range, so
 * they stay in lockstep despite tracing slightly different distances.
 */
export function BoilStroke({
  variants,
  viewBox,
  className = "",
  strokeWidth,
  /** Delay before the draw-on starts, in ms. */
  drawDelay = 0,
  /** Duration of the draw-on, in ms. */
  drawDuration = 850,
}: {
  variants: readonly string[];
  viewBox: string;
  className?: string;
  strokeWidth: number;
  drawDelay?: number;
  drawDuration?: number;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={`intro-stroke ${className}`}
      fill="none"
      aria-hidden="true"
      style={
        {
          "--draw-delay": `${drawDelay}ms`,
          "--draw-duration": `${drawDuration}ms`,
        } as React.CSSProperties
      }
    >
      {variants.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          // Negative delay offsets each variant into its own slot of the cycle,
          // so exactly one is visible at a time.
          style={{ animationDelay: `var(--draw-delay), ${-i * BOIL_STEP_MS}ms` }}
        />
      ))}
    </svg>
  );
}
