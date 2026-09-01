# 006 — data/projects.ts
Fase: 2
Status: concluída

## Objetivo
Interface Project (id, title, description, tags, repoUrl, demoUrl?, media: iframe|image discriminated union, featured?) + PROJECTS[] com 3 exemplos placeholder (ETL dbt/BigQuery, Airflow+Docker, Power BI+Python); assets placeholder em public/projects/.

Assets placeholder feitos como SVG à mão (não PNG) — diagramas de arquitetura simples usando os próprios tokens de cor do tema.

## Arquivos afetados
data/projects.ts, public/projects/*.svg

## Critérios de aceite
- Tipagem estrita (sem `any`), discriminated union funcional.
- Contrato "pé no chão" documentado no arquivo: adicionar projeto = 1 objeto novo.

## Auditoria
Auditor independente (agente a1a9cf8c97077b847) verificou a união discriminada por `kind` — TS estreita corretamente `if (media.kind === "iframe")`/fallback implícito, sem `any`/cast. Testou o contrato na prática: adicionou um 4º objeto de teste, rodou `bun run build`, confirmou no HTML gerado, reverteu (`git status --porcelain data/projects.ts` limpo ao final). Nenhum finding nesta tarefa. CONVERGE.
