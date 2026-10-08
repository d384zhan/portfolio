import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { DESCRIPTION, PERSON, SITE } from "@/lib/site";

// Newsreader by Production Type, OFL 1.1. Variable, with an optical size
// axis so the name and the small italic details each get the right cut.
const newsreader = Newsreader({
  style: ["normal", "italic"],
  axes: ["opsz"],
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // the paper color; Discord also uses it for the stripe beside link previews
  themeColor: "#fbfaf7",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Dawang Zhang", template: "%s | Dawang Zhang" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Dawang Zhang", url: SITE }],
  creator: "Dawang Zhang",
  openGraph: {
    title: "Dawang Zhang",
    description: DESCRIPTION,
    url: "/",
    siteName: "Dawang Zhang",
    locale: "en_US",
    type: "profile",
    firstName: "Dawang",
    lastName: "Zhang",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawang Zhang",
    description: DESCRIPTION,
    creator: "@dawangzh",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dawang Zhang",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // the pagereveal script below may add a class to <html> before React
    // hydrates; that's expected, so don't flag the mismatch
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* A page reached through a view transition gets its entrance from the
            transition, so it skips the first-visit wipe (see globals.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `addEventListener("pagereveal",e=>{if(e.viewTransition)document.documentElement.classList.add("arrived")})`,
          }}
        />
      </head>
      <body className={newsreader.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
