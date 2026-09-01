"use client";

import { motion, useReducedMotion } from "motion/react";

import { EXPERIENCE } from "@/data/experience";

export function ExperienceTimelineSection() {
  // MotionConfig(reducedMotion="user") do layout só neutraliza propriedades
  // posicionais/transform (x/y/scale/...), NÃO opacity — confirmado no
  // código-fonte de motion-dom (positionalKeys não inclui "opacity"). Por
  // isso o fade precisa ser desligado explicitamente aqui, não só herdado.
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-12 border-b border-border pb-4">
        <h2 className="font-mono text-2xl font-semibold text-foreground">
          Experiência Profissional
        </h2>
      </div>

      <ol
        role="list"
        className="relative flex list-none flex-col gap-12 border-l-2 border-secondary/40 pl-8"
      >
        {EXPERIENCE.map((entry, index) => (
          <motion.li
            key={entry.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={
              shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <span
              aria-hidden
              className="absolute top-1.5 -left-[2.35rem] size-3 rounded-full bg-secondary"
            />

            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold text-foreground">
                {entry.role} · {entry.company}
              </h3>
              <span className="font-mono text-xs text-primary">
                {entry.period}
              </span>
            </div>

            <ul
              role="list"
              className="flex flex-col gap-1.5 text-sm text-muted-foreground"
            >
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span aria-hidden className="text-secondary">
                    ›
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
