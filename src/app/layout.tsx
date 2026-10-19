import type { Metadata } from "next";
import localFont from "next/font/local";

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
  title: "چشم‌انداز",
  description: "فهرست الطعامی کافه",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body className="bg-bg text-text min-h-screen">{children}</body>
    </html>
  );
}
