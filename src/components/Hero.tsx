import { contact } from "../data";
import { ImageSlot } from "./ImageSlot";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__stage">
        <div className="hero__mat">
          <div className="hero__photo">
            <ImageSlot
              fit="contain"
              alt="Gaurav standing in a snowy mountain valley"
              placeholder="Drop your hero photo"
            />
          </div>
        </div>
      </div>
      <div className="hero__footer">
        <div className="hero__meta">
          <a className="hero__meta-left" href={contact.socials}>
            Socials
          </a>
          <span className="hero__meta-center">{contact.location}</span>
          <a className="hero__meta-right" href={`mailto:${contact.email}`}>
            Send an Email
          </a>
        </div>
        <div className="hairline" />
      </div>
    </section>
  );
}
