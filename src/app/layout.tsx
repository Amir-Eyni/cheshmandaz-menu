import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site, hasCustomSiteUrl } from "@/config/site";
import { fa } from "@/content/fa";
import "./globals.css";

const vazirmatn = localFont({
  src: [
    {
      path: "../assets/fonts/Vazirmatn[wght].woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.name,
  description: fa.meta.description,
  applicationName: site.name,
  ...(hasCustomSiteUrl
    ? {
        alternates: { canonical: site.url },
        openGraph: {
          title: site.name,
          description: fa.meta.description,
          url: site.url,
          siteName: site.name,
          locale: "fa_IR",
          type: "website",
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Allow zooming (accessibility) but stop iOS from zooming on input focus.
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: site.theme.bg,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = site.theme;
  const themeVars = {
    "--bg": theme.bg,
    "--card": theme.card,
    "--border": theme.border,
    "--accent": theme.accent,
    "--text": theme.text,
    "--muted": theme.muted,
    "--on-accent": theme.onAccent,
  };
  return (
    <html
      lang="fa"
      dir="rtl"
      className={vazirmatn.className}
      style={themeVars as unknown as React.CSSProperties}
    >
      <body className="bg-bg text-text min-h-dvh">{children}</body>
    </html>
  );
}
