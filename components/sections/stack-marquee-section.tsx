import { Marquee } from "@/components/ui/marquee";
import { TechIcon } from "@/components/tech-icon";
import { TECH_STACK } from "@/data/stack";

export function StackMarqueeSection() {
  return (
    <section className="relative border-y border-border py-10">
      <Marquee pauseOnHover className="[--duration:30s]">
        {TECH_STACK.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <TechIcon item={item} />
            <span className="font-mono text-sm">{item.name}</span>
          </div>
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l" />
    </section>
  );
}
