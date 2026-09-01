---
description: "Sincroniza os slash commands /<skill> com o catálogo atual do Hub SDP (skills novas/atualizadas)"
argument-hint: "(sem argumentos)"
---

<!-- Gerado pelo Hub SDP. -->

# /sdp-sync

Ressincronize os comandos deste projeto com o catálogo mais recente do Hub SDP.

Rode no terminal (**Bash/WSL — não PowerShell**):

```sh
TOKEN=$(sed -n 's/.*"x-sdp-token"[^"]*"\([^"]*\)".*/\1/p' .cursor/mcp.json .mcp.json "$HOME/.cursor/mcp.json" "$HOME/.mcp.json" 2>/dev/null | grep -v COLE_SEU_TOKEN_AQUI | head -1)
if [ -n "$TOKEN" ]; then
  curl -fsSL -H "x-sdp-token: $TOKEN" 'https://hubsdp.apimg.tech/install' | sh
else
  echo "Sem token em .mcp.json/.cursor/mcp.json — cole seu x-sdp-token (ou rode /sdp-connect) e tente de novo."
fi
```

Lê o seu token do `.mcp.json`/`.cursor/mcp.json` e regenera `.claude/commands/` (e
`.cursor/commands/`) com TODAS as skills publicadas, idempotente. **Depois, reinicie o Claude Code
(ou abra uma nova sessão)** para indexar os comandos — slash commands só são descobertos no início da sessão.
