# 009 — data/experience.ts
Fase: 3
Status: concluída

## Objetivo
Entradas tipadas de experiência profissional (empresa, cargo, período, bullets de métrica/SLA/KPI, tags de stack) em data/experience.ts.

## Arquivos afetados
data/experience.ts

## Critérios de aceite
- Tipagem estrita; ao menos 2-3 entradas placeholder plausíveis com métricas de negócio reais (não genéricas tipo "trabalhei com X").

## Auditoria
Auditor independente (agente ac3afd36a898bc009) confirmou: `ExperienceEntry` tipado sem `any`, campos coerentes; as 2 entradas têm métricas concretas e verificáveis (24h→45min, SLA 99,4%/12 DAGs, 8 dashboards/-30% chamados, 40+ relatórios/5→1 dia, 100% inconsistências capturadas, 15 pessoas treinadas/-25%) — não genéricas. Nenhum finding nesta tarefa. CONVERGE.
