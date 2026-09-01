# 001 — Scaffold Next.js + git init
Fase: 0
Status: concluída

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
Auditor independente (agente a9f9a47b508f9c5b6) confirmou: build/lint/typecheck limpos (evidência própria rodada por ele), `.gitignore` mesclado preservando as 4 regras pré-existentes (`.mcp.json`, `.mcp.json.bak`, `.cursor/mcp.json`, `.cursor/mcp.json.bak`), nenhum arquivo com token de API commitado (`git log --all -- .mcp.json*` vazio). CONVERGE sem findings nesta tarefa. Findings de outras tarefas da Fase 0 estão detalhados em `002-tailwind-tokens-design-system.md`.
