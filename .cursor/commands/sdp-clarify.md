<!-- Gerado pelo Hub SDP a partir da skill `sdp-clarify`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-clarify

Use when a feature spec has vague adjectives, open decisions or TODO markers and you need to resolve them before planning, or when acceptance criteria are not yet testable.

**Argumentos desta skill:**
- `foco` — área da spec a priorizar nas perguntas (ex.: segurança, dados); opcional

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
varrer spec, achar ambiguidade alto-impacto → ≤5 perguntas, 1 por vez, resposta ≤5 palavras
 gravar Q/A em ## Clarifications, aplicar na seção certa, ¬contradição
 ∴ spec testável antes /sdp-plan
```
