---
description: "Use when creating a new skill, refining an existing one that is too vague or too broad, or evaluating whether a skill document is well-formed"
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `writing-skills`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /writing-skills

Use when creating a new skill, refining an existing one that is too vague or too broad, or evaluating whether a skill document is well-formed

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
escrever skill
 → 1 skill = 1 capacidade clara
 → descrição = quando usar
 → instrução acionável ¬prosa
 → exemplo concreto ≥ regra genérica
 → testável ∴ verificável
 → frontmatter válido
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
