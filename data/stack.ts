import {
  Database,
  HardDrive,
  Layers,
  ListChecks,
  Network,
  Terminal,
  Workflow,
} from "lucide-react";
import {
  SiAnthropic,
  SiDocker,
  SiFastify,
  SiGithubactions,
  SiGooglebigquery,
  SiGooglecloud,
  SiJupyter,
  SiLangchain,
  SiNextdotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiScikitlearn,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";

/**
 * Slot de ícone de um item da matriz de competências. `react-icons/si`
 * (Simple Icons) não distribui logotipo de "dbt", "Power BI" nem "Azure"
 * (removidos/nunca incluídos por restrição de marca) — para esses usamos um
 * badge monoespaçado com o nome, em vez de forçar um ícone genérico que não
 * representa a ferramenta. SQL/Cloud Storage/Modelagem/Automação não são
 * marcas (linguagem, conceito ou serviço genérico), por isso usam ícones
 * semânticos do lucide-react.
 */
export type TechIconSlot =
  | { kind: "brand"; Icon: IconType }
  | { kind: "lucide"; Icon: typeof Database }
  | { kind: "mono"; label: string };

export type SkillCluster =
  | "data-cloud"
  | "data-science"
  | "software-apis"
  | "ai-engineering";

export const SKILL_CLUSTERS: Record<
  SkillCluster,
  { title: string; signal: string }
> = {
  "data-cloud": {
    title: "Modern Data Stack & Cloud Agnóstica",
    signal:
      "Domínio dos padrões de Cloud Data Warehouse independente do provedor (GCP vs. Azure).",
  },
  "data-science": {
    title: "Data Science & Análise Exploratória",
    signal:
      "Capacidade analítica que vai além do dashboard, validando hipóteses e tendências via código.",
  },
  "software-apis": {
    title: "Engenharia de Software & APIs",
    signal:
      "Perfil híbrido (Analytics Engineer): integra pipelines de dados direto a aplicações de ponta.",
  },
  "ai-engineering": {
    title: "AI-Assisted Engineering & Automação",
    signal:
      "Uso profissional de IA na entrega de software e automação de operações de dados.",
  },
};

export interface TechStackItem {
  id: string;
  name: string;
  cluster: SkillCluster;
  icon: TechIconSlot;
  /**
   * Tooltip de contexto adicional. Nos itens de cloud (BigQuery, Cloud
   * Storage, Azure, AWS) é a equivalência arquitetural entre provedores —
   * sinaliza fundamentos que não dependem de um único fornecedor. Em outros
   * itens (ex. SDD) é uma nota curta de contexto/aplicação real.
   */
  note?: string;
}

export const TECH_STACK: TechStackItem[] = [
  // Cluster 1 — Modern Data Stack & Cloud Agnóstica
  {
    id: "sql",
    name: "SQL Avançado",
    cluster: "data-cloud",
    icon: { kind: "lucide", Icon: Database },
  },
  {
    id: "gcp",
    name: "GCP",
    cluster: "data-cloud",
    icon: { kind: "brand", Icon: SiGooglecloud },
    note: "Google Cloud Platform • Equivalente: Azure / AWS",
  },
  {
    id: "bigquery",
    name: "BigQuery",
    cluster: "data-cloud",
    icon: { kind: "brand", Icon: SiGooglebigquery },
    note: "BigQuery (GCP) • Equivalente: Azure Synapse / AWS Redshift",
  },
  {
    id: "cloud-storage",
    name: "Cloud Storage",
    cluster: "data-cloud",
    icon: { kind: "lucide", Icon: HardDrive },
    note: "Cloud Storage (GCS) • Equivalente: Azure Blob / AWS S3",
  },
  {
    id: "azure",
    name: "Azure Data Ecosystem",
    cluster: "data-cloud",
    icon: { kind: "mono", label: "AZ" },
    note: "Synapse / Fabric / Blob (Azure) • Equivalente: BigQuery+GCS (GCP) / Redshift+S3 (AWS)",
  },
  {
    id: "aws",
    name: "AWS",
    cluster: "data-cloud",
    icon: { kind: "mono", label: "AWS" },
    note: "Redshift / S3 (AWS) • Equivalente: BigQuery+GCS (GCP) / Synapse+Blob (Azure)",
  },
  {
    id: "dbt",
    name: "dbt Core",
    cluster: "data-cloud",
    icon: { kind: "mono", label: "dbt" },
  },
  {
    id: "dimensional-modeling",
    name: "Modelagem Dimensional",
    cluster: "data-cloud",
    icon: { kind: "lucide", Icon: Layers },
  },
  {
    id: "postgres",
    name: "PostgreSQL / Supabase",
    cluster: "data-cloud",
    icon: { kind: "brand", Icon: SiPostgresql },
  },

  // Cluster 2 — Data Science & EDA
  {
    id: "python",
    name: "Python",
    cluster: "data-science",
    icon: { kind: "brand", Icon: SiPython },
  },
  {
    id: "pandas",
    name: "Pandas",
    cluster: "data-science",
    icon: { kind: "brand", Icon: SiPandas },
  },
  {
    id: "numpy",
    name: "NumPy",
    cluster: "data-science",
    icon: { kind: "brand", Icon: SiNumpy },
  },
  {
    id: "scikit-learn",
    name: "Scikit-Learn",
    cluster: "data-science",
    icon: { kind: "brand", Icon: SiScikitlearn },
  },
  {
    id: "stat-viz",
    name: "Seaborn / Matplotlib",
    cluster: "data-science",
    icon: { kind: "mono", label: "VIZ" },
  },
  {
    id: "jupyter",
    name: "Jupyter / Colab",
    cluster: "data-science",
    icon: { kind: "brand", Icon: SiJupyter },
  },

  // Cluster 3 — Engenharia de Software & APIs
  {
    id: "nextjs",
    name: "Next.js",
    cluster: "software-apis",
    icon: { kind: "brand", Icon: SiNextdotjs },
  },
  {
    id: "typescript",
    name: "TypeScript",
    cluster: "software-apis",
    icon: { kind: "brand", Icon: SiTypescript },
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    cluster: "software-apis",
    icon: { kind: "lucide", Icon: Network },
  },
  {
    id: "fastify",
    name: "Fastify / Node.js",
    cluster: "software-apis",
    icon: { kind: "brand", Icon: SiFastify },
  },
  {
    id: "github-actions",
    name: "Git / GitHub Actions",
    cluster: "software-apis",
    icon: { kind: "brand", Icon: SiGithubactions },
  },
  {
    id: "docker",
    name: "Docker",
    cluster: "software-apis",
    icon: { kind: "brand", Icon: SiDocker },
  },

  // Cluster 4 — AI-Assisted Engineering & Automação
  {
    id: "llm-apis",
    name: "LLMs via API",
    cluster: "ai-engineering",
    icon: { kind: "brand", Icon: SiAnthropic },
  },
  {
    id: "langchain",
    name: "LangChain / Function Calling",
    cluster: "ai-engineering",
    icon: { kind: "brand", Icon: SiLangchain },
  },
  {
    id: "workflow-automation",
    name: "Automação de Workflows",
    cluster: "ai-engineering",
    icon: { kind: "lucide", Icon: Workflow },
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    cluster: "ai-engineering",
    icon: { kind: "lucide", Icon: Terminal },
  },
  {
    id: "sdd-harness",
    name: "Spec-Driven Development",
    cluster: "ai-engineering",
    icon: { kind: "lucide", Icon: ListChecks },
    note: "Desenvolvimento orientado a spec com harness agêntico (Claude Code) — processo documentado neste próprio portfólio (ver tarefas/).",
  },
];
