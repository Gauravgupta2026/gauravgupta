import { ContactForm } from "./ContactForm";
import styles from "./ContactCard.module.css";

export function ContactSection() {
  return <section id="contact" className={styles.section} aria-labelledby="contact-title">
    <div className={styles.content}>
      <header className={styles.header}>
        <h2 id="contact-title">Let’s make something good.</h2>
        <p>Have a role, an idea, or a question? I’d love to hear about it.</p>
      </header>
      <ContactForm />
    </div>
  </section>;
}
