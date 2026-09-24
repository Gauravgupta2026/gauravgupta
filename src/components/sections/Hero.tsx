import Link from "next/link";

export function Hero() {
  return (
    <header
      id="top"
      className="hero-stage"
      aria-labelledby="hero-title"
      data-browser-theme-color="#080808"
    >
      <h1 id="hero-title" className="hero-statement">
        <span>I believe</span>
        <span>good work is</span>
        <span>making them feel good.</span>
      </h1>

      <div className="hero-intro">
        <p>
          Currently building <Link href="/projects/wylde">Wylde</Link>
        </p>
        <p>3 projects and more experiments</p>
        <p className="hero-intro-location">Building in Bengaluru, India</p>
      </div>
    </header>
  );
}
