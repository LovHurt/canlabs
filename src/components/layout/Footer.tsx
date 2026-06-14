import { ExternalLink, Mail, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Nasıl Çalışıyoruz", href: "#nasil-calisiyoruz" },
  { label: "Neden CanLabs", href: "#neden-canlabs" },
  { label: "SSS", href: "#sss" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <span className="font-bold text-lg">CanLabs</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              B2B şirketlere yazılım geliştirme, yapay zeka entegrasyonu ve
              teknoloji danışmanlığı hizmetleri sunuyoruz.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://linkedin.com/in/alicandagidir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profili"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <ExternalLink size={16} />
              </a>
              <a
                href="mailto:alican@canlabs.co"
                aria-label="E-posta gönder"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Sayfalar
            </p>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
              İletişim
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:alican@canlabs.co"
                className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2"
              >
                alican@canlabs.co
                <ArrowUpRight size={12} />
              </a>
              <a
                href="#iletisim"
                className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-primary-light hover:text-white transition-colors"
              >
                Ücretsiz görüşme ayarla
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 CanLabs. Tüm hakları saklıdır.
          </p>
          <p className="text-slate-600 text-xs">
            Alican Dağıdır tarafından kurulmuştur · Türkiye&apos;den dünyaya
          </p>
        </div>
      </div>
    </footer>
  );
}
