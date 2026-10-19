import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";

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
  description: "فهرست الطعامی کافه",
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
      <body className="bg-bg text-text min-h-screen">{children}</body>
    </html>
  );
}
