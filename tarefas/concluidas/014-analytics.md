# 014 — Fase 7: Analytics (@vercel/analytics + GA4)
Fase: 7
Status: concluída

## Objetivo
Instalar `@vercel/analytics` (automático, sem configuração) e GA4 via `@next/third-parties/google`, sem quebrar o build quando o ID de medição do GA4 não estiver configurado.

## Arquivos afetados
package.json (@vercel/analytics, @next/third-parties), app/layout.tsx, lib/site.ts (GA_MEASUREMENT_ID), .env.example (novo)

## Decisão
`GoogleAnalytics` só renderiza se `NEXT_PUBLIC_GA_MEASUREMENT_ID` estiver definida — não existe ainda (não tenho a propriedade GA4 real, não vou inventar um ID). `.env.example` documenta as 3 env vars do projeto (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `RESEND_API_KEY` — a última usada na próxima fase).

## Critérios de aceite
- Build de produção limpo, sem a env var do GA definida (não quebra). ✅
- Zero erro de console com o `<Analytics />` da Vercel presente em ambiente de dev (sem projeto Vercel real conectado localmente). ✅

## Auditoria
Verificação própria: `bunx tsc --noEmit && bun run lint && bun run build` limpos; Playwright confirma zero erro de console/página na home com os dois componentes de analytics montados (GA não renderiza por falta da env var, exatamente como projetado). CONVERGE.
