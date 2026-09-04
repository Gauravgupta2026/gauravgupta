/**
 * Closing footer for Landing, Work, and About only — a headline + short
 * availability note + email, asymmetric like a signature block rather than
 * a link directory. /labs and /projects/[slug] carry no footer at all.
 */
export function FooterCTA() {
  return (
    <footer className="border-t border-divider">
      <div className="mx-auto grid w-full max-w-[1375px] grid-cols-1 gap-[40px] px-[var(--side-pad)] py-[80px] md:grid-cols-2 md:gap-[32px] md:py-[140px]">
        <h2 className="m-0 text-pretty font-display text-[40px] font-light leading-[1.08] tracking-[-0.01em] text-white md:text-[64px]">
          Let&rsquo;s build
          <br />
          something <em className="italic text-mute-2">good</em>.
        </h2>

        <div className="max-w-[420px] md:mt-[8px] md:justify-self-end">
          <p className="m-0 text-pretty text-[15px] leading-[26px] text-mute-2">
            I&rsquo;m currently looking for full-time product &amp; design
            roles. The room I end up in matters as much as the title — I
            want to build things people actually use, with people who&rsquo;ll
            argue with me about scope.
          </p>
          <p className="m-0 mt-[20px] text-pretty text-[15px] leading-[26px] text-mute-2">
            If you&rsquo;re hiring, or just want to talk shop, reach out.
          </p>
          <a
            href="mailto:hello@gg.studio"
            className="mt-[28px] inline-block border border-border bg-surface px-[14px] py-[9px] font-mono text-[13px] text-ink no-underline transition-colors duration-300 hover:border-lilac hover:text-lilac"
          >
            hello@gg.studio
          </a>
        </div>
      </div>

      <div className="border-t border-border-2">
        <div className="mx-auto flex w-full max-w-[1375px] flex-wrap items-center gap-x-[20px] gap-y-[10px] px-[var(--side-pad)] py-[24px] font-mono text-[10px] tracking-[0.18em] text-faint">
          <span>&copy; 2026 Gaurav Gupta</span>
          <span className="sm:ml-auto">DESIGNED &amp; BUILT SOLO</span>
        </div>
      </div>
    </footer>
  );
}
