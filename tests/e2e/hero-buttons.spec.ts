import { expect, test } from "@playwright/test";

test.describe("Design system de botões", () => {
  test("os 3 CTAs reais têm a mesma anatomia (h-10, px-4, rounded-lg)", async ({ page }) => {
    await page.goto("/#home");

    const shimmerButton = page.getByRole("link", { name: "Ver Infraestrutura" });
    // O Button do Base UI mantém role="button" mesmo renderizando como <a>
    // (render={<a .../>}) — é uma ação que rola até uma seção, não uma
    // navegação de verdade, então o role semântico correto é "button".
    const outlineButton = page.getByRole("button", { name: "Ler Logs Técnicos" });

    await page.locator("#contato").scrollIntoViewIfNeeded();
    const submitButton = page.getByRole("button", { name: "Enviar mensagem" });

    for (const button of [shimmerButton, outlineButton, submitButton]) {
      await expect(button).toBeVisible();
      const box = await button.boundingBox();
      expect(box?.height).toBeCloseTo(40, 0);

      const paddingLeft = await button.evaluate(
        (el) => window.getComputedStyle(el).paddingLeft
      );
      const borderRadius = await button.evaluate(
        (el) => window.getComputedStyle(el).borderRadius
      );
      expect(paddingLeft).toBe("16px");
      expect(borderRadius).toBe("12px");
    }
  });
});

test.describe("Hero acima da dobra", () => {
  const viewports = [
    { name: "desktop-1080p", width: 1920, height: 1080 },
    { name: "laptop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ];

  for (const viewport of viewports) {
    test(`CTA visível sem scroll em ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");

      await expect(
        page.getByRole("link", { name: "Ver Infraestrutura" })
      ).toBeInViewport();
    });
  }
});
