"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const COMPARE = [
  { label: "Ajans", points: ["3-6 ay teslimat", "Junior gelisitrici ataması", "Ara kademe yöneticiler", "Saatlik fatura, belirsiz kapsam", "Proje biter, ilişki biter"] },
  { label: "CanLabs", points: ["2-8 hafta MVP", "Doğrudan CEO ile çalışma", "Sıfır aracı katman", "Sabit kapsam, net fiyat", "Uzun vadeli ortaklık"] },
];

export default function AgencyCtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: statement */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-700 mb-4">
              Neden CanLabs
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight mb-6">
              Buyuk ajansin karmasası degil,{" "}
              <span className="text-blue-700">uzman odagi.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
              Her projede Alican Dagidir dogrudan devrede. Aracı yok, gecikme yok,
              isi anlayan biriyle konusuyorsunuz.
            </p>
            <a
              href="#iletisim"
              className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-bold px-7 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-blue-900/20"
            >
              30 dk ucretsiz gorusme al
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                →
              </motion.span>
            </a>
          </motion.div>

          {/* Right: comparison */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="grid grid-cols-2 gap-4"
          >
            {COMPARE.map((col, ci) => (
              <div
                key={col.label}
                className={`rounded-2xl p-5 ${
                  ci === 1
                    ? "bg-blue-800 text-white shadow-xl shadow-blue-900/30"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${ci === 1 ? "text-blue-200" : "text-slate-400"}`}>
                  {col.label}
                </div>
                <ul className="space-y-3">
                  {col.points.map((p, pi) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.25 + pi * 0.07 + ci * 0.1 }}
                      className="flex items-start gap-2 text-sm font-medium leading-snug"
                    >
                      <span className={`mt-0.5 text-base leading-none flex-shrink-0 ${ci === 1 ? "text-green-300" : "text-red-400"}`}>
                        {ci === 1 ? "✓" : "×"}
                      </span>
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
