import { contact } from "../data";
import { useTheme, type Theme } from "../theme/ThemeProvider";

const THEMES: { id: Theme; label: string }[] = [
  { id: "paper", label: "Paper" },
  { id: "lab", label: "Lab" },
];

export function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">Gaurav Gupta</div>
          <div className="footer__cols">
            <div>
              <div className="footer__coltitle">General</div>
              <div className="footer__col-links">
                <a href="#projects">Projects</a>
                <a href="#about">About</a>
              </div>
            </div>
            <div>
              <div className="footer__coltitle">Links</div>
              <div className="footer__col-links">
                <a href={contact.socials}>Socials</a>
                <a href={`mailto:${contact.email}`}>Email</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">c. 2025</span>
          <div className="theme-switch" role="group" aria-label="Theme">
            <span className="theme-switch__label">Theme</span>
            {THEMES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`theme-switch__btn ${
                  theme === id ? "theme-switch__btn--active" : ""
                }`}
                aria-pressed={theme === id}
                onClick={() => setTheme(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
