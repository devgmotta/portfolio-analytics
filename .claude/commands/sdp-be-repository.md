---
description: "Use when adding or changing how an entity is read from or written to the database, when a use case talks to Drizzle directly, or when raw rows or ORM types leak"
argument-hint: "<entity>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-be-repository`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-be-repository

Use when adding or changing how an entity is read from or written to the database, when a use case talks to Drizzle directly, or when raw rows or ORM types leak

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade-alvo do repositório (ex.: Org)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
Repo{{entity}} ∈ infra ↔ contrato ∈ domínio → métodos do domínio findById findBySlug save list → mapear linha para domínio via _toDomain ¬ linha crua ¬ tipo do ORM ¬ any → paginação limit offset → not-found devolve null → ¬ vazar SQL ou ORM

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
