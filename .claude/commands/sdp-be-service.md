---
description: "Use when domain business logic spans multiple entities or repositories, when rules or transactions are leaking into a handler or use case, or when persistence and HTTP concerns are mixed into one class"
argument-hint: "<service>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-be-service`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-be-service

Use when domain business logic spans multiple entities or repositories, when rules or transactions are leaking into a handler or use case, or when persistence and HTTP concerns are mixed into one class

**Argumentos desta skill:**
- `service` (obrigatório) — concern de domínio do service (ex.: Product)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
service {{service}} → camada application ou domain → orquestra entidades e repos → repo via DI ¬ new interno → regra negócio aqui → retorna tipo domínio ¬ HTTP → erro domínio ¬ genérico → 1 responsabilidade → path do preset

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
