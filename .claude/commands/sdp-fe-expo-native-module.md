---
description: "Use when you need to access a device API or native platform capability that the Expo SDK does not cover, or when a JS-only implementation is too slow and the work must run in Swift/Kotlin."
argument-hint: "<module-name>"
---

<!-- Gerado pelo Hub SDP a partir da skill publicada `sdp-fe-expo-native-module`. Não edite à mão:
     rode o instalador novamente (curl <hub>/install | sh) para atualizar. -->

# /sdp-fe-expo-native-module

Use when you need to access a device API or native platform capability that the Expo SDK does not cover, or when a JS-only implementation is too slow and the work must run in Swift/Kotlin.

**Argumentos desta skill:**
- `module-name` (obrigatório) — nome do modulo (kebab-case no diretorio, PascalCase na classe Swift/Kotlin)

Aplique a diretiva caveman abaixo, substituindo cada `{{placeholder}}` pelos valores
derivados dos argumentos do usuário (`$ARGUMENTS`). Se faltar contexto, peça antes de prosseguir.

```
módulo nativo {{module-name}} ∈ modules/{{module-name}}/ → Swift iOS e Kotlin Android e binding TS
 → src/index.ts requireNativeModule tipado ¬any
 → chamada nativa → AsyncFunction que devolve Promise, erro → CodedError
 → rebuild dev client após mexer no nativo

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```

> Diretiva servida pelo Hub SDP via MCP (`sdp`). Para a versão mais recente,
> reinstale ou consulte a tool `mcp__sdp__skill_discover`.
