# 010 — experience-timeline-section.tsx
Fase: 3
Status: concluída

**Desvio descoberto:** `BorderBeam` (Fase 2) usa animação JS-driven da lib `motion`, não uma classe CSS `.animate-*` — meu `@media (prefers-reduced-motion: reduce)` em globals.css (que só desliga classes CSS) não a cobria. Criado `components/motion-provider.tsx` (`<MotionConfig reducedMotion="user">`) envolvendo `{children}` em `app/layout.tsx`.

**Correção adicional pós-auditoria:** `MotionConfig reducedMotion="user"` só neutraliza propriedades posicionais/transform (x/y/scale/...) — `opacity` fica de fora (confirmado no código-fonte de `motion-dom`, `positionalKeys` não inclui `opacity`). O fade do reveal desta Timeline continuava animando mesmo com `prefers-reduced-motion: reduce`. Corrigido com `useReducedMotion()` local: quando `true`, `initial={false}` e `whileInView={undefined}` — desliga o reveal por completo, não só o deslocamento.

## Objetivo
Timeline vertical custom (Tailwind puro: border-l-2 border-secondary/40, marcador rounded-full bg-secondary) mapeando data/experience.ts, reveal via motion whileInView, números/datas/SLA em font-mono; compor em app/page.tsx (última seção).

## Arquivos afetados
components/sections/experience-timeline-section.tsx, app/page.tsx

## Critérios de aceite
- Reveal respeita prefers-reduced-motion (sem animação se o usuário preferir).
- Legível e alinhado em mobile e desktop.

## Auditoria
Auditor independente (agente ac3afd36a898bc009) encontrou 1 finding bloqueante e 2 observações não-bloqueantes:

1. **[MÉDIO] `MotionConfig` não cobria opacity, só transform** — ver "Correção adicional" acima. Rastreado até `node_modules/motion-dom/dist/es/render/utils/keys-position.mjs` (o set `positionalKeys` não inclui `opacity`), não foi suposição. **Corrigido.**
2. **[BAIXO/INFO] `list-style: none` sem `role="list"`** pode fazer Safari/VoiceOver mais antigo parar de anunciar a lista — herdado do preflight do Tailwind em todo o site, não introduzido por esta fase, mas como criei 2 listas novas aqui, **corrigido** mesmo assim: `role="list"` no `<ol>` e no `<ul>` de bullets.
3. **[INFO] `max-w-3xl` (Timeline) vs `max-w-6xl` (Projects)** — confirmando: é deliberado, coluna mais estreita melhora a legibilidade de uma timeline de texto corrido.

Não-findings verificados pelo auditor: hex fora de token (zero ocorrências), `viewport={{margin:"-80px"}}` não trava o reveal em nenhum dispositivo real, conteúdo com métricas concretas (não genérico), tipagem sem `any`.

Verificação pós-fix: `bunx tsc --noEmit && bun run lint && bun run build` limpos. CONVERGE.
