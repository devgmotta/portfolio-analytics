---
description: "Use when a feature spec has vague adjectives, open decisions or TODO markers and you need to resolve them before planning, or when acceptance criteria are not yet testable."
argument-hint: "[foco]"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-clarify`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-clarify

Use when a feature spec has vague adjectives, open decisions or TODO markers and you need to resolve them before planning, or when acceptance criteria are not yet testable.

**Argumentos desta skill:**
- `foco` — área da spec a priorizar nas perguntas (ex.: segurança, dados); opcional

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
varrer spec, achar ambiguidade alto-impacto → ≤5 perguntas, 1 por vez, resposta ≤5 palavras
 gravar Q/A em ## Clarifications, aplicar na seção certa, ¬contradição
 ∴ spec testável antes /sdp-plan
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
