<!-- Gerado pelo Hub SDP a partir da skill `sdp-specify`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-specify

Use when requirements are vague and must become measurable acceptance criteria, or when a feature branch does not exist yet.

**Argumentos desta skill:**
- `description` (obrigatório) — Descrição em linguagem natural da feature a especificar

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
spec: {{description}}
 → WHAT e WHY ¬HOW
 → ¬stack/API/schema
 → requisitos testáveis ¬ambíguos
 → success criteria mensurável tech-agnostic
 → cenários e edge cases
 → escopo delimitado
 → ≤3 [NEEDS CLARIFICATION] ¬scope-creep
```
