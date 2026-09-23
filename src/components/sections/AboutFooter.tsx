import styles from "./AboutFooter.module.css";

const CURRENT_WORK = [
  "Wylde · active build",
  "Sachetana · write-up in progress",
  "Long-horizon agents · exploring",
] as const;

function FaceMark() {
  return (
    <svg
      className={styles.face}
      viewBox="0 0 88 88"
      fill="none"
      aria-hidden="true"
    >
      <path d="M9 24h28v19c0 8-6 14-14 14S9 51 9 43V24Zm42 0h28v19c0 8-6 14-14 14s-14-6-14-14V24ZM37 31c5-5 9-5 14 0M44 57l-5 12 10 2m-17 5c7 5 17 5 24 0" />
      <path d="M20 34h.5m37.5 0h.5" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function AboutFooter() {
  return (
    <div className={styles.reveal}>
      <section className={styles.contactStage} aria-labelledby="about-contact-title">
        <div className={styles.contactCopy}>
          <p className={styles.eyebrow}>A NOTE, A QUESTION, AN IDEA</p>
          <h2 id="about-contact-title">Stay in touch</h2>
          <p className={styles.invitation}>
            For a thoughtful problem, a new collaboration, or just to say hello.
          </p>
          <a className={styles.emailAction} href="mailto:hey@gauravguptas.com">
            <span>hey@gauravguptas.com</span>
            <span className={styles.emailButton}>WRITE A NOTE <span aria-hidden="true">↗</span></span>
          </a>
        </div>
      </section>

      <footer className={styles.footerSheet} id="contact">
        <div className={styles.sheetInner}>
          <div className={styles.footerDetails}>
            <a className={styles.monogram} href="#top" aria-label="Gaurav Gupta, back to top">
              GG
            </a>
            <p className={styles.bio}>
              Gaurav Gupta is a product designer and builder working across
              product strategy, interaction design, and iOS development.
            </p>
            <p className={styles.contactLine}>
              For new work and good conversations, write to
              <a href="mailto:hey@gauravguptas.com">hey@gauravguptas.com</a>.
            </p>
            <FaceMark />
          </div>

          <div className={styles.currentWork} aria-label="Current work">
            <p className={styles.currentLabel}>CURRENTLY WORKING ON:</p>
            <div className={styles.ticker}>
              <div className={styles.tickerTrack}>
                {CURRENT_WORK.map((item) => (
                  <span className={styles.tickerItem} key={item}>{item}</span>
                ))}
                <span className={styles.tickerClone} aria-hidden="true">
                  {CURRENT_WORK.map((item) => (
                    <span className={styles.tickerItem} key={item}>{item}</span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span>ALL RIGHTS RESERVED © 2026 GAURAV GUPTA</span>
            <a className={styles.backToTop} href="#top" aria-label="Back to top">
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
