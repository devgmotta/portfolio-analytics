---
description: "Use when you need to scaffold a new routed view for a feature"
argument-hint: "<nome>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-page`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-page

Use when you need to scaffold a new routed view for a feature

**Argumentos desta skill:**
- `nome` (obrigatório) — nome da página/rota (ex.: Dashboard)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
page {{nome}} container de rota
 → resolve template do preset primeiro
 → compõe layout e slots
 → data fetching pela convenção do preset
 → estados loading e error
 → reusa sdp-fe-ui-*
 → title e metadata para a11y
 → ¬valores hardcoded ∴ vem de config
 → camada presentation

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
