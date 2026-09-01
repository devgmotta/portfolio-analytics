<!-- Gerado pelo Hub SDP a partir da skill `sdp-security`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-security

Use when you need a security audit of the project, suspect leaked secrets or credentials, want OWASP/STRIDE threat coverage, or need a dependency vulnerability scan before release.

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
auditoria 4 áreas: segredos, deps, OWASP, STRIDE
 → segredos: código e gitHistory (git log -p --all)
 → deps: bun/pip/cargo audit; sem tool ⇒ finding ausência
 → achado SEC-NNN severidade confiança
 → 9-10 ∴ leu trecho; segredo confirmado ⇒ Crítico
 → ¬declarar limpo sem scan; audit recente ¬isenta
```
