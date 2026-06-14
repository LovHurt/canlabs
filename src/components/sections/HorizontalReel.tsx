"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// ─── Slide 1: Web Geliştirme ───────────────────────────────────────────────────
const URL_TARGET = "https://canlabs.co/dashboard";

function WebSlide() {
  const [score, setScore] = useState(0);
  const [url, setUrl] = useState("");
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const urlTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Lighthouse score animation loop
  useEffect(() => {
    const animate = (t: number) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(elapsed / 2400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(eased * 100));
      if (p < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        scoreTimerRef.current = setTimeout(() => {
          startRef.current = 0;
          setScore(0);
          frameRef.current = requestAnimationFrame(animate);
        }, 2200);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      if (scoreTimerRef.current) clearTimeout(scoreTimerRef.current);
    };
  }, []);

  // URL typing loop
  useEffect(() => {
    let i = 0;
    let direction = 1;

    const step = () => {
      setUrl(URL_TARGET.slice(0, i));
      i += direction;
      if (i > URL_TARGET.length) {
        direction = -1;
        urlTimerRef.current = setTimeout(step, 1800);
      } else if (i < 0) {
        i = 0;
        direction = 1;
        urlTimerRef.current = setTimeout(step, 600);
      } else {
        urlTimerRef.current = setTimeout(step, direction === 1 ? 62 : 28);
      }
    };
    urlTimerRef.current = setTimeout(step, 900);
    return () => {
      if (urlTimerRef.current) clearTimeout(urlTimerRef.current);
    };
  }, []);

  const scoreColor =
    score < 50 ? "#ef4444" : score < 90 ? "#f59e0b" : "#22c55e";

  // Circumference of circle r=15.9: ~99.9, using strokeDasharray out of 100
  const circumference = 100;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-7 px-8" style={{ background: "#0a1628" }}>
      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-blue-300/80">
          Web Geliştirme
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight">
          Hız &amp; Mükemmellik
        </h2>
      </div>

      {/* Browser mockup */}
      <div className="relative w-full max-w-lg">
        {/* Shadow layers */}
        <div className="absolute -bottom-3 -right-3 w-full h-52 rounded-2xl border border-blue-500/10 bg-blue-900/15" />
        <div className="absolute -bottom-1.5 -right-1.5 w-full h-52 rounded-2xl border border-blue-500/15 bg-blue-900/25" />

        {/* Main browser frame */}
        <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-950/60" style={{ background: "#0d1f3c" }}>
          {/* Tab bar */}
          <div className="flex items-end gap-0 px-3 pt-2" style={{ background: "#091529" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs text-blue-200/90 font-medium" style={{ background: "#0d1f3c", borderTop: "1px solid rgba(59,130,246,0.2)", borderLeft: "1px solid rgba(59,130,246,0.15)", borderRight: "1px solid rgba(59,130,246,0.15)" }}>
              <div className="w-3 h-3 rounded-full bg-blue-400/50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300/70" />
              </div>
              CanLabs Dashboard
            </div>
            <div className="px-4 py-2 rounded-t-lg text-xs text-slate-600" style={{ background: "#091529" }}>
              + Yeni sekme
            </div>
          </div>

          {/* Chrome bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b" style={{ background: "#0d1f3c", borderColor: "rgba(59,130,246,0.12)" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Nav buttons */}
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded text-slate-500 text-xs flex items-center justify-center">←</div>
              <div className="w-5 h-5 rounded text-slate-600 text-xs flex items-center justify-center">→</div>
            </div>
            {/* URL bar */}
            <div className="flex-1 rounded-full px-3 py-1.5 flex items-center gap-2 border" style={{ background: "#091529", borderColor: "rgba(59,130,246,0.2)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-green-400 flex-shrink-0">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="text-blue-200/80 text-xs font-mono tracking-tight">
                {url}
                <span className="inline-block w-0.5 h-3 bg-blue-400 ml-0.5 animate-pulse align-middle" />
              </span>
            </div>
          </div>

          {/* Page content with animated gradient overlay */}
          <div className="relative p-5 space-y-3 overflow-hidden" style={{ minHeight: 160 }}>
            {/* Animated gradient shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(59,130,246,0.04) 50%, transparent 70%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
            />
            <div className="h-7 w-2/3 rounded-lg animate-pulse" style={{ background: "rgba(59,130,246,0.25)" }} />
            <div className="h-3.5 w-full rounded" style={{ background: "rgba(71,85,105,0.45)" }} />
            <div className="h-3.5 w-4/5 rounded" style={{ background: "rgba(71,85,105,0.45)" }} />
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 rounded-xl" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.15)" }} />
              ))}
            </div>
            <div className="h-9 w-36 rounded-xl mt-2" style={{ background: "rgba(59,130,246,0.35)" }} />
          </div>
        </div>
      </div>

      {/* Lighthouse scores */}
      <div className="flex items-center gap-6">
        {/* Animated performance ring */}
        <div className="text-center">
          <div className="relative w-[72px] h-[72px]">
            <svg viewBox="0 0 36 36" className="w-[72px] h-[72px] -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(30,41,59,0.8)" strokeWidth="2.5" />
              <motion.circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke={scoreColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ transition: "stroke 0.3s" }}
                strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-lg font-black"
              style={{ color: scoreColor }}
            >
              {score}
            </span>
          </div>
          <div className="text-blue-200/60 text-xs mt-1">Performance</div>
        </div>
        {[
          { label: "Accessibility", v: 100, c: "#22c55e" },
          { label: "SEO", v: 100, c: "#22c55e" },
          { label: "Best Practices", v: 96, c: "#22c55e" },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <div className="text-2xl font-black" style={{ color: m.c }}>{m.v}</div>
            <div className="text-blue-200/40 text-xs mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Slide 2: Yapay Zeka ───────────────────────────────────────────────────────

// Pre-defined neural network layout: 4 input, 6 hidden, 4 hidden, 3 output
const NN_LAYERS = [
  [
    { cx: 55, cy: 60 },
    { cx: 55, cy: 120 },
    { cx: 55, cy: 180 },
    { cx: 55, cy: 240 },
  ],
  [
    { cx: 145, cy: 40 },
    { cx: 145, cy: 88 },
    { cx: 145, cy: 136 },
    { cx: 145, cy: 184 },
    { cx: 145, cy: 232 },
    { cx: 145, cy: 265 },
  ],
  [
    { cx: 235, cy: 60 },
    { cx: 235, cy: 120 },
    { cx: 235, cy: 180 },
    { cx: 235, cy: 240 },
  ],
  [
    { cx: 315, cy: 90 },
    { cx: 315, cy: 155 },
    { cx: 315, cy: 220 },
  ],
];

// Pre-defined connection weights (thickness / color strength)
const NN_EDGES: { a: number; b: number; layerA: number; weight: number }[] = [];
(function buildEdges() {
  const layerOffsets = [0, 4, 10, 14];
  for (let l = 0; l < NN_LAYERS.length - 1; l++) {
    for (let a = 0; a < NN_LAYERS[l].length; a++) {
      for (let b = 0; b < NN_LAYERS[l + 1].length; b++) {
        // deterministic pseudo-weight
        const weight = 0.3 + ((a * 7 + b * 13 + l * 5) % 10) / 14;
        NN_EDGES.push({ a: layerOffsets[l] + a, b: layerOffsets[l + 1] + b, layerA: l, weight });
      }
    }
  }
})();

const ALL_NODES = NN_LAYERS.flat();

// Terminal lines for AI demo
const TERM_LINES = [
  { prompt: true, text: "npm run train -- --model transformer --epochs 50" },
  { prompt: false, text: "Initializing training pipeline...", color: "text-slate-400" },
  { prompt: false, text: "Loading dataset: 847,392 records", color: "text-slate-400" },
  { prompt: false, text: "Epoch  1/50 | loss: 2.4831 | acc: 0.3127", color: "text-blue-400" },
  { prompt: false, text: "Epoch  5/50 | loss: 1.7642 | acc: 0.5489", color: "text-blue-400" },
  { prompt: false, text: "Epoch 12/50 | loss: 0.9134 | acc: 0.7812", color: "text-violet-400" },
  { prompt: false, text: "Epoch 25/50 | loss: 0.4271 | acc: 0.8934", color: "text-violet-300" },
  { prompt: false, text: "Epoch 38/50 | loss: 0.2108 | acc: 0.9341", color: "text-cyan-300" },
  { prompt: false, text: "Epoch 50/50 | loss: 0.1247 | acc: 0.9623 ✓", color: "text-green-400" },
  { prompt: false, text: "Model saved to ./checkpoints/model_v3.pt", color: "text-green-300" },
  { prompt: true, text: "python evaluate.py --test-split 0.2" },
  { prompt: false, text: "Precision: 0.9618 | Recall: 0.9577 | F1: 0.9597", color: "text-emerald-400" },
];

function AISlide() {
  const [visibleLines, setVisibleLines] = useState(0);
  const termTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let idx = 0;
    const tick = () => {
      idx += 1;
      setVisibleLines(idx);
      if (idx < TERM_LINES.length) {
        termTimerRef.current = setTimeout(tick, idx === 0 ? 600 : 320 + (idx % 3) * 80);
      } else {
        termTimerRef.current = setTimeout(() => {
          idx = 0;
          setVisibleLines(0);
          termTimerRef.current = setTimeout(tick, 800);
        }, 3000);
      }
    };
    termTimerRef.current = setTimeout(tick, 700);
    return () => {
      if (termTimerRef.current) clearTimeout(termTimerRef.current);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-6 px-8"
      style={{ background: "#080d1a" }}
    >
      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-violet-300/80">
          Yapay Zeka
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight">
          Akıllı Sistemler
        </h2>
      </div>

      <div className="flex gap-6 w-full max-w-4xl items-center">
        {/* Neural Network SVG */}
        <div className="flex-shrink-0">
          <svg width="360" height="310" viewBox="0 0 370 310">
            {/* Glow filter */}
            <defs>
              <filter id="glow-nn" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-node" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connections */}
            {NN_EDGES.map((e, i) => {
              const na = ALL_NODES[e.a];
              const nb = ALL_NODES[e.b];
              const col =
                e.layerA === 0
                  ? `rgba(96,165,250,${e.weight * 0.55})`
                  : e.layerA === 1
                  ? `rgba(139,92,246,${e.weight * 0.55})`
                  : `rgba(34,211,238,${e.weight * 0.55})`;
              return (
                <motion.line
                  key={i}
                  x1={na.cx} y1={na.cy}
                  x2={nb.cx} y2={nb.cy}
                  stroke={col}
                  strokeWidth={0.6 + e.weight * 1.2}
                  animate={{ opacity: [e.weight * 0.4, e.weight * 0.95, e.weight * 0.4] }}
                  transition={{
                    duration: 2.2 + (i % 7) * 0.3,
                    repeat: Infinity,
                    delay: (i % 11) * 0.12,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* Traveling pulses on selected edges */}
            {NN_EDGES.filter((_, i) => i % 5 === 0).slice(0, 14).map((e, i) => {
              const na = ALL_NODES[e.a];
              const nb = ALL_NODES[e.b];
              const col = e.layerA === 0 ? "#93c5fd" : e.layerA === 1 ? "#c4b5fd" : "#67e8f9";
              return (
                <motion.circle
                  key={`pulse-${i}`}
                  r="3"
                  fill={col}
                  filter="url(#glow-nn)"
                  animate={{
                    cx: [na.cx, nb.cx],
                    cy: [na.cy, nb.cy],
                    opacity: [0, 1, 1, 0],
                    r: [2, 3.5, 2],
                  }}
                  transition={{
                    duration: 0.9 + (i % 4) * 0.2,
                    repeat: Infinity,
                    delay: i * 0.38,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                />
              );
            })}

            {/* Nodes */}
            {ALL_NODES.map((n, i) => {
              const layerIdx =
                i < 4 ? 0 : i < 10 ? 1 : i < 14 ? 2 : 3;
              const baseColor =
                layerIdx === 0
                  ? ["rgba(59,130,246,0.18)", "rgba(96,165,250,0.85)"]
                  : layerIdx === 1
                  ? ["rgba(109,40,217,0.2)", "rgba(139,92,246,0.85)"]
                  : layerIdx === 2
                  ? ["rgba(6,182,212,0.18)", "rgba(34,211,238,0.85)"]
                  : ["rgba(16,185,129,0.18)", "rgba(52,211,153,0.85)"];

              return (
                <g key={i} filter="url(#glow-node)">
                  {/* Outer pulsing ring */}
                  <motion.circle
                    cx={n.cx} cy={n.cy}
                    fill="none"
                    stroke={baseColor[1]}
                    strokeWidth="1"
                    animate={{ r: [12, 17, 12], opacity: [0.25, 0.05, 0.25] }}
                    transition={{
                      duration: 2 + (i % 5) * 0.35,
                      repeat: Infinity,
                      delay: (i * 0.18) % 2,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Inner filled circle */}
                  <motion.circle
                    cx={n.cx} cy={n.cy} r="8"
                    fill={baseColor[0]}
                    stroke={baseColor[1]}
                    strokeWidth="1.5"
                    animate={{
                      r: [8, 10, 8],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.8 + (i % 4) * 0.3,
                      repeat: Infinity,
                      delay: (i * 0.22) % 1.8,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Terminal */}
        <div
          className="flex-1 rounded-2xl overflow-hidden font-mono text-sm border"
          style={{
            background: "#0d1117",
            borderColor: "rgba(139,92,246,0.25)",
            minHeight: 260,
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ background: "rgba(22,27,34,0.9)", borderColor: "rgba(139,92,246,0.2)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate-500 text-xs">alican@canlabs:~/ai-model</span>
          </div>

          {/* Terminal content */}
          <div className="p-4 space-y-1" style={{ minHeight: 212 }}>
            <AnimatePresence initial={false}>
              {TERM_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`text-xs leading-5 ${
                    line.prompt
                      ? "text-emerald-400"
                      : line.color ?? "text-slate-300"
                  }`}
                >
                  {line.prompt ? (
                    <span>
                      <span className="text-blue-400">alican</span>
                      <span className="text-slate-500">@</span>
                      <span className="text-violet-400">canlabs</span>
                      <span className="text-slate-500">:~$ </span>
                      <span className="text-white">{line.text}</span>
                    </span>
                  ) : (
                    line.text
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Blinking cursor */}
            {visibleLines <= TERM_LINES.length && (
              <motion.span
                className="inline-block w-2 h-4 bg-emerald-400 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 3: Mobil Uygulama ───────────────────────────────────────────────────

// iOS mini chart bar heights (pre-defined)
const IOS_BARS = [38, 62, 44, 78, 55, 88, 66];

function MobileSlide() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-8 px-8 relative overflow-hidden"
      style={{
        backgroundColor: "#f8fafc",
        backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-slate-500">
          Mobil Uygulama
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-2 tracking-tight">
          iOS &amp; Android
        </h2>
      </div>

      {/* Phone pair */}
      <div className="flex gap-10 items-end justify-center relative">

        {/* Figma annotation: top-level frame */}
        <div
          className="absolute -inset-6 rounded-2xl pointer-events-none"
          style={{ border: "1.5px dashed rgba(99,102,241,0.35)" }}
        >
          <span
            className="absolute -top-4 left-3 text-[10px] font-mono text-indigo-500 bg-f8fafc px-1"
            style={{ background: "#f8fafc" }}
          >
            Mobile / Frame
          </span>
        </div>

        {/* iOS Phone */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, x: -40, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          animate={{ y: [0, -8, 0] }}
        >
          {/* Float loop, separate animate for spring */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative overflow-hidden shadow-2xl shadow-blue-900/30"
              style={{
                width: 200,
                height: 430,
                borderRadius: 40,
                border: "3px solid #111",
                background: "#111",
              }}
            >
              {/* Inner inset border */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{ borderRadius: 37, border: "1px solid rgba(255,255,255,0.08)" }}
              />
              {/* Dynamic Island */}
              <div
                className="absolute z-30"
                style={{
                  top: 14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 80,
                  height: 26,
                  borderRadius: 14,
                  background: "#000",
                }}
              />
              {/* Screen */}
              <div
                className="absolute inset-0"
                style={{
                  borderRadius: 37,
                  background: "linear-gradient(160deg, #1e3a8a 0%, #1e40af 40%, #1d4ed8 100%)",
                  overflow: "hidden",
                  paddingTop: 52,
                }}
              >
                {/* Status row */}
                <div className="flex items-center justify-between px-4 py-1">
                  <span className="text-white/60 text-[9px] font-medium">09:41</span>
                  <div className="flex gap-1 items-center">
                    <div className="text-white/60 text-[9px]">●●●</div>
                    <div className="text-white/60 text-[9px]">WiFi</div>
                    <div className="text-white/60 text-[9px]">🔋</div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pt-2 space-y-3">
                  {/* Greeting */}
                  <div>
                    <div className="text-white/55 text-[10px]">Hoş geldin</div>
                    <div className="text-white text-sm font-bold leading-tight">Alican D.</div>
                  </div>

                  {/* Stats card */}
                  <div
                    className="rounded-2xl p-3"
                    style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
                  >
                    <div className="text-white/55 text-[10px] mb-1">Bugünkü gelir</div>
                    <div className="text-white text-xl font-black">₺48.200</div>
                    <div className="text-green-300 text-[10px] mt-0.5 font-medium">
                      ↑ %12.4 geçen haftaya göre
                    </div>
                  </div>

                  {/* Grid menu */}
                  <div className="grid grid-cols-2 gap-2">
                    {["Analytics", "Reports", "Tasks", "Settings"].map((l) => (
                      <div
                        key={l}
                        className="rounded-xl py-2 px-2 text-center"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                      >
                        <div className="text-white/80 text-[10px] font-medium">{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1" style={{ height: 48 }}>
                    {IOS_BARS.map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{ background: "rgba(255,255,255,0.35)" }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom nav */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 px-2"
                  style={{ background: "rgba(30,58,138,0.8)", backdropFilter: "blur(12px)" }}
                >
                  {["◉", "📊", "☰", "⚙"].map((icon, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <span className="text-sm" style={{ opacity: i === 0 ? 1 : 0.5 }}>{icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Figma annotation: Navigation Bar */}
            <div
              className="absolute -left-16 pointer-events-none"
              style={{ bottom: 30, width: 14 }}
            >
              <div style={{ width: 50, height: 1, background: "rgba(99,102,241,0.5)", marginLeft: 14 }} />
              <span className="text-[8px] font-mono text-indigo-400 whitespace-nowrap" style={{ marginLeft: -24 }}>Nav Bar</span>
            </div>
          </motion.div>

          <div className="text-center text-xs text-slate-500 mt-3 font-mono font-medium tracking-wide">iOS</div>
        </motion.div>

        {/* Android Phone */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, x: 40, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <div
              className="relative overflow-hidden shadow-xl"
              style={{
                width: 190,
                height: 410,
                borderRadius: 32,
                border: "3px solid #1e293b",
                background: "#0f172a",
              }}
            >
              {/* Camera puck cutout */}
              <div
                className="absolute z-30"
                style={{
                  top: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#0f172a",
                  border: "1.5px solid #334155",
                }}
              />

              {/* Screen */}
              <div
                className="absolute inset-0"
                style={{
                  borderRadius: 29,
                  background: "linear-gradient(160deg, #064e3b 0%, #065f46 40%, #047857 100%)",
                  overflow: "hidden",
                  paddingTop: 40,
                }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-1">
                  <span className="text-white/50 text-[9px]">09:41</span>
                  <span className="text-white/50 text-[9px]">●●● 🔋</span>
                </div>

                <div className="px-3 pt-2 space-y-2.5">
                  {/* Header card */}
                  <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div className="text-white/55 text-[10px]">Aktif Projeler</div>
                    <div className="text-white text-2xl font-black">7</div>
                  </div>

                  {/* Project list */}
                  <div className="space-y-1.5">
                    {[
                      { name: "E-ticaret Sitesi", color: "#4ade80" },
                      { name: "AI Dashboard", color: "#60a5fa" },
                      { name: "Mobil Uygulama", color: "#fbbf24" },
                    ].map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center gap-2 rounded-xl p-2"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      >
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                        <span className="text-white/80 text-[10px] font-medium">{p.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <div
                    className="rounded-xl py-2.5 text-center mt-2"
                    style={{ background: "rgba(16,185,129,0.4)", border: "1px solid rgba(52,211,153,0.4)" }}
                  >
                    <span className="text-emerald-100 text-[10px] font-bold tracking-wide">
                      Yeni Proje Ekle
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Figma annotation: CTA Button */}
            <div
              className="absolute -right-20 pointer-events-none"
              style={{ bottom: 70 }}
            >
              <div style={{ width: 50, height: 1, background: "rgba(99,102,241,0.5)" }} />
              <span className="text-[8px] font-mono text-indigo-400 whitespace-nowrap">CTA Button</span>
            </div>
          </motion.div>

          <div className="text-center text-xs text-slate-500 mt-3 font-mono font-medium tracking-wide">Android</div>
        </motion.div>
      </div>

      {/* Caption */}
      <p className="text-slate-500 text-sm text-center max-w-xs font-mono">
        Tek kod tabanı, iki platform. React Native ile geliştirme süresini kısaltıyoruz.
      </p>
    </div>
  );
}

// ─── Slide 4: Veri Analitiği ───────────────────────────────────────────────────

const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

// Pre-defined bar heights for initial render
const INITIAL_BARS = [62, 79, 68, 87, 74, 92, 85, 73, 90, 84, 88, 95];

// Revenue trend line points (12 months, pre-defined)
const LINE_POINTS = [
  { x: 24, y: 88 }, { x: 60, y: 74 }, { x: 96, y: 80 },
  { x: 132, y: 58 }, { x: 168, y: 65 }, { x: 204, y: 42 },
  { x: 240, y: 50 }, { x: 276, y: 35 }, { x: 312, y: 28 },
  { x: 348, y: 20 }, { x: 384, y: 15 }, { x: 420, y: 8 },
];

function buildLinePath(pts: { x: number; y: number }[]) {
  return pts.reduce((acc, p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, ""
  );
}

const LINE_PATH = buildLinePath(LINE_POINTS);
// Approx path length for strokeDasharray animation
const LINE_PATH_LENGTH = 500;

function DataSlide() {
  const [bars, setBars] = useState(INITIAL_BARS);
  const [revenue, setRevenue] = useState(284750);
  const [users, setUsers] = useState(14832);
  const [conv, setConv] = useState(4.7);
  const [growth, setGrowth] = useState(23.4);
  const [drawn, setDrawn] = useState(false);
  const barTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Draw the line on mount
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Animate bars and metrics
  useEffect(() => {
    const tick = () => {
      // deterministic-ish shuffle using modular arithmetic
      setBars((b) => b.map((v, i) => {
        const next = 42 + ((v * 7 + i * 13 + 17) % 52);
        return next;
      }));
      setRevenue((r) => {
        const next = 260000 + ((r * 3 + 12345) % 60000);
        return Math.round(next / 50) * 50;
      });
      setUsers((u) => {
        const next = 14200 + ((u * 5 + 678) % 1800);
        return Math.round(next / 10) * 10;
      });
      setConv((c) => {
        const next = 4.1 + ((c * 10 + 3) % 14) / 10;
        return +next.toFixed(1);
      });
      setGrowth((g) => {
        const next = 18 + ((g * 7 + 2) % 20);
        return +next.toFixed(1);
      });
      barTimerRef.current = setTimeout(tick, 2400);
    };
    barTimerRef.current = setTimeout(tick, 2200);
    return () => {
      if (barTimerRef.current) clearTimeout(barTimerRef.current);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-5 px-8"
      style={{ background: "#0c0a06" }}
    >
      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-orange-300/80">
          Veri Analitiği
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight">
          Gerçek Zamanlı İçgörü
        </h2>
      </div>

      {/* Dashboard card */}
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border"
        style={{ background: "#111827", borderColor: "rgba(249,115,22,0.2)" }}
      >
        {/* Header row */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "rgba(31,41,55,1)" }}
        >
          <div>
            <div className="text-white font-bold text-sm">Analytics Dashboard</div>
            <div className="text-slate-500 text-xs mt-0.5">Son 12 ay / gerçek zamanlı veri</div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-green-400 text-xs font-bold tracking-wider">CANLI</span>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-4 gap-3 px-6 pt-5 pb-3">
          {[
            { label: "Gelir", val: `₺${revenue.toLocaleString("tr-TR")}`, delta: "+8.3%", col: "text-emerald-400" },
            { label: "Kullanıcı", val: users.toLocaleString("tr-TR"), delta: "+314", col: "text-blue-400" },
            { label: "Dönüşüm", val: `%${conv}`, delta: "+0.4pp", col: "text-orange-400" },
            { label: "Büyüme", val: `%${growth}`, delta: "yıllık", col: "text-violet-400" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-3"
              style={{ background: "rgba(31,41,55,0.8)", border: "1px solid rgba(55,65,81,0.8)" }}
            >
              <div className="text-slate-400 text-[10px] mb-1 font-medium uppercase tracking-wider">{m.label}</div>
              <motion.div
                key={String(m.val)}
                initial={{ opacity: 0.5, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white font-black text-sm leading-tight"
              >
                {m.val}
              </motion.div>
              <div className={`text-[10px] mt-0.5 ${m.col}`}>{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Revenue trend line chart */}
        <div className="px-6 pb-3">
          <div className="text-slate-500 text-[10px] mb-2 font-medium uppercase tracking-wider">Gelir Trendi</div>
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(55,65,81,0.5)", height: 76 }}
          >
            <svg width="100%" height="76" viewBox="0 0 444 96" preserveAspectRatio="none">
              {/* Grid lines */}
              {[24, 48, 72].map((y) => (
                <line key={y} x1="0" y1={y} x2="444" y2={y} stroke="rgba(55,65,81,0.5)" strokeWidth="0.5" />
              ))}
              {/* Gradient fill */}
              <defs>
                <linearGradient id="line-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(249,115,22,0.25)" />
                  <stop offset="100%" stopColor="rgba(249,115,22,0)" />
                </linearGradient>
              </defs>
              <path
                d={`${LINE_PATH} L 420 96 L 24 96 Z`}
                fill="url(#line-fill)"
                opacity={drawn ? 1 : 0}
                style={{ transition: "opacity 0.6s" }}
              />
              {/* Line */}
              <motion.path
                d={LINE_PATH}
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: LINE_PATH_LENGTH, strokeDashoffset: LINE_PATH_LENGTH }}
                animate={drawn ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              />
              {/* End dot */}
              {drawn && (
                <motion.circle
                  cx={LINE_POINTS[LINE_POINTS.length - 1].x}
                  cy={LINE_POINTS[LINE_POINTS.length - 1].y}
                  r="4"
                  fill="#f97316"
                  animate={{ r: [3, 5, 3] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}
            </svg>
          </div>
        </div>

        {/* Bar chart */}
        <div className="px-6 pb-5">
          <div className="text-slate-500 text-[10px] mb-2 font-medium uppercase tracking-wider">Aylık Performans</div>
          <div className="flex items-end gap-1" style={{ height: 64 }}>
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="w-full rounded-t-sm"
                  style={{
                    background: "linear-gradient(to top, rgba(234,88,12,0.9), rgba(251,146,60,0.65))",
                    minHeight: 3,
                  }}
                />
                <span className="text-[8px] text-slate-600 font-mono">{MONTHS[i]}</span>
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
  { bg: "#0a1628", component: WebSlide },
  { bg: "#080d1a", component: AISlide },
  { bg: "#f8fafc", component: MobileSlide },
  { bg: "#0c0a06", component: DataSlide },
];

export default function HorizontalReel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);
  const x = useSpring(rawX, { damping: 40, stiffness: 200, mass: 0.8 });

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
      aria-label="Hizmetlerimiz yatay kayar bolum"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Slide track */}
        <motion.div style={{ x }} className="flex h-full">
          <div className="flex h-full" style={{ width: "400vw" }}>
            {SLIDES.map((slide, i) => {
              const Comp = slide.component;
              return (
                <div
                  key={i}
                  className="relative flex-shrink-0 h-full"
                  style={{ width: "100vw", background: slide.bg }}
                >
                  {/* Subtle noise overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
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

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === activeSlide ? 32 : 8,
                opacity: i === activeSlide ? 1 : 0.35,
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
              style={{ background: i === 2 ? "#64748b" : "#ffffff" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
