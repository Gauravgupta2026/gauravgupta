import { Hero } from "./Hero";
import { Summary } from "./Summary";
import { Phases } from "./Phases";
import { Projects } from "./Projects";
import { Notes } from "./Notes";
import { SignOff } from "./SignOff";

/** The single-page home view: every section stacked in reading order. */
export function Home() {
  return (
    <main>
      <Hero />
      <Summary />
      <Phases />
      <Projects />
      <Notes />
      <SignOff />
    </main>
  );
}
