import styles from "./TechStack.module.css";

const ICONS: Record<string, { file: string; mask?: boolean; label?: string }> = {
  Swift: { file: "swift.svg", mask: true },
  SwiftUI: { file: "swiftui.png" },
  GameKit: { file: "gamekit.png", label: "GameKit / Game Center" },
  CloudKit: { file: "cloudkit.png", label: "CloudKit / iCloud" },
  Convex: { file: "convex.svg", mask: true },
  Claude: { file: "claude.svg", mask: true },
  Figma: { file: "figma.svg", mask: true },
  TypeScript: { file: "typescript.svg", mask: true },
  "Next.js": { file: "nextdotjs.svg", mask: true },
};

export function TechStack({ technologies }: { technologies: string[] }) {
  return <ul className={styles.stack} aria-label="Technology stack">
    {technologies.map(technology => {
      const icon = ICONS[technology];
      return <li key={technology} title={icon?.label ?? technology}>
        {icon?.mask ? <span className={styles.mark} role="img" aria-label={technology} style={{ maskImage: `url(/icons/${icon.file})` }} /> : icon ?
          // Small local brand assets do not need a responsive image pipeline.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/icons/${icon.file}`} alt={icon.label ?? technology} width={28} height={28} /> : technology}
      </li>;
    })}
  </ul>;
}
