"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  // `resolvedTheme` só existe depois do mount (next-themes injeta um script
  // bloqueante pra evitar flash, mas o valor em si não está disponível no
  // 1º render do client nem no server). Servidor e 1º paint do client
  // renderizam o MESMO placeholder (mounted=false nos dois) — não há
  // divergência de estilo/atributo entre eles, então não é o mesmo tipo de
  // hydration mismatch que já aconteceu neste projeto (ver
  // experience-timeline-section.tsx): aqui o valor inicial é idêntico nos
  // dois lados, só o ícone final aparece depois, sem travar nada visível.
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // Mesma justificativa de components/ui/meteors.tsx: "mounted" só pode
    // ser sabido no cliente, depois do 1º paint — não dá pra calcular isso
    // durante o render (nem no servidor, nem de forma hidratável).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Alternar tema claro/escuro"
      className="fixed top-4 right-4 z-50 flex size-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun aria-hidden className="size-4" />
        ) : (
          <Moon aria-hidden className="size-4" />
        )
      ) : (
        <span aria-hidden className="size-4" />
      )}
    </button>
  );
}
