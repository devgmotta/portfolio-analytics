---
description: "Use when about to declare a task done; use before claiming tests pass; use before reporting implementation complete; use before saying \"it's working\""
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `verification-before-completion`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /verification-before-completion

Use when about to declare a task done; use before claiming tests pass; use before reporting implementation complete; use before saying "it's working"

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
verificar antes de concluir
 → identificar comando que prova
 → RODAR ¬presumir saída
 → ler saída real
 → confere a alegação?
 → só então declarar pronto
 → ¬autoengano
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
