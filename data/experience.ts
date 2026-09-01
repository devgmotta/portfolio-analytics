export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  /** Ex.: "2023 — atual" */
  period: string;
  /** Métricas de negócio, SLAs e KPIs — não descrições genéricas de tarefa. */
  bullets: string[];
  tags: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "empresa-atual",
    company: "Empresa Atual — Analytics Engineering",
    role: "Analista de Dados Pleno",
    period: "2023 — atual",
    bullets: [
      "Reduziu o tempo de disponibilização de dados de vendas de 24h para 45min com pipeline dbt + BigQuery incremental.",
      "SLA de 15 minutos em 12 DAGs de produção no Airflow, com 99,4% de execuções dentro do prazo em 6 meses.",
      "Modelo semântico consumido por 8 dashboards executivos, reduzindo em 30% os chamados de 'número não bate'.",
    ],
    tags: ["dbt", "BigQuery", "Airflow", "Python"],
  },
  {
    id: "empresa-anterior",
    company: "Empresa Anterior — Business Intelligence",
    role: "Analista de BI Júnior",
    period: "2021 — 2023",
    bullets: [
      "Migrou 40+ relatórios de planilha manual para Power BI, cortando o tempo de fechamento mensal de 5 dias para 1.",
      "Implementou testes de qualidade de dados que capturaram 100% das inconsistências de schema antes de chegar ao dashboard.",
      "Treinou 15 pessoas de negócio em self-service analytics, reduzindo pedidos ad-hoc à equipe de dados em 25%.",
    ],
    tags: ["Power BI", "SQL", "Python"],
  },
];
