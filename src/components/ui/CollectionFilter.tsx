"use client";

import { useId } from "react";
import styles from "./CollectionFilter.module.css";

type Props = { options: readonly { key: string; label: string }[]; value: string; onChange: (key: string) => void; label: string };

export function CollectionFilter({ options, value, onChange, label }: Props) {
  const id = useId();
  return <div className={styles.filter}>
    <div className={styles.buttons} role="group" aria-label={label}>
      {options.map(option => <button key={option.key} type="button" aria-pressed={value === option.key} onClick={() => onChange(option.key)}>{option.label}</button>)}
    </div>
    <label className={styles.dropdown} htmlFor={id}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10m-7 6h4" /></svg>
      <span className="visually-hidden">{label}</span>
      <select id={id} value={value} onChange={event => onChange(event.target.value)}>{options.map(option => <option key={option.key} value={option.key}>{option.label}</option>)}</select>
    </label>
  </div>;
}
