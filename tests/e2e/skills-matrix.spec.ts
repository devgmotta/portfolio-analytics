import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Cada cluster entra com `whileInView` (opacity 0→1, y 24→0, ~0.5s + delay
 * até 0.24s) — sem aguardar o assentamento, o hover/focus do Playwright
 * pode acontecer com o elemento ainda em movimento e o Base UI Tooltip não
 * dispara de forma confiável (confirmado: hover puro falhou 6/6 execuções
 * na validação independente da tarefa 020; scroll+wait resolveu).
 */
async function settleAfterScroll(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
}

test.describe("Matriz de competências", () => {
  test("renderiza os 4 clusters", async ({ page }) => {
    await page.goto("/");

    for (const title of [
      "Modern Data Stack & Cloud Agnóstica",
      "Data Science & Análise Exploratória",
      "Engenharia de Software & APIs",
      "AI-Assisted Engineering & Automação",
    ]) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }
  });

  test("tooltip de equivalência aparece no hover de um item de cloud", async ({ page }) => {
    await page.goto("/");
    // getByRole("listitem", {name}) não filtra por nome de forma confiável
    // nesta versão do Playwright (confirmado: falha até em <li> sem nenhum
    // atributo extra, "Python"/"SQL Avançado" incluídos) — locator CSS
    // escopado é a alternativa estável.
    const bigQueryItem = page.locator("#skills li", { hasText: "BigQuery" });

    await settleAfterScroll(page, bigQueryItem);
    await bigQueryItem.hover();
    await expect(
      page.getByText("BigQuery (GCP) • Equivalente: Azure Synapse / AWS Redshift")
    ).toBeVisible();
  });

  test("tooltip de equivalência aparece no foco (teclado) de um item de cloud", async ({ page }) => {
    await page.goto("/");
    const cloudStorageItem = page.locator("#skills li", { hasText: "Cloud Storage" });

    await settleAfterScroll(page, cloudStorageItem);
    await cloudStorageItem.focus();
    await expect(
      page.getByText("Cloud Storage (GCS) • Equivalente: Azure Blob / AWS S3")
    ).toBeVisible();
  });

  test("item sem equivalência (Python) não abre tooltip de cloud", async ({ page }) => {
    await page.goto("/");
    const pythonItem = page.locator("#skills li", { hasText: "Python" });

    await settleAfterScroll(page, pythonItem);
    await pythonItem.hover();
    await page.waitForTimeout(400);
    await expect(page.getByText(/Equivalente:/)).toHaveCount(0);
  });
});
