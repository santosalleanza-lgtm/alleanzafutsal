import { ImageResponse } from "next/og";

export const alt = "Aimoré Performance: disciplina, evolução e resultado";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #0A0907 0%, #1B1814 60%, #3B2E17 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#F6F2EA" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, background: "#D4AF61", color: "#0B0B0C", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 800 }}>A</div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>AIMORÉ PERSONAL</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 0.92, textTransform: "uppercase" }}>
          <span>A sua evolução começa</span>
          <span>
            com o&nbsp;<span style={{ color: "#D4AF61" }}>próximo passo.</span>
          </span>
        </div>
        <div style={{ fontSize: 28, color: "#C2BAAC" }}>Aimoré Weren · CREF 041955 · @aimorepersonal</div>
      </div>
    ),
    size,
  );
}
