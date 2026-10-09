import type { Metadata } from "next";
import { InkDrawing } from "@/components/paper/InkDrawing";
import { EMAIL, SOCIALS } from "@/content/paperPortfolio";
import styles from "@/components/paper/Paper.module.css";
export const metadata: Metadata = { title: "Contact — Gaurav Gupta", description: "Have a product idea, a role, or a question? Say hello." };
export default function Contact() { return <main id="main-content" className={styles.contactPage}><div className={styles.contactBody}><h1 className={styles.srOnly}>Say hello</h1><InkDrawing kind="phone" className={styles.phone} /><p>Have an idea, a role, or a question?</p><div className={styles.contactRows}><div><a href={EMAIL}>[1] mail</a><a href={SOCIALS[0].href} target="_blank" rel="noreferrer">[2] github</a></div><div><a href={SOCIALS[1].href} target="_blank" rel="noreferrer">[3] linkedin</a></div><div><a href={EMAIL + "?subject=Coffee%20in%20Bengaluru"}>[4] get coffee irl?</a></div></div></div></main>; }
