---
description: "Use when you have a complete tasks.md plan and an approved plan.md ready for implementation."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-implement`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-implement

Use when you have a complete tasks.md plan and an approved plan.md ready for implementation.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
tasks.md fase∈{Setup→Tests→Core→Integration→Polish} → ∀[P] paralelo ∴ TDD ⇒ RED→GREEN→REFACTOR → ¬[X] sem prova → bloqueio ⇒ STOP ∴ escalar
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
