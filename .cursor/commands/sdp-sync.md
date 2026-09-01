<!-- Gerado pelo Hub SDP. -->

# sdp-sync

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

Lê o token do `.cursor/mcp.json`/`.mcp.json` e regenera `.cursor/commands/` (e `.claude/commands/`)
com TODAS as skills. Depois, **recarregue a janela do Cursor** (Developer: Reload Window) para indexar os comandos novos.
