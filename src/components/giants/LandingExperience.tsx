import { EdnaOpening } from "./EdnaOpening";
import { SelectedWork } from "./SelectedWork";
import styles from "./EdnaOpening.module.css";

export function LandingExperience() {
  return (
    <div className={styles.experience}>
      <EdnaOpening />
      <SelectedWork />
    </div>
  );
}
