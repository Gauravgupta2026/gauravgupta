export function DeskNote() {
  return (
    <section className="desk-note" aria-labelledby="desk-note-title">
      <div className="desk-note-frame">
        <div className="desk-note-copy">
          <h2 id="desk-note-title" className="desk-note-salutation">
            Dear reader <span>(and in fact, dear friend),</span>
          </h2>

          <p>
            This version of my website is my first attempt at making a digital
            garden: a place for rough drafts and indecipherable scrawling, and
            for seedlings of ideas to be tended until they stand tall in the
            fields.
          </p>

          <p className="desk-note-signoff">
            Tread carefully, as the ground may have shifted.
            <span>Love,</span>
            <em>Gaurav</em>
          </p>
        </div>
      </div>
    </section>
  );
}
