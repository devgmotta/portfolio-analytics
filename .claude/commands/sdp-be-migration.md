---
description: "Use when adding or altering a database table, column, index, or constraint, or when the schema needs to evolve safely alongside a new entity or feature"
argument-hint: "<entity>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-be-migration`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-be-migration

Use when adding or altering a database table, column, index, or constraint, or when the schema needs to evolve safely alongside a new entity or feature

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade/tabela alvo da migração (ex.: User)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
migration {{entity}} → NNN_descricao.sql em src/infrastructure/persistence/drizzle/migrations/ → up e down reversível → tipos ↔ entity → índice ∀ FK e unique → coluna nova nullable → backfill → NOT NULL → ¬valor hardcoded

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
