<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-filter`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-filter

Use when you need a filter bar that lets users search and narrow down a list or data table by one or more fields

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade/dados a filtrar (ex.: Pedido)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
barra de filtro {{entity}}
 → compõe inputs sdp-fe-ui
 → estado controlado: limpar e resetar
 → texto com debounce
 → emite mudança para o pai
 → sincroniza com URL query
 → responsivo: horizontal ↔ empilhado
 → ¬valores hardcoded

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
