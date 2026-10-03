import { PortfolioFooter } from "./PortfolioFooter";
import styles from "./FooterCTA.module.css";

export function FooterCTA() {
  return (
    <div id="contact" className={styles.reveal}>
      <section className={styles.closingPanel} aria-labelledby="closing-invitation-title" data-browser-theme-color="#ffffff">
        <div className={styles.shell}>
          <div className={styles.contactCard}>
            <h2 id="closing-invitation-title" className={styles.statement}>
              creativity and ideas
              <br />
              travel together
            </h2>
            <div className={styles.contactDetails}>
              <p className={styles.copy}>
                I&rsquo;m looking for a design engineering role where I can help
                shape a product and build it with the team. If that&rsquo;s the kind
                of work you&rsquo;re doing, I&rsquo;d like to hear about it.
              </p>
              <a className={styles.contactButton} href="mailto:hey@gauravguptas.com">
                Get in touch.
              </a>
            </div>
          </div>
        </div>
      </section>

      <PortfolioFooter />
    </div>
  );
}
