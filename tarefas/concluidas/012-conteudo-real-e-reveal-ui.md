# 012 — Fase 5: conteúdo real + reveal on scroll + hover polish
Fase: 5
Status: concluída

## Objetivo
Substituir os dados de exemplo por conteúdo real (experiência na Algar Tech + autônomo, formação em ADS/Estácio, 2 projetos reais — remove o 3º fictício), atualizar o marquee de stack (8 itens), e adicionar reveal-on-scroll (fade-in + slide-up) na Timeline e nos Projetos + hover states polidos nos cards.

**Ponto crítico revisitado:** a Timeline já tinha perdido `opacity` da animação numa correção anterior (Fase 4) por causa de um hydration mismatch real causado por `useReducedMotion()` (hook client-only) decidindo o valor de `initial`. Reintroduzi `opacity` aqui, mas com `initial`/`whileInView` **literais incondicionais** (sem hook nenhum) — server e o 1º paint do client calculam o mesmo estilo, então não há risco de mismatch. Validado com Playwright real (scroll real → opacity 1; `reducedMotion:'reduce'` emulado → zero warning de hydration no console, conteúdo nunca preso invisível).

## Arquivos afetados
data/experience.ts, data/education.ts (novo), data/projects.ts, data/stack.ts, components/sections/experience-timeline-section.tsx, components/sections/projects-section.tsx, components/project-card.tsx, app/globals.css, public/projects/*

## Critérios de aceite
- Build de produção limpo (lint + typecheck + build). ✅
- Reveal on scroll funcionando na Timeline e nos Projetos sem hydration mismatch. ✅ (validado com Playwright real)
- Hover states polidos nos cards (lift + border glow + título mudando de cor). ✅
- Badge "EM ANDAMENTO" no card WIP, com indicador pulsante coberto por `prefers-reduced-motion`. ✅

## Auditoria
Verificação própria via Playwright real (mesmo padrão das fases anteriores): scroll real confirma opacity 1 na Timeline e nos cards de projeto; `reducedMotion:'reduce'` emulado confirma zero warning de "hydrat" no console e conteúdo nunca preso em opacity:0 (exatamente o teste que pegou o bug da Fase 4). Screenshot full-page conferido visualmente: marquee com 8 itens (ícones corretos), 2 projetos reais, badge WIP, Formação renderizando. `bunx tsc --noEmit && bun run lint && bun run build` limpos. CONVERGE.
