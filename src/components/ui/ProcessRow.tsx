export type Process = {
  num: string;
  kicker: string;
  title: string;
  body: string;
};

/** Numbered process row; hover tints the row blue. */
export function ProcessRow({ process }: { process: Process }) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-[20px] border-t border-ink/15 py-[30px] pr-[24px] transition-colors duration-[350ms] last:border-b hover:bg-blue-tint md:grid-cols-[54px_1fr] md:gap-[24px]">
      <span className="font-display text-[30px] leading-none text-blue">
        {process.num}
      </span>
      <div>
        <div className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
          {process.kicker}
        </div>
        <h4 className="m-0 mb-[10px] font-display text-[23px] font-medium text-ink">
          {process.title}
        </h4>
        <p className="m-0 max-w-[440px] font-mono text-[11.5px] leading-[1.7] text-soft-ink">
          {process.body}
        </p>
      </div>
    </div>
  );
}
