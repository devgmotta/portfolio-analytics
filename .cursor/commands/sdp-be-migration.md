<!-- Gerado pelo Hub SDP a partir da skill `sdp-be-migration`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-be-migration

Use when adding or altering a database table, column, index, or constraint, or when the schema needs to evolve safely alongside a new entity or feature

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade/tabela alvo da migração (ex.: User)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
migration {{entity}} → NNN_descricao.sql em src/infrastructure/persistence/drizzle/migrations/ → up e down reversível → tipos ↔ entity → índice ∀ FK e unique → coluna nova nullable → backfill → NOT NULL → ¬valor hardcoded

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
