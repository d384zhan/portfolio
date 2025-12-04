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
  title: "Dawang Zhang",
  description: "dawang's personal website!",
  keywords: ["Dawang Zhang", "Portfolio", "Software Engineer", "Management Engineering", "Waterloo", "Developer"],
  authors: [{ name: "Dawang Zhang" }],
  creator: "Dawang Zhang",
  openGraph: {
    title: "Dawang Zhang | Portfolio",
    description: "dawang's personal website!",
    url: "https://dawangzhang.com", // Replace with actual domain if known, or remove if dynamic
    siteName: "Dawang Zhang Portfolio",
    images: [
      {
        url: "/me.PNG", // Using the profile picture as the OG image
        width: 600,
        height: 700,
        alt: "Dawang Zhang Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawang Zhang | Portfolio",
    description: "dawang's personal website!",
    images: ["/me.PNG"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
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
