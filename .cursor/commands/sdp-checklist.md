<!-- Gerado pelo Hub SDP a partir da skill `sdp-checklist`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-checklist

Use when a feature spec exists and needs requirement-quality audit before implementation.

**Argumentos desta skill:**
- `topic` — domínio ou escopo (ex.: ux, api, security)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
checklist ∈ REQUISITO ¬implementação
 item → pergunta ∀ dimensão: completo claro consistente mensurável
 ¬verbosExecução (Clicar Testar Confirmar)
 [Gap] ∃ requisito ausente ∴ ≥80pct itens c/ rastreabilidade
 ID CHK incremental ¬reiniciar
```
