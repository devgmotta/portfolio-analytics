import { ImageResponse } from "next/og";

export const alt = "Gabriel Motta Leite — Analista de Dados & Analytics Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse roda no renderer Satori, isolado do CSS do app — não tem
// acesso às CSS vars/Tailwind. Os hex aqui são os MESMOS valores dos tokens
// de app/globals.css (--background/--foreground/--primary/--secondary/
// --muted-foreground), copiados deliberadamente porque essa é a única forma
// de manter a imagem gerada consistente com o tema.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: "#f97316",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Engenharia de Dados &amp; Software
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f4f4f5",
            marginTop: 24,
          }}
        >
          Gabriel Motta Leite
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a1a1aa",
            marginTop: 20,
          }}
        >
          Analista de Dados &amp; Analytics Engineer
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["ETL", "dbt", "Cloud"].map((label) => (
            <div
              key={label}
              style={{
                fontFamily: "monospace",
                fontSize: 20,
                color: "#10b981",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 999,
                padding: "6px 18px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
