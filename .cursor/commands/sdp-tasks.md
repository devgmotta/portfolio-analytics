<!-- Gerado pelo Hub SDP a partir da skill `sdp-tasks`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-tasks

Use when plan.md and spec.md exist but tasks.md has not been generated or is out of sync.

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
config.yml models.tasks → tier
prereqs ⇒ FEATURE_DIR docs
plan.md spec.md ∈ specs/{NNN}/
Setup→Foundational→P2..Pn→Polish
∀ task: checkbox ID pathExato
[US#] ∈ P3..Pn ¬Setup ¬Foundational
[P] ↔ arquivosDistintos ¬depPendente
∀ FR# ≥1 task ∴ cobertura ¬xStoryDep
```
