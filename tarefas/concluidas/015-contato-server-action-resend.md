# 015 — Fase 8: formulário de contato (Server Action + Resend)
Fase: 8
Status: concluída

## Objetivo
Substituir o backend Express antigo (README legado) por uma Server Action nativa do Next.js integrada ao Resend, sem servidor separado.

## Arquivos afetados
package.json (resend, zod), app/actions/contact.ts (novo), components/sections/contact-section.tsx (novo), app/page.tsx (nova seção final), .env.example (RESEND_API_KEY)

## Decisões
- Validação com Zod (`z.email()` — sintaxe nativa do Zod v4, confirmada empiricamente antes de usar) + validação nativa HTML5 (`type="email"`, `required`, `minLength`) como primeira camada — a Zod no server é defesa em profundidade, não a única linha.
- Honeypot (`company`, campo escondido via `position:absolute` fora da tela + `tabIndex={-1}` + `aria-hidden`, sem lib extra): se vier preenchido, é bot — responde "sucesso" (não dá pista de que foi filtrado) sem gastar cota da API do Resend.
- `RESEND_API_KEY` ausente → erro tratado e claro, não crash (não tenho a chave real, não vou inventar). `from: "Portfólio <onboarding@resend.dev>"` — remetente de teste do Resend, válido sem domínio verificado (confirmado na doc oficial); troca pra um endereço do domínio próprio (ex. `contato@gmotta.space`) assim que o domínio for verificado no Resend.
- Destinatário fixo: `devgmleite@gmail.com` (e-mail real já confirmado nesta sessão).
- `useActionState` + `useFormStatus` (React 19) pro estado de pending/sucesso/erro — sem lib de toast, feedback inline (`role="status" aria-live="polite"`).

## Critérios de aceite
- Build de produção limpo. ✅
- Sem `RESEND_API_KEY`: submit com dados válidos retorna erro claro tratado, não crash. ✅ (testado com Playwright real)
- Erro de e-mail inválido é bloqueado pela validação nativa do browser antes de chegar no server (esperado — Zod é defesa em profundidade, não a única camada). ✅
- Honeypot não aparece na ordem de tab nem é lido por leitor de tela. ✅

## Auditoria
Verificação própria via Playwright real: submit com e-mail inválido é bloqueado pela validação nativa do `type="email"` (a request nunca chega no server — comportamento correto e esperado, não um bug); submit com dados válidos e sem `RESEND_API_KEY` retorna a mensagem de erro tratada exata, sem lançar exceção nem gerar erro de console/página. Screenshot conferido visualmente. `bunx tsc --noEmit && bun run lint && bun run build` limpos. `z.email()` (sintaxe Zod v4) confirmada empiricamente antes de usar em produção, não por suposição. CONVERGE — todas as 4 fases planejadas (conteúdo real, UI/UX, theming+analytics, contato) concluídas.
