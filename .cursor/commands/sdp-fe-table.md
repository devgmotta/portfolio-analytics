<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-table`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-table

Use when you need to display a collection of records with pagination, sorting and per-row actions in a page.

**Argumentos desta skill:**
- `entity` (obrigatório) — entidade exibida na tabela (ex.: User)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
DataTable {{entity}}
 → colunas tipadas: header e accessor e cell
 → paginação
 → ordenação com indicador
 → ações linha: ver e editar e excluir
 → estados: vazio e carregando e erro
 → a11y: semântica tabela e teclado
 → ¬valor hardcoded ∴ vir de config

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
