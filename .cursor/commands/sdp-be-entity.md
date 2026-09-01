<!-- Gerado pelo Hub SDP a partir da skill `sdp-be-entity`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-be-entity

Use when a domain concept needs a typed object with identity and self-validation

**Argumentos desta skill:**
- `entity` (obrigatório) — conceito de negócio (ex.: User)
- `context` (obrigatório) — bounded context (ex.: catalog)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
entity {{entity}} ∈ domain/{{context}} → ¬construtor público → static create(props) valida invariantes → ¬any → VOs ∀dado c/ regra → createdAt ∈ Props → exporta tipo → ¬Drizzle

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
