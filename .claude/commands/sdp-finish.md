---
description: "Use quando implementacao e revisao estiverem concluidas e a branch de feature precisar ser finalizada."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-finish`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-finish

Use quando implementacao e revisao estiverem concluidas e a branch de feature precisar ser finalizada.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
finalizar branch → testes verde ANTES ∴ ¬opcoes com falha in-branch → spec Pendentes → Implementadas → exatamente 4 opcoes ∈ {merge, PR, manter, descartar} → descartar ⇒ confirmar → ¬auto-selecionar → status final ∈ {DONE, DONE_WITH_CONCERNS, BLOCKED, NEEDS_CONTEXT}
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
