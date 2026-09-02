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
 *
 * Vive fora de app/actions/contact.ts (que é "use server") porque um módulo
 * "use server" só pode exportar funções async — essa função síncrona não
 * poderia ser exportada de lá pra ser testada isoladamente.
 */
export function buildContactEmailHtml(params: {
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
            Novo contato pelo portfólio
          </span>
        </td>
      </tr>
      <tr>
        <td style="background-color:#131316;border:1px solid #27272a;border-radius:12px;padding:24px;">
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
                Responder direto
              </td>
            </tr>
            <tr>
              <td style="font-family:ui-monospace,'JetBrains Mono',monospace;font-size:14px;">
                <a href="mailto:${email}" style="color:#f97316;text-decoration:none;font-weight:600;">${email}</a>
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #27272a;padding-top:16px;">
            <tr>
              <td style="padding-bottom:8px;font-family:ui-monospace,'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">
                Mensagem
              </td>
            </tr>
            <tr>
              <td style="border-left:3px solid #f97316;background-color:#09090b;border-radius:0 6px 6px 0;padding:12px 16px;font-size:15px;line-height:1.6;color:#f4f4f5;white-space:pre-wrap;">${message}</td>
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
