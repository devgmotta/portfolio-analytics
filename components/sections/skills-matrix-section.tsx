"use client";

import { motion } from "motion/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TechIcon } from "@/components/tech-icon";
import {
  SKILL_CLUSTERS,
  TECH_STACK,
  type SkillCluster,
  type TechStackItem,
} from "@/data/stack";

const CLUSTER_ORDER: SkillCluster[] = [
  "data-cloud",
  "data-science",
  "software-apis",
  "ai-engineering",
];

const ITEM_CLASS =
  "flex items-center gap-2.5 rounded-lg border border-border/60 px-2.5 py-2 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground";

function SkillItem({ item }: { item: TechStackItem }) {
  const content = (
    <>
      <span className="flex size-5 shrink-0 items-center justify-center text-primary">
        <TechIcon item={item} className="size-4" />
      </span>
      <span className="font-mono">{item.name}</span>
    </>
  );

  if (!item.equivalents) {
    return <li className={ITEM_CLASS}>{content}</li>;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={<li className={ITEM_CLASS} tabIndex={0} />}>
        {content}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-64">
        {item.equivalents}
      </TooltipContent>
    </Tooltip>
  );
}

export function SkillsMatrixSection() {
  return (
    <section id="skills" className="border-y border-border py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 border-b border-border pb-4">
          <h2 className="font-mono text-2xl font-semibold text-foreground">
            Matriz de Competências
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Passe o mouse (ou use Tab) nos itens de cloud para ver a
            equivalência arquitetural entre provedores.
          </p>
        </div>

        <TooltipProvider delay={150}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CLUSTER_ORDER.map((clusterId, clusterIndex) => {
              const cluster = SKILL_CLUSTERS[clusterId];
              const items = TECH_STACK.filter(
                (item) => item.cluster === clusterId
              );

              return (
                <motion.div
                  key={clusterId}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: clusterIndex * 0.08 }}
                  className="glass-card flex flex-col gap-4 rounded-xl p-5"
                >
                  <div>
                    <h3 className="font-mono text-sm font-semibold text-primary">
                      {cluster.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {cluster.signal}
                    </p>
                  </div>

                  <ul role="list" className="flex flex-col gap-2">
                    {items.map((item) => (
                      <SkillItem key={item.id} item={item} />
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
