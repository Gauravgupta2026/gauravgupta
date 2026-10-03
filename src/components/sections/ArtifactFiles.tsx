import type { FileArtifact } from "@/content/projectDetails";

/** Row list of real project documents — name, description, kind, action. */
export function ArtifactFiles({ files }: { files: FileArtifact[] }) {
  return (
    <div className="mt-[28px] flex flex-col md:mt-[44px]">
      {files.map((f) => f.href ? (
        <a
          key={f.name}
          href={f.href}
          className="grid grid-cols-1 gap-[4px] border-t border-border-2 py-[12px] text-inherit no-underline transition-opacity duration-300 hover:opacity-70 sm:grid-cols-[minmax(160px,240px)_1fr_100px_80px] sm:items-baseline sm:gap-[24px] md:py-[18px]"
        >
          <span className="text-[calc(13px*var(--mobile-type-scale,1))] leading-[calc(17px*var(--mobile-type-scale,1))] text-ink md:text-[calc(14px*var(--mobile-type-scale,1))] md:leading-[calc(19px*var(--mobile-type-scale,1))]">
            {f.name}
          </span>
          <span className="text-pretty text-[calc(12px*var(--mobile-type-scale,1))] leading-[calc(16px*var(--mobile-type-scale,1))] text-mute-2 md:text-[calc(11px*var(--mobile-type-scale,1))] md:leading-[calc(18px*var(--mobile-type-scale,1))]">
            {f.d}
          </span>
          <span className="font-body text-[calc(8px*var(--mobile-type-scale,1))] tracking-[0.2em] text-faint md:text-[calc(8px*var(--mobile-type-scale,1))]">
            {f.kind}
          </span>
          <span className="font-body text-[calc(8px*var(--mobile-type-scale,1))] tracking-[0.2em] text-lilac sm:justify-self-end md:text-[calc(8px*var(--mobile-type-scale,1))]">
            {f.action}
          </span>
        </a>
      ) : null)}
      <div className="border-t border-border-2" />
    </div>
  );
}
