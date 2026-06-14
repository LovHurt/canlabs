"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  { n: "01", title: "Kesfif", body: "30 dk. gorusme. Projenizi, hedeflerinizi ve kisitlarinizi dinliyoruz. Hicbir taahhut yok." },
  { n: "02", title: "Teklif", body: "48 saat icinde net kapsam, sure ve sabit fiyat. Surpriz yok." },
  { n: "03", title: "Gelistirme", body: "Haftalik check-in, canli preview linkler. Her adimi gorebilirsiniz." },
  { n: "04", title: "Teslim", body: "Dokumanli, test edilmis, production-ready. Sonrasinda da yaninizdayiz." },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="nasil-calisiyoruz" className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mb-16"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-700 mb-3">
            Surecimiz
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Dort adim, <span className="text-blue-700">net sonuc.</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Connector line (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-3 w-6 h-px bg-slate-200 z-10" />
              )}

              <span className="text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-300 select-none leading-none block mb-4">
                {step.n}
              </span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors duration-200 shadow-lg shadow-blue-900/20"
          >
            Sureci Baslat: Ucretsiz Gorusme Al
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
