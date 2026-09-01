---
description: "Use when you need to convert pending tasks from tasks.md into GitLab issues."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-taskstoissues`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-taskstoissues

Use when you need to convert pending tasks from tasks.md into GitLab issues.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
tasks.md → issues GitLab
 ¬GitLab remote ⇒ aborta
 MCP efêmero: remove stale ∀ início; remove ∀ fim
 task ¬[x] → 1 issue (título+descrição+labels)
 ¬duplica ∴ project_path = remote
 relata URLs criadas e falhas
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
