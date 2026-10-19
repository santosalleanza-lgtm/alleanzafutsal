import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Sora } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { buildMenu } from "@/config/menu";
import { siteUrl } from "@/config/site";
import { getSettings } from "@/lib/data";
import "./globals.css";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-display", display: "swap" });
const sans = Sora({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Aimoré Performance | Preparação física com o personal Aimoré Weren", template: "%s | Aimoré Performance" },
  description:
    "Programas de treinamento, autoavaliação física educativa, conteúdos de saúde e produtos personalizados do profissional de Educação Física Aimoré Weren (@aimorepersonal).",
  openGraph: { type: "website", locale: "pt_BR", siteName: "Aimoré Performance" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0A0907" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
          Pular para o conteúdo
        </a>
        <CartProvider>
          <Header announcement={settings.announcement} menu={buildMenu()} memberAreaUrl={settings.memberAreaUrl} />
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
