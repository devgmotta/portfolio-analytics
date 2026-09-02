import React, {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
} from "react"

import { cn } from "@/lib/utils"

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
  /** Quando presente, renderiza como <a> (ex.: CTA que ancora numa seção). */
  href?: string
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "var(--primary-foreground)",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      // 0.75rem = --radius-lg do design system (mesmo raio dos outros
      // botões/cards) — não o pill padrão (100px) do componente Magic UI
      // original, que destoava do resto da "Terminal Elegance".
      borderRadius = "0.75rem",
      background = "var(--primary)",
      className,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const Comp = (href ? "a" : "button") as ElementType
    return (
      <Comp
        href={href}
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex h-10 cursor-pointer items-center justify-center gap-1.5 overflow-hidden [border-radius:var(--radius)] border border-border px-4 text-sm font-medium whitespace-nowrap text-primary-foreground [background:var(--bg)]",
          // Mesma duração/propriedade do Button unificado (size="cta") —
          // consistência de comportamento de hover em toda a página.
          "transform-gpu transition-all duration-200 ease-in-out active:translate-y-px",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "@container-[size] absolute inset-0 overflow-visible"
          )}
        >
          {/* spark */}
          <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
            {/* spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            "absolute inset-0 size-full",

            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_color-mix(in_oklab,var(--foreground)_12%,transparent)]",

            // transition
            "transform-gpu transition-all duration-300 ease-in-out",

            // on hover
            "group-hover:shadow-[inset_0_-6px_10px_color-mix(in_oklab,var(--foreground)_25%,transparent)]",

            // on click
            "group-active:shadow-[inset_0_-10px_10px_color-mix(in_oklab,var(--foreground)_25%,transparent)]"
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
          )}
        />
      </Comp>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"
