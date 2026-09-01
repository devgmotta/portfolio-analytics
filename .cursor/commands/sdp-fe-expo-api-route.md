<!-- Gerado pelo Hub SDP a partir da skill `sdp-fe-expo-api-route`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-fe-expo-api-route

Use when adding a server-side endpoint inside an Expo Router app, when a BFF route is missing validation or auth, or when business logic leaks into an API route handler

**Argumentos desta skill:**
- `resource` (obrigatório) — recurso da rota (ex.: posts)
- `method` (obrigatório) — metodo HTTP (GET/POST/PUT/PATCH/DELETE)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
API route {{resource}} {{method}} → app/api/{{resource}} sufixo api, export nomeado por metodo → Request e Response Web Fetch, Zod valida body e params → auth HOF ¬ handler, erro Response.json tipado ¬ throw → ¬ side-effects modulo ∴ init lazy

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
