import styles from "./WipMark.module.css";

export function WipMark({ className = "" }: { className?: string }) {
  return (
    <p className={`${styles.mark} ${className}`} aria-label="Work in progress">
      WIP
    </p>
  );
}
