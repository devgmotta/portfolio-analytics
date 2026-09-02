# Terminal Elegance — Portfólio

Portfólio pessoal de Gabriel Motta Leite: Engenharia de Dados e Software, com o tema visual "Terminal Elegance" — dark por padrão (toggle claro/escuro disponível), glassmorphism sutil, acentos âmbar/teal, malha de pontos e noise no fundo, e tipografia mono pra dados técnicos.

Acesse ao vivo: [gmotta.space](https://gmotta.space) *(domínio ainda apontando pro portfólio anterior até este projeto estar 100% pronto)*

## Arquitetura

Aplicação 100% Next.js — sem backend separado. A home é uma única rota server-rendered (`app/page.tsx`) composta por seções (`components/sections/`); o único estado de servidor real é o envio do formulário de contato, resolvido com uma **Server Action** nativa (`app/actions/contact.ts`) chamando o Resend direto do server, sem API route nem serviço externo.

- **React Server Components por padrão** — só viram Client Component quem precisa de interatividade/hooks de browser: o dashboard do case study (Recharts usa APIs de layout do browser), o dock/topbar (tema, scroll), o formulário de contato (`useActionState`/`useFormStatus`) e os toggles com `motion/react`. Todo o resto — incluindo a subpágina de case study inteira, o bloco de código SQL e o corpo das seções — é Server Component.
- **Server Action + Resend** substitui o backend Express de uma versão anterior do projeto — sem servidor separado pra manter, sem CORS, sem API key exposta no client.
- **Tailwind CSS v4 CSS-first** — não há `tailwind.config.ts`; os tokens de design (cores, raio, animações) vivem em `app/globals.css` via `@theme inline`, com dois blocos de tema (`:root`/`.dark`) trocados por `next-themes`.
- **Dados como código** — conteúdo (projetos, experiência, formação, matriz de competências) vive em `data/*.ts`, não em CMS nem banco. Editar um desses arquivos é o único passo pra atualizar o conteúdo correspondente na página.

## Estrutura de diretórios

```
app/
  actions/contact.ts              Server Action do formulário de contato (Resend)
  layout.tsx                      Shell global: fontes, providers de tema/motion, TopBar, FloatingDock, BackgroundGrid
  page.tsx                        Home — compõe todas as seções, em ordem
  projetos/call-center-analytics/ Case study interativo (rota própria, metadata própria)
  icon.tsx / opengraph-image.tsx  Rotas de metadata dinâmica (favicon, OG image)
  robots.ts / sitemap.ts          Rotas de metadata (SEO)
  globals.css                     Design tokens (Tailwind v4 CSS-first) + temas claro/escuro

components/
  sections/                       Uma seção da home por arquivo (Hero, Skills Matrix, Projects, Experience, Contact)
  case-study/                     Componentes específicos de uma subpágina de case study (hoje: dashboard Recharts)
  ui/                             Primitivos reutilizáveis (Button, Badge, Dialog, Tooltip — shadcn/Base UI — e utilitários visuais como BorderBeam/Meteors/SqlCodeBlock)
  project-card.tsx, tech-icon.tsx Componentes de conteúdo usados dentro das sections (card de projeto, ícone de tecnologia)
  floating-dock.tsx, top-bar.tsx, background-grid.tsx, motion-provider.tsx, theme-provider.tsx
                                   Chrome global montado em app/layout.tsx (nav, tema, background)
  footer.tsx, noise-overlay.tsx   Chrome montado em app/page.tsx (só aparece na home, não nas subpáginas)

data/                             Conteúdo como código: projects.ts, experience.ts, education.ts, stack.ts
lib/                              site.ts (constantes/env), utils.ts (cn()), email-templates/ (template do e-mail de contato + teste unitário)
tests/e2e/                        Specs Playwright (ver "Testes" abaixo)
```

**Convenção de rotas:** a home continua single-page (âncoras `#home`/`#experiencia`/`#projetos`/`#contato`, navegação pelo TopBar/FloatingDock). Um projeto pode opcionalmente ganhar uma subpágina própria em `app/projetos/<slug>/page.tsx` quando o conteúdo pedir mais espaço que um card/modal — hoje é o caso de `app/projetos/call-center-analytics/`, referenciada em `data/projects.ts` via `caseStudyUrl`. O `FloatingDock` é ciente de rota (`usePathname()`): fora da home, as âncoras ganham o prefixo `/` automaticamente pra voltar antes de rolar.

## Taxonomia Técnica

Cada item da Matriz de Competências (`data/stack.ts`) e sua aplicação real neste portfólio — não é uma lista genérica de currículo, é o que o código efetivamente usa:

| Cluster | Tecnologia | Aplicação real neste projeto |
|---|---|---|
| Modern Data Stack & Cloud Agnóstica | SQL Avançado | Modelo `fct_atendimentos.sql` no case study (CTEs, `row_number() over (partition by ...)`) |
| | GCP / BigQuery | Contexto do pipeline simulado do case study (camada de warehouse) |
| | Cloud Storage | Camada de ingestão raw descrita na linhagem do pipeline |
| | Azure Data Ecosystem | Sinalização de equivalência arquitetural (tooltip) — mesmo padrão, provedor diferente |
| | AWS | Fecha o triângulo de equivalência cloud (tooltip) junto com GCP/Azure — Redshift/S3 como contraparte de BigQuery+GCS/Synapse+Blob |
| | dbt Core | Modelo dimensional (`staging` → `marts`) documentado e exibido no case study |
| | Modelagem Dimensional | Grão do fato (`fct_atendimentos`, 1 linha por atendimento) no case study |
| | PostgreSQL / Supabase | Alternativa de warehouse citada na arquitetura do pipeline |
| Data Science & EDA | Python, Pandas, NumPy, Scikit-Learn, Seaborn/Matplotlib, Jupyter/Colab | Ferramental de análise/validação de hipótese por trás dos dados do case study (não executado no runtime do site — o site é Next.js) |
| Engenharia de Software & APIs | Next.js (App Router) | Este projeto inteiro — RSC, Server Actions, rotas de metadata |
| | TypeScript | Tipagem estrita em 100% do código (`tsc --noEmit` no pipeline de verificação) |
| | REST APIs | Integração com a API do Resend (`app/actions/contact.ts`) |
| | Fastify / Node.js | Runtime de referência para o backend que este projeto substituiu (Server Actions) |
| | Git / GitHub Actions | Controle de versão + CI (branch → PR → merge, ver "Deploy") |
| | Docker | Empacotamento de referência pra ambientes de pipeline de dados (fora do runtime deste site, que é deploy serverless na Vercel) |
| AI-Assisted Engineering & Automação | LLMs via API (Anthropic/Claude) | Este próprio repositório foi construído com Claude Code — commits/tarefas em `tarefas/` documentam o processo |
| | LangChain / Function Calling | Padrão de referência pra orquestração de chamadas de LLM em pipelines de automação |
| | Automação de Workflows | Processo de tarefas deste repo (`tarefas/pendentes/` → validação → `tarefas/concluidas/`) é uma automação de workflow documentada |
| | Prompt Engineering | Especificação técnica de cada tarefa em `tarefas/*.md` (objetivo, critérios de aceite mensuráveis) |
| | Spec-Driven Development | O processo `tarefas/pendentes/` → validação independente → `tarefas/concluidas/` deste repo É o SDD em prática — cada tarefa nasce com objetivo e critérios de aceite mensuráveis antes do código |
| | Harness Engineering | Orquestração de agentes (Claude Code): cada tarefa deste repo é implementada por um agente e validada por outro, separado, que não aceita "está pronto" sem evidência real |

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
| `bun test` | Testes unitários (runner nativo do Bun — hoje cobre o template de e-mail em `lib/email-templates/`) |
| `bun run test:e2e` | Testes end-to-end (Playwright, ver "Testes" abaixo) |

## Testes

Duas camadas, sem framework externo além do Playwright:

- **Unitário** (`bun test`, runner nativo do Bun): funções puras que valem a pena testar isoladas — hoje só `lib/email-templates/contact-email.ts` (geração de HTML, escape de conteúdo malicioso).
- **E2E** (`bun run test:e2e`, Playwright + Chromium): `tests/e2e/*.spec.ts` cobre navegação (TopBar/FloatingDock, âncoras, toggle de tema), o design system de botões (anatomia idêntica + CTA acima da dobra em 3 viewports), a Matriz de Competências (tooltips de equivalência de cloud) e o case study interativo (navegação, dashboard, bloco SQL).

Primeira vez rodando E2E localmente:

```bash
bunx playwright install chromium
bun run test:e2e
```

O `playwright.config.ts` sobe um `next dev` sozinho (`webServer`) se nenhum já estiver rodando na porta 3000. Se você já tem um dev server ativo noutra porta, aponte pra ele em vez de subir um segundo (o Next.js recusa uma 2ª instância do mesmo projeto):

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3001 bun run test:e2e
```

## Adicionando conteúdo

- **Projeto novo no Bento Grid:** edite `data/projects.ts` — cada objeto do array `PROJECTS` é um card. Pra dar a ele uma subpágina de case study própria (como `call-center-analytics`), crie `app/projetos/<slug>/page.tsx` e aponte `caseStudyUrl` pra essa rota.
- **Item novo na Matriz de Competências:** edite `data/stack.ts` — escolha o `cluster` certo e, se for um serviço de cloud, um `equivalents` (tooltip de equivalência entre provedores).
- **Experiência/Formação:** `data/experience.ts` e `data/education.ts`.

Não é preciso tocar em nenhum outro arquivo — as seções mapeiam esses arrays dinamicamente.

## Deploy

Deploy contínuo na Vercel — cada push na branch `main` builda automaticamente (integração GitHub já conectada no projeto). Trabalho novo entra por branch + Pull Request (não direto em `main`); o pipeline de verificação antes do merge é `bunx tsc --noEmit && bun run lint && bun test && bun run build` (mais `bun run test:e2e` quando a mudança afeta UI).

## Processo de desenvolvimento

Este projeto documenta cada entrega em `tarefas/` — `tarefas/pendentes/` (em andamento) e `tarefas/concluidas/` (com objetivo, decisões, critérios de aceite mensuráveis e uma seção de Auditoria com evidência real de verificação — build, testes, comandos rodados). Serve como changelog técnico detalhado, complementar aos commits.
