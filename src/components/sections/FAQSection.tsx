"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { faqItems } from "@/data/faq";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="sss" className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-700 mb-3">
            Sik sorulan sorular
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Aklinizdaki sorular
          </h2>
        </motion.div>

        <div ref={ref} className="space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i ? "border-blue-200 bg-white shadow-md" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                aria-expanded={open === i}
              >
                <span className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-300 tabular-nums leading-none flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-slate-900 text-base leading-snug">
                    {item.q}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400 text-xl flex-shrink-0 leading-none"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pl-16 text-slate-500 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">Cevabini bulamadiginiz bir soru mu var?</p>
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm"
          >
            Direkt sorun
          </a>
        </motion.div>
      </div>
    </section>
  );
}
