<!-- Gerado pelo Hub SDP a partir da skill `sdp-be-handler`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-be-handler

Use when adding or changing an HTTP endpoint that exposes a backend use case, when a request reaches the use case without being validated, or when business logic is leaking into the transport layer

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade-alvo do handler (ex.: Preset)
- `operation` (obrigatório) — operação do caso de uso (ex.: create, list)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
handler {{entity}}.{{operation}} → camada infra ¬ regra negócio → valida body Zod, safeParse falha → 422 → delega use case via DI → mapError no catch → NotFoundError → 404 ∴ handler fino

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
