/**
 * URL canônica do site. Vercel ainda não atribuiu um domínio final nesta
 * sessão — troque o fallback (ou defina NEXT_PUBLIC_SITE_URL no ambiente da
 * Vercel) assim que o domínio real existir.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-analytics.vercel.app";

export const SITE_NAME = "Gabriel Motta Leite";
export const SITE_TITLE = `${SITE_NAME} // Analista de Dados & Analytics Engineer`;
export const SITE_DESCRIPTION =
  "Portfólio de Engenharia de Dados e Software: pipelines ETL, dbt, Cloud e dashboards de ponta a ponta.";

/**
 * ID de medição do GA4 (formato "G-XXXXXXX"). Não configurado nesta sessão —
 * defina NEXT_PUBLIC_GA_MEASUREMENT_ID no ambiente da Vercel quando tiver a
 * propriedade GA4 real. Sem essa env var, o componente <GoogleAnalytics> nem
 * é renderizado (ver app/layout.tsx) — não manda gaId vazio pro Google.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
