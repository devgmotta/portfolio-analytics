<!-- Gerado pelo Hub SDP a partir da skill `sdp-qa`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-qa

Use when you need to verify that the implementation actually works, when you need an evidence-based quality score before review, or when automated checks have not been run after recent changes

**Argumentos desta skill:**
- `tier` — nível de QA: quick | standard | exhaustive (padrão: standard)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
QA pós-impl → detectar tools reais ¬assumir → rodar testes, lint e tipos → health 0-10 só com evidência ¬nota sem rodar → fix atômico 1 por commit, re-verificar após cada → ¬auto-fix testes → regressão ⇒ reverter → status DONE ou BLOCKED
```
