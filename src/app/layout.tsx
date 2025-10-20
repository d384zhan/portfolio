import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Dawang Zhang",
  description: "Dawang Zhang's personal website",
  icons: {
    icon: [
      { url: "/Garfield1978.png" },
      { url: "/Garfield1978.png", sizes: "32x32", type: "image/png" },
      { url: "/Garfield1978.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/Garfield1978.png",
    shortcut: "/Garfield1978.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
