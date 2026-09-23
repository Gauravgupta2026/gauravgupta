import Link from "next/link";

export function Hero() {
  return (
    <header id="top" className="hero-stage" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-statement">
        <span>I make beautifully useful</span>
        <span>things</span>
      </h1>

      <div className="hero-intro">
        <p className="hero-intro-kicker">Product, design, and code</p>
        <p>
          I look for what gets in the way, then make it easier to use.
        </p>
        <p>
          Right now, I’m building <Link href="/projects/wylde">Wylde</Link>, exploring
          long-horizon agents, and looking for a product role.
        </p>
      </div>

      <div className="hero-foot">
        <span>Bengaluru, India</span>
        <a href="mailto:hey@gauravguptas.com">Say hello</a>
      </div>
    </header>
  );
}
