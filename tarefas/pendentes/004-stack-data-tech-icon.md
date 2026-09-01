# 004 — data/stack.ts + tech-icon.tsx
Fase: 1
Status: pendente

## Objetivo
Lista tipada de tecnologias (Python, SQL, BigQuery, dbt, Docker, Power BI, React) em data/stack.ts; componente tech-icon.tsx usando react-icons/si (monocromático via currentColor) com fallback lucide Database para SQL (não é marca).

**Desvio descoberto na implementação:** `react-icons/si` (Simple Icons) não distribui logotipo de "dbt" (removido por pedido de marca) nem de "Power BI" (nunca incluído, restrição de marca Microsoft). Confirmado via inspeção direta do pacote (`Object.keys(require('react-icons/si'))`), não por suposição. Solução: badge monoespaçado com o nome ("dbt", "BI") para esses dois, em vez de forçar um ícone genérico que não representa a ferramenta — consistente com a estética "Terminal Elegance" (mono para nomes técnicos).

## Arquivos afetados
data/stack.ts, components/tech-icon.tsx

## Critérios de aceite
- Ícones/badges renderizam monocromáticos (herdam text-muted-foreground / usam border-border).
- Nenhum ícone quebrado/undefined para os 7 itens da lista (verificado: todos os 7 aparecem no RSC payload renderizado).

## Auditoria
(preenchido ao concluir)
