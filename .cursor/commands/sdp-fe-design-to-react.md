<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-design-to-react`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-design-to-react

Use when you have a design screenshot, Figma/Sketch/XD export, or wireframe and need the matching React component built

**Argumentos desta skill:**
- `nome` (obrigatório) — nome do componente a gerar (ex.: UserProfileCard)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

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
