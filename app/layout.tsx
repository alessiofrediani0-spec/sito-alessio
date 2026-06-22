import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import CookieBanner from "./CookieBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "Trasforma le tue bollette in una rendita | Alessio Frediani",
  description:
    "Scopri come trasformare una spesa che hai già — luce e gas — in un'opportunità concreta di reddito ricorrente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="antialiased">
      <body className={`${inter.variable} ${dmSerif.variable}`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
