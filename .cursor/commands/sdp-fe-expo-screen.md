<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-expo-screen`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-expo-screen

Use when adding a route under app/ in an Expo Router app, when a screen renders blank while loading, when a data error is swallowed silently, or when logic leaks into app/

**Argumentos desta skill:**
- `recurso` (obrigatório) — recurso/entidade da tela (ex.: post)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
tela Expo Router {{recurso}} → export default wrapper fino mais componente nomeado → useLocalSearchParams<Params> tipado, header via Stack.Screen → loading ActivityIndicator, erro inline ¬ engolir → ¬ regra negócio em app, dados via hook src/features → SafeArea mais a11y

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
