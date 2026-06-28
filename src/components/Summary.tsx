import { summary } from "../data";

export function Summary() {
  return (
    <section className="section summary" id="about">
      <h2 className="summary__title">Summary</h2>
      <p className="summary__body">{summary}</p>
    </section>
  );
}
