import { ImageResponse } from "next/og";

export const alt = "Aimoré Personal: treinamento, saúde e desempenho";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0B0B0C", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#F5F5F2" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, background: "#C6F432", color: "#0B0B0C", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 800 }}>A</div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>AIMORÉ PERSONAL</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase" }}>
          <span>A sua evolução começa</span>
          <span>
            com o&nbsp;<span style={{ color: "#C6F432" }}>próximo passo.</span>
          </span>
        </div>
        <div style={{ fontSize: 28, color: "#B9BCC1" }}>Programas de treinamento · Avaliação física · Loja · @aimorepersonal</div>
      </div>
    ),
    size,
  );
}
