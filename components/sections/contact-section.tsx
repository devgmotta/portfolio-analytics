"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  sendContactMessage,
  type ContactState,
} from "@/app/actions/contact";
import { Button } from "@/components/ui/button";

const initialState: ContactState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="cta"
      disabled={pending}
      className="font-mono"
    >
      {pending ? "Enviando..." : "Enviar mensagem"}
    </Button>
  );
}

export function ContactSection() {
  const [state, formAction] = useActionState(
    sendContactMessage,
    initialState
  );

  return (
    <section
      id="contato"
      className="mx-auto max-w-2xl px-6 py-24 scroll-mt-20"
    >
      <div className="mb-12 border-b border-border pb-4">
        <h2 className="font-mono text-2xl font-semibold text-foreground">
          Contato
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tem uma vaga, um projeto ou só quer trocar uma ideia sobre dados?
          Manda uma mensagem.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        {/* Honeypot: escondido de humanos via CSS (não display:none, pra
            não sinalizar tão facilmente pra bots mais espertos), nunca
            recebe foco nem é lido por leitor de tela. */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="company">Empresa</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="font-mono text-xs text-muted-foreground uppercase"
          >
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          {state.fieldErrors?.name ? (
            <p className="text-xs text-destructive">
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="font-mono text-xs text-muted-foreground uppercase"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          {state.fieldErrors?.email ? (
            <p className="text-xs text-destructive">
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="font-mono text-xs text-muted-foreground uppercase"
          >
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            className="resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          {state.fieldErrors?.message ? (
            <p className="text-xs text-destructive">
              {state.fieldErrors.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <SubmitButton />
          <p role="status" aria-live="polite" className="text-sm">
            {state.status === "success" ? (
              <span className="text-secondary">{state.message}</span>
            ) : state.status === "error" && !state.fieldErrors ? (
              <span className="text-destructive">{state.message}</span>
            ) : null}
          </p>
        </div>
      </form>
    </section>
  );
}
