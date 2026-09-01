# 005 — Hero + Marquee de stack
Fase: 1
Status: concluída

## Objetivo
Instalar Magic UI Shimmer Button, Marquee (e opcionalmente Meteors); construir hero-section.tsx (título "Analista de Dados & Analytics Engineer", subtítulo sobre entrega ponta-a-ponta ETL/dbt/Cloud, CTA Shimmer Button) e stack-marquee-section.tsx (loop infinito, pauseOnHover, ícones de data/stack.ts); compor em app/page.tsx.

Usei `motion-safe:`/`prefers-reduced-motion` em CSS (`@media (prefers-reduced-motion: reduce)` em globals.css cobrindo shimmer/spin/marquee/meteor) em vez de classes `motion-safe:` do Tailwind — mais robusto porque desliga a animação já em execução, não só impede que comece.

## Arquivos afetados
components/ui/{shimmer-button,marquee,meteors}.tsx, components/sections/hero-section.tsx, components/sections/stack-marquee-section.tsx, app/page.tsx

## Critérios de aceite
- Marquee roda infinito sem "salto" visível na emenda.
- Meteors respeita prefers-reduced-motion (via CSS, não motion-safe: de classe).
- `next build` limpo; visual conferido via curl no RSC payload (browser tool indisponível nesta sessão).

## Auditoria
Auditor independente (agente a8b971fbba43635d6) encontrou 2 findings:
1. [MÉDIO-ALTO] `components/ui/marquee.tsx` duplicava o conteúdo 4× (prop `repeat`) sem `aria-hidden` nas cópias — leitor de tela anunciava a lista de 7 tecnologias 4 vezes seguidas. **Corrigido**: `aria-hidden={i > 0}` nos grupos repetidos (só a 1ª cópia fica na árvore de acessibilidade).
2. [BAIXO] `.glass-card` em `app/globals.css` usava `border-white/10` (paleta crua) em vez de `border-border` — vazamento que o sweep da Fase 0 não pegou porque excluía `globals.css` do grep (correto para hex de token, mas deixou passar paleta Tailwind crua dentro de uma `@apply`). **Corrigido**: trocado para `border-border`.

Verificação pós-fix: `bunx tsc --noEmit && bun run lint` limpos. CONVERGE.
