import type { TechStackItem } from "@/data/stack";

/**
 * Renderiza o ícone (ou badge monoespaçado, quando não há logotipo redistribuível)
 * de um item de `data/stack.ts`. Sempre monocromático via `currentColor` — a cor
 * vem de quem usa o componente (ex.: `text-muted-foreground`), nunca daqui.
 */
export function TechIcon({ item }: { item: TechStackItem }) {
  const { icon } = item;

  if (icon.kind === "mono") {
    return (
      <span
        aria-hidden
        className="flex size-8 items-center justify-center rounded-md border border-border font-mono text-[0.6rem] font-semibold tracking-tight"
      >
        {icon.label}
      </span>
    );
  }

  const Icon = icon.Icon;
  return <Icon aria-hidden className="size-8" />;
}
