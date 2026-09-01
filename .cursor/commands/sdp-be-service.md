<!-- Gerado pelo Hub SDP a partir da skill `sdp-be-service`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-be-service

Use when domain business logic spans multiple entities or repositories, when rules or transactions are leaking into a handler or use case, or when persistence and HTTP concerns are mixed into one class

**Argumentos desta skill:**
- `service` (obrigatório) — concern de domínio do service (ex.: Product)

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
service {{service}} → camada application ou domain → orquestra entidades e repos → repo via DI ¬ new interno → regra negócio aqui → retorna tipo domínio ¬ HTTP → erro domínio ¬ genérico → 1 responsabilidade → path do preset

⚠ antes de [X]: auditor adversarial (subagente, tier medium) REFUTA esta saída; trate findings.
```
