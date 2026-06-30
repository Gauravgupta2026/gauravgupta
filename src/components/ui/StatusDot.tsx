/**
 * Experiment status indicator. shipped = solid blue · brewing = blue ring ·
 * exploring = solid blue that pulses · abandoned = solid gray.
 */
export type ExperimentStatus =
  | "shipped"
  | "brewing"
  | "exploring"
  | "abandoned";

export function StatusDot({
  status,
  size = 8,
}: {
  status: ExperimentStatus;
  size?: number;
}) {
  const style: React.CSSProperties = { width: size, height: size };
  const cls: Record<ExperimentStatus, string> = {
    shipped: "bg-blue",
    brewing: "border-[1.5px] border-blue bg-transparent",
    exploring: "bg-blue animate-blink",
    abandoned: "bg-[#bdb8ab]",
  };
  return (
    <span
      className={`inline-block shrink-0 rounded-full ${cls[status]}`}
      style={style}
      aria-hidden
    />
  );
}
