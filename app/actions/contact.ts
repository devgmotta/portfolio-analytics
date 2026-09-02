"use server";

import { Resend } from "resend";
import { z } from "zod";

const CONTACT_RECIPIENT = "devgmleite@gmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto.").max(120),
  email: z.email("E-mail inválido."),
  message: z.string().trim().min(10, "Mensagem muito curta.").max(4000),
  // Honeypot: campo escondido via CSS que só um bot preenche. Humano nunca
  // vê nem toca; se vier preenchido, é spam — descartamos sem chamar o
  // Resend (evita gastar cota da API com bot).
  company: z.string().max(0, "").optional(),
});

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
}

/** Escapa HTML — nome/e-mail/mensagem vêm de quem preenche o formulário, sem
 * isso um remetente malicioso poderia injetar markup no e-mail renderizado. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Template do e-mail de contato. Hex literais (não var(--token)) pelo mesmo
 * motivo de app/opengraph-image.tsx e app/icon.tsx: clientes de e-mail não
 * leem CSS custom properties de forma confiável (nem sempre nem `<style>` no
 * `<head>` sobrevive), então o valor precisa estar inline — mas são os
 * MESMOS hex de app/globals.css (--background/--foreground/--border/
 * --primary/--muted-foreground), não valores inventados.
 */
function buildContactEmailHtml(params: {
  name: string;
  email: string;
  message: string;
}): string {
  const name = escapeHtml(params.name);
  const email = escapeHtml(params.email);
  const message = escapeHtml(params.message).replace(/\n/g, "<br>");

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:32px 16px;background-color:#09090b;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
      <tr>
        <td style="padding-bottom:20px;">
          <span style="font-family:ui-monospace,'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#f97316;">
            Novo contato — Terminal Elegance
          </span>
        </td>
      </tr>
      <tr>
        <td style="background-color:#131316;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td style="padding-bottom:6px;font-family:ui-monospace,'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">
                Nome
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;color:#f4f4f5;">${name}</td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <tr>
              <td style="padding-bottom:6px;font-family:ui-monospace,'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">
                E-mail
              </td>
            </tr>
            <tr>
              <td style="font-family:ui-monospace,'JetBrains Mono',monospace;font-size:14px;color:#f97316;">
                <a href="mailto:${email}" style="color:#f97316;text-decoration:none;">${email}</a>
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;">
            <tr>
              <td style="padding-bottom:8px;font-family:ui-monospace,'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">
                Mensagem
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.6;color:#f4f4f5;white-space:pre-wrap;">${message}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top:16px;font-family:ui-monospace,'JetBrains Mono',monospace;font-size:11px;color:#71717a;">
          Enviado pelo formulário de contato do portfólio.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "message") {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Confira os campos destacados.",
      fieldErrors,
    };
  }

  // Honeypot preenchido = bot. Responde "sucesso" pro bot (não dá pista de
  // que foi filtrado) sem gastar cota da API do Resend com o envio real.
  if (parsed.data.company) {
    return { status: "success", message: "Mensagem enviada." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message:
        "Formulário ainda não configurado (RESEND_API_KEY ausente). Tente novamente mais tarde ou me chame direto.",
    };
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;

  const { error } = await resend.emails.send({
    // onboarding@resend.dev é o remetente de teste do Resend, válido sem
    // domínio verificado — troque para um endereço do seu domínio
    // (ex.: contato@gmotta.space) assim que verificar o domínio no Resend.
    from: "Portfólio <onboarding@resend.dev>",
    to: [CONTACT_RECIPIENT],
    replyTo: email,
    subject: `Novo contato pelo portfólio — ${name}`,
    // text é o fallback pra clientes/leitores de tela que não renderizam
    // HTML — precisa continuar existindo, não só o html.
    text: `De: ${name} <${email}>\n\n${message}`,
    html: buildContactEmailHtml({ name, email, message }),
  });

  if (error) {
    return {
      status: "error",
      message: "Não consegui enviar agora. Tente de novo em instantes.",
    };
  }

  return { status: "success", message: "Mensagem enviada — obrigado!" };
}
