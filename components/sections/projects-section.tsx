"use client";

import { motion } from "motion/react";

import { BentoGrid } from "@/components/ui/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projetos"
      className="mx-auto max-w-6xl px-6 py-24 scroll-mt-20"
    >
      <div className="mb-12 flex items-end justify-between border-b border-border pb-4">
        <h2 className="font-mono text-2xl font-semibold text-foreground">
          Projetos em Destaque
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          QUERY_LIMIT={PROJECTS.length}
        </span>
      </div>

      <BentoGrid className="auto-rows-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          // Mesmo padrão seguro da Timeline: initial/whileInView literais e
          // incondicionais (nenhum hook client-only decide o valor), então
          // server e o 1º paint do client calculam o mesmo estilo — sem risco
          // de hydration mismatch. Ver comentário completo em
          // experience-timeline-section.tsx.
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={cn(project.featured ? "sm:col-span-2" : "")}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </BentoGrid>
    </section>
  );
}
