# 007 — Bento Grid + project-card.tsx
Fase: 2
Status: concluída

## Objetivo
Instalar Magic UI Bento Grid + Border Beam; project-card.tsx renderiza cada Project (branch media.kind iframe/imagem), tags como Badge variante "glass" (bg-secondary/10, não preenchimento sólido), link de repo, Border Beam só ativo em group-hover; card abre Dialog (shadcn) com mídia ampliada.

**Desvios descobertos na implementação:**
- `BentoCard` (vendor) veio com cores cruas (`neutral-700`, `bg-black/3`, hex) desenhadas para um tema claro/escuro alternável — não serve ao nosso tema único dark tokenizado, e não suporta o branch iframe/imagem/Dialog que precisamos. Removido do arquivo; mantive só `BentoGrid` (wrapper de grid, sem cor nenhuma) e escrevi `project-card.tsx` do zero.
- `border-beam.tsx` tinha `colorFrom`/`colorTo` hardcoded em hex (`#ffaa40`/`#9c40ff`) — trocado para `var(--primary)`/`var(--secondary)` (beam âmbar→teal, no tema).
- `lucide-react` não tem mais ícone de GitHub (removido do pacote) — usei `SiGithub` de `react-icons/si`, mesmo padrão do finding de dbt/Power BI na tarefa 004.
- `DialogTrigger` do shadcn renderiza `<button>` por padrão; um `<iframe>` é "interactive content" e não pode ser filho de `<button>` (HTML inválido). Troquei o trigger para renderizar como `<div role="button" tabIndex={0}>` via prop `render` do base-ui.

## Arquivos afetados
components/ui/{bento-grid,border-beam}.tsx, components/project-card.tsx

## Critérios de aceite
- iframe (Looker Studio) e imagem renderizam corretamente conforme media.kind.
- Dialog abre com a mídia ampliada e fecha (Esc, clique fora, botão).
- Nenhum hex fora de token; Badge usa variante glass, não sólida.

## Auditoria
Auditor independente (agente a1a9cf8c97077b847) encontrou 3 findings, rastreados até o código-fonte da lib (`node_modules/@base-ui/react`), não hipóteses:

1. **[CRÍTICO] Teclado quebrado no DialogTrigger.** A correção do aninhamento HTML inválido (iframe em button → `render={<div role="button" tabIndex={0} />}`) ficou incompleta: sem `nativeButton={false}`, o base-ui internamente ainda assume que o elemento renderizado é um `<button>` nativo (`useButton({native: true})`), então Enter/Espaço não disparam o clique — regressão de acessibilidade por teclado (WCAG 2.1.1). **Corrigido:** `nativeButton={false}` adicionado ao `DialogTrigger`.
2. **[MODERADO] iframe capturava o clique no modo thumb.** O iframe do card `featured` (`pipeline-vendas-dbt-bigquery`, o único com `media.kind==="iframe"`) tem seu próprio browsing context — sem `pointer-events-none`, cliques dentro dele não chegavam ao trigger do Dialog, e ele virava uma parada de Tab extra. **Corrigido:** `pointer-events-none` condicional só no modo `"thumb"` (o modo `"full"`, dentro do Dialog já aberto, continua interativo).
3. **[BAIXO] Badge "glass" não existia como variant real**, era `className` duplicado em 2 lugares — divergia do texto literal do critério de aceite acima. **Corrigido:** variant `glass` adicionado a `badgeVariants` (`components/ui/badge.tsx`), os 2 usos trocados para `variant="glass"`.

Verificação pós-fix: `bunx tsc --noEmit && bun run lint && bun run build` limpos. CONVERGE.
