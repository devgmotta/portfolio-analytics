# 011 — Polish: acessibilidade, SEO, build final
Fase: 4
Status: pendente

## Objetivo
Auditar prefers-reduced-motion em Marquee/Meteors/Border Beam/spotlight/timeline reveal; validar contraste; app/sitemap.ts, app/robots.ts, metadata + OG image, favicon; next/image nos assets de public/projects/; responsividade final mobile; garantir `next build && next lint && tsc --noEmit` limpos.

## Arquivos afetados
app/sitemap.ts, app/robots.ts, app/layout.tsx (metadata), public/favicon.ico, public/og-image.png, componentes de mídia (next/image)

## Critérios de aceite
- Build de produção limpo (lint + typecheck + build).
- Navegação manual completa cobrindo Hero/Marquee/Bento(Dialog)/Timeline sem erros de console.
- prefers-reduced-motion desativa todas as animações não essenciais.

## Auditoria
(preenchido ao concluir — auditoria final cobre o projeto inteiro como evidência de "pronto")
