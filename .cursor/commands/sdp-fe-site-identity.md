<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-site-identity`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-site-identity

Use when you need to match an existing brand from a live site URL or screenshots, redesign while keeping its look, or audit visual consistency across SDP projects.

**Argumentos desta skill:**
- `fonte` (obrigatório) — origem da identidade (URL do site ou screenshots em .sdp/media/inbox/)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
extrair identidade de {{fonte}}
 → tokens: cores, fontes, spacing, radius, shadows
 → mapear papéis semânticos
 → validar contraste WCAG AA ≥4.5:1
 → relatório → diff frontend.identity em .sdp/config.yml
 → ¬auto-aplicar ∴ user aprova

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
