#!/bin/sh
# Hub SDP — telemetria de uso por-comando (Cursor beforeSubmitPrompt). Gerado; não edite.
INPUT=$(cat 2>/dev/null)
SDP_T=$(sed -n 's/.*"x-sdp-token"[^"]*"\([^"]*\)".*/\1/p' .mcp.json .cursor/mcp.json "$HOME/.mcp.json" "$HOME/.cursor/mcp.json" 2>/dev/null | grep -v COLE_SEU_TOKEN_AQUI | head -1)
CMD=$(printf '%s' "$INPUT" | grep -oE '/sdp-[a-z0-9-]+' | head -1 | tr -d /)
[ -n "$CMD" ] && curl -fsSL --max-time 3 ${SDP_T:+-H "x-sdp-token: $SDP_T"} "https://hubsdp.apimg.tech/session/bootstrap?org_id=org_default&command=$CMD" >/dev/null 2>&1
printf '{"continue":true}'
