import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function HeroSection() {
  return (
      // Checado empiricamente (Playwright, 1440x900 / 1440x760 / 1280x720 /
      // 390x844): o CTA já ficava acima da dobra com min-h-[90vh] em todos
      // esses viewports — não reproduzi o corte relatado. Troquei mesmo
      // assim pra padding responsivo: min-h em vh é frágil em janelas muito
      // baixas/paisagem mobile (pode sobrar espaço vazio gigante ou, no
      // limite, estourar), enquanto padding cresce com o conteúdo — mais
      // previsível como base de um design system de produção.
    <section className="relative flex items-center justify-center overflow-hidden px-6 py-24 md:py-32 lg:py-40">
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
          compartilham a mesma implementação — mas ambos convergem pro
          mesmo h-11/px-5/rounded-lg/text-sm/duration-200 (ShimmerButton via
          seus próprios defaults, Button via size="cta"), pra não haver
          desalinhamento visual entre os dois CTAs lado a lado.
        */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <ShimmerButton href="#projetos" className="font-mono">
            Ver Infraestrutura
          </ShimmerButton>
          <Button
            variant="outline"
            size="cta"
            className="font-mono"
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
