# Cabresto Conceitual — Governança do Agente (Packages)

> **Escopo.** Este cabresto governa trabalho de **pacote/lib interno**. O preset ativo é fixo:
> `kind-base-ts-bun-package` (cadeia: `org-base` → `lang-base-typescript` → `ts-base-bun` → `kind-base-ts-bun-package`).
> Fluxo SDD e práticas de engenharia, sendo stack-agnósticas, continuam valendo.
>
> **Natureza deste bloco.** Diretiva permanente do CLAUDE.md, em voz imperativa e atemporal.
> Não é mensagem de uma conversa: aplica-se a **toda** sessão, **toda** tarefa, sempre.
> Em conflito entre regras, decide a **ordem de precedência da §0**.
>
> **O que aqui é LEI** (preservado verbatim, jamais alterado por decisão do agente):
> a tabela de presets (§A), o catálogo de skills (§B) e a Diretiva de Testes (§6).
> A camada de governança (§0–§5) e a tabela de tiers (§4) são operacionais e evoluíveis
> via processo de proposta (§1) — nunca por mudança unilateral.

---

## 0. Hierarquia de autoridade (precedência em conflito)

Quando duas regras colidirem, vence a de **menor número**:

1. **Constitution do projeto** (`sdp-constitution`).
2. **Diretivas organizacionais explícitas** — Diretiva de Testes & Cobertura (§6) e segurança (`sdp-security`).
3. **Presets** — cadeia ativa fixa: `org-base` → `lang-base-typescript` → `ts-base-bun` → `kind-base-ts-bun-package`. O nível mais específico refina, **nunca** contraria o mais geral.
4. **Skills** aplicáveis ao contexto.
5. **Julgamento do agente** — preenche lacunas; **nunca** sobrepõe os níveis acima.

> Presets e skills são **LEIS**. O agente pode propor melhorias (§1); **não pode** alterá-las, ignorá-las ou reinterpretá-las por conta própria.

---

## 1. Imutabilidade e proposta de melhoria

- **Nunca** alterar preset, skill ou diretiva por decisão própria.
- O agente **deve** propor melhorias quando enxergar ganho real — registrando em **insight doc** (§5), sem interromper o fluxo.
- **Interromper a CLI SOMENTE quando** ao menos um for verdadeiro:
  - a mudança altera **API pública**, contrato ou versionamento (SemVer) **já publicados**;
  - há conflito **irreconciliável** entre duas LEIS (escalar com a precedência da §0 já analisada);
  - há risco de **segurança, quebra de consumidores downstream ou publish indevido**;
  - a decisão exige **autoridade humana** (escopo, prazo, orçamento, trade-off de negócio).
- Fora desses casos: **registra o insight e segue.** Não parar o fluxo por preferência estética ou refinamento marginal.

---

## 2. Auto-policiamento — convenções de pacote/lib

O agente é o **maior responsável por se policiar**. Sem esperar ordem explícita:

- **O preset é package, sempre.** Não re-declarar nem reimplementar o que vem herdado de `org-base`/`lang-base-typescript`/`ts-base-bun` — a herança é **automática via `requires`**.
- **Superfície pública mínima e intencional.** Exportar só o necessário; nada de vazar internals. Cada export é parte do contrato e segue **SemVer**.
- **Erros pela borda via `Result<T,E>`** — não lançar exceção atravessando a fronteira pública do pacote; o consumidor recebe resultado tipado.
- **Branded types** para primitivos de domínio (não passar `string`/`number` cru onde há significado).
- **Design patterns como scaffold**, quando couber: builder, factory, strategy, adapter, decorator — aplicados a serviço, não enfeite.
- **Build via `tsup`**; **publish idempotente** em registry interno (republicar a mesma versão não produz efeito divergente).
- **Aplicar a skill cujo gatilho casa** (catálogo §B): fluxo SDD e práticas de engenharia. Encadear quando o trabalho cruza fases (`sdp-plan` → `sdp-tasks` → `sdp-implement`).

---

## 3. Loop de auditoria — OBRIGATÓRIO

Para evitar retrabalho e autoengano ("parecia boa ideia"), **toda** proposta não-trivial e **toda** implementação declarada concluída disparam **auditor independente**.

- **Independência:** quem audita **≠** quem escreveu (Diretiva de Testes §7.4).
- **Mandato do auditor — CONTRADIZER primeiro:** sua função inicial é *quebrar* o trabalho — achar a premissa falsa, o caso de borda omitido, a regra de negócio com bypass indevido, a quebra de contrato público/SemVer, a violação de LEI — **antes** de validar qualquer coisa.
- **Protocolo de resolução:**
  1. Auditor levanta os *findings*.
  2. Autor responde com **evidência**, não opinião (ver `verification-before-completion` e `sdp-qa`).
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

## A. Catálogo de PRESETS — LEI

| Preset | Tier | Versão | O que cobre |
|---|---|---|---|
| `org-base` | org | 3.2.0 | Diretrizes **corporativas** cross-stack: branch, PR/MR, DoD, segurança, CI/CD (stages + jobs base), code review, design patterns/SOLID, `.gitignore`/`.editorconfig` e padrões cognitivos de engenharia. Herdado por **todos**. |
| `lang-base-typescript` | lang | 4.0.0 | Linguagem **TypeScript**: tsconfig (base/bundler/types), ESLint + Prettier, Vitest (coverage 100%), Zod e Drizzle. Herda `org-base`. |
| `ts-base-bun` | stack | 2.1.0 | Stack **Bun + TypeScript**: ESLint 9 flat config, tsconfig ESNext/bundler, extensão do Vitest, `bunfig` (registry) e 12 áreas de convenção de runtime Bun. Herda `lang-base-typescript`. |
| `kind-base-ts-bun-package` | kind | 1.0.0 | **Pacote/lib** interno — scaffold de design patterns (builder/factory/strategy/adapter/decorators), `Result<T,E>`, branded types, build via tsup e publish idempotente em registry interno. |

**Aplicação:** Fluxo SDD e práticas de engenharia são **stack-agnósticas** — valem para este preset. **Todos** herdam `org-base` automaticamente pela cadeia de `requires`.

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

### Práticas de engenharia
- `brainstorming` — iniciar feature/decisão de design, ou travado e tentado a pegar a primeira solução.
- `dispatching-parallel-agents` — subtarefas independentes que dá para tocar em paralelo; sequencial criaria gargalo.
- `receiving-code-review` — responder feedback de code review e priorizar findings.
- `systematic-debugging` — diagnosticar antes de escrever qualquer fix; causa não óbvia; evitar "tenta e vê".
- `using-git-worktrees` — trabalhar em várias features ao mesmo tempo; ambiente isolado por branch.
- `verification-before-completion` — antes de declarar concluído / dizer que testes passam / reportar implementação pronta.
- `writing-skills` — criar skill nova, refinar uma vaga/ampla, ou avaliar se um SKILL.md está bem-formado.

> **Nota de inconsistência a ratificar (não alterada por mim):** o material-fonte de packages lista as skills de geração `sdp-be-*` sob "Geração backend, packages". As `sdp-be-*` são de domínio backend (entity/repository/handler/router/migration etc.) e não casam com um pacote/lib. Ou (a) o pacote realmente reaproveita as `sdp-be-*`, ou (b) é resíduo de cópia do backend. Decida e me avise para fechar §B com precisão.
