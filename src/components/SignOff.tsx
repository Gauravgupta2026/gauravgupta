import { contact } from "../data";

export function SignOff() {
  return (
    <section className="section signoff">
      <p className="signoff__text">
        Thanks for scrolling this far. <br />
        If any of it resonated,{" "}
        <a className="signoff__link" href={`mailto:${contact.email}`}>
          say hello
        </a>
        .
      </p>
    </section>
  );
}
