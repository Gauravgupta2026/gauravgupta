"use client";

import { MonkeySeat } from "@/components/monkeys/MonkeySeat";
import { EMAIL, SOCIALS } from "@/content/paperPortfolio";
import styles from "./MonkeyFooter.module.css";

const MONKEY_DELAY_SECONDS = 1.4;

export function MonkeyFooter() {
  return <footer className={styles.footer} aria-label="Get in touch" onFocusCapture={event => {
    if (getComputedStyle(event.currentTarget).position === "sticky") {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
    }
  }}>
    <div className={styles.composition}>
      <MonkeySeat className={styles.monkey} label="A monkey in a blue jacket sits holding a tasselled parasol." />
      <div className={styles.copy}>
        <h2>Creativity and ideas<br />travel further together.</h2>
        <p>Start with a thought. The rest can be figured out together.</p>
        <a href={EMAIL} className={styles.button}>Say hello <span aria-hidden="true">↗</span></a>
        <nav aria-label="Footer social links">{SOCIALS.map(item => <a href={item.href} key={item.href}>{item.label === "github" ? "GitHub" : "LinkedIn"}</a>)}</nav>
      </div>
      <MonkeySeat mirrored delay={MONKEY_DELAY_SECONDS} className={styles.monkey} label="A second monkey sits facing the first, also holding a tasselled parasol." />
    </div>
  </footer>;
}
