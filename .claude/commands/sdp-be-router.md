---
description: "Use when you need to expose REST endpoints for a resource, wire HTTP methods to handlers, or group routes under a path prefix in a backend"
argument-hint: "<resource> <prefix>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-be-router`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-be-router

Use when you need to expose REST endpoints for a resource, wire HTTP methods to handlers, or group routes under a path prefix in a backend

**Argumentos desta skill:**
- `resource` (obrigatório) — recurso REST (ex.: products)
- `prefix` (obrigatório) — prefixo de path do grupo (ex.: /products)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
router {{resource}}
 → grupo prefixo {{prefix}}
 → métodos HTTP → handlers
 → middleware ordem auth → validação → handler
 → REST plural
 → router fino ¬lógica negócio
 → ¬valores hardcoded

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
