---
description: "Use when a screen needs to collect user input for an entity."
argument-hint: "<entity>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-form`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-form

Use when a screen needs to collect user input for an entity.

**Argumentos desta skill:**
- `entity` (obrigatório) — nome da entidade em PascalCase (ex.: Usuario)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
form {{entity}} → compõe sdp-fe-ui-* por campo → state via lib preset → schema lib preset por campo → erro ↔ aria-describedby ∈ label → submit: loading ∴ success | error → create ↔ edit → ¬hardcode config

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
