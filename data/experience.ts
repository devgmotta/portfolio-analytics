export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  /** Ex.: "set 2024 — atual" */
  period: string;
  /** Métricas de negócio, SLAs e KPIs — não descrições genéricas de tarefa. */
  bullets: string[];
  tags: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "autonomo",
    company: "Profissional Autônomo",
    role: "Desenvolvedor de Soluções",
    period: "jun 2026 — atual",
    bullets: [
      "Desenvolvimento ponta a ponta: levantamento de requisitos, modelagem de banco de dados e entrega da aplicação.",
      "Automação de processos com apoio de IA (AI-Assisted Development), do protótipo ao deploy.",
      "Criação de dashboards gerenciais para acompanhamento de indicadores de negócio.",
    ],
    tags: ["SQL", "Power BI", "IA"],
  },
  {
    id: "algar-tech",
    company: "Algar Tech",
    role: "Operações & Control Desk",
    period: "set 2024 — atual",
    bullets: [
      "Monitoramento em tempo real de KPIs e SLAs na operação do Grupo Boticário.",
      "Análise de dados estruturados via Salesforce para identificação de gargalos operacionais e geração de reportes táticos.",
      "Visão pragmática da linha de frente, com foco em otimização de Tempo Médio de Atendimento (TMA) e conversão.",
    ],
    tags: ["Salesforce", "KPI", "SLA"],
  },
];
