# 017 — Navegação flutuante & profundidade visual
Fase: 9 (refatoração sênior — pilar 1)
Status: concluída

## Objetivo
Adicionar navegação persistente (Dock inferior + TopBar) que hoje não existe (página era single-scroll sem chrome de navegação), e um background com profundidade (dot-grid) somado ao noise existente.

## Arquivos afetados
- Novo: `components/floating-dock.tsx`, `components/top-bar.tsx`, `components/background-grid.tsx`, `components/ui/tooltip.tsx`
- `app/layout.tsx`: monta TopBar/FloatingDock/BackgroundGrid, remove `<ThemeToggle />` standalone
- `components/sections/hero-section.tsx`: adiciona `id="home"` (não existia âncora pra "Home")

## Decisões
- Tooltip via `@base-ui/react/tooltip` (confirmado disponível no node_modules) — consistente com `dialog.tsx`/`button.tsx`/`badge.tsx`, que já usam Base UI em vez de Radix.
- Ícone de tema migra do `ThemeToggle` fixo (`top-4 right-4`) pra dentro do Dock — evita chrome flutuante duplicado.
- Links de GitHub/LinkedIn do Dock reusam as mesmas URLs já usadas em `components/footer.tsx` (não duplica constante — importa de um único local; se `footer.tsx` não exporta, extraio pra `lib/site.ts`).
- Dock/TopBar são Client Components (`motion`, `useTheme`, `usePathname` potencialmente).

## Critérios de aceite
- [x] Dock fixo `bottom-6 inset-x-0 mx-auto w-max`, spring `{stiffness:300, damping:20}`, fundo `bg-zinc-950/75 border border-zinc-800/80 backdrop-blur-md`.
- [x] 7 itens no dock: Home, Experiência, Projetos, Contato, GitHub, LinkedIn, Tema — todos os hrefs resolvem pra âncoras/URLs reais.
- [x] Tooltip aparece no hover E no focus de cada ícone (a11y via teclado).
- [x] TopBar com logo `<GM />`, badge "Available for new roles" com dot pulsante, nav por âncora.
- [x] `prefers-reduced-motion: reduce` desativa spring/pulse (reaproveita padrão já existente em `globals.css`).
- [x] Build (`bunx tsc --noEmit && bun run lint && bun run build`) limpo.
- [x] Teste Playwright (tarefa 018) cobre presença + navegação do dock/topbar.

## Auditoria
Validação independente (QA separado da implementação), evidência real coletada nesta sessão:

- **Dock — classes/spring/fundo**: lido `components/floating-dock.tsx` linha a linha. Confirmado `className="fixed inset-x-0 bottom-6 z-50 mx-auto w-max"` (l.110), `transition={{ type: "spring", stiffness: 300, damping: 20 }}` (l.109), e o container interno com `rounded-2xl border border-zinc-800/80 bg-zinc-950/75 px-2 py-2 shadow-lg backdrop-blur-md` (l.112) — bate exatamente com o critério.
- **7 itens + hrefs reais**: `DOCK_LINKS` tem 6 entradas (Home `#home`, Experiência `#experiencia`, Projetos `#projetos`, Contato `#contato`, GitHub via `GITHUB_URL`, LinkedIn via `LINKEDIN_URL`, ambas de `lib/site.ts`) + `ThemeDockButton` separado = 7 ícones renderizados. Confirmado com `grep -n 'id="'` que `id="home"` existe em `hero-section.tsx:15`, `id="experiencia"` em `experience-timeline-section.tsx:12`, `id="projetos"` em `projects-section.tsx:13`, `id="contato"` em `contact-section.tsx:36`. `GITHUB_URL`/`LINKEDIN_URL` em `lib/site.ts` apontam pra `https://github.com/devgmotta` e `https://linkedin.com/in/devgmotta` (mesmas URLs do footer, sem duplicação de constante).
- **Tooltip hover + focus**: os 4 testes de `tests/e2e/nav-dock.spec.ts` cobrem hover; focus via teclado **não** estava coberto pela suíte, então escrevi um spec Playwright temporário (`tests/e2e/_tmp-focus-check.spec.ts`, apagado depois de rodar — não faz parte do repo) que faz `.focus()` no link "Projetos" do dock e espera o texto do tooltip aparecer. Rodou contra o dev server real (`PLAYWRIGHT_BASE_URL=http://localhost:3001`): **1 passed**. Comportamento de foco vem de `@base-ui/react/tooltip`, que dispara o popup em foco de teclado por padrão (mesma lib usada por `dialog.tsx`/`button.tsx`/`badge.tsx`), confirmado empiricamente, não por suposição.
- **TopBar**: lido `components/top-bar.tsx` — logo `GM` em link `href="#home"` (l.11-17), badge `"Available for new roles"` com `<span className="... animate-pulse rounded-full bg-secondary" />` (l.19-25), nav por âncora com `#experiencia`/`#projetos`/`#contato` (l.27-40).
- **`prefers-reduced-motion: reduce`**: `app/globals.css` l.220-229 zera `.animate-pulse` (cobre o dot da TopBar) via `@media (prefers-reduced-motion: reduce)`. O spring do Dock é JS-driven (`motion`), coberto por `MotionConfig reducedMotion="user"` em `components/motion-provider.tsx`; confirmado em `app/layout.tsx` que `<TopBar />`, `<FloatingDock />` e `{children}` estão todos dentro de `<MotionProvider>` (l.78-83).
- **`ThemeToggle` standalone removido**: `ls components/theme-toggle.tsx` → "No such file or directory"; `grep -rn "theme-toggle"` no projeto (fora de `node_modules`) não retornou nenhuma referência. `git status --short` confirma `D components/theme-toggle.tsx`.
- **Build**: `bunx tsc --noEmit` → exit 0, sem output de erro. `bun run lint` → `eslint` limpo, exit 0. `bun run build` → `next build` (Turbopack) compilou com sucesso, gerou 6 rotas estáticas (`/`, `/_not-found`, `/icon`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`), exit 0.
- **Cobertura Playwright**: os 4 testes de `tests/e2e/nav-dock.spec.ts` (ver auditoria da tarefa 018) cobrem presença da TopBar/Dock e navegação por âncora — todos passaram de verdade contra o app real.

CONVERGE.
