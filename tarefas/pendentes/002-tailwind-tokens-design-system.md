# 002 — Tokens de design "Terminal Elegance"
Fase: 0
Status: pendente

## Objetivo
Traduzir o protótipo Stitch para tokens shadcn (HSL) em app/globals.css e tailwind.config.ts: background/foreground/primary(âmbar)/secondary(teal)/card/border/radius, com --primary-foreground e --secondary-foreground escuros (contraste WCAG AA), keyframes shimmer-slide/spin-around/marquee/marquee-vertical/meteor, utilities glass-card/spotlight-card/bg-noise.

## Arquivos afetados
tailwind.config.ts, app/globals.css

## Critérios de aceite
- Nenhum hex "cru" fora de globals.css (componentes usam só classes Tailwind derivadas dos tokens).
- Contraste de --primary-foreground sobre --primary e --secondary-foreground sobre --secondary ≥ 4.5:1 (calculado).
- `next build` limpo.

## Auditoria
(preenchido ao concluir)
