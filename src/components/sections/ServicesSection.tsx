"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Globe, Code2, Brain, Smartphone, Cloud, BarChart3 } from "lucide-react";

const SERVICES = [
  {
    Icon: Globe,
    title: "Web Gelistirme",
    body: "Kurumsal sitelerden SaaS platformlarina: hizli, SEO uyumlu, donusum odakli.",
    accent: "#3b82f6",
    shine: "59,130,246",
    border: "rgba(59,130,246,0.15)",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    Icon: Code2,
    title: "Yazilim Danismanligi",
    body: "Teknik borc analizi, mimari tasarim, teknoloji secimi. Strateji kadar uygulama da onemli.",
    accent: "#7c3aed",
    shine: "124,58,237",
    border: "rgba(124,58,237,0.15)",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    Icon: Brain,
    title: "Yapay Zeka Entegrasyonu",
    body: "LLM, RAG, otomasyon pipeline. Is surecleri yapay zeka ile hizlanir, maliyetler duser.",
    accent: "#059669",
    shine: "5,150,105",
    border: "rgba(5,150,105,0.15)",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    Icon: Smartphone,
    title: "Mobil Uygulama",
    body: "iOS ve Android icin React Native. Tek kod tabani, iki platform, App Store'a kadar.",
    accent: "#ea580c",
    shine: "234,88,12",
    border: "rgba(234,88,12,0.15)",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    Icon: Cloud,
    title: "DevOps & Bulut Altyapi",
    body: "AWS, GCP, Azure uzerinde CI/CD, Kubernetes, guvenlk yapilandirmasi.",
    accent: "#0284c7",
    shine: "2,132,199",
    border: "rgba(2,132,199,0.15)",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    Icon: BarChart3,
    title: "Veri Analitigi & Dashboard",
    body: "Verilerinizi anlami icerikleristirme: ozel BI dashboard, gercek zamanli raporlama.",
    accent: "#e11d48",
    shine: "225,29,72",
    border: "rgba(225,29,72,0.15)",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

function ServiceCard({
  Icon, title, body, accent, shine, border, iconBg, iconColor,
}: {
  Icon: LucideIcon; title: string; body: string;
  accent: string; shine: string; border: string; iconBg: string; iconColor: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { damping: 22, stiffness: 200 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { damping: 22, stiffness: 200 });

  const sx = useMotionValue(50);
  const sy = useMotionValue(50);
  const shimmer = useMotionTemplate`radial-gradient(circle at ${sx}% ${sy}%, rgba(${shine},0.1) 0%, transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    sx.set(((e.clientX - r.left) / r.width) * 100);
    sy.set(((e.clientY - r.top) / r.height) * 100);
  };

  const onLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      style={prefersReduced
        ? { borderColor: hovered ? border : "rgba(226,232,240,1)" }
        : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", borderColor: hovered ? border : "rgba(226,232,240,1)" }
      }
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="relative group rounded-2xl bg-white border overflow-hidden cursor-default transition-shadow duration-300 hover:shadow-xl"
    >
      <motion.div
        style={{ background: shimmer }}
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <div
        className="relative p-6"
        style={prefersReduced ? {} : { transform: "translateZ(20px)" }}
      >
        {/* Icon */}
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={20} className={iconColor} strokeWidth={1.8} />
        </div>

        <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{body}</p>

        {/* Hover CTA */}
        <motion.a
          href="#iletisim"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold"
          style={{ color: accent }}
        >
          Gorussme ayarla →
        </motion.a>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ background: accent }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hizmetler" className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-700 mb-3">
            Hizmetler
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-xl">
            Ihtiyaciniza gore kapsamli cozumler
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ perspective: "1200px" }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <ServiceCard {...s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
