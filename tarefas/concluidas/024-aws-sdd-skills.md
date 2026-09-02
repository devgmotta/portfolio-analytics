# 024 — AWS na matriz cloud + item de Spec-Driven Development
Fase: 10 (pós-refatoração, pedido do usuário)
Status: concluída

## Objetivo
Pedido do usuário: incluir AWS na matriz de competências (reforça a narrativa "cloud agnóstica" já existente nos tooltips de equivalência) e um item de Desenvolvimento Spec-Driven (SDD) com harness agêntico (Claude Code) no cluster de AI-Assisted Engineering — processo usado neste próprio portfólio (`tarefas/`).

## Arquivos afetados
- `data/stack.ts`: campo `equivalents?: string` renomeado pra `note?: string` (deixa de ser só "equivalência de cloud" — agora também carrega contexto geral, ex. o item de SDD); novo item `aws` (cluster `data-cloud`, badge mono "AWS", `note` fechando o triângulo de equivalência com GCP/Azure); novo item `sdd-harness` (cluster `ai-engineering`, ícone `ListChecks`).
- `components/sections/skills-matrix-section.tsx`: `item.equivalents` → `item.note`.
- `tests/e2e/skills-matrix.spec.ts`: novo teste de tooltip pro item AWS e pro item de SDD.
- `README.md`: tabela de Taxonomia Técnica ganha as 2 linhas novas.

## Decisões
- Ícone do AWS: não existe em `react-icons/si` nesta versão instalada (confirmado antes de usar, mesmo padrão já documentado pra dbt/Power BI/Azure) — badge `mono` "AWS", consistente com o badge "AZ" do Azure.
- Renomeei `equivalents` pra `note` em vez de manter o nome só pra caber o item de SDD — um campo chamado "equivalents" com um texto sobre metodologia de desenvolvimento seria semanticamente errado pra quem ler o código depois.
- O `note` do item de SDD cita só este portfólio como evidência pública do processo (não cita outros projetos do usuário por nome — trabalho profissional sob termo de sigilo não entra em conteúdo público).

## Critérios de aceite
- [x] Item "AWS" aparece no cluster Modern Data Stack & Cloud Agnóstica com tooltip de equivalência (hover/focus).
- [x] Item de SDD aparece no cluster AI-Assisted Engineering & Automação, mencionando o harness usado neste portfólio.
- [x] Nenhum item antigo perdeu seu tooltip na renomeação do campo (GCP/BigQuery/Cloud Storage/Azure continuam com `note` preenchido).
- [x] `bunx tsc --noEmit && bun run lint && bun run build` limpos.
- [x] Suíte e2e completa passa (incluindo os novos testes do AWS e do SDD).

## Auditoria
Validação independente (QA separado da implementação), evidência real coletada nesta sessão — nenhuma alegação de "está pronto" foi aceita sem verificação.

**Comandos (todos rodados de verdade, todos exit 0):**
- `bunx tsc --noEmit` → sem output, exit 0.
- `bun run lint` → `eslint` via bun run, sem erros, exit 0.
- `bun run build` → `next build` (Turbopack), TypeScript ok, 8 rotas estáticas geradas (`/`, `/_not-found`, `/icon`, `/opengraph-image`, `/projetos/call-center-analytics`, `/robots.txt`, `/sitemap.xml`), exit 0.
- `bun test` → `4 pass, 0 fail, 11 expect() calls`, exit 0.

**`data/stack.ts`** (lido por completo, `git diff` conferido):
- Campo renomeado de `equivalents?: string` para `note?: string` na interface `TechStackItem` — JSDoc atualizado explicando o uso duplo (equivalência de cloud + contexto geral como SDD).
- `grep -rn "equivalents" data/ components/` → **zero ocorrências** (exit code 1, sem match).
- Item novo `aws`: `cluster: "data-cloud"`, `icon: { kind: "mono", label: "AWS" }`, `note: "Redshift / S3 (AWS) • Equivalente: BigQuery+GCS (GCP) / Synapse+Blob (Azure)"` — menciona Redshift/S3 e fecha o triângulo de equivalência com GCP/Azure, como exigido.
- Item novo `sdd-harness`: `cluster: "ai-engineering"`, `name: "Spec-Driven Development"`, `note: "Desenvolvimento orientado a spec com harness agêntico (Claude Code) — processo documentado neste próprio portfólio (ver tarefas/)."` — menciona harness agêntico/Claude Code, como exigido.
- Itens antigos (`gcp`, `bigquery`, `cloud-storage`, `azure`): `git diff` confirma que o texto de cada um é **byte-idêntico** ao anterior (só a chave mudou de `equivalents:` para `note:`) — nenhum texto de tooltip foi alterado ou perdido.

**`components/sections/skills-matrix-section.tsx`**: `git diff` confirma `item.equivalents` → `item.note` nas duas ocorrências (`if (!item.note)` e `{item.note}` no `TooltipContent`). `grep -rn "equivalents" data/ components/` (rodado acima) já cobre este diretório também — zero ocorrências.

**`README.md`**: `git diff -- README.md` mostra as 2 linhas novas na tabela de Taxonomia Técnica — uma para "AWS" ("Fecha o triângulo de equivalência cloud (tooltip) junto com GCP/Azure — Redshift/S3 como contraparte de BigQuery+GCS/Synapse+Blob") e uma para "Spec-Driven Development" ("O processo `tarefas/pendentes/` → validação independente → `tarefas/concluidas/` deste repo É o SDD com harness agêntico (Claude Code) em prática").

**Dev server + Playwright**: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/` → `200` (dev server ativo). `PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test` → **18 passed** — os 16 testes das tarefas anteriores + os 2 novos: "tooltip de equivalência aparece no hover do item AWS" e "tooltip de contexto aparece no hover do item de Spec-Driven Development", ambos passando. Zero falhas, zero skips.

Todos os critérios de aceite verificados com evidência real de comando/diff/grep nesta sessão.

CONVERGE.
