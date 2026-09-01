# 007 — Bento Grid + project-card.tsx
Fase: 2
Status: pendente

## Objetivo
Instalar Magic UI Bento Grid + Border Beam; project-card.tsx renderiza cada Project (branch media.kind iframe/imagem), tags como Badge variante "glass" (bg-secondary/10, não preenchimento sólido), link de repo, Border Beam só ativo em group-hover; card abre Dialog (shadcn) com mídia ampliada.

## Arquivos afetados
components/magicui/{bento-grid,border-beam}.tsx, components/project-card.tsx

## Critérios de aceite
- iframe (Looker Studio) e imagem renderizam corretamente conforme media.kind.
- Dialog abre com a mídia ampliada e fecha (Esc, clique fora, botão).
- Nenhum hex fora de token; Badge usa variante glass, não sólida.

## Auditoria
(preenchido ao concluir)
