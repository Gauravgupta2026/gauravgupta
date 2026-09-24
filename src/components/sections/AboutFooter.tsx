"use client";

import { FormEvent, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
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
          <p className={styles.eyebrow}>Stay in touch</p>
          <h2 id="about-contact-title">
            Creativity and ideas travel further <em>together.</em>
          </h2>
          <p className={styles.invitation}>
            Start with a thought. The rest can be figured out together.
          </p>

          <form className={styles.contactForm} onSubmit={sendMessage}>
            <div className={styles.mailTo}>
              <span>To</span>
              <strong>hey@gauravguptas.com</strong>
            </div>

            <label className={styles.field}>
              <span>From</span>
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

            <label className={`${styles.field} ${styles.messageField}`}>
              <span>Message</span>
              <textarea
                name="message"
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={5}
                placeholder="Write a note..."
                value={message}
              />
            </label>

            <button
              className={styles.sendButton}
              data-active={message.trim().length > 0 ? "true" : "false"}
              type="submit"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </m.div>
      </section>

      <footer className={styles.footerSheet} id="contact" data-browser-theme-color="#080808">
        <p>buildin with creativity</p>
      </footer>
    </div>
  );
}
