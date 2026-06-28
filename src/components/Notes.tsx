import { notes } from "../data";

export function Notes() {
  return (
    <section className="section notes">
      <h2 className="notes__title">Notes</h2>
      <div className="notes__list">
        {notes.map((n, i) => (
          <a className="note" href={n.href} key={`${n.title}-${i}`}>
            <span className="note__cat">{n.cat}</span>
            <span className="note__title">{n.title}</span>
            <span className="note__read">Read →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
