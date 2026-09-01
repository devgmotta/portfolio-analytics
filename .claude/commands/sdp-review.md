---
description: "Use when an implementation phase or task is complete and needs spec compliance and code quality review before merging or closing."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-review`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-review

Use when an implementation phase or task is complete and needs spec compliance and code quality review before merging or closing.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
review 2 estágios
 Stage1 spec ∈ spec ¬aMais ¬aMenos → Stage2 qualidade
 Stage2 ¬iniciar antes Stage1 aprovado
 finding BUG|SEC|CONV|CLEAN confiança 1-10
 ≤3 iterações ∴ escalar
 ¬concordância performática
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
