import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Analytics Engineer",
    "Engenharia de Dados",
    "dbt",
    "BigQuery",
    "ETL",
    "Python",
    "Power BI",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // suppressHydrationWarning é a exigência documentada do next-themes:
      // a lib injeta um script bloqueante que seta a classe antes do 1º
      // paint (sem flash), mas o server não pode saber o tema real do
      // client de antemão — o aviso é esperado e inofensivo, não é o mesmo
      // tipo de bug de hydration mismatch que já aconteceu neste projeto
      // (lá, o VALOR renderizado divergia; aqui só o atributo de classe é
      // corrigido antes de qualquer pintura visível).
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <MotionProvider>
            <ThemeToggle />
            {children}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
