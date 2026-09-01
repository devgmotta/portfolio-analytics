<!-- Gerado pelo Hub SDP a partir da skill `sdp-mr-checklist`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-mr-checklist

Use when a GitLab MR exists and test plan checkboxes need to be populated before review.

**Argumentos desta skill:**
- `iid` — IID do MR a processar (ex.: !42). Opcional — detectado automaticamente pelo branch atual se omitido.

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
após MR, evidência ∈ (tasks.md [x], git log, arquivos)
∀ checkbox: evidência ⇒ [x], senão [ ] + needs
MCP ativado ∴ usar → remover; ¬órfão
status ∈ {DONE,DONE_WITH_CONCERNS,BLOCKED,NEEDS_CONTEXT}
```
