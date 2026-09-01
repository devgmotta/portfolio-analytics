<!-- Gerado pelo Hub SDP a partir da skill `sdp-be-router`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-be-router

Use when you need to expose REST endpoints for a resource, wire HTTP methods to handlers, or group routes under a path prefix in a backend

**Argumentos desta skill:**
- `resource` (obrigatório) — recurso REST (ex.: products)
- `prefix` (obrigatório) — prefixo de path do grupo (ex.: /products)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
router {{resource}}
 → grupo prefixo {{prefix}}
 → métodos HTTP → handlers
 → middleware ordem auth → validação → handler
 → REST plural
 → router fino ¬lógica negócio
 → ¬valores hardcoded

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
