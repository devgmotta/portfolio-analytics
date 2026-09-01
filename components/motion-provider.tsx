"use client";

import { MotionConfig } from "motion/react";

/**
 * Aplica prefers-reduced-motion a todas as animações JS-driven do `motion`
 * (BorderBeam, reveal da Timeline) — animações CSS puras (marquee/shimmer/
 * meteor) já são cobertas separadamente pelo @media em app/globals.css.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
