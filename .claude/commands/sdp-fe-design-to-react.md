---
description: "Use when you have a design screenshot, Figma/Sketch/XD export, or wireframe and need the matching React component built"
argument-hint: "<nome>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-design-to-react`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-design-to-react

Use when you have a design screenshot, Figma/Sketch/XD export, or wireframe and need the matching React component built

**Argumentos desta skill:**
- `nome` (obrigatório) — nome do componente a gerar (ex.: UserProfileCard)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
design → componente React {{nome}}
 → arquivo kebab-case .tsx
 → named export ¬default
 → props tipadas e variants
 → Tailwind v4 e identity tokens var(--*)
 → ¬cores nem fontes hardcoded
 → Base UI p/ interativos
 → a11y: ARIA, foco, teclado
 → contraste ≥ WCAG AA

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
