"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { User, Target, Receipt, Zap, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, stagger, scaleIn } from "@/lib/animations";

const differentiators = [
  {
    icon: User,
    title: "CEO ile Direkt Çalışırsınız",
    description:
      "Projeniz boyunca Alican ile doğrudan iletişim kurarsınız. Orta katmanlar, gecikmeler veya belirsizlik yok.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Target,
    title: "Teknoloji Değil, Sonuç Odaklıyız",
    description:
      "Hangi teknolojiyi kullanacağınızı değil, nasıl büyüyeceğinizi konuşuruz. Çözüm iş hedefinize hizmet eder.",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Receipt,
    title: "Şeffaf Fiyatlandırma",
    description:
      "Teklifimiz baştan nettir. Kapsam değişikliklerini birlikte yönetiriz. Gizli maliyet yok, sürpriz fatura yok.",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: Zap,
    title: "Hız & Güvenilirlik",
    description:
      "Çevik geliştirme metodolojisiyle hızlı iterasyonlar, zamanında teslimat ve kaliteden ödün vermeden hız.",
    color: "text-orange-600 bg-orange-50",
  },
];

const counterStats = [
  { value: "20+", label: "Tamamlanan Proje" },
  { value: "5+", label: "Yıl Deneyim" },
  { value: "24s", label: "Ortalama Yanıt Süresi" },
  { value: "100%", label: "Müşteri Memnuniyeti" },
];

export default function WhyCanLabsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="neden-canlabs"
      aria-labelledby="why-heading"
      className="section-padding bg-site-bg"
    >
      <div className="container-tight">
        <motion.div
          initial={prefersReduced ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          variants={prefersReduced ? {} : fadeUp}
        >
          <SectionHeading
            id="why-heading"
            eyebrow="NEDEN CANLABS"
            title="Büyük Ajans Karmaşası Olmadan, Uzman Kalitesiyle"
            subtitle="Küçük ama güçlü. Hızlı ama özenli. Uygun fiyatlı ama kaliteli. Bu denklem mümkün — çünkü doğru mimarla çalışıyorsunuz."
          />
        </motion.div>

        {/* Stats row */}
        <motion.div
          ref={ref}
          initial={prefersReduced ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          variants={prefersReduced ? {} : stagger}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {counterStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={prefersReduced ? {} : scaleIn}
              className="card-base p-5 text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Differentiators */}
        <motion.div
          initial={prefersReduced ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          variants={prefersReduced ? {} : stagger}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={prefersReduced ? {} : fadeUp}
              className="card-base p-6 hover:shadow-card-hover transition-shadow duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
              >
                <item.icon size={22} />
              </div>
              <h3 className="font-semibold text-ink text-base mb-2">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CEO Spotlight */}
        <motion.div
          initial={prefersReduced ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          variants={prefersReduced ? {} : fadeUp}
          transition={{ delay: prefersReduced ? 0 : 0.3 }}
          className="mt-12 card-base p-8 flex flex-col sm:flex-row items-center gap-8"
        >
          <div className="w-24 h-24 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
            AD
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
              KURUCUMUZ
            </p>
            <h3 className="text-xl font-bold text-ink mb-3">Alican Dağıdır</h3>
            <p className="text-muted text-sm leading-relaxed max-w-xl">
              5+ yıllık yazılım geliştirme ve mimari deneyimiyle Alican, B2B
              şirketlerin dijital dönüşüm süreçlerini yönlendiriyor. Her
              projeye kişisel ilgi gösteriyor; müşteri başarısını kendi
              başarısı olarak görüyor.
            </p>
            <a
              href="https://linkedin.com/in/alicandagidir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
            >
              <ExternalLink size={16} />
              LinkedIn&apos;de incele
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
