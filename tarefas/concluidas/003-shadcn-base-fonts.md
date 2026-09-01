# 003 — Componentes base shadcn + fontes Geist
Fase: 0
Status: concluída

## Objetivo
`shadcn init` (New York, zinc, CSS vars) + `shadcn add button card dialog badge`; configurar Geist Sans/Mono via next/font em app/layout.tsx; página placeholder provando visualmente os tokens (Button + Card na paleta âmbar/teal sobre fundo dark).

## Arquivos afetados
components.json, lib/utils.ts, components/ui/{button,card,dialog,badge}.tsx, app/layout.tsx, app/page.tsx (placeholder)

## Critérios de aceite
- `next build && next lint && tsc --noEmit` limpos.
- Fim de Fase 0: base pronta para Hero/Marquee/Bento/Timeline.

## Auditoria
Auditor independente (agente a9f9a47b508f9c5b6) confirmou o bug `--font-sans` auto-referente do `shadcn init` estava de fato corrigido (`--font-sans: var(--font-geist-sans)`, com `--font-geist-sans` definido em `app/layout.tsx`). `components/ui/{button,card,badge}.tsx` livres de hex/cor crua. `bun run lint && bunx tsc --noEmit && bun run build` limpos (evidência própria do auditor). CONVERGE sem findings nesta tarefa — findings de outras tarefas da Fase 0 estão detalhados em `002-tailwind-tokens-design-system.md`.
