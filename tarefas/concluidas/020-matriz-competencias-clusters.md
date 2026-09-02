# 020 — Matriz de competências em 4 clusters + tooltips de equivalência cloud
Fase: 9 (refatoração sênior — pilar 2)
Status: concluída

## Objetivo
Substituir o marquee único de stack (`StackMarqueeSection`, 8 itens sem categorização) por uma grade estruturada em 4 clusters de domínio (Modern Data Stack & Cloud Agnóstica, Data Science & EDA, Engenharia de Software & APIs, AI-Assisted Engineering & Automação), com tooltip de equivalência arquitetural nos itens de cloud (BigQuery, Cloud Storage, Azure).

## Arquivos afetados
- `data/stack.ts`: reescrito — `TechStackItem` ganha `cluster: SkillCluster` e `equivalents?: string`; novo `SKILL_CLUSTERS` (título + sinal pro recrutador por cluster); stack expandida de 8 pra 24 itens (8/6/6/4 por cluster).
- `components/tech-icon.tsx`: ganha prop opcional `className` (override de tamanho — `size-8` no marquee antigo, `size-4` na matriz nova).
- Novo: `components/sections/skills-matrix-section.tsx`.
- `app/page.tsx`: troca `StackMarqueeSection` por `SkillsMatrixSection`.
- Removidos (órfãos após a troca, sem nenhum outro importador — confirmado via grep): `components/sections/stack-marquee-section.tsx`, `components/ui/marquee.tsx`.
- Novo: `tests/e2e/skills-matrix.spec.ts`.

## Decisões
- Tooltip via `Tooltip`/`TooltipTrigger render={<li .../>}` (mesmo padrão do `Dialog` do projeto — `render` vira o nó DOM real) pra manter `<ul><li>` semanticamente válido (uma versão inicial tinha envolvido o `<li>` num `<div>` trigger, o que quebrava o aninhamento `ul > li`; corrigido antes de comitar).
- Ícones sem logotipo redistribuível em `react-icons/si` nesta versão (dbt, Power BI, Azure) continuam como badge `mono` — confirmado via inspeção do pacote instalado antes de escolher, não por suposição.
- Cluster de IA usa `SiAnthropic` como ícone de "LLMs via API" (existe no pacote instalado, ao contrário de `SiOpenai`).
- Power BI não aparece nesta matriz (fazia parte da proposta inicial de 3 clusters do usuário, substituída pela versão final de 4 clusters) — continua existindo como tag do case study em `data/projects.ts`, sem contradição (são conteúdos diferentes).

## Critérios de aceite
- [x] Os 4 clusters renderizam com título, sinal e os itens especificados.
- [x] Hover E focus nos badges com `equivalents` (GCP, BigQuery, Cloud Storage, Azure) mostram o tooltip com o texto exato de equivalência.
- [x] Badges sem `equivalents` não abrem tooltip (não há trigger vazio).
- [x] `bunx tsc --noEmit && bun run lint && bun run build` limpos.
- [x] Suíte e2e completa (nav-dock + hero-buttons + novo skills-matrix) passa.

## Auditoria
Validação independente (QA separado da implementação), evidência real coletada nesta sessão. Esta tarefa já havia sido validada uma vez antes NESTA MESMA SESSÃO e tinha FALHADO: o teste "tooltip de equivalência aparece no hover de um item de cloud" (hover em BigQuery) falhou de forma reprodutível em 6/6 execuções, porque o `hover()` do Playwright disparava enquanto o card do cluster ainda estava em animação `whileInView` (Motion, opacity/y) e o Base UI Tooltip não abria de forma confiável nesse estado. Desde então, `tests/e2e/skills-matrix.spec.ts` foi corrigido: os 4 testes agora usam a função `settleAfterScroll` (l.10-13), que faz `scrollIntoViewIfNeeded()` + `waitForTimeout(900)` antes de qualquer `hover()`/`focus()`. Esta re-validação repetiu TUDO do zero, sem assumir que o fix funcionou.

- **`data/stack.ts`**: lido o arquivo inteiro (238 linhas). `SKILL_CLUSTERS` tem exatamente 4 chaves com os títulos exigidos: "Modern Data Stack & Cloud Agnóstica", "Data Science & Análise Exploratória", "Engenharia de Software & APIs", "AI-Assisted Engineering & Automação". `TECH_STACK` tem 24 itens: contagem manual por `cluster` — `data-cloud` = 8 (sql, gcp, bigquery, cloud-storage, azure, dbt, dimensional-modeling, postgres), `data-science` = 6 (python, pandas, numpy, scikit-learn, stat-viz, jupyter), `software-apis` = 6 (nextjs, typescript, rest-apis, fastify, github-actions, docker), `ai-engineering` = 4 (llm-apis, langchain, workflow-automation, prompt-engineering) — bate exatamente com 8/6/6/4. `equivalents` presente em exatamente 4 itens, todos no cluster `data-cloud`: `gcp` ("Google Cloud Platform • Equivalente: Azure / AWS"), `bigquery` ("BigQuery (GCP) • Equivalente: Azure Synapse / AWS Redshift"), `cloud-storage` ("Cloud Storage (GCS) • Equivalente: Azure Blob / AWS S3"), `azure` ("Synapse / Fabric / Blob (Azure) • Equivalente: BigQuery+GCS (GCP) / Redshift+S3 (AWS)") — nenhum outro item tem a propriedade.
- **`components/sections/skills-matrix-section.tsx`**: lido o arquivo inteiro. `SkillItem` só envolve o `<li>` em `Tooltip`/`TooltipTrigger render={<li .../>}` quando `item.equivalents` existe (l.39-52); caso contrário retorna `<li>` puro sem trigger (l.40) — confirma "badges sem equivalents não abrem tooltip, sem trigger vazio". `TooltipTrigger` recebe `tabIndex={0}` (l.45), habilitando foco por teclado.
- **`components/tech-icon.tsx`**: confirma prop opcional `className` (l.13-17) que sobrescreve o `size-8` padrão via `cn()`, documentado como usado com `size-4` na matriz.
- **`app/page.tsx`**: importa e renderiza `SkillsMatrixSection` (l.7, l.15); nenhuma referência a `StackMarqueeSection`.
- **Órfãos removidos**: `ls components/sections/stack-marquee-section.tsx components/ui/marquee.tsx` → "No such file or directory" para ambos. `grep -rn "stack-marquee-section|StackMarqueeSection|components/ui/marquee"` em todo o repo (excluindo `node_modules`) → nenhuma ocorrência.
- **`bunx tsc --noEmit`**: exit 0 (rodado 3x ao longo da validação, incluindo uma vez com `.next/cache/.tsbuildinfo` removido pra forçar checagem completa — sempre limpo).
- **`bun run lint`**: `eslint` via bun run, exit 0, sem warnings/erros.
- **`bun run build`**: nota de processo — a primeira e segunda tentativas falharam por motivos alheios à tarefa 020 (conflito de lock com um `next build` concorrente rodado por outro agente validando a tarefa 021 em paralelo no mesmo repo, e em seguida um erro de tipo transiente em `app/actions/contact.ts`/`lib/email-templates/contact-email.test.ts` — arquivos fora do escopo desta tarefa, sendo escritos por esse outro agente durante o build). Após aguardar o processo `next-build` concorrente terminar e reexecutar, o build passou limpo: "Compiled successfully in 761ms", "Finished TypeScript in 7.0s", 8 rotas geradas (`/`, `/_not-found`, `/icon`, `/opengraph-image`, `/projetos/call-center-analytics`, `/robots.txt`, `/sitemap.xml`), exit 0.
- **Dev server**: confirmado ativo em `http://localhost:3001` via `curl -s -o /dev/null -w "%{http_code}"` → `200`.
- **Suíte Playwright completa**: `PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test` → **16 passed** (36.3s) — 4 `case-study.spec.ts` (tarefa 021, fora do escopo desta auditoria, mas todos passaram), 4 `hero-buttons.spec.ts`, 4 `nav-dock.spec.ts`, 4 `skills-matrix.spec.ts` (os 4 critérios desta tarefa: renderiza 4 clusters, tooltip no hover de BigQuery, tooltip no focus de Cloud Storage, Python sem tooltip). Nenhuma falha, nenhum teste pulado.
- **Repetição anti-flakiness do hover**: `PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test tests/e2e/skills-matrix.spec.ts --repeat-each=5` → **20/20 passed** (46.0s), incluindo **5/5** execuções do teste "tooltip de equivalência aparece no hover de um item de cloud" (BigQuery) — 100% de estabilidade, confirmando que o fix com `settleAfterScroll` (scroll + wait de 900ms antes do hover) resolveu de fato a race condition com a animação `whileInView` que causava a falha reprodutível (6/6) na validação anterior.

CONVERGE.
