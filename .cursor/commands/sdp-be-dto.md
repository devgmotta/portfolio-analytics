<!-- Gerado pelo Hub SDP a partir da skill `sdp-be-dto`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-be-dto

Use when you need request or response payload contracts at a backend boundary, when a payload reaches a use case unvalidated, or when an internal entity leaks out the API

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade-alvo do DTO (ex.: User)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
DTO {{entity}} → create/update/response separados → schema Zod valida campo: required, min/max, formato, enum → required ↔ optional → response mapeia subset da entity ¬expor internals → export type infer p/ handlers → ¬hardcode

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
