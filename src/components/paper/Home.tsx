import { EMAIL, SOCIALS } from "@/content/paperPortfolio";
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
            <p className={styles.heroDescription}>I design and build things that work well and feel right. This is where I share products I’m building, questions I’m working through, and things I’m learning along the way.</p>
            <nav className={styles.heroLinks} aria-label="Get in touch">
              <a href={EMAIL}>mail</a>
              {SOCIALS.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
            </nav>
          </div>
        </section>


      </div>
      <LandingProjects />

    </main>;
}
