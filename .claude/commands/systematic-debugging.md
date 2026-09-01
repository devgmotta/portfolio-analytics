---
description: "Use when diagnosing a bug before writing any fix; when a problem has no obvious cause; when you find yourself about to \"try something and see if it works\" without a clear hypothesis"
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `systematic-debugging`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /systematic-debugging

Use when diagnosing a bug before writing any fix; when a problem has no obvious cause; when you find yourself about to "try something and see if it works" without a clear hypothesis

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
debug sistemático
 → reproduzir 1o ¬supor
 → mapear stack observação → execução
 → 1 hipótese 1 mudança ∴ verificar
 → ¬shotgun
 → teste falha-antes passa-depois
 → causa raiz ¬sintoma
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
