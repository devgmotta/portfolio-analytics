/**
 * "Banco de dados" local do portfólio — adicionar um projeto novo ao Bento Grid
 * exige tocar SOMENTE este arquivo (mais, opcionalmente, um asset em
 * public/projects/ se `media.kind === "image"`). Nenhum outro arquivo precisa
 * ser alterado: components/sections/projects-section.tsx sempre mapeia
 * PROJECTS na íntegra.
 */

export type ProjectMedia =
  | { kind: "iframe"; iframeUrl: string; iframeTitle: string }
  | { kind: "image"; src: string; alt: string };

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Stack/ferramentas exibidas como badges (ex.: "dbt", "BigQuery"). */
  tags: string[];
  repoUrl: string;
  /** Link de demo público, se existir. */
  demoUrl?: string;
  media: ProjectMedia;
  /** true = ocupa 2 colunas no bento grid. */
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "pipeline-vendas-dbt-bigquery",
    title: "Pipeline de Vendas — dbt + BigQuery",
    description:
      "ELT ponta-a-ponta: ingestão via Airbyte, modelagem em camadas (staging/marts) com dbt, testes de qualidade automatizados e dashboard executivo em Looker Studio.",
    tags: ["Python", "dbt", "BigQuery", "Looker Studio"],
    repoUrl: "https://github.com/devgmotta/pipeline-vendas-dbt",
    media: {
      kind: "iframe",
      iframeUrl:
        "https://lookerstudio.google.com/embed/reporting/EXEMPLO/page/EXEMPLO",
      iframeTitle: "Dashboard executivo de vendas",
    },
    featured: true,
  },
  {
    id: "orquestracao-airflow-docker",
    title: "Orquestração de ETL com Airflow + Docker",
    description:
      "Orquestração de 12 DAGs em produção, com retries, SLA de 15 min e observabilidade via logs estruturados. Ambiente reprodutível via Docker Compose.",
    tags: ["Airflow", "Docker", "PostgreSQL"],
    repoUrl: "https://github.com/devgmotta/orquestracao-airflow-docker",
    media: {
      kind: "image",
      src: "/projects/orquestracao-airflow-docker.svg",
      alt: "Diagrama de arquitetura da orquestração Airflow + Docker",
    },
  },
  {
    id: "dashboard-powerbi-python",
    title: "Dashboard de KPIs — Power BI + Python",
    description:
      "Automação de ETL em Python alimentando modelo semântico no Power BI, com atualização incremental e camada de métricas versionada.",
    tags: ["Python", "Power BI", "SQL"],
    repoUrl: "https://github.com/devgmotta/dashboard-powerbi-python",
    media: {
      kind: "image",
      src: "/projects/dashboard-powerbi-python.svg",
      alt: "Diagrama de arquitetura do dashboard de KPIs em Power BI",
    },
  },
];
