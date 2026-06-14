"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Nasıl Çalışıyoruz", href: "#nasil-calisiyoruz" },
  { label: "Teknolojiler", href: "#yetenekler" },
  { label: "SSS", href: "#sss" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
            : "bg-white/80 backdrop-blur-md border-b border-black/[0.04]"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-tight">CL</span>
              </div>
              <span className="font-bold text-slate-900 text-lg tracking-tight">CanLabs</span>
            </a>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-all duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#iletisim"
                onClick={(e) => { e.preventDefault(); handleNavClick("#iletisim"); }}
                className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200"
              >
                Iletisime Gec
              </a>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <a
                href="#iletisim"
                onClick={(e) => { e.preventDefault(); handleNavClick("#iletisim"); }}
                className="inline-flex items-center bg-blue-800 text-white font-semibold text-xs px-4 py-2 rounded-lg"
              >
                Iletisim
              </a>
              <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
      )}

      <div className={cn(
        "fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100">
          <span className="font-bold text-slate-900">CanLabs</span>
          <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <nav className="px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <a
              href="#iletisim"
              onClick={(e) => { e.preventDefault(); handleNavClick("#iletisim"); }}
              className="flex justify-center bg-blue-800 text-white font-semibold text-sm px-5 py-3 rounded-xl"
            >
              Iletisime Gec
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
