import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Meteors number={15} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-border bg-card/60 px-4 py-1 font-mono text-xs tracking-widest text-muted-foreground uppercase backdrop-blur">
          Engenharia de Dados &amp; Software
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
          Analista de Dados &amp;{" "}
          <span className="text-primary">Analytics Engineer</span>
        </h1>

        <p className="max-w-2xl text-lg text-balance text-muted-foreground">
          Entrega de ponta a ponta: ingestão e ETL, modelagem em dbt e
          orquestração na Cloud — de dado bruto a decisão de negócio.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <ShimmerButton className="font-mono text-sm font-medium">
            Ver Infraestrutura
          </ShimmerButton>
          <Button variant="outline" size="lg" className="font-mono text-sm">
            Ler Logs Técnicos
          </Button>
        </div>
      </div>
    </section>
  );
}
