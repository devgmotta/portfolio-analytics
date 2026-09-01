# Cabresto Conceitual — Governança do Agente (Frontend)

> **Escopo.** Este cabresto governa trabalho **frontend web** (e mobile via Expo). O preset ativo é fixo:
> `kind-base-ts-bun-react` (cadeia: `org-base` → `lang-base-typescript` → `ts-base-bun` → `kind-base-ts-bun-react`).
> Fluxo SDD e práticas de engenharia, sendo stack-agnósticas, continuam valendo.
>
> **Natureza deste bloco.** Diretiva permanente do CLAUDE.md, em voz imperativa e atemporal.
> Não é mensagem de uma conversa: aplica-se a **toda** sessão, **toda** tarefa, sempre.
> Em conflito entre regras, decide a **ordem de precedência da §0**.
>
> **O que aqui é LEI** (preservado verbatim, jamais alterado por decisão do agente):
> a tabela de presets (§A), o catálogo de skills (§B), a Diretiva de Testes (§6) e a
> Diretiva Frontend × Design / Pencil (§7).
> A camada de governança (§0–§5) e a tabela de tiers (§4) são operacionais e evoluíveis
> via processo de proposta (§1) — nunca por mudança unilateral.

---

## 0. Hierarquia de autoridade (precedência em conflito)

Quando duas regras colidirem, vence a de **menor número**:

1. **Constitution do projeto** (`sdp-constitution`).
2. **Diretivas organizacionais explícitas** — Diretiva de Testes & Cobertura (§6), Diretiva Frontend × Design / Pencil (§7) e segurança (`sdp-security`).
3. **Presets** — cadeia ativa fixa: `org-base` → `lang-base-typescript` → `ts-base-bun` → `kind-base-ts-bun-react`. O nível mais específico refina, **nunca** contraria o mais geral.
4. **Skills** aplicáveis ao contexto.
5. **Julgamento do agente** — preenche lacunas; **nunca** sobrepõe os níveis acima.

> Presets e skills são **LEIS**. O agente pode propor melhorias (§1); **não pode** alterá-las, ignorá-las ou reinterpretá-las por conta própria.

---

## 1. Imutabilidade e proposta de melhoria

- **Nunca** alterar preset, skill ou diretiva por decisão própria.
- O agente **deve** propor melhorias quando enxergar ganho real — registrando em **insight doc** (§5), sem interromper o fluxo.
- **Interromper a CLI SOMENTE quando** ao menos um for verdadeiro:
  - a mudança altera contrato de UI/rota, design tokens ou identidade visual **já aprovados**;
  - há conflito **irreconciliável** entre duas LEIS (escalar com a precedência da §0 já analisada);
  - há risco de **segurança, regressão visual ampla ou perda de dados**;
  - a decisão exige **autoridade humana** (escopo, prazo, orçamento, trade-off de negócio/design).
- Fora desses casos: **registra o insight e segue.** Não parar o fluxo por preferência estética ou refinamento marginal.

---

## 2. Auto-policiamento — convenções de frontend

O agente é o **maior responsável por se policiar**. Sem esperar ordem explícita:

- **O preset é frontend, sempre.** Não re-declarar nem reimplementar o que vem herdado de `org-base`/`lang-base-typescript`/`ts-base-bun` — herança **automática via `requires`**. Aplicar `kind-base-ts-bun-react`: React 19, Vite 8, Tailwind CSS v4, Base UI, TanStack, Zustand.
- **Cor SEMPRE via token.** Componente nenhum carrega hex, `!important` ou estilo cru — o visual deriva do design (§7). Esta é a regra de ouro do frontend.
- **Camada de client tipada.** Componente **não** chama `fetch`/`axios` direto: vai pela `sdp-fe-service`. URLs e shapes não se espalham pelos componentes.
- **Fronteiras de skill claras:** `sdp-fe-page` (esqueleto de view roteada), `sdp-fe-form` (coleta de input), `sdp-fe-table` (coleção paginada/ordenável), `sdp-fe-filter` (busca/estreitamento), `sdp-fe-service` (client tipado), `sdp-fe-design-to-react` (de design → componente), `sdp-fe-site-identity` (casar/auditar marca). Mobile: `sdp-fe-expo-*` (screen/api-route/native-module). Componentes prontos: `sdp-fe-ui-*` (button/input/dialog/data-table/charts…).
- **Aplicar a skill cujo gatilho casa** (catálogo §B), inclusive fluxo SDD e práticas de engenharia. Encadear quando o trabalho cruza fases (`sdp-plan` → `sdp-tasks` → `sdp-implement`) e ao consumir design (`sdp-fe-design-to-react` ⇄ §7).

---

## 3. Loop de auditoria — OBRIGATÓRIO

Para evitar retrabalho e autoengano ("parecia boa ideia"), **toda** proposta não-trivial e **toda** implementação declarada concluída disparam **auditor independente**.

- **Independência:** quem audita **≠** quem escreveu (Diretiva de Testes §7.4 / Diretiva Pencil §10.5).
- **Mandato do auditor — CONTRADIZER primeiro:** sua função inicial é *quebrar* o trabalho — achar a premissa falsa, o caso de borda omitido, hex fora de token, handoff desatualizado, falta de paridade dark/light, violação de LEI — **antes** de validar qualquer coisa.
- **Protocolo de resolução:**
  1. Auditor levanta os *findings*.
  2. Autor responde com **evidência** (render `get_screenshot` nos dois temas, diff de tokens, suíte verde), não opinião — ver `verification-before-completion` e `sdp-qa`.
  3. Divergência que persiste → **escalar ao humano** ou rodar um **terceiro auditor de desempate**.
  4. **Convergência registrada** antes de prosseguir.
- **Sem auditoria verde, nada é "pronto".** Declarar conclusão sem o loop fechado é violação.

---

## 4. Economia de modelos (tiers) — proposta operacional

**Regra mestra (vence a tabela):** usar sempre o **menor tier** que atinge a barra de qualidade da tarefa; escalar **somente** sob necessidade demonstrada.

`high` = mais capaz/lento/caro · `medium` = equilíbrio · `low` = rápido/barato (mecânico).

| Comando / papel            | Tier padrão | Racional                          |
|----------------------------|-------------|-----------------------------------|
| `sdp-specify`              | high        | elicitação de requisitos          |
| `sdp-clarify`              | medium      | desambiguação de escopo           |
| `sdp-plan`                 | medium      | decisões arquiteturais            |
| `sdp-tasks`                | low         | decomposição mecânica             |
| `sdp-review`               | medium      | findings de qualidade             |
| `sdp-security`             | medium      | análise de segurança              |
| `sdp-qa`                   | medium      | validação funcional               |
| `sdp-debug`                | medium      | análise de causa raiz             |
| `implement` · orchestrator | medium      | coordenação e despacho            |
| `implement` · simple       | low         | 1–2 arquivos, mecânico            |
| `implement` · complex      | medium      | multi-arquivo, julgamento         |
| `implement` · spec_reviewer| medium      | conformidade com spec             |
| `implement` · quality_reviewer | medium  | checklist mecânico                |
| `implement` · debug        | medium      | causa raiz em falhas              |

> Integrações externas (ex.: GitLab self-hosted): preencher a seção `integrations` do ambiente.

---

## 5. Persistência de insights

- **Local:** `docs/insights/` *(preencher o caminho real do repositório)*.
- Cada insight registra: **problema observado · proposta · impacto · nível de LEI afetado (§0)**.
- Persistir aqui mantém o **fluxo do CLI automatizado**: o agente documenta e segue.
- Relatórios de cobertura **não** são versionados (Diretiva de Testes §3).

---

## 6. Diretiva de Testes, Cobertura e Relatório — LEI (verbatim)

> Diretiva **genérica** (sem linguagem/biblioteca específica). Vale para qualquer pessoa ou
> assistente de IA que escreva ou altere código neste repositório. Em conflito, esta diretiva vence.

### 6.1 Princípio
Todo código testável **tem** teste. Teste não é etapa opcional nem "depois": faz parte da
**definição de pronto** de cada entrega. Código sem teste correspondente não está pronto.

### 6.2 Cobertura
- **Meta: 100% de cobertura de linha** de todo o código testável.
- Sem exceção silenciosa: o que não for coberto **tem** que estar explicitamente justificado (§6.4).
- O gate de cobertura roda **localmente e na automação (CI)**; abaixo da meta = build falha.
- A cobertura é consequência de testar comportamento real — **não** um número a se "farmar" com testes vazios ou asserções triviais só para subir o percentual.

### 6.3 Relatório
- **Obrigatório, porém local**: gerado a cada rodada, mas **não** versionado (entra no ignore).
- Formato padrão de mercado, legível por ferramentas (cobertura por linha com contagem de execuções por linha), em diretório dedicado.
- Serve para inspeção humana **e** para o gate automático — ambos consomem o mesmo arquivo.

### 6.4 Exclusões (bypass) — use com sabedoria
Só pode ser excluído da cobertura o que é **comprovadamente não-testável / não-alcançável e fora de regra de negócio** (ex.: bootstrap, *stubs* de plataforma, chamadas cruas de SO, casca de I/O sem lógica).
- **Regra de negócio NUNCA recebe bypass.**
- Cada exclusão é **deliberada e justificada** (no código, junto à exclusão, e na descrição do MR/PR). Exclusão sem justificativa = falha.
- Prefira **isolar** a parte não-testável (casca fina de I/O) da testável (lógica pura) e testar a lógica, em vez de excluir um bloco grande.

### 6.5 O que NÃO se testa
- **Não se testa o teste:** arquivos de teste ficam **fora** do escopo de cobertura.
- Não se escreve teste só para cobrir linha (sem asserção significativa de comportamento).

### 6.6 Qualidade do teste
- Estrutura clara: **preparar → agir → verificar**.
- Um teste verifica **um** comportamento e falha por **um** motivo.
- Cobrir caminho feliz **e** erro/fronteira (limites, vazio, nulo, valor inválido).
- **Determinísticos**: sem depender de relógio real, rede, ordem de execução ou estado global — injete o não-determinístico.
- Teste deve **falhar** quando o comportamento quebra (se nunca falha, não testa nada).

### 6.7 Gate antes de integrar (MR/PR)
1. Suíte **verde**.
2. Cobertura na **meta** (§6.2), com relatório gerado (§6.3).
3. Exclusões justificadas (§6.4).
4. Verificação independente: **quem revisa/audita não é quem escreveu**.

---

## 7. Frontend × Design (.pen / Pencil) — LEI (verbatim)

> Diretiva de **como o Frontend consome e usa o design** feito no **Pencil** (`.pen`). Vale para
> qualquer pessoa ou assistente de IA que toque em estilo, tema ou layout neste repositório.
> Em conflito, esta diretiva e o `CLAUDE.md` (§5/§7) vencem. Companheira de [`TESTES.md`](./TESTES.md).

### 7.1 Princípio
O arquivo `.pen` é a **fonte de verdade do visual** — não o componente. Ninguém "inventa" cor,
medida, raio ou espaçamento no código: tudo **deriva** do design. O Frontend **consome** o design
por uma cadeia de tradução; nunca lê pixels do `.pen` e cola hex no componente.

> **Regra de ouro:** cor **sempre** via token. Hex só existe na **camada de token**. Componente
> nenhum carrega hex, `!important` ou `ViewEncapsulation.None` (CLAUDE.md §5/§7).

### 7.2 A cadeia de verdade (o fluxo)
```
   design/pencil/care-center.pen        ← FONTE DE VERDADE (criptografado; só via Pencil MCP)
            │  get_variables · batch_get · snapshot_layout · get_screenshot · export_nodes
            ▼
   design/handoff/<tela>.pen-spec.md     ← árvore/medidas extraídas (NÃO editar à mão; re-extrair)
   design/tokens/tokens.json             ← tokens canônicos, agnósticos de framework
            ▼
   frontend/src/assets/design/theme/tokens.css   ← CAMADA DE TOKEN (--cc-*) — único lugar com hex
            ▼
   frontend/src/app/**/<componente>.css  ← consome só var(--cc-*), espelhando o frame do .pen
```
Cada seta é **tradução**, não cópia: o `.pen` define, o `tokens.json` canoniza, o `tokens.css`
materializa em CSS vars, e o componente apenas **referencia**. A direção é sempre de cima para
baixo — um valor novo entra pelo `.pen` e desce; **nunca** sobe do componente.

### 7.3 Acessar o `.pen` (regras do Pencil MCP) — OBRIGATÓRIO
- O `.pen` é **criptografado**. **Nunca** use `Read`, `Grep` ou editor de texto nele — **só** as
  ferramentas MCP `pencil`. Acesso fora disso é falha.
- **Antes de qualquer operação Pencil**, chame `get_editor_state(include_schema: true)` se você
  ainda não tem o schema do `.pen` no contexto. Sem o schema, as demais ferramentas falham.
- Consulte `get_guidelines` para as convenções do Pencil antes de **gerar/alterar** design.
- Ferramentas e quando usar:
  | Ferramenta | Para |
  |---|---|
  | `get_editor_state` | abrir/inspecionar o arquivo e obter o schema |
  | `get_variables` / `set_variables` | ler/gravar as **variáveis de tema** (`$bg-app`, `$orion-blue`…) |
  | `batch_get` | ler nós (frames/text/icon) e suas propriedades |
  | `batch_design` | criar/alterar nós |
  | `snapshot_layout` | árvore de layout de uma tela |
  | `get_screenshot` | render visual (dark/light) para conferência |
  | `export_nodes` | exportar telas/nós (PNG/SVG) para `design/screens/` |

### 7.4 Extrair o design (handoff)
Toda tela consumida pelo Front nasce de uma **extração** do `.pen`, não de leitura visual a olho:
1. `get_variables` → confirma os valores de tema (dark **e** light).
2. `batch_get` / `snapshot_layout` → árvore do frame (medidas, gaps, raios, fills, fontes).
3. Grave o resultado em `design/handoff/<tela>.pen-spec.md` — esse arquivo é **derivado**:
   _"NÃO editar à mão — re-extrair do `.pen`"_. Ele é o contrato que o componente espelha.
4. `get_screenshot` para anexar a conferência visual; `export_nodes` para `design/screens/`.

> Se o design mudou no `.pen`, **re-extraia** o handoff antes de mexer no componente. Handoff
> desatualizado é tratado como fonte errada.

### 7.5 Camada de token no Front (`tokens.css`) — o único lugar com hex
`frontend/src/assets/design/theme/tokens.css` é a **fronteira**: traduz as variáveis do Pencil /
`tokens.json` em CSS custom properties `--cc-*`. **Hex é permitido AQUI e só aqui.**
- **Dark é o padrão** (`:root`); **light** é override em `html.light`, com **paridade** de tokens.
- Toda cor nova entra primeiro como `--cc-*` neste arquivo — depois é referenciada.
- Se um fill aparecer "cru" no `.pen` (ex.: o `#1a2744` do Hero Card), **promova-o a token**
  (`--cc-hero`) em vez de espalhar o hex pelos componentes.

### 7.6 Consumir nos componentes
- Componente (`*.css`) usa **só** `var(--cc-*)`. Zero hex, zero `!important`, zero
  `ViewEncapsulation.None`.
- O CSS do componente **espelha o frame** do handoff: mesmas medidas, gaps, raios e fontes.
- **Raio:** botão/input `4px` · card/badge `8px` · overlay/modal `16px`.
- **Espaçamento:** grid base `4px` (8/12/16/20/24).
- **Tipografia:** Inter (mono = Cutive Mono para valores técnicos — ID, porta, IP).
- **Ícones:** Font Awesome 6 (16–18px) no app. (No `.pen` os ícones são Lucide; o **mapa** de nome
  Lucide→FA é parte da tradução, não use o nome cru.)

### 7.7 Mapa de variáveis (Pencil → token → CSS)
| Variável no `.pen` | `tokens.json` (canônico) | `tokens.css` (Front) |
|---|---|---|
| `$bg-app` | `color.surface.*.background` | `--cc-bg-app` |
| `$bg-card` | `color.surface.*.card` | `--cc-bg-card` |
| `$bg-raised` | `color.surface.*.raised` | `--cc-bg-raised` |
| `$border` | `color.surface.*.border` | `--cc-border` |
| `$text-primary` | `color.text.*.color` | `--cc-text` |
| `$text-muted` | `color.text.*.muted` | `--cc-text-muted` |
| `$orion-blue` | `color.primary` (DEFAULT/light=500, dark=400) | `--cc-primary` / `--cc-primary-deep` |
| `$status-success` | `color.semantic.success` | `--cc-success` |
| `$status-info` | `color.semantic.info` | `--cc-info` |
| `$status-warning` | `color.semantic.warning` | `--cc-warning` |
| `$status-danger` | `color.semantic.danger` | `--cc-danger` |
| (fill cru do Hero) | — (promover a token) | `--cc-hero` |

> Em componentes, primária é sempre `--cc-primary` — **nunca** a primitiva (`blue.400`/`#3d6fd9`).

### 7.8 Alterar o design (a ordem certa de mexer)
Mudança visual entra **pelo topo** e desce — nunca comece pelo componente:
1. **`.pen`** — ajuste com `set_variables` (tema) ou `batch_design` (layout). Confira com
   `get_screenshot` (dark **e** light).
2. **Handoff** — re-extraia (`get_variables` + `batch_get`) para `design/handoff/`.
3. **`tokens.json`** — consolide qualquer cor/medida nova no canônico.
4. **`tokens.css`** — materialize o token `--cc-*` (dark + `html.light`).
5. **Componente** — referencie o token. Skills: `orion-front-primeng-theme-token`,
   `orion-front-design-system`. Orientação tela-a-tela: [`design/GUIA-DESIGN.md`](./design/GUIA-DESIGN.md).

### 7.9 Do's & Don'ts
✅ `.pen` como fonte · acesso só via Pencil MCP · `get_editor_state(include_schema:true)` antes de
tudo · hex só em `tokens.css` · componente só com `var(--cc-*)` · dark padrão + light em paridade ·
re-extrair handoff quando o design muda · valores técnicos em mono.

❌ `Read`/`Grep` no `.pen` · hex/`!important`/`ViewEncapsulation.None` em componente · editar
`handoff/*.pen-spec.md` à mão · usar a primitiva em vez de `--cc-primary` · cor fora dos tokens ·
começar a mudança pelo CSS do componente.

### 7.10 Definição de pronto (gate visual)
Antes de integrar (MR/PR), a entrega de UI só está pronta com:
1. Handoff **alinhado** ao `.pen` (re-extraído se houve mudança de design).
2. Token novo materializado em `tokens.css` — **dark e light**, em paridade.
3. Componente **sem** hex, `!important` ou `ViewEncapsulation.None` (só `var(--cc-*)`).
4. Conferência visual (`get_screenshot` ou render real) nos dois temas.
5. Verificação independente: quem revisa não é quem escreveu (CLAUDE.md §9).

---

## A. Catálogo de PRESETS — LEI

| Preset | Tier | Versão | O que cobre |
|---|---|---|---|
| `org-base` | org | 3.2.0 | Diretrizes **corporativas** cross-stack: branch, PR/MR, DoD, segurança, CI/CD (stages + jobs base), code review, design patterns/SOLID, `.gitignore`/`.editorconfig` e padrões cognitivos de engenharia. Herdado por **todos**. |
| `lang-base-typescript` | lang | 4.0.0 | Linguagem **TypeScript**: tsconfig (base/bundler/types), ESLint + Prettier, Vitest (coverage 100%), Zod e Drizzle. Herda `org-base`. |
| `ts-base-bun` | stack | 2.1.0 | Stack **Bun + TypeScript**: ESLint 9 flat config, tsconfig ESNext/bundler, extensão do Vitest, `bunfig` (registry) e 12 áreas de convenção de runtime Bun. Herda `lang-base-typescript`. |
| `kind-base-ts-bun-react` | kind | 1.0.0 | Stack **frontend web** (front) — React 19, Vite 8, Tailwind CSS v4, Base UI, TanStack, Zustand. Inclui templates `sdp-fe-*` (page/form/table/filter/service). |

**Aplicação:** Frontend web/mobile (`kind-base-ts-bun-react` / `-expo`): as `sdp-fe-*`, as `sdp-fe-expo-*` (screen/api-route/native-module) e os componentes `sdp-fe-ui-*`. Fluxo SDD e práticas de engenharia são **stack-agnósticas**. **Todos** herdam `org-base` automaticamente pela cadeia de `requires`.

---

## B. Catálogo de SKILLS (gatilhos) — LEI

### Fluxo SDD — `/sdp-*`
- `sdp-specify` — requisitos vagos viram critérios de aceite mensuráveis; ou a branch de feature ainda não existe.
- `sdp-clarify` — spec com adjetivos vagos, decisões em aberto ou TODOs antes do plano; critérios ainda não testáveis.
- `sdp-plan` — spec aprovada e faltam artefatos de planejamento antes de implementar.
- `sdp-tasks` — existem plan.md e spec.md mas tasks.md não foi gerado ou está fora de sync.
- `sdp-analyze` — tasks.md pronto e há risco de inconsistência/lacuna/violação da constitution entre spec, plan e tasks.
- `sdp-checklist` — spec existe e precisa de auditoria de qualidade de requisitos antes de implementar.
- `sdp-implement` — tasks.md completo e plan.md aprovado, prontos para implementação.
- `sdp-tdd` — tarefa exige teste-primeiro; código escrito antes do teste que falha; bugfix precisa de teste que reproduz.
- `sdp-review` — fase/tarefa concluída; revisão de conformidade e qualidade antes do merge.
- `sdp-security` — auditoria de segurança; suspeita de segredos vazados; cobertura OWASP/STRIDE; scan de dependências antes do release.
- `sdp-qa` — verificar que a implementação funciona de fato; score de qualidade por evidência antes da revisão.
- `sdp-debug` — teste falha, erro na implementação, ou bug resiste à primeira correção.
- `sdp-finish` — implementação e revisão concluídas e a branch precisa ser finalizada.
- `sdp-constitution` — criar, emendar, ratificar ou versionar a constitution; templates fora de sync.
- `sdp-mr-template` — gera o corpo do Merge Request no padrão SDD.
- `sdp-mr-checklist` — MR no GitLab existe e os checkboxes do plano de teste precisam ser preenchidos antes da revisão.
- `sdp-taskstoissues` — converter tarefas pendentes do tasks.md em issues no GitLab.
- `sdp-writing-skills` — criar/reescrever um SKILL.md; skill não carrega porque a descrição resume workflow; skill excede limite de tokens ou falta diretiva caveman.

### Geração frontend — `/sdp-fe-*`
- `sdp-fe-design-to-react` — a partir de screenshot/Figma/Sketch/XD ou wireframe, gerar o componente React correspondente.
- `sdp-fe-expo-api-route` — endpoint server-side dentro de um app Expo Router; rota BFF sem validação/auth; regra de negócio vazando no handler.
- `sdp-fe-expo-native-module` — acessar API de device/capacidade nativa fora do SDK do Expo; impl JS lenta que precisa rodar em Swift/Kotlin.
- `sdp-fe-expo-screen` — rota sob `app/` em Expo Router; tela em branco no loading; erro de dados silenciado; lógica vazando para `app/`.
- `sdp-fe-filter` — barra de filtro para buscar/estreitar uma lista ou tabela por um ou mais campos.
- `sdp-fe-form` — tela precisa coletar input do usuário para uma entidade.
- `sdp-fe-page` — esqueleto de uma nova view roteada de uma feature.
- `sdp-fe-service` — componente chamando `fetch`/`axios` direto; URLs/shapes espalhados; precisa de camada de client tipada.
- `sdp-fe-site-identity` — casar com uma marca existente (URL/screenshots), redesign mantendo o visual, auditar consistência visual entre projetos.
- `sdp-fe-table` — exibir coleção de registros com paginação, ordenação e ações por linha.
- `sdp-fe-ui-*` — componentes prontos do design system (button, input, dialog, data-table, charts…).

### Práticas de engenharia
- `brainstorming` — iniciar feature/decisão de design, ou travado e tentado a pegar a primeira solução.
- `dispatching-parallel-agents` — subtarefas independentes que dá para tocar em paralelo; sequencial criaria gargalo.
- `receiving-code-review` — responder feedback de code review e priorizar findings.
- `systematic-debugging` — diagnosticar antes de escrever qualquer fix; causa não óbvia; evitar "tenta e vê".
- `using-git-worktrees` — trabalhar em várias features ao mesmo tempo; ambiente isolado por branch.
- `verification-before-completion` — antes de declarar concluído / dizer que testes passam / reportar implementação pronta.
- `writing-skills` — criar skill nova, refinar uma vaga/ampla, ou avaliar se um SKILL.md está bem-formado.
