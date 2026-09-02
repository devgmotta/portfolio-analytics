import { expect, test } from "@playwright/test";

test.describe("Case study: call-center-analytics", () => {
  test("botão 'Explorar Case Interativo' navega da home até a subpágina", async ({ page }) => {
    await page.goto("/#projetos");

    // O Button do Base UI mantém role="button" mesmo renderizando como <a>
    // via render={<Link .../>} — mesmo caso do CTA outline da Hero.
    await page
      .getByRole("button", { name: "Explorar Case Interativo" })
      .click();

    await expect(page).toHaveURL(/\/projetos\/call-center-analytics$/);
    await expect(
      page.getByRole("heading", {
        name: "Pipeline de Dados Operacionais — Simulação de Call Center",
      })
    ).toBeVisible();
  });

  test("renderiza contexto de negócio, arquitetura, dashboard e código SQL", async ({ page }) => {
    await page.goto("/projetos/call-center-analytics");

    await expect(page.getByRole("heading", { name: "Contexto de Negócio" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Arquitetura do Pipeline" })).toBeVisible();
    await expect(page.getByText("BigQuery / PostgreSQL")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dashboard Interativo" })).toBeVisible();
    await expect(page.getByText("TMA diário (minutos)")).toBeVisible();
    await expect(page.getByText("FCR — Resolução no 1º contato")).toBeVisible();
    await expect(page.getByText("78%")).toBeVisible();
    await expect(
      page.getByText("models/marts/fct_atendimentos.sql", { exact: true })
    ).toBeVisible();
    await expect(page.getByText("row_number").first()).toBeVisible();
  });

  test("link 'Voltar para Projetos' volta pra home", async ({ page }) => {
    await page.goto("/projetos/call-center-analytics");

    await page.getByRole("link", { name: "Voltar para Projetos" }).click();
    await expect(page).toHaveURL(/\/#projetos$/);
  });

  test("dock com âncora #home funciona a partir da subpágina", async ({ page }) => {
    await page.goto("/projetos/call-center-analytics");

    const dock = page.getByRole("navigation", { name: "Navegação principal" });
    const homeLink = dock.getByRole("link", { name: "Home" });
    await expect(homeLink).toHaveAttribute("href", "/#home");
  });
});
