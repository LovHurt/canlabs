"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function VideoHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Video slows zoom as you scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-slate-950"
    >
      {/* Video background */}
      {!prefersReduced && (
        <motion.div
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.55) 60%, rgba(2,6,23,0.95) 100%)",
        }}
      />

      {/* Blue tint overlay */}
      <div className="absolute inset-0 bg-blue-950/20 pointer-events-none mix-blend-multiply" />

      {/* Content */}
      <motion.div
        style={prefersReduced ? {} : { y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-blue-300 text-sm font-semibold tracking-[0.25em] uppercase mb-6"
        >
          B2B Yazilim Danismanligi
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.0] tracking-tight mb-6 max-w-4xl"
        >
          Fikirden{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 50%, #67e8f9 100%)",
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
          transition={{ delay: 0.85, duration: 0.8 }}
          className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed"
        >
          Alican Dagidir liderliginde web, yapay zeka ve mobil cozumler.
          Dogrudan CEO ile, buyuk ajanslarin kaosusuz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 text-base shadow-lg shadow-black/30"
          >
            Ucretsiz kesfif gorusmesi al
          </a>
          <a
            href="#hizmetler"
            className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium px-8 py-4 rounded-2xl transition-all duration-300 text-base backdrop-blur-sm"
          >
            Hizmetlerimiz
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}
