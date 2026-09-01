---
description: "Use when adding a server-side endpoint inside an Expo Router app, when a BFF route is missing validation or auth, or when business logic leaks into an API route handler"
argument-hint: "<resource> <method>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-expo-api-route`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-expo-api-route

Use when adding a server-side endpoint inside an Expo Router app, when a BFF route is missing validation or auth, or when business logic leaks into an API route handler

**Argumentos desta skill:**
- `resource` (obrigatório) — recurso da rota (ex.: posts)
- `method` (obrigatório) — metodo HTTP (GET/POST/PUT/PATCH/DELETE)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
API route {{resource}} {{method}} → app/api/{{resource}} sufixo api, export nomeado por metodo → Request e Response Web Fetch, Zod valida body e params → auth HOF ¬ handler, erro Response.json tipado ¬ throw → ¬ side-effects modulo ∴ init lazy

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
