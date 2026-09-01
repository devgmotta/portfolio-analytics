---
description: "Use when an implementation task requires test-first development, when code was written before a failing test exists, or when a bug fix needs a reproducing test before the fix."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-tdd`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-tdd

Use when an implementation task requires test-first development, when code was written before a failing test exists, or when a bug fix needs a reproducing test before the fix.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
¬código antes de teste falho
¬adaptar código existente como base
RED → teste mínimo ∴ ver FALHAR
GREEN → mínimo ∴ todos verdes
REFACTOR → ¬nova lógica ∴ todos verdes
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
