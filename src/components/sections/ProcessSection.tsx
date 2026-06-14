"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MessageCircle, FileSearch, Code2, Rocket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Keşif Görüşmesi",
    description:
      "İhtiyaçlarınızı, hedeflerinizi ve bütçenizi dinliyoruz. Ücretsiz 30 dakikalık video görüşmesi. Hiçbir taahhüt gerektirmez.",
    color: "text-blue-600 bg-blue-50",
    ring: "ring-blue-200",
    dot: "bg-blue-500",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Teknik Analiz & Teklif",
    description:
      "Projenize özel teknik mimari önerisi ve detaylı proje planı sunuyoruz. Sürpriz maliyet yok, her kalem nettir.",
    color: "text-violet-600 bg-violet-50",
    ring: "ring-violet-200",
    dot: "bg-violet-500",
  },
  {
    number: "03",
    icon: Code2,
    title: "Geliştirme & Şeffaf İletişim",
    description:
      "Haftalık ilerleme raporları, doğrudan Alican ile iletişim ve her kararı birlikte alıyoruz. Sizi asla karanlıkta bırakmıyoruz.",
    color: "text-emerald-600 bg-emerald-50",
    ring: "ring-emerald-200",
    dot: "bg-emerald-500",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Teslimat & Uzun Vadeli Destek",
    description:
      "Canlıya aldıktan sonra da yanınızdayız. 30 gün ücretsiz destek, bakım ve büyüme desteği için aylık paketler.",
    color: "text-orange-600 bg-orange-50",
    ring: "ring-orange-200",
    dot: "bg-orange-500",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef(null);
  const stepsRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  // Scroll-linked progress: tracks scroll position inside this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });

  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineProgress = useSpring(rawProgress, { damping: 35, stiffness: 60 });

  // Map global line progress → per-step activation thresholds
  const stepThresholds = [0.05, 0.35, 0.62, 0.88];

  return (
    <section
      ref={sectionRef}
      id="nasil-calisiyoruz"
      aria-labelledby="process-heading"
      className="section-padding bg-site-bg relative overflow-hidden"
    >
      {/* Faint background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,64,175,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-tight relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            id="process-heading"
            eyebrow="NASIL ÇALIŞIYORUZ"
            title="4 Adımda, Şeffaf ve Sonuç Odaklı"
            subtitle="Projenizin her aşamasında yanınızdayız. Belirsizlik değil, netlik; sürpriz değil, güven."
          />
        </motion.div>

        {/* Steps grid */}
        <div ref={stepsRef} className="mt-16 relative">

          {/* ── Scroll-linked connector track (desktop only) ── */}
          <div className="hidden lg:block absolute top-[54px] left-[12.5%] right-[12.5%] h-[2px] bg-slate-200 z-0 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: prefersReduced ? 1 : lineProgress, originX: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-primary via-violet-500 to-orange-400 rounded-full"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                threshold={stepThresholds[i]}
                lineProgress={lineProgress}
                inView={stepsInView}
                prefersReduced={!!prefersReduced}
              />
            ))}
          </div>
        </div>

        {/* CTA at bottom */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex justify-center"
        >
          <a href="#iletisim" className="btn-primary group">
            Süreci Başlat — Ücretsiz Görüşme Al
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Individual step card with scroll-based activation
function StepCard({
  step,
  index,
  threshold,
  lineProgress,
  inView,
  prefersReduced,
}: {
  step: (typeof steps)[0];
  index: number;
  threshold: number;
  lineProgress: ReturnType<typeof useSpring>;
  inView: boolean;
  prefersReduced: boolean;
}) {
  // Active when the scroll progress line has reached this step
  const isActive = useTransform(lineProgress, (v) => v >= threshold);

  const ringOpacity = useTransform(lineProgress, [threshold - 0.05, threshold + 0.1], [0, 1]);
  const dotScale = useTransform(lineProgress, [threshold - 0.05, threshold + 0.15], [0.5, 1]);

  return (
    <motion.div
      initial={prefersReduced ? false : "hidden"}
      animate={inView ? "visible" : "hidden"}
      variants={prefersReduced ? {} : fadeUp}
      transition={{ delay: index * 0.12 }}
      className="relative z-10 flex flex-col"
    >
      {/* Ghost number watermark */}
      <div className="text-[5rem] font-black text-slate-100 leading-none select-none mb-1 -ml-1">
        {step.number}
      </div>

      {/* Icon with scroll-activated ring */}
      <div className="relative w-14 h-14 mb-5 -mt-4">
        {/* Pulsing ring — appears when step is "reached" */}
        <motion.div
          style={prefersReduced ? {} : { opacity: ringOpacity }}
          className={`absolute -inset-2 rounded-2xl ring-2 ${step.ring}`}
        />
        {/* Active dot on connector (desktop) */}
        <motion.div
          style={prefersReduced ? {} : { scale: dotScale }}
          className={`absolute -top-6 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ${step.dot} hidden lg:block`}
        />
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.color} transition-all duration-300`}
        >
          <step.icon size={24} />
        </div>
      </div>

      <h3 className="font-semibold text-ink text-lg mb-2">{step.title}</h3>
      <p className="text-muted text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );
}
