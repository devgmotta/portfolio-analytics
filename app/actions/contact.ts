"use server";

import { Resend } from "resend";
import { z } from "zod";

import { buildContactEmailHtml } from "@/lib/email-templates/contact-email";

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
