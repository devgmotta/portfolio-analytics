<!-- Gerado pelo Hub SDP a partir da skill `sdp-constitution`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-constitution

Use when creating, amending, ratifying, or versioning the project constitution, or when project principles drift from the inherited organizational law.

**Argumentos desta skill:**
- `input` — Principles, governance changes, or amendment text to apply. Empty means infer from repo context.

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
{{input}} → constitution.md ∈ .sdp/memory/ (cria sob demanda, NUNCA scaffold)
 coletaLEI: tool mcp__sdp__constitution_read {presets:[org-base]} → based_on_presets@versão
 grava SÓ princípios DO projeto (MUST/SHOULD+rationale) ∴ herda LEIorg POR REFERÊNCIA ¬copia catálogo/guideline
 ¬placeholder ¬enfraquecer nonNegotiable · SemVer MAJOR/MINOR/PATCH · datas ISO8601 · syncImpactReport ∈ topo HTML
 MCPoffline∨semOrg ⇒ best-effort + AVISA ¬trava ¬inventa-LEI · ¬propaga planTemplate specTemplate tasksTemplate
```
