---
description: "Use when you need a filter bar that lets users search and narrow down a list or data table by one or more fields"
argument-hint: "<entity>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-filter`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-filter

Use when you need a filter bar that lets users search and narrow down a list or data table by one or more fields

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade/dados a filtrar (ex.: Pedido)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
barra de filtro {{entity}}
 → compõe inputs sdp-fe-ui
 → estado controlado: limpar e resetar
 → texto com debounce
 → emite mudança para o pai
 → sincroniza com URL query
 → responsivo: horizontal ↔ empilhado
 → ¬valores hardcoded

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
