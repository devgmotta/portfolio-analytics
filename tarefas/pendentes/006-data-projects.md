# 006 — data/projects.ts
Fase: 2
Status: pendente

## Objetivo
Interface Project (id, title, description, tags, repoUrl, demoUrl?, media: iframe|image discriminated union, featured?) + PROJECTS[] com 3 exemplos placeholder (ETL dbt/BigQuery, Airflow+Docker, Power BI+Python); assets placeholder em public/projects/.

## Arquivos afetados
data/projects.ts, public/projects/*.png

## Critérios de aceite
- Tipagem estrita (sem `any`), discriminated union funcional.
- Contrato "pé no chão" documentado no arquivo: adicionar projeto = 1 objeto novo.

## Auditoria
(preenchido ao concluir)
