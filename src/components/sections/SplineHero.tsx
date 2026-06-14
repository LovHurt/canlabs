"use client";

import { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

// Swap this URL for any scene from spline.design/community → Export → Copy URL
const SPLINE_SCENE = "https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode";

export default function SplineHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-slate-950"
    >
      {/* 3D Spline scene — fills entire background */}
      {!prefersReduced && (
        <motion.div
          style={{ opacity: sceneOpacity, y: sceneY }}
          className="absolute inset-0 w-full h-full"
        >
          <Suspense
            fallback={
              <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 animate-pulse" />
            }
          >
            <Spline
              scene={SPLINE_SCENE}
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
        </motion.div>
      )}

      {/* Vignette overlay — darkens edges, keeps text readable */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 20%, rgba(2,6,23,0.6) 100%)",
        }}
      />

      {/* Bottom fade into site */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />

      {/* Text content */}
      <motion.div
        style={prefersReduced ? {} : { y: textY, opacity: textOpacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-blue-300 text-sm font-semibold tracking-[0.25em] uppercase mb-6"
        >
          B2B Yazilim Danismanligi
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 36, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.7,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.0] tracking-tight mb-6 max-w-4xl"
        >
          Fikirden{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 55%, #67e8f9 100%)",
            }}
          >
            urune,
          </span>
          <br />
          dusunceden koda.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="text-white/55 text-lg max-w-xl mb-10 leading-relaxed"
        >
          Alican Dagidir liderliginde web, yapay zeka ve mobil cozumler.
          Dogrudan CEO ile calismak ne demek, biz gosteriyoruz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="flex flex-wrap gap-4 justify-center pointer-events-auto"
        >
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 text-base shadow-xl shadow-black/40"
          >
            Ucretsiz kesfif gorusmesi
          </a>
          <a
            href="#hizmetler"
            className="inline-flex items-center gap-2 border border-white/15 text-white/75 hover:text-white hover:border-white/35 font-medium px-8 py-4 rounded-2xl transition-all duration-300 text-base backdrop-blur-sm"
          >
            Hizmetlerimiz
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
