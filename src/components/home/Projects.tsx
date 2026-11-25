import { ProjectGrid } from '@/components/site/ProjectGrid';

export function Projects() {
  return (
    <section className="projects" id="work" aria-labelledby="work-title">
      <header className="sec-head"><h2 id="work-title">Selected work</h2></header>
      <ProjectGrid />
    </section>
  );
}
