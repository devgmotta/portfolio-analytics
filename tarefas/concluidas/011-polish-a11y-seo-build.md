# 011 — Polish: acessibilidade, SEO, build final
Fase: 4
Status: concluída

## Objetivo
Auditar prefers-reduced-motion em Marquee/Meteors/Border Beam/timeline reveal; validar contraste; app/sitemap.ts, app/robots.ts, metadata + OG image, favicon; responsividade final mobile; garantir `next build && next lint && tsc --noEmit` limpos.

**Desvios/decisões:**
- `.spotlight-card` (utility CSS nunca usada, sobrou da Fase 0) removida — código morto.
- SEO implementado via convenções nativas do App Router em vez de arquivos estáticos: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` e `app/icon.tsx` (ambos com `ImageResponse` de `next/og`, gerando PNG on-brand em vez de precisar de um asset PNG pronto — não há ferramenta de geração de imagem raster disponível nesta sessão). `lib/site.ts` centraliza `SITE_URL`/`SITE_NAME` (fallback `https://portfolio-analytics.vercel.app`, trocar por `NEXT_PUBLIC_SITE_URL` quando o domínio real da Vercel existir). `app/favicon.ico` (logo genérico do Next.js) removido — `app/icon.tsx` cobre o favicon moderno.
- **`next/image` NÃO aplicado** em `public/projects/*.svg`: os assets viraram SVG (não PNG) na Fase 2; `next/image` exige `images.dangerouslyAllowSVG` no `next.config.ts` para servir SVG local pelo otimizador, e o ganho de LCP é irrelevante para SVGs de ~1-2KB desenhados à mão. Mantido `<img>` com o `eslint-disable` já justificado em `project-card.tsx`. Documentado aqui em vez de forçar next/image sem benefício real.
- Verificação visual real (não só curl/RSC): Playwright + Chromium headless já estavam cacheados nesta VPS (`~/.cache/ms-playwright`) — usados para screenshots desktop/mobile reais, teste de teclado (Tab→Enter→Esc) no Dialog em múltiplos cards, emulação de `prefers-reduced-motion: reduce`, e captura de erros de console/página. Isso pegou 2 bugs reais que build/lint/typecheck sozinhos não detectam (ver Auditoria).

## Arquivos afetados
app/sitemap.ts, app/robots.ts, app/opengraph-image.tsx, app/icon.tsx, app/layout.tsx (metadata), lib/site.ts, app/globals.css (remoção de CSS morto), components/project-card.tsx (fix de foco do iframe), components/sections/experience-timeline-section.tsx (fix de hydration/reduced-motion)

## Critérios de aceite
- Build de produção limpo (lint + typecheck + build). ✅
- Navegação manual completa cobrindo Hero/Marquee/Bento(Dialog)/Timeline sem erros de console. ✅ (via Playwright real, não simulado)
- prefers-reduced-motion desativa todas as animações não essenciais. ✅

## Auditoria
Verificação própria (não um agente auditor separado desta vez — usei Playwright real para achar bugs que build/lint não pegam, e corrigi na hora; a auditoria independente final de todo o projeto roda em seguida, cobrindo isto também):

1. **[CRÍTICO, achado e corrigido] Esc não fechava o Dialog de projeto.** Causa raiz confirmada com Playwright: ao abrir o Dialog do card `featured` (media `iframe`), o foco automático do Dialog pousava DENTRO do `<iframe>` (outro browsing context) em vez do botão de fechar — a tecla Esc nunca chegava ao listener do Dialog porque estava sendo capturada pelo iframe. `activeElement` confirmado como `IFRAME` antes do fix, `BUTTON[data-slot=dialog-close]` depois. Corrigido com `tabIndex={-1}` no iframe (nos dois modos, thumb e full) — isso também completa o finding #2 da auditoria da Fase 2, que só tinha sido meio-corrigido com `pointer-events-none` (que bloqueia mouse mas não tira o elemento da ordem de Tab). Confirmado depois: Esc fecha e desmonta o Dialog; Enter no trigger focado abre o Dialog corretamente (teclado 100% funcional).
2. **[CRÍTICO, achado e corrigido] Reduced-motion da Timeline travava o conteúdo em opacity:0 para sempre — pior que o problema original.** A correção anterior (task 010, ver `tarefas/concluidas/010-timeline-section.md`) usava `useReducedMotion()` para decidir `initial`/`whileInView`. Esse hook só existe no cliente (lê `matchMedia`); no server (SSR) sempre avalia diferente do cliente quando reduced-motion está ativo, causando um **hydration mismatch real** — confirmado no console do Playwright: "A tree hydrated but some attributes... didn't match... This won't be patched up." React mantém o valor do server (`opacity:0`) e nunca corrige, deixando a experiência profissional do autor permanentemente invisível para quem usa `prefers-reduced-motion`. Corrigido removendo `opacity` da animação por completo — agora só `y` (transform) é animado, propriedade que o `MotionConfig` global já neutraliza corretamente para reduced-motion (confirmado no código-fonte de `motion-dom` na auditoria da Fase 3) sem depender de hook nenhum, e que nunca causa mismatch porque não depende de `window`. Confirmado depois: `opacity` computado é sempre `"1"` (nunca some), com ou sem reduced-motion, sem warning de hidratação.
3. **[BAIXO, não-bloqueante]** Descoberto que screenshot full-page automatizado (Playwright `--full-page`) não dispara o `IntersectionObserver` do `whileInView` em alguns casos — a Timeline aparecia em branco só nesse cenário específico de ferramenta de captura, não afeta usuário real rolando a página (confirmado com scroll real: opacity sempre 1). O fix do finding 2 acima resolveu isso de brinde, já que opacity nunca é 0 agora.
4. Console/erros de página: zero erros reais em nenhuma das passagens (desktop/mobile/reduced-motion/teclado). Ruído identificado e descartado: `requestStorageAccess: Permission denied` (artefato de sandbox do Chromium em modo dev/HMR, ausente em build de produção, não relacionado ao código do site) e o aviso informativo da própria lib `motion` sobre reduced-motion (não é erro).
5. `bunx tsc --noEmit && bun run lint && bun run build` limpos em todas as rodadas.
