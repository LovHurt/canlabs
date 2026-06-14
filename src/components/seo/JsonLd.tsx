import { getSiteUrl } from "@/lib/site";

interface FAQItem {
  q: string;
  a: string;
}

interface JsonLdProps {
  faqItems?: FAQItem[];
}

export default function JsonLd({ faqItems }: JsonLdProps) {
  const siteUrl = getSiteUrl();

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CanLabs",
    description:
      "B2B yazılım geliştirme, yapay zeka entegrasyonu ve teknoloji danışmanlık firması.",
    url: siteUrl,
    founder: {
      "@type": "Person",
      name: "Alican Dağıdır",
    },
    employee: {
      "@type": "Person",
      name: "Alican Dağıdır",
      jobTitle: "CEO & Yazılım Danışmanı",
    },
    serviceType: [
      "Web Geliştirme",
      "Yazılım Danışmanlığı",
      "Yapay Zeka Entegrasyonu",
      "Mobil Uygulama Geliştirme",
      "DevOps & Bulut Altyapı",
      "Veri Analitiği",
    ],
    areaServed: "TR",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: "Turkish",
    },
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alican Dağıdır",
    jobTitle: "CEO & Yazılım Danışmanı",
    worksFor: {
      "@type": "Organization",
      name: "CanLabs",
    },
    url: siteUrl,
    sameAs: ["https://linkedin.com/in/alicandagidir"],
    knowsAbout: [
      "Web Geliştirme",
      "Yapay Zeka",
      "Yazılım Mimarisi",
      "B2B Danışmanlık",
    ],
  };

  const faqSchema = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
