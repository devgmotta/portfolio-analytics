const NAV_LINKS = [
  { id: "experiencia", label: "Experiência", href: "#experiencia" },
  { id: "projetos", label: "Projetos", href: "#projetos" },
  { id: "contato", label: "Contato", href: "#contato" },
];

export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          aria-label="Ir para o início"
          className="flex size-8 items-center justify-center rounded-lg border border-border font-mono text-xs font-semibold text-primary"
        >
          GM
        </a>

        <span className="hidden items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[0.65rem] tracking-wide text-muted-foreground uppercase sm:flex">
          <span
            aria-hidden
            className="size-1.5 animate-pulse rounded-full bg-secondary"
          />
          Available for new roles
        </span>

        <nav aria-label="Seções da página" className="hidden md:block">
          <ul role="list" className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
