import type { FileArtifact } from "@/content/projectDetails";

/** Row list of real project documents — name, description, kind, action. */
export function ArtifactFiles({ files }: { files: FileArtifact[] }) {
  return (
    <div className="mt-[28px] flex flex-col md:mt-[44px]">
      {files.map((f) => (
        <a
          key={f.name}
          href={f.href ?? "#"}
          className="grid grid-cols-1 gap-[4px] border-t border-border-2 py-[12px] text-inherit no-underline transition-colors duration-300 hover:bg-surface lg:grid-cols-[minmax(160px,240px)_1fr_100px_100px] lg:items-baseline lg:gap-[24px] md:py-[18px]"
        >
          <span className="text-[13px] leading-[17px] text-ink md:text-[14px] md:leading-[19px]">
            {f.name}
          </span>
          <span className="text-pretty text-[14px] leading-[21px] text-mute-2 md:text-[14px] md:leading-[21px]">
            {f.d}
          </span>
          <span className="font-mono text-[12px] tracking-[0.02em] text-faint md:text-[12px]">
            {f.kind}
          </span>
          <span className="font-mono text-[12px] tracking-[0.02em] text-lilac lg:justify-self-end md:text-[12px]">
            {f.action}
          </span>
        </a>
      ))}
      <div className="border-t border-border-2" />
    </div>
  );
}
