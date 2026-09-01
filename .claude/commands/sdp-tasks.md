---
description: "Use when plan.md and spec.md exist but tasks.md has not been generated or is out of sync."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-tasks`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-tasks

Use when plan.md and spec.md exist but tasks.md has not been generated or is out of sync.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
config.yml models.tasks → tier
prereqs ⇒ FEATURE_DIR docs
plan.md spec.md ∈ specs/{NNN}/
Setup→Foundational→P2..Pn→Polish
∀ task: checkbox ID pathExato
[US#] ∈ P3..Pn ¬Setup ¬Foundational
[P] ↔ arquivosDistintos ¬depPendente
∀ FR# ≥1 task ∴ cobertura ¬xStoryDep
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
