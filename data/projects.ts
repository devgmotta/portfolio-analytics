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
  /** Ausente quando o projeto ainda não tem repositório público (ex.: WIP). */
  repoUrl?: string;
  /** Link de demo público, se existir. */
  demoUrl?: string;
  /** Rota interna com um case study interativo (dashboard, pipeline, código). */
  caseStudyUrl?: string;
  media: ProjectMedia;
  /** true = ocupa 2 colunas no bento grid. */
  featured?: boolean;
  /** true = mostra badge "EM ANDAMENTO" — projeto ainda não finalizado. */
  wip?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio-terminal-elegance",
    title: "Plataforma de Portfólio",
    description:
      "Este portfólio — desenvolvido do zero em Next.js (App Router) com foco em alta performance e SEO: rotas de metadata nativas (sitemap, robots, OG image dinâmica), Server Components e microinterações via Motion.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/devgmotta/portfolio-analytics",
    media: {
      kind: "image",
      src: "/projects/portfolio-terminal-elegance.png",
      alt: "Screenshot da Hero section deste portfólio",
    },
    featured: true,
  },
  {
    id: "pipeline-call-center-simulado",
    title: "Pipeline de Dados Operacionais (Simulação Call Center)",
    description:
      "Ingestão e modelagem de dados focada em SLA de atendimento — cenário simulado de Call Center, da camada bruta ao dashboard executivo.",
    tags: ["BigQuery", "dbt", "Power BI"],
    caseStudyUrl: "/projetos/call-center-analytics",
    media: {
      kind: "image",
      src: "/projects/pipeline-call-center.svg",
      alt: "Diagrama conceitual: ingestão de eventos de Call Center via BigQuery, modelagem em dbt e dashboard em Power BI",
    },
    wip: true,
  },
];
