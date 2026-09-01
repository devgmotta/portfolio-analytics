# 005 — Hero + Marquee de stack
Fase: 1
Status: pendente

## Objetivo
Instalar Magic UI Shimmer Button, Marquee (e opcionalmente Meteors); construir hero-section.tsx (título "Analista de Dados & Analytics Engineer", subtítulo sobre entrega ponta-a-ponta ETL/dbt/Cloud, CTA Shimmer Button) e stack-marquee-section.tsx (loop infinito, pauseOnHover, ícones de data/stack.ts); compor em app/page.tsx.

## Arquivos afetados
components/magicui/{shimmer-button,marquee,meteors}.tsx, components/sections/hero-section.tsx, components/sections/stack-marquee-section.tsx, app/page.tsx

## Critérios de aceite
- Marquee roda infinito sem "salto" visível na emenda.
- Meteors (se usado) respeita `motion-safe:`.
- `next build` limpo; visual conferido em `bun run dev`.

## Auditoria
(preenchido ao concluir)
