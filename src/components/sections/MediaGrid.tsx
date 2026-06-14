"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=900&q=85",
    label: "Web Geliştirme",
    sub: "Hızlı, modern, ölçeklenebilir",
    span: "row-span-2",
    h: 640,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85",
    label: "Veri Analitiği",
    sub: "Gerçek zamanlı içgörü",
    span: "",
    h: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=85",
    label: "Mobil Uygulama",
    sub: "iOS & Android",
    span: "",
    h: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=85",
    label: "Yapay Zeka",
    sub: "LLM entegrasyonu",
    span: "",
    h: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85",
    label: "Büyüme Odaklı",
    sub: "Ölçülen, kanıtlanan sonuçlar",
    span: "",
    h: 300,
  },
];

function ImageCard({
  src, label, sub, span, h, delay,
}: {
  src: string; label: string; sub: string; span: string; h: number; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl ${span} bg-slate-900`}
      style={{ height: h }}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        unoptimized
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <div className="text-white/50 text-xs font-medium uppercase tracking-widest mb-1 group-hover:text-blue-300 transition-colors duration-300">
          {sub}
        </div>
        <div className="text-white font-bold text-xl">{label}</div>
      </div>

      {/* Top-right arrow — appears on hover */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
        <span className="text-white text-sm">↗</span>
      </div>
    </motion.div>
  );
}

export default function MediaGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle top gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Portfolyo
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ne inşa ediyoruz?
          </h2>
          <p className="text-slate-400 mt-3 text-lg max-w-xl">
            Her proje farklı, her çözüm sıfırdan tasarlanır.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column — tall card */}
          <motion.div style={prefersReduced ? {} : { y: y1 }}>
            <ImageCard {...IMAGES[0]} delay={0} />
          </motion.div>

          {/* Right column — 2×2 grid */}
          <motion.div style={prefersReduced ? {} : { y: y2 }} className="grid grid-cols-2 gap-4">
            {IMAGES.slice(1).map((img, i) => (
              <ImageCard key={img.label} {...img} delay={0.08 * (i + 1)} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-300 text-sm backdrop-blur-sm"
          >
            Projenizi konuşalım
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
