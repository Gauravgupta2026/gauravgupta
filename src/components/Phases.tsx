import { journey, strengths, weaknesses } from "../data";

export function Phases() {
  return (
    <section className="section phases">
      {/* ---- Flowchart: two aligned rows of 5 ---- */}
      <div className="phases__grid">
        <div className="phases__label">
          List of
          <br />
          Phases
        </div>
        <div className="chart">
          {/* Top row — aspirations */}
          <div className="chart__row">
            {journey.map((step, i) => {
              const isLast = i === journey.length - 1;
              // The connector before a ghost (uncertain future) step is dashed.
              const nextGhost = !isLast && journey[i + 1].ghost;
              return (
                <div className="chart__cell" key={step.aspiration}>
                  {!isLast && (
                    <span
                      className={`chart__conn ${
                        nextGhost ? "chart__conn--dashed" : "chart__conn--solid"
                      }`}
                    />
                  )}
                  {step.current && (
                    <span className="chart__here">I am here ↓</span>
                  )}
                  <span className="box-asp">{step.aspiration}</span>
                </div>
              );
            })}
          </div>
          {/* Bottom row — life phases */}
          <div className="chart__row chart__row--phases">
            {journey.map((step) => (
              <div className="chart__cell chart__cell--phase" key={step.phase}>
                <span
                  className={`box-phase ${step.ghost ? "box-phase--ghost" : ""} ${
                    step.current ? "box-phase--current" : ""
                  }`}
                  style={step.color ? { background: step.color } : undefined}
                >
                  {step.phase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Strengths / Weaknesses ---- */}
      <div className="traits">
        <div>
          <h3 className="traits__title">Strengths</h3>
          <ul className="traits__list">
            {strengths.map((s) => (
              <li className="traits__item traits__item--strength" key={s}>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="traits__title">Weaknesses</h3>
          <ul className="traits__list">
            {weaknesses.map((w, i) => (
              <li className="traits__item traits__item--weakness" key={`${w}-${i}`}>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
