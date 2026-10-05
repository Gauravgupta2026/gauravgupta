const WORK_METHOD = [
  {
    number: "01",
    title: "Notice",
    description: "Find the friction people have learned to work around.",
  },
  {
    number: "02",
    title: "Make",
    description: "Shape the smallest useful thing that can be tried.",
  },
  {
    number: "03",
    title: "Learn",
    description: "Put it in real hands. Keep what helps; change what doesn’t.",
  },
] as const;

export function WorkMethod() {
  return (
    <section id="approach" className="work-method" aria-labelledby="work-method-title">
      <header className="work-method-heading">
        <span>THE WORK, IN THREE MOVES</span>
        <h2 id="work-method-title">A way through the uncertainty.</h2>
      </header>

      <div className="work-method-circles">
        {WORK_METHOD.map((step) => (
          <article className="work-method-circle" key={step.number}>
            <span className="work-method-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>

      <p className="work-method-throughline">
        The order can change. Staying close to the problem and the people using
        the result is what keeps the work honest.
      </p>
    </section>
  );
}
