"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Nasıl Çalışıyoruz", href: "#nasil-calisiyoruz" },
  { label: "Neden CanLabs", href: "#neden-canlabs" },
  { label: "SSS", href: "#sss" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-card-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-ink text-lg leading-none">
                  CanLabs
                </span>
                <p className="text-muted text-[10px] leading-none mt-0.5 font-medium tracking-wide">
                  Yazılım & Danışmanlık
                </p>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-ink hover:bg-slate-100 transition-all duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#iletisim"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#iletisim");
                }}
                className="btn-primary text-sm"
              >
                İletişime Geç
              </a>
            </div>

            {/* Mobile: CTA + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="#iletisim"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#iletisim");
                }}
                className="btn-primary text-xs px-4 py-2"
              >
                İletişim
              </a>
              <button
                onClick={() => setOpen(!open)}
                aria-label="Menüyü aç/kapat"
                className="p-2 rounded-lg text-ink hover:bg-slate-100 transition-colors"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-card-border">
          <span className="font-bold text-ink">CanLabs</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-4 py-3 rounded-xl text-sm font-medium text-ink hover:bg-slate-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t border-card-border">
            <a
              href="#iletisim"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#iletisim");
              }}
              className="btn-primary w-full justify-center text-sm"
            >
              İletişime Geç
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
