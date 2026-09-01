<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-expo-native-module`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-expo-native-module

Use when you need to access a device API or native platform capability that the Expo SDK does not cover, or when a JS-only implementation is too slow and the work must run in Swift/Kotlin.

**Argumentos desta skill:**
- `module-name` (obrigatório) — nome do modulo (kebab-case no diretorio, PascalCase na classe Swift/Kotlin)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
módulo nativo {{module-name}} ∈ modules/{{module-name}}/ → Swift iOS e Kotlin Android e binding TS
 → src/index.ts requireNativeModule tipado ¬any
 → chamada nativa → AsyncFunction que devolve Promise, erro → CodedError
 → rebuild dev client após mexer no nativo

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
