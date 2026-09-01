---
description: "Use when requirements are vague and must become measurable acceptance criteria, or when a feature branch does not exist yet."
argument-hint: "<description>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-specify`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-specify

Use when requirements are vague and must become measurable acceptance criteria, or when a feature branch does not exist yet.

**Argumentos desta skill:**
- `description` (obrigatório) — Descrição em linguagem natural da feature a especificar

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
spec: {{description}}
 → WHAT e WHY ¬HOW
 → ¬stack/API/schema
 → requisitos testáveis ¬ambíguos
 → success criteria mensurável tech-agnostic
 → cenários e edge cases
 → escopo delimitado
 → ≤3 [NEEDS CLARIFICATION] ¬scope-creep
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
