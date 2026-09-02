"use client";

import { useEffect, useState } from "react";
import { Briefcase, FolderGit2, Home, Mail, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

type DockLink = {
  id: string;
  label: string;
  href: string;
  Icon: React.ElementType;
  external?: boolean;
};

const DOCK_LINKS: DockLink[] = [
  { id: "home", label: "Home", href: "#home", Icon: Home },
  { id: "experiencia", label: "Experiência", href: "#experiencia", Icon: Briefcase },
  { id: "projetos", label: "Projetos", href: "#projetos", Icon: FolderGit2 },
  { id: "contato", label: "Contato", href: "#contato", Icon: Mail },
  { id: "github", label: "GitHub", href: GITHUB_URL, Icon: SiGithub, external: true },
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN_URL, Icon: FaLinkedin, external: true },
];

const DOCK_ICON_CLASS =
  "flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:bg-white/10 focus-visible:text-foreground focus-visible:outline-none";

const HOVER = { scale: 1.15, y: -4 };
const TAP = { scale: 0.95 };

function DockLinkIcon({ id, label, href, Icon, external }: DockLink) {
  // Âncoras (#home, #projetos...) só existem na home — noutra rota (ex.: o
  // case study em /projetos/...) precisam do prefixo "/" pra voltar antes
  // de rolar, senão o navegador só anexa o hash na URL atual sem sair da
  // página (link morto).
  const pathname = usePathname();
  const resolvedHref =
    !external && href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  return (
    <Tooltip key={id}>
      <TooltipTrigger
        render={
          <motion.a
            href={resolvedHref}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={label}
            whileHover={HOVER}
            whileTap={TAP}
            className={DOCK_ICON_CLASS}
          />
        }
      >
        <Icon aria-hidden className="size-5" />
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}

function ThemeDockButton() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <motion.button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Alternar tema claro/escuro"
            whileHover={HOVER}
            whileTap={TAP}
            className={DOCK_ICON_CLASS}
          />
        }
      >
        {mounted ? (
          resolvedTheme === "dark" ? (
            <Sun aria-hidden className="size-5" />
          ) : (
            <Moon aria-hidden className="size-5" />
          )
        ) : (
          <span aria-hidden className="size-5" />
        )}
      </TooltipTrigger>
      <TooltipContent side="top">Alternar tema claro/escuro</TooltipContent>
    </Tooltip>
  );
}

export function FloatingDock() {
  return (
    <TooltipProvider delay={150}>
      <motion.nav
        aria-label="Navegação principal"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed inset-x-0 bottom-6 z-50 mx-auto w-max"
      >
        <div className="flex items-center gap-1 rounded-2xl border border-zinc-800/80 bg-zinc-950/75 px-2 py-2 shadow-lg backdrop-blur-md">
          {DOCK_LINKS.map((link) => (
            <DockLinkIcon key={link.id} {...link} />
          ))}

          <span aria-hidden className="mx-1 h-6 w-px bg-zinc-800/80" />

          <ThemeDockButton />
        </div>
      </motion.nav>
    </TooltipProvider>
  );
}
