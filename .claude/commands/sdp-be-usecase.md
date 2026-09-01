---
description: "Use when a backend operation spans services/repos, handler logic grows fat, or a transaction needs one owner"
argument-hint: "<operation> <contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-be-usecase`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-be-usecase

Use when a backend operation spans services/repos, handler logic grows fat, or a transaction needs one owner

**Argumentos desta skill:**
- `operation` (obrigatório) — operação/intenção (ex: CreateSkillDraft)
- `contexto` (obrigatório) — bounded-context em src/application/ (ex: catalog)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
{{operation}} em src/application/{{contexto}}/<nome>.usecase.ts → <Operacao>UseCase: ctor recebe deps via DI ¬instanciar → execute(Input): Promise<Output> → orquestra repos e services ¬regra domínio → throw ValidationError|NotFoundError|ConflictError|<DomainError> ¬Result → log?.info início e fim

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
