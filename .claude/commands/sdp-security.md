---
description: "Use when you need a security audit of the project, suspect leaked secrets or credentials, want OWASP/STRIDE threat coverage, or need a dependency vulnerability scan before release."
argument-hint: "<contexto>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-security`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-security

Use when you need a security audit of the project, suspect leaked secrets or credentials, want OWASP/STRIDE threat coverage, or need a dependency vulnerability scan before release.

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
auditoria 4 áreas: segredos, deps, OWASP, STRIDE
 → segredos: código e gitHistory (git log -p --all)
 → deps: bun/pip/cargo audit; sem tool ⇒ finding ausência
 → achado SEC-NNN severidade confiança
 → 9-10 ∴ leu trecho; segredo confirmado ⇒ Crítico
 → ¬declarar limpo sem scan; audit recente ¬isenta
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
