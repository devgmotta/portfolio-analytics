# Terminal Elegance — Portfólio

Portfólio pessoal de Gabriel Motta Leite: Engenharia de Dados e Software, com o tema visual "Terminal Elegance" — dark por padrão (toggle claro/escuro disponível), glassmorphism sutil, acentos âmbar/teal e tipografia mono pra dados técnicos.

Acesse ao vivo: [gmotta.space](https://gmotta.space) *(domínio ainda apontando pro portfólio anterior até este projeto estar 100% pronto)*

## Stack Tecnológica

**Frontend**
- [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions)
- [React 19](https://react.dev)
- TypeScript (tipagem estrita)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first, `@theme`)
- [shadcn/ui](https://ui.shadcn.com) (preset `base-nova`, primitivos [Base UI](https://base-ui.com))
- [Magic UI](https://magicui.design) — Shimmer Button, Marquee, Border Beam, Bento Grid, Meteors
- [Motion](https://motion.dev) (sucessor do Framer Motion) — reveal on scroll, transições
- [next-themes](https://github.com/pacocoursey/next-themes) — toggle claro/escuro

**Contato & Analytics**
- [Resend](https://resend.com) — envio de e-mail via Server Action (substitui o backend Express de uma versão anterior)
- [Zod](https://zod.dev) — validação de formulário
- [@vercel/analytics](https://vercel.com/docs/analytics)
- [@next/third-parties](https://nextjs.org/docs/app/guides/third-party-libraries) — Google Analytics 4

**Infra**
- [Bun](https://bun.sh) — runtime, package manager e lockfile
- Deploy na [Vercel](https://vercel.com)

## Rodando localmente

Pré-requisito: [Bun](https://bun.sh) instalado.

```bash
git clone https://github.com/devgmotta/portfolio-analytics.git
cd portfolio-analytics
bun install
bun run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha o que for usar:

```bash
cp .env.example .env.local
```

| Variável | Obrigatória? | Efeito se ausente |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Não | Cai no fallback do domínio `.vercel.app` do projeto (metadata, sitemap, robots, OG image) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Não | O componente do GA4 simplesmente não é renderizado |
| `RESEND_API_KEY` | Não | O formulário de contato retorna um erro tratado ("não configurado") em vez de enviar o e-mail |

Nenhuma delas bloqueia o build — o site funciona (menos o envio real de e-mail) mesmo sem nenhuma configurada.

## Scripts

| Comando | O que faz |
|---|---|
| `bun run dev` | Servidor de desenvolvimento (Turbopack) |
| `bun run build` | Build de produção |
| `bun run start` | Roda o build de produção localmente |
| `bun run lint` | ESLint |
| `bunx tsc --noEmit` | Typecheck sem gerar arquivos |

## Adicionando um projeto novo ao Bento Grid

Edite `data/projects.ts` — cada objeto do array `PROJECTS` é um card. Não é preciso tocar em nenhum outro arquivo (a seção mapeia o array inteiro dinamicamente). Mesma lógica pra `data/experience.ts` (timeline profissional), `data/education.ts` (formação) e `data/stack.ts` (marquee de tecnologias).

## Deploy

Deploy contínuo na Vercel — cada push na branch `main` builda automaticamente (integração GitHub já conectada no projeto). Trabalho novo entra por branch + Pull Request (não direto em `main`); veja o histórico de PRs do repositório.

## Processo de desenvolvimento

Este projeto documenta cada entrega em `tarefas/` — `tarefas/pendentes/` (em andamento) e `tarefas/concluidas/` (com critérios de aceite e registro de auditoria/verificação de cada mudança). Serve como changelog técnico detalhado, complementar aos commits.
