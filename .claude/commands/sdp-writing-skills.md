---
description: "Use when creating or rewriting a SKILL.md, when a skill fails to load because the description summarises workflow, or when an existing skill exceeds token limits or lacks caveman directive."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-writing-skills`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-writing-skills

Use when creating or rewriting a SKILL.md, when a skill fails to load because the description summarises workflow, or when an existing skill exceeds token limits or lacks caveman directive.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
¬RED ⇒ ¬escreva → description somente gatilhos ¬workflow → RED: cenário falho → GREEN: SKILL válida → REFACTOR: fechar loopholes → corpo ≤ 500 palavras ∴ companion → diretiva ≤ 80 tokens símbolos canônicos
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
