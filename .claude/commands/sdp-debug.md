---
description: "Use when a test fails, an error appears during implementation, or a bug resists the first fix attempt"
argument-hint: "<sintoma>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-debug`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-debug

Use when a test fails, an error appears during implementation, or a bug resists the first fix attempt

**Argumentos desta skill:**
- `sintoma` (obrigatório) — sintoma observado (ex.: teste X falha, erro de null em Y)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
¬fix sem causa-raiz
 → ler erro completo
 → reproduzir e rodar git diff
 → rastrear fluxo de dados
 → 1 hipótese por vez
 → teste falho primeiro
 → fix na raiz ¬ no sintoma
 → ≥3 tentativas falhas ∴ escalar
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
