"use client";

import { FormEvent, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import styles from "./AboutFooter.module.css";

export function AboutFooter() {
  const reducedMotion = useReducedMotion();
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = `${message.trim()}\n\nFrom: ${from.trim()}`;
    window.location.href = `mailto:hey@gauravguptas.com?subject=${encodeURIComponent("A note from your portfolio")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className={styles.reveal}>
      <section
        className={styles.contactStage}
        aria-labelledby="about-contact-title"
        data-browser-theme-color="#ffffff"
      >
        <m.div
          className={styles.contactCopy}
          initial={reducedMotion ? false : { opacity: 0.45, y: 44 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.16, 0.7, 0.2, 1] }}
        >
          <h2 id="about-contact-title">
            Creativity and ideas travel further <em>together.</em>
          </h2>
          <p className={styles.invitation}>
            Start with a thought. The rest can be figured out together.
          </p>

          <form className={styles.contactForm} onSubmit={sendMessage}>
            <div className={`${styles.mailboxField} ${styles.mailTo}`}>
              <span>To:</span>
              <strong>hey@gauravguptas.com</strong>
            </div>

            <label className={`${styles.mailboxField} ${styles.field}`}>
              <span>From:</span>
              <input
                autoComplete="email"
                name="from"
                onChange={(event) => setFrom(event.target.value)}
                placeholder="you@email.com"
                required
                type="email"
                value={from}
              />
            </label>

            <div className={`${styles.mailboxField} ${styles.messageField}`}>
              <label htmlFor="contact-message">Message:</label>
              <textarea
                id="contact-message"
                name="message"
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={5}
                placeholder="Write a note..."
                value={message}
              />
              <button
                className={styles.sendButton}
                data-active={message.trim().length > 0 ? "true" : "false"}
                type="submit"
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m3 11 17-8-7 18-2-7-8-3Z" />
                  <path d="m11 14 9-11" />
                </svg>
              </button>
            </div>
          </form>
        </m.div>
      </section>

      <footer className={styles.footerSheet} id="contact" data-browser-theme-color="#080808">
        <nav className={styles.footerNav} aria-label="Footer navigation">
          <div className={styles.footerLocation}>
            <span>Based in Bengaluru</span>
            <a href="mailto:hey@gauravguptas.com">hey@gauravguptas.com</a>
            <ThemeToggle className={styles.footerThemeToggle} iconOnly />
          </div>
          <div className={styles.footerMenu}>
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href="/work">Projects</a>
            <a href="/about#experience">Resume</a>
          </div>
          <div className={styles.footerSocials}>
            <a href="https://github.com/Gauravgupta2026" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://in.linkedin.com/in/gaurav-gupta-218a08202" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </nav>
        <p>building with creativity</p>
      </footer>
    </div>
  );
}
