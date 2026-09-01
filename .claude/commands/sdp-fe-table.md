---
description: "Use when you need to display a collection of records with pagination, sorting and per-row actions in a page."
argument-hint: "<entity>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-table`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-table

Use when you need to display a collection of records with pagination, sorting and per-row actions in a page.

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade exibida na tabela (ex.: User)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
DataTable {{entity}}
 → colunas tipadas: header e accessor e cell
 → paginação
 → ordenação com indicador
 → ações linha: ver e editar e excluir
 → estados: vazio e carregando e erro
 → a11y: semântica tabela e teclado
 → ¬valor hardcoded ∴ vir de config

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
