import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PHOTO } from "@/content";

// The link preview for X, iMessage, Slack, Discord and LinkedIn: the card in
// miniature, plate on top, name and role on paper. Built once at build time.
// X crops to 2:1 from the center, so the type stays clear of the edges.

export const alt = "Dawang Zhang, engineering at Upfront Ventures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

export default async function Image() {
  const [photo, display, italic] = await Promise.all([
    asset("public", PHOTO.src),
    asset("src/app/_og", "Newsreader-Display-Medium.ttf"),
    asset("src/app/_og", "Newsreader-Text-Italic.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          backgroundColor: "#fbfaf7",
          fontFamily: "Newsreader",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative; the card itself carries alt text */}
        <img
          src={`data:image/jpeg;base64,${photo.toString("base64")}`}
          width={1040}
          height={320}
          style={{ objectFit: "cover", objectPosition: PHOTO.position }}
        />
        <div style={{ display: "flex", alignItems: "baseline", marginTop: 44 }}>
          <div style={{ fontSize: 76, fontWeight: 500, letterSpacing: "-0.02em", color: "#000" }}>
            Dawang Zhang
          </div>
          <div style={{ marginLeft: 36, fontSize: 36, fontStyle: "italic", color: "#77756f" }}>
            engineering at upfront ventures
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: display, weight: 500, style: "normal" },
        { name: "Newsreader", data: italic, weight: 400, style: "italic" },
      ],
    },
  );
}
