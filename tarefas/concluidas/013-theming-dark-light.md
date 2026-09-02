# 013 — Fase 6: theming (next-themes, toggle claro/escuro)
Fase: 6
Status: concluída

## Objetivo
Instalar e configurar next-themes pra um toggle real de tema claro/escuro, desenhando uma paleta clara própria (não existia — a Fase 0 fixou tema único dark de propósito) mantendo a identidade Terminal Elegance e os acentos âmbar/teal.

## Arquivos afetados
package.json (next-themes), app/globals.css (paleta clara em :root, .dark preservado), components/theme-provider.tsx (novo), components/theme-toggle.tsx (novo), app/layout.tsx

## Decisões de design
- `--primary`/`--secondary` (âmbar/teal) e seus `-foreground` **não mudam** entre temas — contraste calculado contra a cor de acento, não contra o fundo.
- Fundo claro quase-branco (`#fafaf9`), não branco puro — ecoa a mesma filosofia do dark ("não é preto puro").
- `defaultTheme="dark"` + `enableSystem={false}`: não segue a preferência de SO por padrão, mantém a experiência atual (dark) como ponto de partida; usuário escolhe explicitamente.
- Toggle fixo no canto superior direito (`fixed top-4 right-4`) — o site não tem nav/header.

## Critérios de aceite
- Build de produção limpo. ✅
- Toggle alterna a classe `dark`/`light` no `<html>`, persiste após reload (localStorage do next-themes). ✅
- Zero warning de hydration mismatch no console. ✅
- Contraste WCAG AA verificado nos pares críticos do tema claro (calculado, não estimado). ✅

## Auditoria
Contraste calculado (fórmula WCAG, luminância relativa) pros pares novos do tema claro: foreground/background 16.96:1, muted-foreground/background 4.63:1, card-foreground/card 17.72:1, destructive/background 4.62:1, accent-foreground/accent 13.96:1 — todos passam AA (mín. 4.5:1). Verificado com Playwright real: clique no toggle troca a classe corretamente, reload preserva a escolha, zero warning de "hydrat" no console em nenhuma das duas passagens. Screenshot de ambos os temas conferido visualmente — sem regressão no dark, claro cria contraste correto em todos os elementos (marquee, hero, CTAs). `bunx tsc --noEmit && bun run lint && bun run build` limpos. CONVERGE.

**Nota sobre o padrão "mounted" do ThemeToggle:** usa o mesmo padrão já justificado em `components/ui/meteors.tsx` (client-only value, eslint-disable pontual e comentado) — mas é uma categoria diferente do bug de hydration da Fase 4/5: aqui o valor inicial (`mounted=false`) é IDÊNTICO em server e 1º paint do client, então não há divergência de estilo renderizado — só o ícone final aparece um instante depois do mount, sem nada travado invisível.
