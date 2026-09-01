import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
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
        // o clique antes que ele chegue ao trigger, e vira uma parada de Tab
        // extra e confusa. No modo "full" (dentro do Dialog já aberto) ele
        // deve continuar interativo normalmente.
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
      <div
        className={cn(
          "group glass-card relative flex flex-col overflow-hidden rounded-xl",
          project.featured ? "sm:col-span-2" : ""
        )}
      >
        <BorderBeam
          size={80}
          duration={8}
          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

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
          <h3 className="font-mono text-lg font-semibold text-foreground">
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
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <SiGithub className="size-3.5" aria-hidden />
              Repositório
            </a>
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
