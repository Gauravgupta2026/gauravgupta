import Link from 'next/link';

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <Link className="wordmark" href="/" aria-label="Gaurav Gupta, home">GG</Link>
      <span className="links"><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Say hello</Link></span>
    </nav>
  );
}
