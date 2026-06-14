"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="iletisim" className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 lg:sticky lg:top-24"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-700 mb-3">
              Iletisim
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Projenizi <br />Konusalim
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              30 dakikalik ucretsiz kesif gorusmesi. Projenizi dinliyoruz,
              sorulaninizi yanitliyoruz. Hicbir taahhut gerekmez.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:alican@canlabs.co"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Mail size={16} className="text-blue-700" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-0.5">E-posta</div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                    alican@canlabs.co
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <Clock size={16} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-0.5">Yanit suresi</div>
                  <div className="text-sm font-semibold text-slate-800">24 saat icinde</div>
                </div>
              </div>
            </div>

            {/* CEO badge */}
            <div className="mt-10 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-800 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">Alican Dagidir</div>
                <div className="text-slate-500 text-xs">Kurucu & CEO, CanLabs</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-emerald-600 text-xs font-semibold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Musait
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 p-6 sm:p-8"
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
