import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Database, Layers, LineChart as LineChartIcon } from "lucide-react";
import Link from "next/link";

import { CallCenterDashboard } from "@/components/case-study/call-center-dashboard";
import { SqlCodeBlock } from "@/components/ui/sql-code-block";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Study: Pipeline de Dados de Call Center // Gabriel Motta Leite",
  description:
    "Estudo de caso técnico: ingestão, modelagem dimensional em dbt e dashboard de SLA/TMA/FCR para uma operação simulada de Call Center.",
  alternates: {
    canonical: `${SITE_URL}/projetos/call-center-analytics`,
  },
};

const PIPELINE_STAGES = [
  {
    id: "raw",
    label: "Ingestão (Raw)",
    detail: "Eventos brutos de atendimento (abertura, transferência, resolução) por canal.",
    Icon: Database,
  },
  {
    id: "warehouse",
    label: "BigQuery / PostgreSQL",
    detail: "Carga bruta versionada em um Data Warehouse — camada raw, sem transformação.",
    Icon: Database,
  },
  {
    id: "dbt",
    label: "dbt: Staging → Marts",
    detail: "Limpeza e tipagem (staging), depois modelagem dimensional (marts) com regras de SLA/FCR.",
    Icon: Layers,
  },
  {
    id: "viz",
    label: "Visualização",
    detail: "Dashboard executivo (Power BI / nativo) consumindo direto os marts, sem lógica de negócio na camada de BI.",
    Icon: LineChartIcon,
  },
] as const;

const FCT_ATENDIMENTOS_SQL = `-- models/marts/fct_atendimentos.sql
-- Fato de atendimento: 1 linha por atendimento, com TMA, SLA e FCR calculados.

with atendimentos as (
    select * from {{ ref('stg_atendimentos') }}
),

sla_por_canal as (
    select * from {{ ref('seed_sla_por_canal') }}
),

calculado as (
    select
        a.atendimento_id,
        a.cliente_id,
        a.canal,
        a.data_abertura,
        a.data_resolucao,
        datediff('minute', a.data_abertura, a.data_resolucao) as tma_minutos,
        s.sla_minutos,

        -- Ordem do contato do cliente na janela do caso — base do FCR.
        row_number() over (
            partition by a.cliente_id, a.caso_id
            order by a.data_abertura
        ) as ordem_contato_caso,

        count(*) over (
            partition by a.cliente_id, a.caso_id
        ) as total_contatos_caso,

        case
            when datediff('minute', a.data_abertura, a.data_resolucao) <= s.sla_minutos
                then true
            else false
        end as sla_cumprido
    from atendimentos a
    left join sla_por_canal s
        on a.canal = s.canal
)

select
    atendimento_id,
    cliente_id,
    canal,
    data_abertura,
    tma_minutos,
    sla_cumprido,
    -- FCR: resolvido no único contato do caso, sem reabertura/transferência.
    (ordem_contato_caso = 1 and total_contatos_caso = 1) as resolvido_primeiro_contato
from calculado
`;

export default function CallCenterAnalyticsPage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/#projetos"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft aria-hidden className="size-3.5" />
        Voltar para Projetos
      </Link>

      <header className="mt-6 mb-16 border-b border-border pb-8">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-primary uppercase">
          Case Study Operacional
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pipeline de Dados Operacionais — Simulação de Call Center
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          De evento bruto a decisão de negócio: ingestão, modelagem
          dimensional em dbt e um dashboard de SLA/TMA/FCR pra uma operação
          simulada de atendimento multicanal.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="mb-4 font-mono text-xl font-semibold text-foreground">
          Contexto de Negócio
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Operação de atendimento multicanal (telefone, chat, WhatsApp,
            e-mail) sem visibilidade consolidada de SLA por canal: cada fila
            reportava tempo médio de atendimento (TMA) isoladamente, sem
            comparabilidade, e não havia uma métrica confiável de resolução
            no primeiro contato (FCR) — reaberturas e transferências entre
            filas inflavam o volume sem sinalizar retrabalho.
          </p>
          <p>
            O gargalo identificado não era de capacidade de atendimento, e
            sim de dado: sem uma fonte única de verdade (Star Schema com
            grão por atendimento), qualquer decisão de escala de equipe por
            canal dependia de planilhas manuais reconciliadas semanalmente.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 font-mono text-xl font-semibold text-foreground">
          Arquitetura do Pipeline
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          {PIPELINE_STAGES.map((stage, index) => (
            <div key={stage.id} className="flex flex-1 items-center gap-3">
              <div className="glass-card flex flex-1 flex-col gap-2 rounded-xl p-4">
                <stage.Icon aria-hidden className="size-5 text-primary" />
                <span className="font-mono text-xs font-semibold text-foreground">
                  {stage.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stage.detail}
                </span>
              </div>
              {index < PIPELINE_STAGES.length - 1 ? (
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 rotate-90 text-muted-foreground sm:rotate-0"
                />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-2 font-mono text-xl font-semibold text-foreground">
          Dashboard Interativo
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Dados simulados (sem PII), consumindo o grão de{" "}
          <code className="rounded border border-border bg-card px-1 py-0.5 font-mono text-xs">
            fct_atendimentos
          </code>
          . Passe o mouse nos gráficos para ver os valores por ponto.
        </p>
        <CallCenterDashboard />
      </section>

      <section>
        <h2 className="mb-2 font-mono text-xl font-semibold text-foreground">
          Modelo dimensional (dbt)
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          O fato que alimenta o dashboard acima — cumprimento de SLA e FCR
          calculados na camada de marts, não na visualização.
        </p>
        <SqlCodeBlock code={FCT_ATENDIMENTOS_SQL} filename="models/marts/fct_atendimentos.sql" />
      </section>
    </article>
  );
}
