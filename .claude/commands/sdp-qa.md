---
description: "Use when you need to verify that the implementation actually works, when you need an evidence-based quality score before review, or when automated checks have not been run after recent changes"
argument-hint: "[tier]"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-qa`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-qa

Use when you need to verify that the implementation actually works, when you need an evidence-based quality score before review, or when automated checks have not been run after recent changes

**Argumentos desta skill:**
- `tier` — nível de QA: quick | standard | exhaustive (padrão: standard)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
QA pós-impl → detectar tools reais ¬assumir → rodar testes, lint e tipos → health 0-10 só com evidência ¬nota sem rodar → fix atômico 1 por commit, re-verificar após cada → ¬auto-fix testes → regressão ⇒ reverter → status DONE ou BLOCKED
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
