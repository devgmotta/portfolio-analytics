# 002 — Tokens de design "Terminal Elegance"
Fase: 0
Status: concluída

## Objetivo
Traduzir o protótipo Stitch para tokens shadcn (HSL) em app/globals.css e tailwind.config.ts: background/foreground/primary(âmbar)/secondary(teal)/card/border/radius, com --primary-foreground e --secondary-foreground escuros (contraste WCAG AA), keyframes shimmer-slide/spin-around/marquee/marquee-vertical/meteor, utilities glass-card/spotlight-card/bg-noise.

## Arquivos afetados
tailwind.config.ts, app/globals.css

## Critérios de aceite
- Nenhum hex "cru" fora de globals.css (componentes usam só classes Tailwind derivadas dos tokens).
- Contraste de --primary-foreground sobre --primary e --secondary-foreground sobre --secondary ≥ 4.5:1 (calculado).
- `next build` limpo.

## Auditoria
DIVERGE → CONVERGE (ver seção "Resolução da auditoria" abaixo).

## Resolução da auditoria (agente independente a9f9a47b508f9c5b6)

**Findings recebidos:**
1. [MÉDIO-ALTO] `components/ui/shimmer-button.tsx` tinha hex cru (`#ffffff`, `#ffffff1f`, `#ffffff3f`) e classes `text-white`/`border-white/10` fora da camada de token.
2. [BAIXO] `components/ui/dialog.tsx:34` usava `bg-black/10` (paleta Tailwind crua, não token).
4. [BAIXO/INFO] Ausência de `color-scheme: dark` — controles nativos do navegador (scrollbar, etc.) podiam seguir o tema do SO em vez do tema forçado do site.

**Resposta com evidência:**
1. Corrigido: defaults trocados para `var(--primary)`/`var(--primary-foreground)`; sombras internas trocadas de hex para `color-mix(in oklab, var(--foreground) N%, transparent)`; `border-white/10` → `border-border`; `text-white` → `text-primary-foreground`.
2. Corrigido: `bg-black/10` → `bg-background/80` (token `--background`, já é quase preto).
   Extra (fora do escopo original, achado no meu próprio sweep pós-fix): `components/ui/meteors.tsx` também tinha `bg-zinc-500`, `from-zinc-500` e `shadow-[...#ffffff10]` — corrigidos para `bg-muted-foreground`/`from-muted-foreground`/`color-mix(...)`.
4. Corrigido: `color-scheme: dark;` adicionado ao bloco `:root, .dark`.

**Verificação:** `grep -rn "#[0-9a-fA-F]\{3,6\}\|zinc-\|bg-white\|bg-black\|text-white\b" app components --include="*.tsx" --include="*.ts" | grep -v globals.css` → vazio. `bun run lint && bunx tsc --noEmit && bun run build` → todos limpos (evidência rodada após as correções).

**Convergência:** sim, findings 1 e 2 corrigidos com evidência de grep zero-hits + build/lint/typecheck verde. Nenhuma divergência pendente.
