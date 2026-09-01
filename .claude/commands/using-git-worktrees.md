---
description: "Use when working on multiple features simultaneously; when you need an isolated environment for a branch without losing current work"
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `using-git-worktrees`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /using-git-worktrees

Use when working on multiple features simultaneously; when you need an isolated environment for a branch without losing current work

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
git worktree p/ isolar trabalho
 → 1 worktree por branch tarefa
 → ¬poluir working tree principal
 → git worktree add criar
 → git worktree remove ao fim
 → commits isolados ∴ ¬conflito cruzado
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
