# 008 — projects-section.tsx
Fase: 2
Status: concluída

## Objetivo
projects-section.tsx mapeia PROJECTS.map(...) (nunca hardcoda índice/quantidade) em grid responsivo (1 col mobile, 3 col desktop, featured=col-span-2); compor em app/page.tsx.

**Desvio deliberado:** grid usa `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (não "3 col desktop" fixo) — com os 3 exemplos atuais, `sm:grid-cols-2` produz um bento melhor (featured ocupa a linha toda, os 2 normais dividem a linha de baixo) do que forçar 3 colunas fixas; `lg:grid-cols-3` entra conforme mais projetos forem adicionados.

## Arquivos afetados
components/sections/projects-section.tsx, app/page.tsx

## Critérios de aceite
- Teste do contrato: adicionar 4º objeto de teste em data/projects.ts aparece automaticamente no grid, sem tocar em outro arquivo (depois reverter).
- Responsivo em mobile/desktop.

## Auditoria
Auditor independente (agente a1a9cf8c97077b847) testou o contrato do critério de aceite na prática (ver 006). Responsividade confirmada: `cn()`/`twMerge` sobrescreve corretamente os defaults do `BentoGrid` sem classes conflitantes coexistindo no DOM. Nenhum finding nesta tarefa especificamente (os 2 findings bloqueantes da rodada — trigger de teclado quebrado e iframe capturando clique — são de `project-card.tsx`, escopo da tarefa 007). CONVERGE.
