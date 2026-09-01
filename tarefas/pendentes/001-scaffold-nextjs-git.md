# 001 — Scaffold Next.js + git init
Fase: 0
Status: pendente

## Objetivo
Inicializar o projeto Next.js 15 (App Router, TypeScript, Tailwind, ESLint) com Bun no diretório atual, preservando os arquivos de governança existentes (cabresto-conceitual*.md, .claude/, .cursor/, .mcp.json, .idea/), e inicializar git.

## Arquivos afetados
package.json, bun.lock, next.config.ts, tsconfig.json, tailwind.config.ts, postcss.config.js, eslint.config.mjs, app/layout.tsx, app/page.tsx, app/globals.css, public/, .gitignore (expandir), .git/

## Critérios de aceite
- `bun run dev` sobe sem erro.
- Arquivos de governança preservados intactos.
- `.gitignore` cobre node_modules/, .next/, .env*.local, coverage/.
- Primeiro commit git criado.

## Auditoria
(preenchido ao concluir)
