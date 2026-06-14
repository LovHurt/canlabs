"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const STACK = [
  {
    id: "frontend",
    label: "Frontend",
    color: "blue",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native"],
    desc: "Performansi yuksek, SEO uyumlu, animasyonlu arayuzler.",
  },
  {
    id: "backend",
    label: "Backend",
    color: "violet",
    techs: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
    desc: "Olceklenebilir API'lar, guvenli veritabani mimarisi.",
  },
  {
    id: "ai",
    label: "Yapay Zeka",
    color: "emerald",
    techs: ["OpenAI API", "LangChain", "Hugging Face", "Pinecone", "Weaviate"],
    desc: "LLM entegrasyonu, RAG sistemleri, otomasyon pipeline'lari.",
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    color: "sky",
    techs: ["AWS", "GCP", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    desc: "Sifirdan CI/CD, altyapi kurulumu ve guvenlik yapilandirmasi.",
  },
  {
    id: "mobile",
    label: "Mobil",
    color: "orange",
    techs: ["React Native", "Expo", "iOS", "Android"],
    desc: "Tek kod tabani, iki platform. App Store'a kadar.",
  },
  {
    id: "tools",
    label: "Araclar",
    color: "rose",
    techs: ["Figma", "Vercel", "Supabase", "Stripe", "Resend", "Sentry"],
    desc: "Uretim ortaminda kanıtlanmis toolchain.",
  },
];

const COLOR_MAP: Record<string, { tab: string; badge: string; dot: string }> = {
  blue:    { tab: "border-blue-500 text-blue-700 bg-blue-50",    badge: "bg-blue-50 text-blue-700 border-blue-200",    dot: "bg-blue-500" },
  violet:  { tab: "border-violet-500 text-violet-700 bg-violet-50", badge: "bg-violet-50 text-violet-700 border-violet-200", dot: "bg-violet-500" },
  emerald: { tab: "border-emerald-500 text-emerald-700 bg-emerald-50", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  sky:     { tab: "border-sky-500 text-sky-700 bg-sky-50",       badge: "bg-sky-50 text-sky-700 border-sky-200",       dot: "bg-sky-500" },
  orange:  { tab: "border-orange-500 text-orange-700 bg-orange-50", badge: "bg-orange-50 text-orange-700 border-orange-200", dot: "bg-orange-500" },
  rose:    { tab: "border-rose-500 text-rose-700 bg-rose-50",    badge: "bg-rose-50 text-rose-700 border-rose-200",    dot: "bg-rose-500" },
};

export default function CapabilitiesSection() {
  const [active, setActive] = useState("frontend");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const current = STACK.find((s) => s.id === active)!;
  const colors = COLOR_MAP[current.color];

  return (
    <section id="yetenekler" className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-700 mb-3">
            Teknolojiler
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Hangi teknolojiyle insa ediyoruz?
          </h2>
          <p className="text-slate-500 mt-3 text-lg max-w-xl">
            Kategoriye tikla, detaylari gor.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-6">
          {/* Tab buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {STACK.map((s) => {
              const isActive = s.id === active;
              const c = COLOR_MAP[s.color];
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                    isActive
                      ? `${c.tab} border-current shadow-sm`
                      : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 bg-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />}
                    {s.label}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Expanded panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-slate-50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <h3 className="font-bold text-slate-900 text-xl">{current.label}</h3>
                <p className="text-slate-500 text-sm">{current.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {current.techs.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${colors.badge}`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
