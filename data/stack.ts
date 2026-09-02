import { Database } from "lucide-react";
import {
  SiGooglebigquery,
  SiGooglecloud,
  SiNextdotjs,
  SiPython,
  SiTailwindcss,
} from "react-icons/si";
import type { IconType } from "react-icons";

/**
 * Slot de ícone de uma tecnologia do Marquee. `react-icons/si` (Simple Icons)
 * não distribui o logotipo de "dbt" nem de "Power BI" (removidos/nunca incluídos
 * por restrição de marca) — para esses dois usamos um badge monoespaçado com o
 * nome, em vez de forçar um ícone genérico que não representa a ferramenta.
 * SQL não é uma marca (é uma linguagem), por isso usa o ícone semântico de banco
 * de dados do lucide-react.
 */
export type TechIconSlot =
  | { kind: "brand"; Icon: IconType }
  | { kind: "lucide"; Icon: typeof Database }
  | { kind: "mono"; label: string };

export interface TechStackItem {
  id: string;
  name: string;
  icon: TechIconSlot;
}

export const TECH_STACK: TechStackItem[] = [
  { id: "python", name: "Python", icon: { kind: "brand", Icon: SiPython } },
  { id: "sql", name: "SQL", icon: { kind: "lucide", Icon: Database } },
  { id: "gcp", name: "GCP", icon: { kind: "brand", Icon: SiGooglecloud } },
  {
    id: "bigquery",
    name: "BigQuery",
    icon: { kind: "brand", Icon: SiGooglebigquery },
  },
  { id: "dbt", name: "dbt", icon: { kind: "mono", label: "dbt" } },
  { id: "power-bi", name: "Power BI", icon: { kind: "mono", label: "BI" } },
  {
    id: "nextjs",
    name: "Next.js",
    icon: { kind: "brand", Icon: SiNextdotjs },
  },
  {
    id: "tailwind",
    name: "Tailwind",
    icon: { kind: "brand", Icon: SiTailwindcss },
  },
];
