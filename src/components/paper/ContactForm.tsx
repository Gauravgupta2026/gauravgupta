"use client";

import type { FormEvent } from "react";
import { EMAIL } from "@/content/paperPortfolio";
import styles from "./ContactCard.module.css";

const MESSAGE_TEMPLATE = "Hey Gaurav, I’m [name]. I enjoyed your work and would love to catch up.\nWould [date] work for you?";

export function ContactForm() {
  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    for (const fieldName of ["firstName", "message"]) {
      const field = event.currentTarget.elements.namedItem(fieldName) as HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity(value(fieldName) ? "" : "Please enter more than spaces.");
    }
    if (!event.currentTarget.reportValidity()) return;
    const name = [value("firstName"), value("lastName")].filter(Boolean).join(" ");
    const phone = value("phone");
    const body = `${value("message")}\n\nFrom: ${name}\nEmail: ${value("email")}${phone ? `\nPhone: ${phone}` : ""}`;
    window.location.href = `mailto:${EMAIL.slice("mailto:".length)}?subject=${encodeURIComponent(`Hello from ${name}`)}&body=${encodeURIComponent(body)}`;
  }

  return <form className={styles.form} onSubmit={openDraft} action={EMAIL} method="post" encType="text/plain">
    <label>First name <span>(required)</span><input name="firstName" autoComplete="given-name" onInput={event => event.currentTarget.setCustomValidity("")} required maxLength={15} /></label>
    <label>Last name<input name="lastName" autoComplete="family-name" maxLength={15} /></label>
    <label>Phone <span>(optional)</span><input name="phone" type="tel" inputMode="numeric" autoComplete="tel" pattern="[0-9]{10}" title="Enter a 10-digit phone number" maxLength={10} onInput={event => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 10); }} /></label>
    <label>Email <span>(required)</span><input name="email" type="email" autoComplete="email" pattern={"[^\\s@]+@[^\\s@]+\\.[^\\s@]+"} title="Enter a valid email address, such as name@example.com" required maxLength={254} /></label>
    <label className={styles.message}>Your message <span>(required)</span><textarea name="message" placeholder={MESSAGE_TEMPLATE} onInput={event => event.currentTarget.setCustomValidity("")} required maxLength={2000} rows={5} /></label>
    <div className={styles.submit}>
      <button type="submit">Open email draft</button>
    </div>
  </form>;
}
