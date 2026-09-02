# 022 — Refinamento do template de e-mail (Resend)
Fase: 9 (refatoração sênior — pilar 4)
Status: concluída

## Objetivo
O template HTML do e-mail de contato já existia (tarefa 015/016), mas não batia exatamente com a spec pedida agora: borda `rgba(255,255,255,0.1)` em vez de `#27272a`, sem destaque de "resposta rápida" no e-mail, e a mensagem sem bloco de citação isolado.

## Arquivos afetados
- Novo: `lib/email-templates/contact-email.ts` (`buildContactEmailHtml()` + `escapeHtml()`, movidos daqui).
- `app/actions/contact.ts`: passa a importar `buildContactEmailHtml` do módulo novo.

## Decisões
- Extração pra `lib/email-templates/contact-email.ts` **não foi estética** — foi necessidade técnica: `app/actions/contact.ts` é `"use server"`, e um módulo `"use server"` só pode exportar funções `async` (restrição do Next.js). `buildContactEmailHtml` é síncrona; pra deixá-la testável (critério de aceite pede inspecionar o HTML gerado), precisa morar fora do módulo de Server Action.
- `#27272a` é o hex literal de `--accent`/`--border` do tema escuro em `app/globals.css` (não um valor inventado — clientes de e-mail não leem `var()` de forma confiável, mesmo motivo já documentado no código pra `#09090b`/`#f4f4f5`/etc).
- "E-mail de resposta rápida" = o link `mailto:` já existente, com destaque visual reforçado (label explícito) — não é um recurso novo, é dar mais peso ao que já existia.

## Critérios de aceite
- [x] `background-color:#09090b` no body (já era, mantido).
- [x] Borda do card principal `#27272a` (era `rgba(255,255,255,0.1)`).
- [x] Cabeçalhos (Nome/E-mail/Mensagem) em mono espaçado (já eram, mantido).
- [x] Nome e e-mail de resposta rápida em destaque visual (`mailto:` já existia — reforçado com label "Responder direto").
- [x] Corpo da mensagem isolado em bloco de citação estilizado (`border-left` + leve itálico/bg), não mais texto solto.
- [x] `escapeHtml()` continua neutralizando injeção (testado com payload malicioso).
- [x] `bun test` (novo — `lib/email-templates/contact-email.test.ts`, runner nativo do Bun, zero dependência nova) passa, cobrindo cores/mono/mailto/blockquote/escape.
- [x] `bunx tsc --noEmit && bun run lint && bun run build` limpos.

## Auditoria
Validação independente (QA separado da implementação), evidência real coletada nesta sessão.

- **`lib/email-templates/contact-email.ts`**: lido o arquivo inteiro (89 linhas). `escapeHtml()` (l.3-10) e `buildContactEmailHtml()` (l.24-88) moram aqui, não em `app/actions/contact.ts`. Confere linha a linha com os critérios: `background-color:#09090b` no `<body>` (l.35) E no bloco de citação da mensagem (l.75); borda do card principal `border:1px solid #27272a` (l.45); cabeçalhos (Nome l.48, "Responder direto" l.58, Mensagem l.70) em `font-family:ui-monospace,'JetBrains Mono',monospace`; label "Responder direto" (l.59) com `mailto:${email}` em destaque (`color:#f97316;font-weight:600`, l.64); bloco de citação da mensagem com `border-left:3px solid #f97316` (l.75), fundo `#09090b` e `white-space:pre-wrap` (não mais texto solto).
- **`app/actions/contact.ts`**: lido o arquivo inteiro (93 linhas). Mantém `"use server"` na l.1. Importa apenas `buildContactEmailHtml` de `@/lib/email-templates/contact-email` (l.6) e usa em `html: buildContactEmailHtml({ name, email, message })` (l.81). Não há definição duplicada de `escapeHtml`/`buildContactEmailHtml` neste arquivo — confirmado por `grep -rn "escapeHtml|buildContactEmailHtml"` em todo o repo (excluindo `node_modules`): a única definição de ambas as funções está em `lib/email-templates/contact-email.ts`; todas as demais ocorrências (em `app/actions/contact.ts` e `lib/email-templates/contact-email.test.ts`) são import/uso, não redefinição.
- **Justificativa técnica da extração (verificada, não assumida)**: `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-server.md` documenta que todo export de um arquivo `"use server"` é tratado como Server Function; `grep -rln "can only export async functions" node_modules/next/dist/` encontra a mensagem de erro real em `next-flight-loader/action-validate.js` (build-time), confirmando que o Next.js de fato rejeita exports não-`async` num módulo `"use server"`. `buildContactEmailHtml` é síncrona — não poderia ser exportada de `app/actions/contact.ts` sem quebrar o build, então a extração pra `lib/email-templates/contact-email.ts` era necessária tecnicamente (não estética), exatamente como a tarefa registra. A ressalva da própria tarefa também confere: na prática a função nunca foi exportada do arquivo `"use server"` nesta versão (ela é local a esse módulo antes da extração), então o argumento decisivo de fato é "precisa ser testável fora do módulo `"use server"`" — o que bate com o critério de aceite que pede `bun test` sobre o HTML gerado.
- **`bun test lib/email-templates/contact-email.test.ts`**: `bun test v1.3.13` → **4 pass, 0 fail, 11 expect() calls** ("Ran 4 tests across 1 file"). Os 4 testes cobrem exatamente o exigido: (1) cores/tipografia — `background-color:#09090b`, `border:1px solid #27272a`, `font-family:ui-monospace`; (2) destaque "Responder direto" com `href="mailto:..."`; (3) bloco de citação — `border-left:3px solid #f97316` e preservação de quebra de linha (`<br>`); (4) escape de HTML malicioso — payload `<img src=x onerror=alert(1)>` e `<script>alert("xss")</script>` não aparecem crus no HTML final, aparecem escapados (`&lt;img...&gt;`, `&lt;script&gt;...&lt;/script&gt;`).
- **`bunx tsc --noEmit`**: exit 0, sem output de erro.
- **`bun run lint`**: `eslint` via bun run, exit 0, sem warnings/erros.
- **`bun run build`**: `next build` (Turbopack) → "Compiled successfully in 804ms", "Finished TypeScript in 3.6s", 8 rotas geradas (`/`, `/_not-found`, `/icon`, `/opengraph-image`, `/projetos/call-center-analytics`, `/robots.txt`, `/sitemap.xml`), exit 0.
- **Dev server**: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/` → `200`.
- **Suíte Playwright completa**: `PLAYWRIGHT_BASE_URL=http://localhost:3001 bunx playwright test` → **16 passed** (31.1s) — 4 `case-study.spec.ts`, 4 `hero-buttons.spec.ts`, 4 `nav-dock.spec.ts`, 4 `skills-matrix.spec.ts`. Nenhuma falha, nenhum teste pulado — confirma que a extração da função de template não afetou nada de UI/e2e.

CONVERGE.

## Addendum (achado durante a validação da tarefa 023)
O validador da 022 rodou `bun test lib/email-templates/contact-email.test.ts` (caminho explícito), não o comando bruto `bun test` que o README (tarefa 023) documenta. O validador da 023 rodou o comando literal e encontrou um bug real: o runner nativo do Bun casa `*.spec.ts` por padrão e tentava executar `tests/e2e/*.spec.ts` (specs Playwright, incompatíveis com o runner do Bun) — `bun test` bruto falhava com exit 1 (4 erros). Corrigido com `bunfig.toml` (`[test] pathIgnorePatterns = ["tests/e2e/**"]`), confirmado empiricamente: `bun test` (sem argumento) agora roda só os 4 testes de `lib/` — "4 pass, 0 fail". Registrado aqui por transparência, já que o gap de cobertura era desta tarefa.
