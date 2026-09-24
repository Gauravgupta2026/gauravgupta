export function DeskNote() {
  return (
    <section
      className="desk-note"
      aria-labelledby="desk-note-title"
      data-browser-theme-color="#080808"
    >
      <div className="desk-note-frame">
        <div className="desk-note-copy">
          <h2 id="desk-note-title" className="desk-note-salutation">
            dear reader <span>(and in fact dear friend)</span>
          </h2>

          <p>
            this version of my website represents my first attempt at making a
            digital garden &mdash; a place for rough drafts and indecipherable
            scrawling; for seedlings of ideas to be tended and stand tall in the
            fields.
          </p>

          <p className="desk-note-signoff">
            tread carefully, as the ground may have shifted.
            <span>love,</span>
            <em>- gaurav</em>
          </p>
        </div>
      </div>
    </section>
  );
}
