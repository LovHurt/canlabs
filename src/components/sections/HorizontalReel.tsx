"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// ─── Slide 1: Web ──────────────────────────────────────────────────────────────
function WebSlide() {
  const [score, setScore] = useState(0);
  const [url, setUrl] = useState("");
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const urlTarget = "https://canlabs.co/dashboard";

  useEffect(() => {
    // Lighthouse score 0→100
    const animate = (t: number) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(elapsed / 2200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(eased * 100));
      if (p < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          startRef.current = 0;
          setScore(0);
          frameRef.current = requestAnimationFrame(animate);
        }, 2000);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // Typing URL loop
  useEffect(() => {
    let i = 0;
    let direction = 1;
    let timer: NodeJS.Timeout;
    const step = () => {
      setUrl(urlTarget.slice(0, i));
      i += direction;
      if (i > urlTarget.length) {
        direction = -1;
        timer = setTimeout(step, 1800);
      } else if (i < 0) {
        i = 0;
        direction = 1;
        timer = setTimeout(step, 600);
      } else {
        timer = setTimeout(step, direction === 1 ? 65 : 30);
      }
    };
    timer = setTimeout(step, 800);
    return () => clearTimeout(timer);
  }, []);

  const scoreColor =
    score < 50 ? "#ef4444" : score < 90 ? "#f59e0b" : "#22c55e";

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
      <div className="text-center mb-2">
        <span className="text-xs font-bold tracking-widest uppercase text-blue-400">
          01 — Web Geliştirme
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-2">
          Hız & Mükemmellik
        </h2>
      </div>

      {/* Stacked browser mockups */}
      <div className="relative w-full max-w-xl">
        {/* Background shadow browser */}
        <div className="absolute -bottom-4 -right-4 w-full h-48 rounded-2xl bg-blue-900/30 border border-blue-800/40" />
        <div className="absolute -bottom-2 -right-2 w-full h-48 rounded-2xl bg-blue-900/50 border border-blue-700/40" />

        {/* Main browser */}
        <div className="relative rounded-2xl overflow-hidden border border-blue-700/60 bg-slate-900 shadow-2xl shadow-blue-950/80">
          {/* Chrome bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 bg-slate-700 rounded-md px-3 py-1 flex items-center gap-2">
              <div className="w-3 h-3 text-slate-400">🔒</div>
              <span className="text-slate-300 text-xs font-mono">
                {url}
                <span className="animate-blink">|</span>
              </span>
            </div>
          </div>

          {/* Page skeleton */}
          <div className="p-5 space-y-3">
            <div className="h-8 w-2/3 bg-blue-800/40 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-slate-700/60 rounded" />
            <div className="h-4 w-4/5 bg-slate-700/60 rounded" />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-slate-700/40 rounded-xl" />
              ))}
            </div>
            <div className="h-10 w-40 bg-blue-700/60 rounded-xl mt-3" />
          </div>
        </div>
      </div>

      {/* Lighthouse score */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke={scoreColor}
                strokeWidth="3"
                strokeDasharray={`${score} 100`}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.05s, stroke 0.3s" }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-xl font-black"
              style={{ color: scoreColor }}
            >
              {score}
            </span>
          </div>
          <div className="text-slate-400 text-xs mt-1">Performance</div>
        </div>
        {[
          { label: "Accessibility", v: 100, c: "#22c55e" },
          { label: "SEO", v: 100, c: "#22c55e" },
          { label: "Best Practices", v: 96, c: "#22c55e" },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <div className="text-2xl font-black" style={{ color: m.c }}>{m.v}</div>
            <div className="text-slate-500 text-xs">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Slide 2: AI ───────────────────────────────────────────────────────────────
const AI_LINES = [
  "> Müşteri segmentasyonu analiz ediliyor...",
  "> 47.832 satır veri işlendi ✓",
  "> LLM modeli başlatılıyor (GPT-4o)...",
  "> Prompt optimizasyonu uygulandı ✓",
  "> Öngörü modeli çalışıyor...",
  "> Doğruluk: %94.7 — threshold aşıldı ✓",
  "> Rapor oluşturuluyor...",
  "> Tamamlandı. 3.2 saniye.",
];

function AISlide() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [shown, setShown] = useState<string[]>([]);

  useEffect(() => {
    if (lineIdx >= AI_LINES.length) {
      const t = setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
        setShown([]);
      }, 2000);
      return () => clearTimeout(t);
    }
    const line = AI_LINES[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setShown((s) => [...s, line]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  const currentLine = lineIdx < AI_LINES.length ? AI_LINES[lineIdx].slice(0, charIdx) : "";

  // Neural network SVG pulses
  const nodes = [
    { cx: 60, cy: 80 }, { cx: 60, cy: 150 }, { cx: 60, cy: 220 },
    { cx: 160, cy: 50 }, { cx: 160, cy: 120 }, { cx: 160, cy: 185 }, { cx: 160, cy: 250 },
    { cx: 260, cy: 80 }, { cx: 260, cy: 155 }, { cx: 260, cy: 225 },
  ];
  const edges = [
    [0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],
    [3,7],[3,8],[4,7],[4,8],[4,9],[5,8],[5,9],[6,8],[6,9],
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
      <div className="text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-violet-400">
          02 — Yapay Zeka
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-2">
          Akıllı Sistemler
        </h2>
      </div>

      <div className="flex gap-8 w-full max-w-3xl items-center">
        {/* Neural SVG */}
        <div className="flex-shrink-0">
          <svg width="320" height="300" viewBox="0 0 320 300">
            {edges.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={nodes[a].cx} y1={nodes[a].cy}
                x2={nodes[b].cx} y2={nodes[b].cy}
                stroke="rgba(139,92,246,0.3)"
                strokeWidth="1.5"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2 + (i % 5) * 0.4, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
            {nodes.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.cx} cy={n.cy} r="8"
                fill="rgba(139,92,246,0.15)"
                stroke="rgba(139,92,246,0.7)"
                strokeWidth="1.5"
                animate={{ r: [7, 10, 7], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8 + (i % 4) * 0.3, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
            {/* Traveling pulse dot */}
            {edges.slice(0, 8).map(([a, b], i) => (
              <motion.circle
                key={`pulse-${i}`}
                r="3"
                fill="#a78bfa"
                animate={{
                  cx: [nodes[a].cx, nodes[b].cx],
                  cy: [nodes[a].cy, nodes[b].cy],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>
        </div>

        {/* Terminal */}
        <div className="flex-1 bg-[#0d1117] rounded-2xl border border-violet-800/40 overflow-hidden font-mono text-sm min-h-[240px]">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/40">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-slate-500 text-xs">canlabs-ai — terminal</span>
          </div>
          <div className="p-4 space-y-1.5">
            <AnimatePresence>
              {shown.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    line.includes("✓")
                      ? "text-green-400"
                      : line.includes("...")
                      ? "text-violet-300"
                      : "text-slate-300"
                  }
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
            {lineIdx < AI_LINES.length && (
              <div className="text-violet-200">
                {currentLine}
                <span className="animate-blink">▋</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 3: Mobile ───────────────────────────────────────────────────────────
function MobileSlide() {
  const screens = [
    { title: "Ana Ekran", bg: "from-blue-900 to-blue-950" },
    { title: "Profil", bg: "from-violet-900 to-violet-950" },
  ];
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveScreen((s) => (s + 1) % screens.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
      <div className="text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
          03 — Mobil Uygulama
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-2">
          iOS & Android
        </h2>
      </div>

      <div className="flex gap-8 items-end justify-center">
        {/* iOS Phone */}
        <div className="relative">
          <div className="w-44 h-80 bg-slate-900 rounded-[2.5rem] border-2 border-slate-600 shadow-2xl overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
            {/* Screen */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 bg-gradient-to-b ${screens[activeScreen].bg} p-4 pt-12`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-white/60">Hoş geldin</div>
                    <div className="text-sm font-bold text-white">Alican D.</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                </div>
                <div className="bg-white/10 rounded-2xl p-3 mb-3">
                  <div className="text-xs text-white/60 mb-1">Bugünkü gelir</div>
                  <div className="text-2xl font-black text-white">₺48,200</div>
                  <div className="text-xs text-green-400 mt-1">↑ %12.4</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Analytics", "Reports", "Tasks", "Settings"].map((l) => (
                    <div key={l} className="bg-white/10 rounded-xl p-2 text-center">
                      <div className="text-xs text-white/80">{l}</div>
                    </div>
                  ))}
                </div>
                {/* Mini bar chart */}
                <div className="mt-3 flex items-end gap-1 h-12">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-white/30 rounded-sm"
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.07, duration: 0.5 }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="text-center text-xs text-slate-500 mt-2 font-medium">iOS</div>
        </div>

        {/* Android Phone — slightly smaller, offset */}
        <div className="relative -mb-6">
          <div className="w-40 h-72 bg-slate-800 rounded-[2rem] border-2 border-slate-600 shadow-xl overflow-hidden">
            {/* Status bar notch */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-4 bg-black rounded-b-xl" />
            </div>
            {/* Screen */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 to-emerald-950 pt-9 px-3 pb-3">
              <div className="bg-white/10 rounded-xl p-3 mb-2">
                <div className="text-xs text-white/60">Aktif Projeler</div>
                <div className="text-xl font-black text-white">7</div>
              </div>
              <div className="space-y-1.5">
                {["E-ticaret Sitesi", "AI Dashboard", "Mobil App"].map((p, i) => (
                  <div key={p} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-green-400" : i === 1 ? "bg-blue-400" : "bg-yellow-400"}`} />
                    <span className="text-white/80 text-xs">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-slate-500 mt-2 font-medium">Android</div>
        </div>
      </div>

      <p className="text-slate-400 text-sm text-center max-w-xs">
        Tek kod tabanı, iki platform. React Native ile %70 geliştirme süresini kısaltıyoruz.
      </p>
    </div>
  );
}

// ─── Slide 4: Data ─────────────────────────────────────────────────────────────
const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

function DataSlide() {
  const [bars, setBars] = useState([65, 82, 71, 90, 78, 95, 88, 76, 94, 87, 91, 98]);
  const [metrics, setMetrics] = useState({ revenue: 284500, users: 14832, conv: 4.7 });

  useEffect(() => {
    const t = setInterval(() => {
      setBars((b) => b.map(() => 40 + Math.floor(Math.random() * 55)));
      setMetrics({
        revenue: 250000 + Math.floor(Math.random() * 80000),
        users: 14000 + Math.floor(Math.random() * 2000),
        conv: +(4 + Math.random() * 2).toFixed(1),
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
      <div className="text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-orange-400">
          04 — Veri Analitiği
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-2">
          Gerçek Zamanlı İçgörü
        </h2>
      </div>

      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-orange-900/40 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <div className="text-white font-bold">Analytics Dashboard</div>
            <div className="text-slate-500 text-xs">Son 12 ay — canlı veri</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">CANLI</span>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-4 p-6 pb-4">
          <div className="bg-slate-800/60 rounded-xl p-3">
            <div className="text-slate-400 text-xs mb-1">Gelir</div>
            <motion.div
              key={metrics.revenue}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="text-white font-black text-lg"
            >
              ₺{metrics.revenue.toLocaleString("tr-TR")}
            </motion.div>
            <div className="text-green-400 text-xs mt-0.5">↑ canlı</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3">
            <div className="text-slate-400 text-xs mb-1">Kullanıcı</div>
            <motion.div
              key={metrics.users}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="text-white font-black text-lg"
            >
              {metrics.users.toLocaleString("tr-TR")}
            </motion.div>
            <div className="text-blue-400 text-xs mt-0.5">aktif</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3">
            <div className="text-slate-400 text-xs mb-1">Dönüşüm</div>
            <motion.div
              key={metrics.conv}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="text-white font-black text-lg"
            >
              %{metrics.conv}
            </motion.div>
            <div className="text-orange-400 text-xs mt-0.5">oran</div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-1.5 h-28">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-sm"
                  style={{
                    background: `linear-gradient(to top, rgba(249,115,22,0.9), rgba(251,146,60,0.6))`,
                    minHeight: 4,
                  }}
                />
                <span className="text-[10px] text-slate-600">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main HorizontalReel ───────────────────────────────────────────────────────
const SLIDES = [
  { bg: "bg-blue-950", component: WebSlide },
  { bg: "bg-violet-950", component: AISlide },
  { bg: "bg-emerald-950", component: MobileSlide },
  { bg: "bg-orange-950", component: DataSlide },
];

export default function HorizontalReel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);
  const x = useSpring(rawX, { damping: 40, stiffness: 200, mass: 0.8 });

  // Progress dots
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActiveSlide(Math.min(Math.floor(v * 4), 3));
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
      aria-label="Hizmetlerimiz — yatay kayar bölüm"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Slide track */}
        <motion.div
          style={{ x }}
          className="flex h-full"
        >
          <div className="flex h-full" style={{ width: "400vw" }}>
            {SLIDES.map((slide, i) => {
              const Comp = slide.component;
              return (
                <div
                  key={i}
                  className={`relative flex-shrink-0 h-full ${slide.bg}`}
                  style={{ width: "100vw" }}
                >
                  {/* Subtle noise overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    }}
                  />
                  <Comp />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === activeSlide ? 32 : 8,
                opacity: i === activeSlide ? 1 : 0.35,
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full bg-white"
            />
          ))}
        </div>

        {/* Scroll hint — fades after first scroll */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/50 z-20"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Kaydır</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
