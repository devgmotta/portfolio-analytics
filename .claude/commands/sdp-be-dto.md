---
description: "Use when you need request or response payload contracts at a backend boundary, when a payload reaches a use case unvalidated, or when an internal entity leaks out the API"
argument-hint: "<entity>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-be-dto`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-be-dto

Use when you need request or response payload contracts at a backend boundary, when a payload reaches a use case unvalidated, or when an internal entity leaks out the API

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade-alvo do DTO (ex.: User)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
DTO {{entity}} → create/update/response separados → schema Zod valida campo: required, min/max, formato, enum → required ↔ optional → response mapeia subset da entity ¬expor internals → export type infer p/ handlers → ¬hardcode

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
