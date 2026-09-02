# 023 — README.md técnico completo
Fase: 9 (refatoração sênior — pilar 5)
Status: concluída

## Objetivo
Substituir o README (real, mas sem arquitetura/diretórios/taxonomia/testes documentados) por uma versão que cobre: resumo arquitetural, diagrama de diretórios + convenção de rotas, tabela de env vars, tabela de Taxonomia Técnica (cada item de `data/stack.ts` → aplicação real no portfólio) e comandos (incluindo `bun test` e `bun run test:e2e`, novos desde as tarefas 018/022).

## Arquivos afetados
- `README.md` (reescrito).

## Decisões
- Tabela de env vars gerada a partir de um grep real de `process.env.` no código (3 usages: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `RESEND_API_KEY`) — não reescrita de memória.
- Tabela de Taxonomia Técnica mapeia os 24 itens de `data/stack.ts` (tarefa 020) à aplicação real deles no projeto — para os itens que não têm um artefato de código direto neste site Next.js (Python/Pandas/Docker/GitHub Actions etc.), a tabela é honesta sobre o quê exatamente representam aqui (contexto do case study, referência de processo, ou ferramental fora do runtime do site) em vez de forçar uma alegação de uso que não existe.
- Seção de testes documenta as DUAS camadas reais (`bun test` unitário + `bun run test:e2e` Playwright), incluindo a ressalva sobre `PLAYWRIGHT_BASE_URL` (Next.js recusa 2ª instância de dev server do mesmo projeto — problema real encontrado durante as tarefas 018-021).

## Critérios de aceite
- [x] Tabela de env vars bate 1:1 com o grep real de `process.env.` no repo.
- [x] Tabela de Taxonomia Técnica cobre os 24 itens de `data/stack.ts`.
- [x] Todo comando documentado existe em `package.json["scripts"]` e roda sem erro.
- [x] Diagrama de diretórios reflete a estrutura real (`find app components data lib tests -type f`).
- [x] Nenhuma alegação de stack desatualizada (ex.: "backend Express" como algo atual — já foi substituído, README deve deixar isso claro como histórico).

## Auditoria
Terceira rodada de validação independente (QA separado da implementação), evidência real coletada nesta sessão — nenhuma alegação de "está pronto" foi aceita sem verificação.

**Histórico das duas rodadas anteriores (confirmado, não apenas citado):**
- **1ª rodada — FALHOU**: `bun test` bruto (sem argumento) quebrava porque o runner nativo do Bun casa `*.spec.ts` por padrão e tentava executar `tests/e2e/*.spec.ts` (specs Playwright, incompatíveis com `test.describe()` do Bun). Fix registrado no addendum de `tarefas/concluidas/022-refinamento-template-email.md`: `bunfig.toml` com `[test] pathIgnorePatterns = ["tests/e2e/**"]`. **Verificado nesta rodada**: `cat bunfig.toml` confirma o arquivo existe com exatamente esse conteúdo; `bun test` (comando bruto, sem path) → `bun test v1.3.13` → **4 pass, 0 fail, 11 expect() calls**, "Ran 4 tests across 1 file" — só roda `lib/email-templates/contact-email.test.ts`, não toca `tests/e2e/`. Fix confirmado funcional, não apenas presente.
- **2ª rodada — FALHOU**: seção "Estrutura de diretórios" omitia `components/project-card.tsx` e `components/tech-icon.tsx`, e afirmava que TODO o chrome global listado (incluindo `footer.tsx`/`noise-overlay.tsx`) era montado em `app/layout.tsx`, quando na verdade esses dois são montados em `app/page.tsx`. **Verificado nesta rodada**: `find app components data lib tests -type f \( -name "*.ts" -o -name "*.tsx" \)` lista 34 arquivos; todo arquivo/diretório de `components/` tem correspondência no README atual — `project-card.tsx`/`tech-icon.tsx` agora aparecem explicitamente como "Componentes de conteúdo usados dentro das sections" (README l.32). `grep -n "from \"@/components" app/layout.tsx` retorna exatamente `background-grid`, `floating-dock`, `motion-provider`, `theme-provider`, `top-bar` (5 imports) — bate 1:1 com a lista do README rotulada "Chrome global montado em app/layout.tsx" (l.33-34). `grep -n "from \"@/components" app/page.tsx` retorna `footer`, `noise-overlay` + as 5 sections — o README rotula `footer.tsx, noise-overlay.tsx` separadamente como "Chrome montado em app/page.tsx (só aparece na home, não nas subpáginas)" (l.35), tecnicamente correto agora. Nenhum componente órfão: `case-study/`, `sections/`, `ui/` também descritos (l.29-31).

**Critérios desta rodada (evidência nova, coletada agora):**
- **Env vars**: `grep -rn "process\.env\." --include="*.ts" --include="*.tsx" app lib components data` retorna exatamente 3 ocorrências — `app/actions/contact.ts:58` (`RESEND_API_KEY`), `lib/site.ts:7` (`NEXT_PUBLIC_SITE_URL`), `lib/site.ts:20` (`NEXT_PUBLIC_GA_MEASUREMENT_ID`). A tabela do README (l.90-96) lista exatamente essas 3 variáveis, nenhuma a mais nem a menos.
- **Taxonomia Técnica**: `data/stack.ts` lido por completo — array `TECH_STACK` tem 24 objetos (ids: sql, gcp, bigquery, cloud-storage, azure, dbt, dimensional-modeling, postgres, python, pandas, numpy, scikit-learn, stat-viz, jupyter, nextjs, typescript, rest-apis, fastify, github-actions, docker, llm-apis, langchain, workflow-automation, prompt-engineering). Todos os 24 aparecem na tabela do README (l.48-67), seis deles (Python/Pandas/NumPy/Scikit-Learn/Seaborn-Matplotlib/Jupyter-Colab) agrupados numa única linha honesta ("Ferramental de análise/validação de hipótese... não executado no runtime do site") em vez de forçar uma alegação de uso real que não existe — consistente com a decisão registrada na tarefa.
- **Comandos**: todos rodados de verdade nesta sessão, todos exit 0 — `bun test` (4 pass), `bunx tsc --noEmit` (sem output, exit 0), `bun run lint` (`eslint` via bun run, exit 0), `bun run build` (`next build` Turbopack, "Compiled successfully in 704ms", 8 rotas geradas, exit 0). Todos os comandos documentados na tabela "Scripts" (l.100-108) existem em `package.json["scripts"]` (`dev`, `build`, `start`, `lint`, `test`, `test:e2e`) ou são invocações diretas documentadas corretamente como `bunx` (`tsc --noEmit`).
- **Express**: `grep -rn -i "express"` em todo o código-fonte (excluindo `node_modules`/`.git`) não encontra nenhuma ocorrência atual — o único vestígio é histórico, em `tarefas/concluidas/015-contato-server-action-resend.md:6` ("Substituir o backend Express antigo... por uma Server Action nativa"). O README menciona Express só na seção Arquitetura (l.12: "Server Action + Resend substitui o backend Express de uma versão anterior do projeto") e na Taxonomia Técnica associa Fastify/Node.js a "Runtime de referência para o backend que este projeto substituiu" — ambas as menções são inequivocamente históricas (tempo verbal de substituição, "versão anterior"), nunca apresentadas como stack atual.
- **Dev server + Playwright**: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/` → `200` (dev server já ativo, confirmado via `ps aux`: processos `next dev`/`next-server` rodando). `PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test` → **16 passed** (22.6s) — 4 `case-study.spec.ts`, 4 `hero-buttons.spec.ts`, 4 `nav-dock.spec.ts`, 4 `skills-matrix.spec.ts`, zero falhas/skips.

Todos os critérios de aceite verificados com evidência real de comando/grep/leitura de arquivo nesta sessão — nenhum reaproveitado de memória ou de alegação de rodada anterior sem reconfirmação.

CONVERGE.
