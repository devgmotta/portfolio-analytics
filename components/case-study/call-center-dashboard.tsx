"use client";

import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Dados mockados (cenário simulado, sem PII) — série de 14 dias representando
 * o efeito do pipeline: TMA caindo conforme os dados de roteamento por canal
 * amadurecem no dbt. Cores via var(--chart-N)/var(--border)/var(--muted-
 * foreground): os mesmos tokens de app/globals.css, resolvidos pelo browser
 * em atributos de apresentação SVG (fill/stroke aceitam var() nativamente) —
 * adapta sozinho ao tema claro/escuro, sem JS extra pra detectar tema.
 */
const TMA_DIARIO = [
  { dia: "01/09", tmaMinutos: 9.4 },
  { dia: "02/09", tmaMinutos: 9.1 },
  { dia: "03/09", tmaMinutos: 8.8 },
  { dia: "04/09", tmaMinutos: 8.9 },
  { dia: "05/09", tmaMinutos: 8.3 },
  { dia: "06/09", tmaMinutos: 7.9 },
  { dia: "07/09", tmaMinutos: 7.6 },
  { dia: "08/09", tmaMinutos: 7.8 },
  { dia: "09/09", tmaMinutos: 7.2 },
  { dia: "10/09", tmaMinutos: 6.9 },
  { dia: "11/09", tmaMinutos: 6.7 },
  { dia: "12/09", tmaMinutos: 6.5 },
  { dia: "13/09", tmaMinutos: 6.6 },
  { dia: "14/09", tmaMinutos: 6.1 },
];

const FCR_PERCENTUAL = 78;
const FCR_DATA = [{ name: "FCR", value: FCR_PERCENTUAL, fill: "var(--chart-2)" }];

const VOLUME_POR_CANAL = [
  { canal: "Telefone", volume: 42 },
  { canal: "Chat", volume: 28 },
  { canal: "WhatsApp", volume: 18 },
  { canal: "E-mail", volume: 12 },
];

const CANAL_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card flex flex-col gap-3 rounded-xl p-5">
      <div>
        <h3 className="font-mono text-sm font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function CallCenterDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <ChartCard
        title="TMA diário (minutos)"
        description="Tempo Médio de Atendimento — últimos 14 dias, pós-otimização de roteamento por canal."
      >
        <div className="h-56 text-muted-foreground">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TMA_DIARIO} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="dia"
                stroke="currentColor"
                fontSize={11}
                fontFamily="var(--font-mono)"
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                interval={2}
              />
              <YAxis
                stroke="currentColor"
                fontSize={11}
                fontFamily="var(--font-mono)"
                tickLine={false}
                axisLine={false}
                width={32}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                }}
                labelStyle={{ color: "var(--popover-foreground)" }}
                formatter={(value) => [`${value} min`, "TMA"]}
              />
              <Line
                type="monotone"
                dataKey="tmaMinutos"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard
        title="FCR — Resolução no 1º contato"
        description="Percentual de atendimentos resolvidos sem reabertura ou transferência."
      >
        <div className="relative h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={FCR_DATA}
              innerRadius="72%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              barSize={14}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                dataKey="value"
                background={{ fill: "var(--muted)" }}
                cornerRadius={8}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-3xl font-bold text-secondary">
              {FCR_PERCENTUAL}%
            </span>
            <span className="text-xs text-muted-foreground">meta: 75%</span>
          </div>
        </div>
      </ChartCard>

      <ChartCard
        title="Volume por canal"
        description="Distribuição dos atendimentos abertos por canal de entrada."
      >
        <div className="h-56 text-muted-foreground">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                }}
                labelStyle={{ color: "var(--popover-foreground)" }}
                formatter={(value) => [`${value}%`, "Volume"]}
              />
              <Legend
                wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}
              />
              <Pie
                data={VOLUME_POR_CANAL}
                dataKey="volume"
                nameKey="canal"
                innerRadius={40}
                outerRadius={72}
                paddingAngle={2}
              >
                {VOLUME_POR_CANAL.map((entry, index) => (
                  <Cell
                    key={entry.canal}
                    fill={CANAL_COLORS[index % CANAL_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
