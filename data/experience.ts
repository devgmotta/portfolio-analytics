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
      "Arquitetura de dados: definição de schema, normalização e relacionamentos pensados pra consulta e manutenção, não só pra funcionar.",
      "Automação de processos com apoio de IA (AI-Assisted Development) — geração assistida de código com revisão humana em cada etapa, do protótipo ao deploy.",
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
      "Gestão de SLAs em alta volumetria de chamados na operação do Grupo Boticário, com monitoramento em tempo real de KPIs.",
      "Cruzamento de dados estruturados via Salesforce entre times e etapas do atendimento para identificar gargalos operacionais.",
      "Geração de reportes táticos a partir desse cruzamento, traduzindo dado bruto de CRM em decisão de operação.",
      "Visão pragmática da linha de frente, com foco em otimização de Tempo Médio de Atendimento (TMA) e conversão.",
    ],
    tags: ["Salesforce", "KPI", "SLA"],
  },
];
