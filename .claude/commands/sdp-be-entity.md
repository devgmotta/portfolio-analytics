---
description: "Use when a domain concept needs a typed object with identity and self-validation"
argument-hint: "<entity> <context>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-be-entity`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-be-entity

Use when a domain concept needs a typed object with identity and self-validation

**Argumentos desta skill:**
- `entity` (obrigatório) — conceito de negócio (ex.: User)
- `context` (obrigatório) — bounded context (ex.: catalog)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
entity {{entity}} ∈ domain/{{context}} → ¬construtor público → static create(props) valida invariantes → ¬any → VOs ∀dado c/ regra → createdAt ∈ Props → exporta tipo → ¬Drizzle

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
