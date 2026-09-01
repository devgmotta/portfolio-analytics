---
description: "Use when a feature spec exists and needs requirement-quality audit before implementation."
argument-hint: "[topic]"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-checklist`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-checklist

Use when a feature spec exists and needs requirement-quality audit before implementation.

**Argumentos desta skill:**
- `topic` — domínio ou escopo (ex.: ux, api, security)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
checklist ∈ REQUISITO ¬implementação
 item → pergunta ∀ dimensão: completo claro consistente mensurável
 ¬verbosExecução (Clicar Testar Confirmar)
 [Gap] ∃ requisito ausente ∴ ≥80pct itens c/ rastreabilidade
 ID CHK incremental ¬reiniciar
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
