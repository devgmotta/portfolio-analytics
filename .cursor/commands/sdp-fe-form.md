<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-form`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-form

Use when a screen needs to collect user input for an entity.

**Argumentos desta skill:**
- `entity` (obrigatório) — nome da entidade em PascalCase (ex.: Usuario)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
form {{entity}} → compõe sdp-fe-ui-* por campo → state via lib preset → schema lib preset por campo → erro ↔ aria-describedby ∈ label → submit: loading ∴ success | error → create ↔ edit → ¬hardcode config

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
