import { EMAIL, SOCIALS } from "@/content/paperPortfolio";
import styles from "./ContactCard.module.css";

const MAIL_PREFIX = "mailto:";
const COFFEE_SUBJECT = "?subject=Coffee%20in%20Bengaluru";
const CHANNELS = [
  { label: "Mail", value: EMAIL.slice(MAIL_PREFIX.length), href: EMAIL, external: false },
  { label: "GitHub", value: "Gauravgupta2026", href: SOCIALS[0].href, external: true },
  { label: "LinkedIn", value: "gaurav-gupta-218a08202", href: SOCIALS[1].href, external: true },
  { label: "Coffee in person?", value: "Bengaluru", href: EMAIL + COFFEE_SUBJECT, external: false },
] as const;

/** Full-height closing section of the About page. The card sits alone in open space. */
export function ContactSection() {
  return <section id="contact" className={styles.section} aria-labelledby="contact-title">
    <div className={styles.card}>
      <header>
        <h2 id="contact-title">Say hello</h2>
        <p>Have an idea, a role, or a question?</p>
      </header>
      <ul className={styles.rows}>
        {CHANNELS.map(channel => <li key={channel.label}>
          <a href={channel.href} {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}>
            <span className={styles.label}>{channel.label}</span>
            <span className={styles.value}>{channel.value}</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
        </li>)}
      </ul>
    </div>
  </section>;
}
