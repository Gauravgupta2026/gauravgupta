"use client";
import { useEffect, useRef } from "react";
import { InkDrawing } from "./InkDrawing";
import styles from "./Paper.module.css";
const ENTRY_KEY = "gaurav-paper-entered";
export function Welcome() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let entered = false;
    try { entered = sessionStorage.getItem(ENTRY_KEY) === "yes"; } catch { /* Entry remains usable when storage is unavailable. */ }
    if (!entered) dialog.current?.showModal();
  }, []);
  const enter = () => {
    try { sessionStorage.setItem(ENTRY_KEY, "yes"); } catch { /* Entry does not depend on persistence. */ }
    dialog.current?.close();
    document.getElementById("home-title")?.focus({ preventScroll: true });
  };
  return <dialog ref={dialog} className={styles.welcome} aria-label="Welcome to Gaurav’s corner of the internet" onCancel={enter}>
    <div><InkDrawing kind="house" className={styles.entryHouse} /><button onClick={enter} autoFocus>enter</button></div>
  </dialog>;
}
