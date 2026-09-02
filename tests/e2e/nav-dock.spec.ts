import { expect, test } from "@playwright/test";

test.describe("TopBar", () => {
  test("renderiza logo, badge e nav por âncora", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Ir para o início" })).toBeVisible();
    await expect(page.getByText("Available for new roles")).toBeVisible();

    const nav = page.getByRole("navigation", { name: "Seções da página" });
    await expect(nav.getByRole("link", { name: "Experiência" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Projetos" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contato" })).toBeVisible();
  });
});

test.describe("FloatingDock", () => {
  test("renderiza os 7 itens e navega por âncora", async ({ page }) => {
    await page.goto("/");

    const dock = page.getByRole("navigation", { name: "Navegação principal" });
    await expect(dock).toBeVisible();

    for (const label of ["Home", "Experiência", "Projetos", "Contato", "GitHub", "LinkedIn"]) {
      await expect(dock.getByRole("link", { name: label })).toBeVisible();
    }
    await expect(dock.getByRole("button", { name: "Alternar tema claro/escuro" })).toBeVisible();

    await dock.getByRole("link", { name: "Contato" }).click();
    await expect(page).toHaveURL(/#contato$/);
    await expect(page.locator("#contato")).toBeInViewport();
  });

  test("tooltip aparece no hover de um ícone", async ({ page }) => {
    await page.goto("/");
    const dock = page.getByRole("navigation", { name: "Navegação principal" });
    await dock.getByRole("link", { name: "Projetos" }).hover();
    await expect(page.getByText("Projetos", { exact: true }).last()).toBeVisible();
  });

  test("toggle de tema alterna a classe dark no html", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const initiallyDark = (await html.getAttribute("class"))?.includes("dark") ?? false;

    const dock = page.getByRole("navigation", { name: "Navegação principal" });
    await dock.getByRole("button", { name: "Alternar tema claro/escuro" }).click();

    await expect
      .poll(async () => (await html.getAttribute("class"))?.includes("dark") ?? false)
      .toBe(!initiallyDark);
  });
});
