import { Mail, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Nasil Calisiyoruz", href: "#nasil-calisiyoruz" },
  { label: "Teknolojiler", href: "#yetenekler" },
  { label: "SSS", href: "#sss" },
  { label: "Iletisim", href: "#iletisim" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <span className="font-bold text-lg tracking-tight">CanLabs</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              B2B sirketlere yazilim gelistirme, yapay zeka entegrasyonu ve
              teknoloji danismanligi. Dogrudan CEO ile.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://linkedin.com/in/alicandagidir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 flex items-center justify-center transition-colors text-xs font-bold"
              >
                in
              </a>
              <a
                href="mailto:alican@canlabs.co"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">
              Sayfalar
            </p>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">
              Iletisim
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:alican@canlabs.co"
                className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1.5"
              >
                alican@canlabs.co
                <ArrowUpRight size={12} />
              </a>
              <a
                href="#iletisim"
                className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-blue-400 hover:text-white transition-colors"
              >
                Ucretsiz gorusme ayarla
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; 2026 CanLabs. Tum haklari saklidir.
          </p>
          <p className="text-slate-700 text-xs">
            Alican Dagidir tarafindan kurulmustur &middot; Turkiye&apos;den dunyaya
          </p>
        </div>
      </div>
    </footer>
  );
}
