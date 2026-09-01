---
description: "Use when a task has independent subtasks that can be worked on simultaneously; when sequential execution would create unnecessary bottlenecks"
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `dispatching-parallel-agents`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /dispatching-parallel-agents

Use when a task has independent subtasks that can be worked on simultaneously; when sequential execution would create unnecessary bottlenecks

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
despachar agentes paralelos
 → subtarefa independente ∴ paralelo
 → cada agente escopo isolado + contrato claro
 → ¬dependência cruzada pendente
 → sintetizar ao fim
 → sequencial só se há dependência
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
