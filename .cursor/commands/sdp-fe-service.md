<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-service`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-service

Use when a component is calling fetch or axios directly, when API URLs and request shapes are scattered across pages, or when you need a typed client layer for an API resource

**Argumentos desta skill:**
- `resource` (obrigatório) — recurso/entidade da API (ex.: User)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
service {{resource}} → camada infra ¬HTTP em componente → tipos de request e response → CRUD list getById create update delete → erro normalizado tipado → paginação limit offset ou cursor → baseURL ∈ env → cliente HTTP do preset → ¬valor hardcoded

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
