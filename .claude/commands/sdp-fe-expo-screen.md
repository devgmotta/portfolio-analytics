---
description: "Use when adding a route under app/ in an Expo Router app, when a screen renders blank while loading, when a data error is swallowed silently, or when logic leaks into app/"
argument-hint: "<recurso>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-expo-screen`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-expo-screen

Use when adding a route under app/ in an Expo Router app, when a screen renders blank while loading, when a data error is swallowed silently, or when logic leaks into app/

**Argumentos desta skill:**
- `recurso` (obrigatório) — recurso/entidade da tela (ex.: post)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
tela Expo Router {{recurso}} → export default wrapper fino mais componente nomeado → useLocalSearchParams<Params> tipado, header via Stack.Screen → loading ActivityIndicator, erro inline ¬ engolir → ¬ regra negócio em app, dados via hook src/features → SafeArea mais a11y

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
