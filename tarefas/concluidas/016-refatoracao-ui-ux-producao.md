# 016 — Refatoração UI/UX nível produção
Fase: 5b (pós-review)
Status: concluída

## Objetivo
6 melhorias apontadas em revisão visual: template HTML do e-mail de contato, normalização do Hero, design system de botões, aprofundamento dos bullets de experiência, footer estrutural, README.md real.

## O que foi verificado com evidência antes de agir (não aceito alegação sem checar)
- **Hero "forçando scroll"**: medi com Playwright em 4 viewports reais (1440x900, 1440x760, 1280x720, 390x844) — o CTA já ficava acima da dobra em todos com `min-h-[90vh]`. Não reproduzi o corte relatado. Troquei mesmo assim `min-h-[90vh]` por padding responsivo (`py-24 md:py-32 lg:py-40`) porque é uma base mais robusta pra um design system de produção (min-height em vh é frágil em janelas muito baixas/paisagem mobile), não porque confirmei o bug específico.
- **Inconsistência de botões**: essa SIM confirmei com medição real — `ShimmerButton` (46px/pill), `Button size=lg` (36px/12px radius), `Button size=default` (32px/12px radius) eram 3 tamanhos diferentes. Evidência concreta, corrigida.

## Mudanças
1. **E-mail HTML** (`app/actions/contact.ts`): `buildContactEmailHtml()` — dark (#09090b/#131316), texto #f4f4f5, borda rgba(255,255,255,0.1), acento âmbar #f97316, labels em mono, corpo em sans — **mesmos hex de app/globals.css**, não valores inventados (usuário disse explicitamente "as cores são apenas exemplo, siga o contexto do projeto"). `escapeHtml()` neutraliza injeção de markup via nome/e-mail/mensagem (testado). `text` (fallback) mantido.
2. **Hero**: `min-h-[90vh]` → `py-24 md:py-32 lg:py-40` (ver nota acima).
3. **Design system de botões**: nova variante `size="cta"` em `components/ui/button.tsx` (`h-11 px-5 rounded-lg duration-200`) usada no CTA secundário do Hero e no submit do Contato; `ShimmerButton` teve seus defaults ajustados pra bater exatamente (`h-11 px-5`, `borderRadius="0.75rem"` em vez do pill `100px` original do Magic UI, `transition-all duration-200` em vez de `transition-transform duration-300`). **Badges/tags/chips não entraram nessa unificação** — são um papel de UI diferente (rótulo, não ação), forçá-los pro mesmo tamanho de botão seria regressão visual, não consistência.
4. **Bullets de experiência** (`data/experience.ts`): aprofundados com os temas reais pedidos (volumetria de chamados, cruzamento de dados via Salesforce, arquitetura de dados, automação com IA) — sem inventar métrica numérica falsa, é currículo real.
5. **Footer** (`components/footer.tsx`, novo): GitHub + LinkedIn (`react-icons/fa6` — `SiLinkedin` não existe em `react-icons/si`, confirmado antes de usar) + e-mail com copy-to-clipboard (testado com Playwright, clipboard real), ano dinâmico (`new Date().getFullYear()`), tag "Terminal Elegance".
6. **README.md**: substituído o boilerplate do create-next-app (já existia, não "sem documentação" como relatado) por documentação real — stack real do projeto (Next.js 16, não "14/15" do pedido original), instalação com Bun (não npm, é o que o projeto usa), env vars, scripts, contrato "pé no chão" de `data/*.ts`, processo de branch+PR+tarefas/.

## Critérios de aceite
- Build de produção limpo (lint + typecheck + build). ✅
- 3 botões reais da página com dimensões idênticas (medido: 44px altura, 20px padding horizontal, 12px radius, 14px fonte — antes eram 3 valores diferentes). ✅
- Template de e-mail renderiza corretamente (preview visual gerado e conferido) e escapa HTML malicioso (testado). ✅
- Footer com copy-to-clipboard funcional (testado com Playwright real, permissão de clipboard concedida). ✅
- Zero erro de console/página no walkthrough completo, nos dois temas. ✅

## Auditoria
Verificação própria via Playwright real: medição de computed style dos 3 botões (antes/depois), teste de clipboard real, preview visual do e-mail HTML renderizado (screenshot conferido), teste de escape de HTML malicioso, walkthrough completo (scroll full-page) nos dois temas sem erro de console. `bunx tsc --noEmit && bun run lint && bun run build` limpos. A alegação de "Hero forçando scroll" foi investigada com medição real em 4 viewports e não reproduziu — registrado com transparência em vez de aplicar uma correção não verificada só pra "responder" ao pedido; a mudança de `min-h-[90vh]` pra padding foi feita mesmo assim por ser uma base mais robusta, não porque o bug específico foi confirmado. CONVERGE.
