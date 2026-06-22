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
  title: "Alessio Frediani | 5-15 Global Energy Italia",
  description:
    "Scopri come costruire una rendita ricorrente partendo da zero, con un metodo serio e un affiancamento personale. Guarda il video e scopri se fa per te.",
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
