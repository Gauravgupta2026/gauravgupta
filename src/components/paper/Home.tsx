import styles from "./LandingHome.module.css";
import { LandingProjects } from "./LandingProjects";

export function Home() {
  return <main id="main-content" className={styles.page}>
      <div className={styles.heroCover}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroArt} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.heroIdentity}>
              <h1 id="home-title" tabIndex={-1}>Gaurav Gupta</h1>
              <span>Designer & engineer · Bengaluru</span>
            </div>
            <div className={styles.heroDescription}>
              <p className={styles.heroLead}>Curiosity, put to work.</p>
              <p className={styles.heroDetail}>I design and build digital things, following ideas from the first sketch to the smallest detail. This is a collection of products, playful experiments, and notes from the process: what I’m trying, what I’m learning, and what I keep coming back to. Have a look around. I hope something here sparks an idea of your own.</p>
            </div>
            <nav className={styles.heroLinks} aria-label="Get in touch">
              <a role="link" aria-disabled="true" title="Résumé coming soon">resume</a>
              <a href="https://x.com/gaurav_gupta241">dm me on X</a>
            </nav>
          </div>
        </section>


      </div>
      <LandingProjects />

    </main>;
}
