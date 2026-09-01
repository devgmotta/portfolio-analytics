<!-- Gerado pelo Hub SDP a partir da skill `sdp-taskstoissues`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# sdp-taskstoissues

Use when you need to convert pending tasks from tasks.md into GitLab issues.

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
tasks.md → issues GitLab
 ¬GitLab remote ⇒ aborta
 MCP efêmero: remove stale ∀ início; remove ∀ fim
 task ¬[x] → 1 issue (título+descrição+labels)
 ¬duplica ∴ project_path = remote
 relata URLs criadas e falhas
```
