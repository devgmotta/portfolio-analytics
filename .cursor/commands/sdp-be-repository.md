<!-- Gerado pelo Hub SDP a partir da skill `sdp-be-repository`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-be-repository

Use when adding or changing how an entity is read from or written to the database, when a use case talks to Drizzle directly, or when raw rows or ORM types leak

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade-alvo do repositório (ex.: Org)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
Repo{{entity}} ∈ infra ↔ contrato ∈ domínio → métodos do domínio findById findBySlug save list → mapear linha para domínio via _toDomain ¬ linha crua ¬ tipo do ORM ¬ any → paginação limit offset → not-found devolve null → ¬ vazar SQL ou ORM

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
