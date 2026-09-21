import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Clubhouse Golf - Everything golf. One clubhouse.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #0f3327 0%, #071a14 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(245,241,231,0.05) 0px, rgba(245,241,231,0.05) 2px, transparent 2px, transparent 90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -140,
          right: -140,
          width: 480,
          height: 480,
          display: "flex",
          borderRadius: "50%",
          border: "1px solid rgba(245,241,231,0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 300,
          height: 300,
          display: "flex",
          borderRadius: "50%",
          border: "1px solid rgba(196,154,67,0.35)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 14,
            height: 14,
            display: "flex",
            borderRadius: "50%",
            background: "#C49A43",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#C49A43",
            fontWeight: 600,
          }}
        >
          Clubhouse Golf
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          fontWeight: 600,
          lineHeight: 1.08,
          color: "#F5F1E7",
          letterSpacing: -1,
        }}
      >
        <div style={{ display: "flex" }}>Everything golf.</div>
        <div style={{ display: "flex" }}>One clubhouse.</div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "rgba(245,241,231,0.6)",
        }}
      >
        Founding members launch 15 October 2026 · chgolfco.com
      </div>
    </div>,
    { ...size },
  );
}
