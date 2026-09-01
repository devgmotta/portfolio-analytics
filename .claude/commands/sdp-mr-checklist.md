---
description: "Use when a GitLab MR exists and test plan checkboxes need to be populated before review."
argument-hint: "[iid]"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-mr-checklist`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-mr-checklist

Use when a GitLab MR exists and test plan checkboxes need to be populated before review.

**Argumentos desta skill:**
- `iid` — IID do MR a processar (ex.: !42). Opcional — detectado automaticamente pelo branch atual se omitido.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
após MR, evidência ∈ (tasks.md [x], git log, arquivos)
∀ checkbox: evidência ⇒ [x], senão [ ] + needs
MCP ativado ∴ usar → remover; ¬órfão
status ∈ {DONE,DONE_WITH_CONCERNS,BLOCKED,NEEDS_CONTEXT}
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
