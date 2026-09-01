---
description: "Use when a component is calling fetch or axios directly, when API URLs and request shapes are scattered across pages, or when you need a typed client layer for an API resource"
argument-hint: "<resource>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-service`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-service

Use when a component is calling fetch or axios directly, when API URLs and request shapes are scattered across pages, or when you need a typed client layer for an API resource

**Argumentos desta skill:**
- `resource` (obrigatório) — recurso/entidade da API (ex.: User)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
service {{resource}} → camada infra ¬HTTP em componente → tipos de request e response → CRUD list getById create update delete → erro normalizado tipado → paginação limit offset ou cursor → baseURL ∈ env → cliente HTTP do preset → ¬valor hardcoded

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
