"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

const CONTACT_EMAIL = "devgmleite@gmail.com";
const SOCIAL_LINKS = [
  { id: "github", label: "GitHub", href: "https://github.com/devgmotta", Icon: SiGithub },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/devgmotta",
    Icon: FaLinkedin,
  },
];

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(CONTACT_EMAIL);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard API pode falhar (permissão negada, contexto não
          // seguro) — sem crash, o e-mail já está visível como texto pra
          // copiar manualmente.
        }
      }}
      aria-label={`Copiar e-mail ${CONTACT_EMAIL}`}
      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-primary"
    >
      <Mail aria-hidden className="size-3.5" />
      {CONTACT_EMAIL}
      {copied ? (
        <Check aria-hidden className="size-3.5 text-secondary" />
      ) : (
        <Copy aria-hidden className="size-3.5" />
      )}
    </button>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-primary">&gt;_</span>
          <span>Terminal Elegance</span>
          <span aria-hidden>·</span>
          <span>© {year} Gabriel Motta Leite</span>
        </div>

        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              <Icon aria-hidden className="size-4" />
            </a>
          ))}
          <CopyEmailButton />
        </div>
      </div>
    </footer>
  );
}
