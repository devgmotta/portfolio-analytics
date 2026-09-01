<!-- Gerado pelo Hub SDP a partir da skill `sdp-plan`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-plan

Use when a feature spec is approved and planning artifacts are missing before implementation begins.

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
le .sdp/config.yml models.plan → tier
setup_plan.py --json → {FEATURE_SPEC} {SPECS_DIR} {BRANCH}
le {FEATURE_SPEC} e constitution.md
gates → ERROR
Phase 0: specs/{NNN}/research.md ¬clarificacoes
Phase 1: data-model.md contracts/ quickstart.md → update_agent_context.py
¬placeholder ¬path-relativo ∴ ¬trava
```
