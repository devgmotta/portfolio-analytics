import { BentoGrid } from "@/components/ui/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 flex items-end justify-between border-b border-border pb-4">
        <h2 className="font-mono text-2xl font-semibold text-foreground">
          Projetos em Destaque
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          QUERY_LIMIT={PROJECTS.length}
        </span>
      </div>

      <BentoGrid className="auto-rows-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </BentoGrid>
    </section>
  );
}
