---
description: "Use when a feature spec is approved and planning artifacts are missing before implementation begins."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-plan`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-plan

Use when a feature spec is approved and planning artifacts are missing before implementation begins.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
le .sdp/config.yml models.plan → tier
setup_plan.py --json → {FEATURE_SPEC} {SPECS_DIR} {BRANCH}
le {FEATURE_SPEC} e constitution.md
gates → ERROR
Phase 0: specs/{NNN}/research.md ¬clarificacoes
Phase 1: data-model.md contracts/ quickstart.md → update_agent_context.py
¬placeholder ¬path-relativo ∴ ¬trava
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
