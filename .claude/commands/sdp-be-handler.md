---
description: "Use when adding or changing an HTTP endpoint that exposes a backend use case, when a request reaches the use case without being validated, or when business logic is leaking into the transport layer"
argument-hint: "<entity> <operation>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-be-handler`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-be-handler

Use when adding or changing an HTTP endpoint that exposes a backend use case, when a request reaches the use case without being validated, or when business logic is leaking into the transport layer

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade-alvo do handler (ex.: Preset)
- `operation` (obrigatório) — operação do caso de uso (ex.: create, list)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
handler {{entity}}.{{operation}} → camada infra ¬ regra negócio → valida body Zod, safeParse falha → 422 → delega use case via DI → mapError no catch → NotFoundError → 404 ∴ handler fino

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
