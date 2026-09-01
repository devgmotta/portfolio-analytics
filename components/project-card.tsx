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
        className={cn(
          "w-full border-0",
          size === "thumb" ? "h-full" : "aspect-video"
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
                variant="secondary"
                className="border border-secondary/30 bg-secondary/10 font-mono text-secondary"
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
              variant="secondary"
              className="border border-secondary/30 bg-secondary/10 font-mono text-secondary"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
