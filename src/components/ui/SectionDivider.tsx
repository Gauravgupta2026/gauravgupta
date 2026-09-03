/**
 * Full-bleed hairline rule under a section heading — extends edge to edge
 * of the viewport regardless of the parent Shell's side padding.
 */
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`ml-[50%] h-px w-screen -translate-x-1/2 bg-divider ${className}`}
    />
  );
}
