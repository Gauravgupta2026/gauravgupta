import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <Shell as="section" id="projects" className="pt-[90px] md:pt-[130px]">
      <Reveal as="h2" className="m-0 mb-[58px] text-center">
        <span className="font-display text-[42px] font-normal italic leading-[1.08] tracking-[-0.01em] text-ink">
          Projects &amp;
          <br />
          Case Study
        </span>
      </Reveal>

      <div className="flex flex-col gap-[14px]">
        {projects.map((project) => (
          <Reveal key={project.title}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}
