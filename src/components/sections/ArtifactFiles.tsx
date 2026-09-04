import type { FileArtifact } from "@/content/projectDetails";

/** Row list of real project documents — name, description, kind, action. */
export function ArtifactFiles({ files }: { files: FileArtifact[] }) {
  return (
    <div className="mt-[28px] flex flex-col md:mt-[44px]">
      {files.map((f) => (
        <a
          key={f.name}
          href={f.href ?? "#"}
          className="grid grid-cols-1 gap-[4px] border-t border-border-2 py-[12px] text-inherit no-underline transition-opacity duration-300 hover:opacity-70 sm:grid-cols-[minmax(160px,240px)_1fr_100px_80px] sm:items-baseline sm:gap-[24px] md:py-[18px]"
        >
          <span className="text-[11px] leading-[15px] text-ink md:text-[14px] md:leading-[19px]">
            {f.name}
          </span>
          <span className="text-pretty text-[10px] leading-[14px] text-mute-2 md:text-[11px] md:leading-[18px]">
            {f.d}
          </span>
          <span className="font-mono text-[7px] tracking-[0.2em] text-faint md:text-[8px]">
            {f.kind}
          </span>
          <span className="font-mono text-[7px] tracking-[0.2em] text-lilac sm:justify-self-end md:text-[8px]">
            {f.action}
          </span>
        </a>
      ))}
      <div className="border-t border-border-2" />
    </div>
  );
}
