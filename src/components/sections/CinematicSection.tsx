"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const N = 160;
    particlesRef.current = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 1.2 + Math.random() * 1.8,
      opacity: 0.3 + Math.random() * 0.5,
      hue: 200 + Math.random() * 60, // blue to violet
    }));

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onScroll = () => { scrollRef.current = window.scrollY; };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    const CONNECTION_DIST = 130;
    const MOUSE_RADIUS = 140;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      const scrollFactor = 1 + scrollRef.current * 0.0003;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const particles = particlesRef.current;

      // Update
      for (const p of particles) {
        // Mouse attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.015;
          p.vx += dx / dist * force;
          p.vy += dy / dist * force;
        }

        // Dampen
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx * scrollFactor;
        p.y += p.vy * scrollFactor;

        // Wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.25;
            const hue = (a.hue + b.hue) / 2;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${hue}, 85%, 65%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${p.opacity})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

export default function CinematicSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-950 py-40 lg:py-56"
    >
      {/* Particle canvas */}
      {!prefersReduced && <ParticleCanvas />}

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(2,6,23,0.7) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={prefersReduced ? {} : { y: textY, opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase mb-8"
        >
          Teknoloji, strateji, uygulama
        </motion.p>

        <motion.h2
          initial={prefersReduced ? false : { opacity: 0, y: 32, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8"
        >
          Veri akar,{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #38bdf8 100%)",
            }}
          >
            sistemler konusur,
          </span>
          <br />
          sonuclar konusur.
        </motion.h2>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Karmasik teknoloji sorunlarini sade, olceklenebilir cozumlere donusturuyoruz.
          Kodu biz yaziyoruz, buyume size kaliyor.
        </motion.p>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_50px_rgba(59,130,246,0.3)] hover:shadow-[0_0_70px_rgba(59,130,246,0.5)] text-base"
          >
            Projenizi konusalim
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>

          <a
            href="#hizmetler"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/25 text-white/70 hover:text-white font-medium px-8 py-4 rounded-2xl transition-all duration-300 text-base backdrop-blur-sm"
          >
            Ne yapabiliyoruz?
          </a>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { n: "20+", label: "Proje" },
            { n: "5+", label: "Yil" },
            { n: "100%", label: "Memnuniyet" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-white">{s.n}</div>
              <div className="text-slate-500 text-xs mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
