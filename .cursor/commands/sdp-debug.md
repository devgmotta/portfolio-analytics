<!-- Gerado pelo Hub SDP a partir da skill `sdp-debug`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-debug

Use when a test fails, an error appears during implementation, or a bug resists the first fix attempt

**Argumentos desta skill:**
- `sintoma` (obrigatório) — sintoma observado (ex.: teste X falha, erro de null em Y)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

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
