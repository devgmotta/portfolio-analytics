---
description: "Use when tasks.md is ready and there are concerns about inconsistencies, coverage gaps, or constitution violations across spec, plan and tasks before implementing."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-analyze`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-analyze

Use when tasks.md is ready and there are concerns about inconsistencies, coverage gaps, or constitution violations across spec, plan and tasks before implementing.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
analisa spec ↔ plan ↔ tasks
 → so-leitura ¬modifica arquivo
 → acha duplicata ambiguidade lacuna
 → cobre cada requisito → task
 → viola constituicao MUST ⇒ CRITICAL
 → severidade: CRITICAL HIGH MEDIUM LOW
 → relatorio mais proximas-acoes ¬aplica edit
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
