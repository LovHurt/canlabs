"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Pre-defined to avoid hydration mismatch
const PARTICLES = [
  { l: 4,  t: 8,  s: 2,   d: 9,  dl: 0   },
  { l: 12, t: 67, s: 1.5, d: 13, dl: 1.2 },
  { l: 18, t: 23, s: 3,   d: 8,  dl: 0.5 },
  { l: 25, t: 82, s: 1,   d: 11, dl: 3   },
  { l: 31, t: 41, s: 2.5, d: 15, dl: 1.8 },
  { l: 38, t: 10, s: 1.5, d: 10, dl: 0.3 },
  { l: 44, t: 57, s: 2,   d: 12, dl: 4.5 },
  { l: 49, t: 30, s: 1,   d: 8,  dl: 2.1 },
  { l: 55, t: 75, s: 3,   d: 14, dl: 0.8 },
  { l: 61, t: 18, s: 1.5, d: 9,  dl: 3.7 },
  { l: 67, t: 90, s: 2,   d: 11, dl: 1   },
  { l: 73, t: 45, s: 1,   d: 16, dl: 5   },
  { l: 78, t: 7,  s: 2.5, d: 10, dl: 2.4 },
  { l: 84, t: 62, s: 1.5, d: 13, dl: 0.6 },
  { l: 90, t: 28, s: 2,   d: 8,  dl: 1.5 },
  { l: 95, t: 80, s: 1,   d: 12, dl: 3.2 },
  { l: 7,  t: 50, s: 1.5, d: 10, dl: 4.1 },
  { l: 22, t: 36, s: 2,   d: 7,  dl: 0.9 },
  { l: 35, t: 95, s: 1,   d: 14, dl: 2.7 },
  { l: 52, t: 12, s: 2.5, d: 9,  dl: 1.3 },
  { l: 64, t: 70, s: 1.5, d: 11, dl: 4.8 },
  { l: 76, t: 33, s: 2,   d: 8,  dl: 0.4 },
  { l: 88, t: 55, s: 1,   d: 15, dl: 2   },
  { l: 10, t: 88, s: 3,   d: 12, dl: 3.5 },
  { l: 29, t: 15, s: 1.5, d: 10, dl: 1.6 },
  { l: 43, t: 72, s: 2,   d: 9,  dl: 5.2 },
  { l: 58, t: 48, s: 1,   d: 13, dl: 0.7 },
  { l: 72, t: 22, s: 2.5, d: 11, dl: 2.9 },
  { l: 86, t: 85, s: 1.5, d: 8,  dl: 1.1 },
  { l: 97, t: 40, s: 2,   d: 14, dl: 3.8 },
  { l: 2,  t: 72, s: 1,   d: 10, dl: 0.2 },
  { l: 16, t: 55, s: 2,   d: 7,  dl: 4.4 },
  { l: 33, t: 28, s: 1.5, d: 12, dl: 1.9 },
  { l: 47, t: 91, s: 2.5, d: 9,  dl: 0.1 },
  { l: 62, t: 5,  s: 1,   d: 15, dl: 3.3 },
  { l: 75, t: 50, s: 2,   d: 11, dl: 2.5 },
  { l: 83, t: 75, s: 1.5, d: 8,  dl: 4.9 },
  { l: 92, t: 18, s: 3,   d: 13, dl: 1.4 },
  { l: 20, t: 60, s: 1,   d: 10, dl: 3.6 },
  { l: 70, t: 38, s: 2,   d: 9,  dl: 0.8 },
];

const STATS = [
  { value: 20, suffix: "+", label: "Proje Tamamlandı", sub: "web · mobile · AI" },
  { value: 15, suffix: "+", label: "Mutlu Müşteri",    sub: "Türkiye & yurt dışı" },
  { value: 5,  suffix: "+", label: "Yıl Deneyim",      sub: "kesintisiz büyüme" },
  { value: 100, suffix: "%", label: "Memnuniyet",       sub: "referans garantisi" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const dur = 1800;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setN(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 lg:py-40">

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              width: p.s,
              height: p.s,
              opacity: 0.15,
              animation: `floatParticle ${p.d}s ease-in-out infinite`,
              animationDelay: `${p.dl}s`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-blue-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-400">
              SAYILARLA CANLABS
            </span>
            <div className="h-px w-8 bg-blue-500" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Güven, Rakamlarla
            <span className="block text-blue-400">Konuşur</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReduced ? false : { opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center group"
            >
              {/* Number */}
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-2 tabular-nums leading-none">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base sm:text-lg font-semibold text-slate-200 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 font-medium">{stat.sub}</div>

              {/* Hover underline */}
              <div className="mt-4 mx-auto w-0 group-hover:w-12 h-px bg-blue-500 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={prefersReduced ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-blue-800 to-transparent mb-16 origin-center"
        />

        {/* Quote / Tagline */}
        <motion.blockquote
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300 leading-relaxed max-w-3xl mx-auto">
            &ldquo;Büyük ajansların karmaşası olmadan,{" "}
            <span className="text-white">uzman kalitesiyle</span> — doğrudan
            CEO ile çalışıyorsunuz.&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center">
              <span className="text-blue-300 text-sm font-bold">AD</span>
            </div>
            <div className="text-left">
              <div className="text-white text-sm font-semibold">Alican Dağıdır</div>
              <div className="text-slate-500 text-xs">Kurucu & CEO, CanLabs</div>
            </div>
          </div>
        </motion.blockquote>

        {/* CTA */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#iletisim"
            className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]"
          >
            Sizi de bu listede görelim
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
