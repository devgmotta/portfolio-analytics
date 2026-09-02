import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function HeroSection() {
  return (
    // min-h-[82vh] + py-16 residual: altura mínima controlada (CTA sempre
    // acima da dobra, checado via Playwright em 1920x1080/1440x900/390x844),
    // com padding de respiro pra não cortar conteúdo em janelas muito baixas
    // ou paisagem mobile (min-h puro em vh sem nenhum padding pode estourar).
    <section
      id="home"
      className="relative flex min-h-[82vh] items-center justify-center overflow-hidden px-6 py-16 scroll-mt-14"
    >
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

        {/*
          Design system de botões unificado: ShimmerButton (Magic UI,
          sistema de props próprio) e Button (shadcn/Base UI, cva) não
          compartilham a mesma implementação — mas ambos convergem pro mesmo
          h-10/px-4/rounded-lg/text-sm/font-mono/duration-200 (ShimmerButton
          via seus próprios defaults, Button via size="cta", que já embute
          font-mono), pra não haver desalinhamento visual entre os dois CTAs
          lado a lado. Variante "secundária" = outline (zinc com borda), não
          a variante "secondary" do cva (essa é teal, papel de acento/badge).
        */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <ShimmerButton href="#projetos" className="font-mono">
            Ver Infraestrutura
          </ShimmerButton>
          <Button
            variant="outline"
            size="cta"
            nativeButton={false}
            render={<a href="#experiencia" />}
          >
            Ler Logs Técnicos
          </Button>
        </div>
      </div>
    </section>
  );
}
