"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";

const stats = [
  { value: 20, suffix: "+", label: "Tamamlanan Proje" },
  { value: 15, suffix: "+", label: "Mutlu Müşteri" },
  { value: 5, suffix: "+", label: "Yıl Deneyim" },
];

const trustBadges = [
  { icon: CheckCircle2, label: "5+ Yıl Deneyim" },
  { icon: Users, label: "B2B Odaklı" },
  { icon: Zap, label: "Hızlı Teslimat" },
  { icon: TrendingUp, label: "Uzun Vadeli Ortaklık" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (started.current) return;
    if (prefersReduced) { setCount(target); return; }
    started.current = true;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, prefersReduced]);

  return <span>{count}{suffix}</span>;
}

const textReveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: i * 0.13,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Mouse tracking for orb parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 60 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 60 });

  // Scroll parallax — hero content drifts up and fades as you scroll
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Orbs move at different rates relative to mouse
  const orb1X = useTransform(smoothX, (v) => v * 0.025);
  const orb1Y = useTransform(smoothY, (v) => v * 0.025);
  const orb2X = useTransform(smoothX, (v) => v * -0.04);
  const orb2Y = useTransform(smoothY, (v) => v * -0.04);
  const orb3X = useTransform(smoothX, (v) => v * 0.06);
  const orb3Y = useTransform(smoothY, (v) => v * 0.06);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced) return;
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-50"
      onMouseMove={handleMouseMove}
    >
      {/* ── Animated gradient orbs ── */}
      {!prefersReduced && (
        <>
          {/* Orb 1 — large blue, top-right */}
          <motion.div
            style={{ x: orb1X, y: orb1Y }}
            className="pointer-events-none absolute -top-40 -right-32 w-[700px] h-[700px]"
          >
            <motion.div
              className="w-full h-full rounded-full bg-blue-400/25 blur-[100px]"
              animate={{ scale: [1, 1.06, 0.97, 1], opacity: [0.7, 0.9, 0.7] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Orb 2 — sky, bottom-left */}
          <motion.div
            style={{ x: orb2X, y: orb2Y }}
            className="pointer-events-none absolute -bottom-40 -left-20 w-[550px] h-[550px]"
          >
            <motion.div
              className="w-full h-full rounded-full bg-sky-300/20 blur-[80px]"
              animate={{ scale: [1, 1.1, 0.93, 1], opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>

          {/* Orb 3 — indigo, mid-right */}
          <motion.div
            style={{ x: orb3X, y: orb3Y }}
            className="pointer-events-none absolute top-[35%] right-[18%] w-[320px] h-[320px]"
          >
            <motion.div
              className="w-full h-full rounded-full bg-indigo-400/15 blur-[60px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
          </motion.div>
        </>
      )}

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,54,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Main content with scroll parallax ── */}
      <motion.div
        style={prefersReduced ? {} : { y: heroY, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-44"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-8 bg-primary" />
              <span className="eyebrow">CANLABS — B2B YAZILIM DANIŞMANLIĞI</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="text-4xl sm:text-5xl lg:text-[3.6rem] font-bold text-ink leading-[1.08] tracking-tight"
            >
              İşinizi Büyütecek{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">Yazılım Çözümleri</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-1 left-0 right-0 h-2.5 bg-blue-100 origin-left rounded-full -z-0"
                />
              </span>
              ,{" "}
              <br className="hidden sm:block" />
              Doğru Mimarla
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="mt-6 text-muted text-lg leading-relaxed max-w-lg"
            >
              Alican Dağıdır liderliğinde; kurumsal web geliştirme, yapay zeka
              entegrasyonu ve yazılım danışmanlığı ile şirketinizi dijital
              rekabette öne taşıyoruz.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <a
                href="#iletisim"
                className="btn-primary text-base px-7 py-3.5 group"
              >
                Ücretsiz Keşif Görüşmesi Al
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </a>
              <a href="#yetenekler" className="btn-secondary text-base px-7 py-3.5">
                Neler yapabiliriz?
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="flex flex-wrap gap-2.5 mt-10"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-sm text-muted bg-white/80 border border-card-border rounded-lg px-3 py-1.5 shadow-sm"
                >
                  <Icon size={13} className="text-primary shrink-0" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — floating stats card */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 60, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Soft glow behind card */}
              <div className="absolute inset-4 bg-blue-300/20 blur-3xl rounded-3xl" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-[0_8px_40px_rgba(15,23,54,0.12)] p-8"
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-7">
                  Rakamlarla CanLabs
                </p>

                <div className="flex flex-col gap-6">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-5">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.9 + i * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="text-[2.8rem] font-bold text-primary leading-none tabular-nums"
                      >
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </motion.div>
                      <div>
                        <div className="text-sm font-medium text-ink">{stat.label}</div>
                        <div className="h-0.5 w-8 bg-primary/20 rounded-full mt-1" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 shrink-0">
                      <div
                        className="absolute inset-0 rounded-full bg-primary/15 animate-ping"
                        style={{ animationDuration: "3s" }}
                      />
                      <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">AD</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-ink text-sm">Alican Dağıdır</p>
                      <p className="text-muted text-xs">CEO & Yazılım Danışmanı</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Müsait
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
