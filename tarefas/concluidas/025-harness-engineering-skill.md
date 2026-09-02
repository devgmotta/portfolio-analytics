# 025 — Item de Harness Engineering na matriz de competências
Fase: 10 (pós-refatoração, pedido do usuário)
Status: concluída

## Objetivo
O item de SDD (tarefa 024) mencionava "harness agêntico (Claude Code)" só como parênteses dentro da nota — o usuário pediu explicitamente pra garantir que "Harness Engineering" (orquestração de agentes de IA) estivesse representado como competência própria, distinta de Spec-Driven Development (metodologia) e Prompt Engineering (técnica pontual).

## Arquivos afetados
- `data/stack.ts`: novo item `harness-engineering` (cluster `ai-engineering`, ícone `Bot`); nota do item `sdd-harness` reescrita pra focar só na metodologia (o "harness agêntico" saiu de lá, virou o item novo).
- `tests/e2e/skills-matrix.spec.ts`: teste do SDD atualizado pro novo texto da nota; novo teste pro item de Harness Engineering.
- `README.md`: linha nova na tabela de Taxonomia Técnica; linha do SDD ajustada.

## Decisões
- Harness Engineering ≠ Spec-Driven Development: SDD é a metodologia (spec antes do código, critérios de aceite mensuráveis); Harness Engineering é a competência de orquestrar os agentes que executam e validam essa metodologia (o padrão usado nesta própria sessão: um agente implementa, outro agente de QA — separado, sem contexto da implementação — valida com evidência real antes de qualquer tarefa virar "concluída"). Duas competências reais e distintas, não duplicação.
- Ícone `Bot` (lucide) — sem marca específica pra representar "orquestração de agentes", ícone semântico é a opção correta (mesmo raciocínio já usado pra SQL/Cloud Storage/Modelagem).

## Critérios de aceite
- [x] Item "Harness Engineering" aparece no cluster AI-Assisted Engineering & Automação com tooltip descrevendo orquestração de agentes com validação independente.
- [x] Nota do item de SDD não menciona mais "harness agêntico" (responsabilidade migrou pro item novo, sem duplicar a mesma frase em dois lugares).
- [x] `bunx tsc --noEmit && bun run lint && bun run build && bun test` limpos.
- [x] Suíte e2e completa passa (19 testes: 16 anteriores + 1 renomeado/atualizado do SDD + 1 novo do Harness Engineering — na prática 19 no total, já que o teste do SDD foi editado, não duplicado).

## Auditoria
Validação independente (QA separado da implementação), evidência real coletada nesta sessão — nenhuma alegação de "está pronto" foi aceita sem verificação.

**Comandos (todos rodados de verdade, todos exit 0):**
- `bunx tsc --noEmit` → sem output, exit 0.
- `bun run lint` → `eslint` via bun run, sem erros, exit 0.
- `bun run build` → `next build` (Turbopack), TypeScript ok, 8 rotas estáticas geradas (`/`, `/_not-found`, `/icon`, `/opengraph-image`, `/projetos/call-center-analytics`, `/robots.txt`, `/sitemap.xml`), exit 0.
- `bun test` → `4 pass, 0 fail, 11 expect() calls`, exit 0.

**`data/stack.ts`** (lido por completo, linhas 253-266 conferidas):
- `grep -n "harness agêntico" data/stack.ts` → **zero ocorrências** — a frase não aparece mais em lugar nenhum do arquivo (nem no item novo, nem no de SDD); o item novo descreve a competência com texto próprio, sem reusar a frase antiga.
- Item `sdd-harness` (linha 254-259): `name: "Spec-Driven Development"`, `cluster: "ai-engineering"`, `icon: { kind: "lucide", Icon: ListChecks }`, `note: "Cada mudança nasce como uma tarefa com objetivo e critérios de aceite mensuráveis antes de qualquer código (ver tarefas/ deste portfólio)."` — foco exclusivo na metodologia, sem menção a agentes/harness.
- Item novo `harness-engineering` (linha 261-266): `name: "Harness Engineering"`, `cluster: "ai-engineering"`, `icon: { kind: "lucide", Icon: Bot }`, `note: "Orquestração de agentes de IA (Claude Code) com validação independente — cada entrega deste portfólio passa por um agente de QA separado do agente que implementou, sem aceitar alegação sem evidência real."` — cluster e ícone corretos, nota descreve exatamente a orquestração de agentes com validação independente.
- `Bot` importado de `lucide-react` no topo do arquivo (linha 2), confirmado.

**`README.md`** (`sed -n '55,72p'` conferido):
- Linha nova: `| | Harness Engineering | Orquestração de agentes (Claude Code): cada tarefa deste repo é implementada por um agente e validada por outro, separado, que não aceita "está pronto" sem evidência real |`.
- Linha do SDD ajustada: `| | Spec-Driven Development | O processo tarefas/pendentes/ → validação independente → tarefas/concluidas/ deste repo É o SDD em prática — cada tarefa nasce com objetivo e critérios de aceite mensuráveis antes do código |` — não menciona mais "harness agêntico", frase migrou pra linha do Harness Engineering.
- `grep -n "harness agêntico" README.md` confirma zero ocorrências no arquivo.

**Dev server + Playwright**: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/` → `200` (dev server ativo). `PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test` → **19 passed**, zero falhas, zero skips, 35.0s. Confirmados nominalmente entre os 19: `skills-matrix.spec.ts:76` "tooltip de contexto aparece no hover do item de Spec-Driven Development" (teste renomeado/atualizado) e `skills-matrix.spec.ts:85` "tooltip de contexto aparece no hover do item de Harness Engineering" (teste novo) — ambos passando.

Todos os critérios de aceite verificados com evidência real de comando/grep/leitura de arquivo nesta sessão.

CONVERGE.
