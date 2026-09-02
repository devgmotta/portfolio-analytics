import { ChartSpline, ExternalLink } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Project, ProjectMedia } from "@/data/projects";

function ProjectMediaView({
  media,
  size = "thumb",
}: {
  media: ProjectMedia;
  size?: "thumb" | "full";
}) {
  if (media.kind === "iframe") {
    return (
      <iframe
        src={media.iframeUrl}
        title={media.iframeTitle}
        loading="lazy"
        // No modo "thumb" o iframe fica dentro do trigger do Dialog — sem
        // pointer-events-none, o iframe (seu próprio browsing context) captura
        // o clique antes que ele chegue ao trigger. No modo "full", o Dialog
        // move foco automaticamente para o primeiro elemento focável do seu
        // conteúdo ao abrir — sem tabIndex={-1}, isso pousa o foco DENTRO do
        // iframe (outro browsing context), e Esc para de fechar o modal
        // porque a tecla nunca chega ao listener do Dialog. tabIndex={-1} em
        // ambos os modos resolve os dois problemas: tira o iframe da ordem
        // de tab (thumb) e do auto-foco do Dialog (full) — clique manual do
        // usuário dentro do embed continua funcionando normalmente.
        tabIndex={-1}
        className={cn(
          "w-full border-0",
          size === "thumb" ? "h-full pointer-events-none" : "aspect-video"
        )}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVGs de arquitetura locais, sem otimização necessária
    <img
      src={media.src}
      alt={media.alt}
      loading="lazy"
      className={cn(
        "w-full object-cover",
        size === "thumb" ? "h-full" : "aspect-video"
      )}
    />
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Dialog>
      <div className="group glass-card relative flex h-full flex-col overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1">
        <BorderBeam
          size={80}
          duration={8}
          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {project.wip ? (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-primary uppercase">
            <span
              aria-hidden
              className="size-1.5 animate-pulse rounded-full bg-primary"
            />
            Em andamento
          </span>
        ) : null}

        <DialogTrigger
          nativeButton={false}
          render={
            <div
              role="button"
              tabIndex={0}
              aria-label={`Ampliar ${project.title}`}
            />
          }
          className="h-48 w-full cursor-pointer overflow-hidden"
        >
          <ProjectMediaView media={project.media} />
        </DialogTrigger>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="glass"
                className="font-mono"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-1">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <SiGithub className="size-3.5" aria-hidden />
                Repositório
              </a>
            ) : project.wip ? (
              <span className="font-mono text-xs text-muted-foreground">
                Repositório em breve
              </span>
            ) : null}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                Demo
              </a>
            ) : null}
          </div>

          {project.caseStudyUrl ? (
            <Button
              variant="outline"
              size="sm"
              className="mt-1 w-fit"
              nativeButton={false}
              render={<Link href={project.caseStudyUrl} />}
            >
              <ChartSpline aria-hidden className="size-3.5" />
              Explorar Case Interativo
            </Button>
          ) : null}
        </div>
      </div>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono">{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden rounded-lg border border-border">
          <ProjectMediaView media={project.media} size="full" />
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="glass"
              className="font-mono"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
