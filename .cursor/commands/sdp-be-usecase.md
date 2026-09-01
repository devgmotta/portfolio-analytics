<!-- Gerado pelo Hub SDP a partir da skill `sdp-be-usecase`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-be-usecase

Use when a backend operation spans services/repos, handler logic grows fat, or a transaction needs one owner

**Argumentos desta skill:**
- `operation` (obrigatório) — operação/intenção (ex: CreateSkillDraft)
- `contexto` (obrigatório) — bounded-context em src/application/ (ex: catalog)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
{{operation}} em src/application/{{contexto}}/<nome>.usecase.ts → <Operacao>UseCase: ctor recebe deps via DI ¬instanciar → execute(Input): Promise<Output> → orquestra repos e services ¬regra domínio → throw ValidationError|NotFoundError|ConflictError|<DomainError> ¬Result → log?.info início e fim

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
