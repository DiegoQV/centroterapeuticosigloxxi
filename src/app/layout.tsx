import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter, Manrope } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0B3B32",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Centro Terapéutico Siglo XXI | Fisioterapia & Rehabilitación",
  description:
    "Centro de referencia en fisioterapia clínica, biomecánica y rehabilitación funcional en Chachapoyas. Tratamientos con rigor biomédico y tecnología de alta gama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${ebGaramond.variable} ${inter.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111111] font-sans selection:bg-emerald-100 selection:text-[#0B3B32]">
        {children}
      </body>
    </html>
  );
}
