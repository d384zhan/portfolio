import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dawang Zhang";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#1c1a18",
          backgroundImage:
            "radial-gradient(rgba(201,168,124,0.06) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontStyle: "italic",
              color: "#e8e5df",
              fontFamily: "serif",
              letterSpacing: "-1px",
            }}
          >
            Dawang Zhang
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#8a8580",
              fontFamily: "monospace",
              lineHeight: "1.6",
              maxWidth: "800px",
            }}
          >
            software engineer · management engineering @ waterloo
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#C85A35",
              fontFamily: "monospace",
              marginTop: "8px",
            }}
          >
            dawang.tech
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
