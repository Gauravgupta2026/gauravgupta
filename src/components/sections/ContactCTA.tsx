import styles from "./ContactCTA.module.css";

export function ContactCTA() {
  return (
    <section className={styles.cta} aria-labelledby="contact-title">
      <h2 id="contact-title"><span>Creativity and ideas</span><span>travel further together.</span></h2>
      <p>Start with a thought. The rest can be figured out together.</p>
      <a href="mailto:hey@gauravguptas.com">Say hello</a>
    </section>
  );
}
