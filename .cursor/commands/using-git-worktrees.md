<!-- Gerado pelo Hub SDP a partir da skill `using-git-worktrees`. Não edite à mão:
     reinstale (curl <hub>/install | sh) para atualizar. -->

# using-git-worktrees

Use when working on multiple features simultaneously; when you need an isolated environment for a branch without losing current work

Aplique a diretiva caveman abaixo, preenchendo cada `{{placeholder}}` com o que o
usuário pediu (o texto digitado após o comando). Se faltar contexto, pergunte antes.

```
git worktree p/ isolar trabalho
 → 1 worktree por branch tarefa
 → ¬poluir working tree principal
 → git worktree add criar
 → git worktree remove ao fim
 → commits isolados ∴ ¬conflito cruzado
```
