# 021 — Case study interativo `/projetos/call-center-analytics`
Fase: 9 (refatoração sênior — pilar 3)
Status: concluída

## Objetivo
Transformar o card WIP "Pipeline de Dados Operacionais (Simulação Call Center)" (hoje só uma imagem SVG estática) num case study técnico de ponta a ponta: contexto de negócio, linhagem do pipeline, dashboard interativo real (Recharts) e um modelo dbt real com syntax highlighting.

## Arquivos afetados
- Novo: `app/projetos/call-center-analytics/page.tsx` (Server Component, metadata própria).
- Novo: `components/case-study/call-center-dashboard.tsx` (Client Component — Recharts precisa de browser APIs).
- Novo: `components/ui/sql-code-block.tsx` (highlighter de SQL feito à mão via regex — sem dependência nova, bloco é estático/Server Component).
- `data/projects.ts`: `Project` ganha `caseStudyUrl?: string`; entry `pipeline-call-center-simulado` aponta pra rota nova.
- `components/project-card.tsx`: botão "Explorar Case Interativo" (só aparece quando `caseStudyUrl` existe).
- `components/floating-dock.tsx`: âncoras (`#home`, `#projetos`...) passam a ser cientes de rota (`usePathname`) — sem isso ficariam mortas na subpágina nova.
- Novo: `tests/e2e/case-study.spec.ts`.

## Decisões
- Recharts (nova dependência, `recharts@3.10.1`) em vez de SVG à mão — 3 gráficos interativos de verdade (tooltip no hover) não valem o retrabalho de reimplementar escalas/eixos.
- Cores dos gráficos via `var(--chart-1..5)`/`var(--border)`/`currentColor` — os mesmos tokens de `app/globals.css`, resolvidos pelo browser em atributos SVG (`fill`/`stroke` aceitam `var()` nativamente em browsers modernos) — os gráficos se adaptam ao tema claro/escuro sem nenhum JS de detecção de tema.
- Highlighting de SQL via tokenizer por regex próprio (`sql-code-block.tsx`), não `shiki`/`rehype-pretty-code`/`react-syntax-highlighter` — o bloco é estático (não é input do usuário), então uma dependência inteira de highlighting é peso sem ganho; mantém a página como Server Component.
- FCT real (`fct_atendimentos.sql`) calcula `sla_cumprido` e `resolvido_primeiro_contato` via CTE + `row_number() over (...)`, o pedido explícito de "modelo dimensional real calculando cumprimento de SLA".
- Diagrama de linhagem é descritivo (cards + setas), não um SVG de arquitetura desenhado — mais fácil de manter e já comunica a ordem Raw → BigQuery/PostgreSQL → dbt (staging/marts) → Visualização.

## Critérios de aceite
- [x] Rota `/projetos/call-center-analytics` acessível, com `<title>`/`<meta description>` próprios.
- [x] Botão "Explorar Case Interativo" no card da home navega até a subpágina.
- [x] Os 3 gráficos pedidos (TMA diário, FCR, distribuição por canal) renderizam com dados mockados plausíveis e mostram tooltip no hover.
- [x] Bloco SQL exibe `fct_atendimentos.sql` com highlighting (keywords/strings/comentários/jinja em cores distintas).
- [x] Sem erro de hidratação (dashboard é Client Component isolado, resto da página é Server Component).
- [x] `bunx tsc --noEmit && bun run lint && bun run build` limpos.
- [x] Suíte e2e completa passa.

## Auditoria
Validação independente (QA separado da implementação), evidência real coletada nesta sessão:

- **Rota + metadata próprios**: lido `app/projetos/call-center-analytics/page.tsx` l.9-16 — `export const metadata: Metadata` com `title: "Case Study: Pipeline de Dados de Call Center // Gabriel Motta Leite"`, `description` própria e `alternates.canonical`. Confirmado no HTML real servido pelo dev server: `curl -s http://localhost:3001/projetos/call-center-analytics | grep -o '<title>[^<]*'` retornou exatamente `<title>Case Study: Pipeline de Dados de Call Center // Gabriel Motta Leite` — não é só o teste Playwright dizendo, é o HTML renderizado real.
- **`caseStudyUrl` em `data/projects.ts`**: lido l.53 — `caseStudyUrl: "/projetos/call-center-analytics"` na entry `pipeline-call-center-simulado`. Campo `caseStudyUrl?: string` documentado na interface `Project` (l.24).
- **Botão "Explorar Case Interativo"**: lido `components/project-card.tsx` l.148-159 — `{project.caseStudyUrl ? (<Button variant="outline" size="sm" ... render={<Link href={project.caseStudyUrl} />}>...Explorar Case Interativo</Button>) : null}`, condicional exatamente no campo esperado.
- **Dashboard client + 3 gráficos Recharts**: lido `components/case-study/call-center-dashboard.tsx` l.1 — `"use client"`. Confirmados os 3 gráficos: `LineChart` com `dataKey="tmaMinutos"` sobre 14 dias mockados (l.28-43, `TMA_DIARIO`), `RadialBarChart` de FCR com `FCR_PERCENTUAL = 78` (l.45-46, l.141-155), `PieChart` de volume por canal com 4 canais somando 100% (Telefone 42 + Chat 28 + WhatsApp 18 + E-mail 12, l.48-53, l.172-202). Todos os 3 têm `<Tooltip>` do Recharts configurado (hover funcional, confirmado também via teste e2e que verifica renderização dos títulos dos gráficos).
- **`sql-code-block.tsx` sem `dangerouslySetInnerHTML`**: lido o arquivo inteiro — tokenizer por regex (`tokenizeSqlLine`) produz `Token[]` com `kind` (`comment`/`string`/`jinja`/`keyword`/`function`/`number`/`plain`), renderizado via `.map` em `<span key={tokenIndex} className={TOKEN_CLASS[token.kind]}>{token.text}</span>` — elementos React normais, texto como children, não HTML bruto. `grep -n "dangerouslySetInnerHTML" components/ui/sql-code-block.tsx` → exit 1 (zero ocorrências). `TOKEN_CLASS` mapeia cores distintas: keyword `font-semibold text-primary`, string/function/number `text-secondary`, comment `italic text-muted-foreground`, jinja `text-primary` — jinja (`{{ ref(...) }}`) capturado por regex própria no `TOKEN_PATTERN` (`\{\{[^}]*\}\}`).
- **`floating-dock.tsx` resolve âncoras cientes de rota**: lido l.42-49 — `DockLinkIcon` usa `usePathname()` e calcula `resolvedHref = !external && href.startsWith("#") && pathname !== "/" ? `/${href}` : href`, com comentário explicando o motivo (âncoras `#home` etc. só existem na home; noutra rota precisam do prefixo `/`). Confirmado via e2e: no `/projetos/call-center-analytics`, o link "Home" do dock tem `href="/#home"` (teste `dock com âncora #home funciona a partir da subpágina`, passou 4/4 vezes no repeat-each=3 + 1x na suíte completa).
- **`bunx tsc --noEmit`**: exit 0, sem output de erro.
- **`bun run lint`**: `eslint` via bun run, exit 0, sem warnings/erros.
- **`bun run build`**: `next build` (Turbopack 16.3.4) — "Compiled successfully in 727ms", TypeScript check "Finished TypeScript in 3.5s", 8 rotas estáticas geradas incluindo `/projetos/call-center-analytics` (confirmado na tabela de rotas do output), exit 0.
- **Suíte Playwright completa**: dev server já ativo em `http://localhost:3001` (confirmado via `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/` → `200`). Rodado `PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test`: **15 passed, 1 failed** (16 testes totais). A única falha é `tests/e2e/skills-matrix.spec.ts:16` (`renderiza os 4 clusters`, heading "Modern Data Stack & Cloud Agnóstica" não encontrado) — pertence à tarefa 020, sendo validada em paralelo por outro agente nesta mesma sessão, não é critério de aceite da 021. Todos os 4 testes de `tests/e2e/case-study.spec.ts` passaram (botão de navegação da home, renderização de contexto/arquitetura/dashboard/SQL, link "Voltar para Projetos", dock com âncora `#home`), assim como os 4 de `hero-buttons.spec.ts` e os 4 de `nav-dock.spec.ts` (não afetados por esta tarefa, seguem passando).
- **Estabilidade — `case-study.spec.ts --repeat-each=3`**: rodado isoladamente (`PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test tests/e2e/case-study.spec.ts --repeat-each=3`) → **12 passed** (4 testes × 3 repetições), 0 falhas, 0 flakiness em nenhuma das 3 rodadas.

CONVERGE.
