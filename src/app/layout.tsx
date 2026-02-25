import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dawang.tech"),
  title: "Dawang Zhang",
  description: "software engineer studying management engineering at waterloo.",
  keywords: ["Dawang Zhang", "Software Engineer", "Management Engineering", "Waterloo"],
  authors: [{ name: "Dawang Zhang" }],
  creator: "Dawang Zhang",
  openGraph: {
    title: "Dawang Zhang",
    description: "software engineer studying management engineering at waterloo.",
    url: "https://www.dawang.tech",
    siteName: "Dawang Zhang",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawang Zhang",
    description: "software engineer studying management engineering at waterloo.",
  },
  icons: {
    icon: "/Garfield1978.png",
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
        <Analytics />
      </body>
    </html>
  );
}
