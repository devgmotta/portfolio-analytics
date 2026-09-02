"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";

import { EDUCATION } from "@/data/education";
import { EXPERIENCE } from "@/data/experience";

export function ExperienceTimelineSection() {
  return (
    <section
      id="experiencia"
      className="mx-auto max-w-3xl px-6 py-24 scroll-mt-20"
    >
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
          // `initial`/`whileInView` são literais incondicionais — nenhum hook
          // client-only decide o valor. Server e o 1º paint do client calculam
          // exatamente o mesmo estilo, então não há hydration mismatch (bug
          // real que já aconteceu aqui quando `useReducedMotion()` ramificava
          // esse valor — ver histórico em tarefas/concluidas/011-*.md). O
          // `MotionConfig` global neutraliza a parte de `y` pra quem prefere
          // menos movimento; a opacidade ainda faz um fade rápido nesse caso,
          // trade-off aceitável — bem diferente de "conteúdo travado invisível
          // pra sempre".
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
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

      <div className="mt-16 border-t border-border pt-10">
        <h3 className="mb-6 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Formação
        </h3>
        <ul role="list" className="flex flex-col gap-4">
          {EDUCATION.map((entry) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <GraduationCap
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-secondary"
              />
              <div>
                <p className="font-medium text-foreground">{entry.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.institution} ·{" "}
                  <span className="font-mono text-xs">
                    {entry.status === "cursando" ? "cursando" : "concluído"} —{" "}
                    {entry.period}
                  </span>
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
