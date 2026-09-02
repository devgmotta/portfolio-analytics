import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Hex literais pelo mesmo motivo de app/opengraph-image.tsx: ImageResponse
// (Satori) não enxerga CSS vars/Tailwind, são os mesmos valores dos tokens.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 18,
            fontWeight: 700,
            color: "#f97316",
          }}
        >
          &gt;_
        </div>
      </div>
    ),
    { ...size }
  );
}
