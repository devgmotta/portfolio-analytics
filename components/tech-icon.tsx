import { cn } from "@/lib/utils";
import type { TechStackItem } from "@/data/stack";

/**
 * Renderiza o ícone (ou badge monoespaçado, quando não há logotipo redistribuível)
 * de um item de `data/stack.ts`. Sempre monocromático via `currentColor` — a cor
 * vem de quem usa o componente (ex.: `text-muted-foreground`), nunca daqui.
 * `className` sobrescreve o tamanho padrão (`size-8`, usado pelo Marquee) —
 * a Matriz de Competências usa um badge mais compacto (`size-4`/`size-5`).
 */
export function TechIcon({
  item,
  className,
}: {
  item: TechStackItem;
  className?: string;
}) {
  const { icon } = item;

  if (icon.kind === "mono") {
    return (
      <span
        aria-hidden
        className={cn(
          "flex size-8 items-center justify-center rounded-md border border-border font-mono text-[0.6rem] font-semibold tracking-tight",
          className
        )}
      >
        {icon.label}
      </span>
    );
  }

  const Icon = icon.Icon;
  return <Icon aria-hidden className={cn("size-8", className)} />;
}
