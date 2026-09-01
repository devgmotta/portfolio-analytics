<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-page`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-page

Use when you need to scaffold a new routed view for a feature

**Argumentos desta skill:**
- `nome` (obrigatório) — nome da página/rota (ex.: Dashboard)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
page {{nome}} container de rota
 → resolve template do preset primeiro
 → compõe layout e slots
 → data fetching pela convenção do preset
 → estados loading e error
 → reusa sdp-fe-ui-*
 → title e metadata para a11y
 → ¬valores hardcoded ∴ vem de config
 → camada presentation

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
