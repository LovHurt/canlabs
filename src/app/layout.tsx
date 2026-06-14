import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import CustomCursor from "@/components/ui/CustomCursor";
import { getSiteUrl } from "@/lib/site";
import { faqItems } from "@/data/faq";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "CanLabs — B2B Yazılım Geliştirme & Yapay Zeka Danışmanlığı | Alican Dağıdır",
    template: "%s | CanLabs",
  },
  description:
    "Alican Dağıdır liderliğinde B2B yazılım geliştirme, yapay zeka entegrasyonu ve teknoloji danışmanlığı. Web, mobil, AI ve DevOps çözümleri. Ücretsiz keşif görüşmesi için hemen iletişime geçin.",
  keywords: [
    "b2b yazılım danışmanlığı",
    "yapay zeka entegrasyonu",
    "web geliştirme",
    "mobil uygulama geliştirme",
    "yazılım danışmanı",
    "nextjs geliştirici",
    "react geliştirici",
    "devops danışmanlık",
    "alican dağıdır",
    "canlabs",
    "türkiye yazılım danışmanlığı",
  ],
  authors: [{ name: "Alican Dağıdır", url: getSiteUrl() }],
  creator: "Alican Dağıdır",
  publisher: "CanLabs",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: getSiteUrl(),
    siteName: "CanLabs",
    title: "CanLabs — B2B Yazılım & Yapay Zeka Danışmanlığı",
    description:
      "Alican Dağıdır liderliğinde B2B yazılım geliştirme, yapay zeka entegrasyonu ve teknoloji danışmanlığı.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CanLabs — B2B Yazılım Danışmanlığı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CanLabs — B2B Yazılım & Yapay Zeka Danışmanlığı",
    description:
      "Alican Dağıdır liderliğinde B2B yazılım geliştirme ve yapay zeka danışmanlığı.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={jakarta.variable}>
      <head>
        <JsonLd faqItems={faqItems} />
      </head>
      <body className="bg-site-bg text-ink antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
