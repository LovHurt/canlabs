"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { Globe, Code2, Brain, Smartphone, Cloud, BarChart3 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { stagger, fadeUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Sitesi Geliştirme",
    description:
      "Kurumsal tanıtım sitelerinden e-ticaret platformlarına kadar hızlı, SEO uyumlu ve dönüşüm odaklı web siteleri geliştiriyoruz.",
    iconBg: "bg-blue-50 text-blue-600",
    shine: "59,130,246",
  },
  {
    icon: Code2,
    title: "Yazılım Danışmanlığı",
    description:
      "Teknik borç analizi, sistem mimarisi tasarımı ve teknoloji seçimi konularında B2B şirketlerine stratejik danışmanlık sağlıyoruz.",
    iconBg: "bg-violet-50 text-violet-600",
    shine: "139,92,246",
  },
  {
    icon: Brain,
    title: "Yapay Zeka Entegrasyonu",
    description:
      "LLM entegrasyonu, otomasyon süreçleri ve AI destekli araçlarla iş süreçlerinizi hızlandırıyor, maliyetleri düşürüyoruz.",
    iconBg: "bg-emerald-50 text-emerald-600",
    shine: "16,185,129",
  },
  {
    icon: Smartphone,
    title: "Mobil Uygulama",
    description:
      "iOS ve Android için native veya cross-platform uygulamalar geliştirerek müşterilerinizle her an temas halinde olmanızı sağlıyoruz.",
    iconBg: "bg-orange-50 text-orange-600",
    shine: "249,115,22",
  },
  {
    icon: Cloud,
    title: "DevOps & Bulut Altyapı",
    description:
      "AWS, GCP ve Azure üzerinde ölçeklenebilir altyapı kurulumu, CI/CD pipeline entegrasyonu ve güvenlik yapılandırması.",
    iconBg: "bg-sky-50 text-sky-600",
    shine: "14,165,233",
  },
  {
    icon: BarChart3,
    title: "Veri Analitiği & Dashboard",
    description:
      "Verilerinizi anlamlı içgörülere dönüştüren özel BI dashboard'ları ve raporlama sistemleri geliştiriyoruz.",
    iconBg: "bg-rose-50 text-rose-600",
    shine: "244,63,94",
  },
];

function TiltCard({
  icon: Icon,
  title,
  description,
  iconBg,
  shine,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  shine: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    damping: 20,
    stiffness: 180,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    damping: 20,
    stiffness: 180,
  });

  // Shine highlight that follows mouse
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shineBackground = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(${shine},0.12) 0%, transparent 65%)`;
  const shineOverlay = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.5) 0%, transparent 50%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    shineX.set(((e.clientX - rect.left) / rect.width) * 100);
    shineY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={
        prefersReduced
          ? {}
          : {
              rotateX: rotX,
              rotateY: rotY,
              transformStyle: "preserve-3d",
            }
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-white border border-card-border shadow-card cursor-default overflow-hidden"
    >
      {/* Tinted glow on hover */}
      <motion.div
        style={{ background: shineBackground }}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        animate={{ opacity: hovered ? 1 : 0 }}
      />

      {/* Specular shine */}
      <motion.div
        style={{ background: shineOverlay }}
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />

      {/* Card content — lifted in Z */}
      <div
        className="relative p-6"
        style={prefersReduced ? {} : { transform: "translateZ(24px)" }}
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={22} />
        </div>
        <h3 className="font-semibold text-ink text-lg mb-2">{title}</h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
        <a
          href="#iletisim"
          className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          Görüşme ayarla →
        </a>
      </div>

      {/* Subtle bottom border highlight */}
      <motion.div
        className="absolute bottom-0 left-6 right-6 h-px"
        style={{ background: `rgb(${shine})` }}
        animate={{ opacity: hovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const headingRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="hizmetler"
      aria-labelledby="services-heading"
      className="section-padding bg-white"
    >
      <div className="container-tight">
        <motion.div
          ref={headingRef}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            id="services-heading"
            eyebrow="HİZMETLERİMİZ"
            title="Şirketinizin İhtiyacına Göre Kapsamlı Çözümler"
            subtitle="Her proje farklıdır. İhtiyacınızı anlayarak en uygun teknolojiyi ve mimariyi birlikte tasarlıyoruz."
          />
        </motion.div>

        <motion.div
          ref={ref}
          initial={prefersReduced ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          variants={prefersReduced ? {} : stagger}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: "1200px" }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={prefersReduced ? {} : fadeUp}>
              <TiltCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
