# 019 — Normalização do design system (Hero + botões)
Fase: 9 (refatoração sênior — pilar 2)
Status: concluída

## Objetivo
Ajustar a altura da Hero pra `min-h-[82vh]` (a tarefa 016 já tinha trocado `min-h-[90vh]` por padding puro; o pedido atual pede explicitamente `min-h-[82vh]` ou `py-20` — volto a usar min-height, mais enxuto) e trocar a anatomia dos botões de CTA reais de `h-11 px-5` (decisão da tarefa 016) pra `h-10 px-4 text-sm font-mono rounded-lg border`, com as 3 variantes (primária/secundária/ghost) estritamente separadas.

## Arquivos afetados
- `components/sections/hero-section.tsx`: `py-24 md:py-32 lg:py-40` → `min-h-[82vh] py-16` (mantém `flex items-center justify-center`, já centraliza verticalmente).
- `components/ui/button.tsx`: `size: cta` de `h-11 gap-1.5 rounded-lg px-5 duration-200` → `h-10 gap-1.5 rounded-lg border px-4 font-mono duration-200` (mono passa a ser parte do variant, não precisa mais de className manual em cada call site).
- `components/ui/shimmer-button.tsx`: `h-11`/`px-5` → `h-10`/`px-4` (permanece com `border-border` e `rounded-lg` via `--radius` já sincronizados).
- `components/sections/hero-section.tsx` e `components/sections/contact-section.tsx`: remove `className="font-mono"` manual dos `<Button size="cta">` (agora redundante, o variant já aplica).

## Decisões
- Variante "primária" = `variant="default"` (laranja/`bg-primary`, preenchida). "Secundária" = `variant="outline"` (zinc com borda via `--border`/`--input`) — NÃO a variante `secondary` do cva (essa é teal/`bg-secondary`, papel visual diferente, usada em badges/acentos, não faz parte desta unificação de 3 variantes de CTA). "Ghost" = `variant="ghost"` (sem preenchimento nem borda).
- `min-h-[82vh]` só garante altura mínima — em telas muito baixas o `py-16` residual dá respiro sem cortar conteúdo (mesma lição documentada na tarefa 016 sobre `vh` puro ser frágil em paisagem mobile).

## Critérios de aceite
- [x] Os 3 botões reais da página (Hero outline CTA, Hero ShimmerButton, Contato submit) medem `h-10`/`px-4`/`rounded-lg` idênticos (teste Playwright com `boundingBox()`/computed style).
- [x] CTA da Hero visível sem scroll em 1920x1080, 1440x900 e 390x844 (teste Playwright, não estimativa).
- [x] `bunx tsc --noEmit && bun run lint && bun run build` limpos.
- [x] Suíte e2e completa (nav-dock + novo spec desta tarefa) passa.

## Auditoria
Validação independente (QA separado da implementação), evidência real coletada nesta sessão:

- **Hero `min-h-[82vh]`**: lido `components/sections/hero-section.tsx` linha a linha. Confirmado `className="relative flex min-h-[82vh] items-center justify-center overflow-hidden px-6 py-16 scroll-mt-14"` (l.13) — não há mais `min-h-[90vh]` nem `py-24 md:py-32 lg:py-40`, `flex items-center justify-center` mantido pra centralização vertical.
- **`Button` size `cta`**: lido `components/ui/button.tsx` l.34 — `cta: "h-10 gap-1.5 rounded-lg border px-4 font-mono duration-200"`, exatamente como especificado (sem `h-11`/`px-5`, `font-mono` agora embutido no variant).
- **`ShimmerButton`**: lido `components/ui/shimmer-button.tsx` l.57 — classes base incluem `flex h-10 ... px-4 text-sm font-medium ... border border-border` (sem `h-11`/`px-5`).
- **Remoção de `className="font-mono"` redundante**: `grep -n 'size="cta"' -A2` em `hero-section.tsx` e `contact-section.tsx` confirma que nenhum `<Button size="cta">` carrega `className="font-mono"` manual — só o `<ShimmerButton className="font-mono">` na Hero (l.45), que é esperado, pois `ShimmerButton` não embute `font-mono` nas próprias classes (usa `text-sm font-medium`) e depende do className externo.
- **3 papéis de botão distintos**: `ShimmerButton href="#projetos"` (Hero, preenchido laranja via `background: var(--primary)`) = primária; `<Button variant="outline" size="cta">` (Hero, "Ler Logs Técnicos") = secundária (zinc/`border-border`+`bg-background`); `<Button type="submit" size="cta">` no formulário de contato usa o `defaultVariants.variant = "default"` do cva (preenchido laranja, `bg-primary`) — coerente com "submit" ser uma ação primária de conclusão de fluxo. `grep -rn 'variant="secondary"' components/sections/ components/ui/shimmer-button.tsx` não retornou nenhuma ocorrência — a variante `secondary` (teal) do cva não é usada em nenhum CTA real, só reservada pra badges/acentos como documentado nas Decisões.
- **`bunx tsc --noEmit`**: exit 0, sem output de erro.
- **`bun run lint`**: `eslint` via bun run, exit 0, sem warnings/erros.
- **`bun run build`**: `next build` (Turbopack 16.3.4) — "Compiled successfully in 696ms", TypeScript check "Finished TypeScript in 3.5s", 6 rotas estáticas geradas (`/`, `/_not-found`, `/icon`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`), exit 0.
- **Suíte Playwright**: dev server já ativo em `http://localhost:3001` (confirmado via `curl -s http://localhost:3001/` retornando `<title>Gabriel Motta Leite // Analista de Dados &amp; Analytics Engineer</title>`, ou seja é o app real, não outro processo). Rodado `PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test` contra esse server: **8 passed** (11.8s) — os 4 testes de `tests/e2e/nav-dock.spec.ts` (TopBar, FloatingDock 7 itens + navegação, tooltip hover, toggle de tema) e os 4 de `tests/e2e/hero-buttons.spec.ts`: 1 teste de anatomia dos 3 botões reais (`boundingBox().height ≈ 40px`, `paddingLeft: "16px"`, `borderRadius: "12px"` via `getComputedStyle`, iterando sobre `ShimmerButton`/`Button outline`/`submit`) + 3 testes de viewport ("CTA visível sem scroll" em `1920x1080`/`1440x900`/`390x844`, via `toBeInViewport()` no link "Ver Infraestrutura"). Nenhum teste falhou, nenhum foi pulado.

CONVERGE.
