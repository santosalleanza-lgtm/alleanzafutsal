import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { siteUrl } from "@/config/site";
import { getSettings } from "@/lib/data";
import "./globals.css";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Aimoré Personal | Treinamento, saúde e desempenho", template: "%s | Aimoré Personal" },
  description:
    "Programas de treinamento, autoavaliação física educativa, conteúdos de saúde e produtos personalizados do profissional de Educação Física Aimoré Weren (@aimorepersonal).",
  openGraph: { type: "website", locale: "pt_BR", siteName: "Aimoré Personal" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0B0B0C" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink">
          Pular para o conteúdo
        </a>
        <CartProvider>
          <Header announcement={settings.announcement} />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer settings={settings} />
          <WhatsAppFab number={settings.whatsapp} />
        </CartProvider>
        <CookieConsent gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
