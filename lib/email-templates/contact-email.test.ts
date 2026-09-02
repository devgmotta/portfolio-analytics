import { describe, expect, test } from "bun:test";

import { buildContactEmailHtml } from "./contact-email";

const SAMPLE = {
  name: "Fulano de Tal",
  email: "fulano@example.com",
  message: "Olá!\nGostaria de conversar sobre uma vaga.",
};

describe("buildContactEmailHtml", () => {
  test("aplica a spec de cores/tipografia do design system", () => {
    const html = buildContactEmailHtml(SAMPLE);

    expect(html).toContain("background-color:#09090b");
    expect(html).toContain("border:1px solid #27272a");
    expect(html).toContain("font-family:ui-monospace");
  });

  test("destaca o e-mail de resposta rápida com mailto:", () => {
    const html = buildContactEmailHtml(SAMPLE);

    expect(html).toContain(`href="mailto:${SAMPLE.email}"`);
    expect(html).toContain("Responder direto");
  });

  test("isola a mensagem num bloco de citação estilizado", () => {
    const html = buildContactEmailHtml(SAMPLE);

    expect(html).toContain("border-left:3px solid #f97316");
    // Quebra de linha da mensagem original vira <br>, mantendo o texto.
    expect(html).toContain("Olá!<br>Gostaria de conversar sobre uma vaga.");
  });

  test("escapa HTML malicioso em nome, e-mail e mensagem", () => {
    const html = buildContactEmailHtml({
      name: '<img src=x onerror=alert(1)>',
      email: "atacante@example.com",
      message: '<script>alert("xss")</script>',
    });

    expect(html).not.toContain("<img src=x onerror=alert(1)>");
    expect(html).not.toContain("<script>alert(\"xss\")</script>");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(html).toContain("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
  });
});
