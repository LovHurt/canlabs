"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useInView,
} from "framer-motion";

/* ─────────────────────────────────────────────
   BROWSER MOCKUP — animasyonlu web sitesi önizlemesi
───────────────────────────────────────────── */
function BrowserMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xl bg-white h-full">
      {/* Chrome bar */}
      <div className="bg-slate-100 border-b border-slate-200 px-3 py-2.5 flex items-center gap-2.5">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1 text-[11px] text-slate-400 font-mono truncate">
          https://musteri.canlabs.co
        </div>
      </div>

      {/* Page skeleton — animates in */}
      <div className="p-4 bg-white">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-16 h-3.5 bg-blue-600 rounded"
          />
          <div className="flex gap-2">
            {[40, 36, 44].map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="h-2.5 bg-slate-200 rounded"
                style={{ width: w }}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-20 h-6 bg-blue-600 rounded-md"
          />
        </div>

        {/* Hero text block */}
        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-6 bg-slate-800 rounded w-3/4 mb-2"
          />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.38 }}
            className="h-6 bg-slate-800 rounded w-1/2 mb-3"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="h-2.5 bg-slate-200 rounded w-full mb-1.5"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="h-2.5 bg-slate-200 rounded w-4/5 mb-4"
          />
          <div className="flex gap-2">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="h-8 w-28 bg-blue-600 rounded-lg"
            />
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.62 }}
              className="h-8 w-24 border-2 border-slate-200 rounded-lg"
            />
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { bg: "bg-blue-50", accent: "bg-blue-400" },
            { bg: "bg-violet-50", accent: "bg-violet-400" },
            { bg: "bg-emerald-50", accent: "bg-emerald-400" },
          ].map(({ bg, accent }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 + i * 0.1 }}
              className={`${bg} rounded-xl p-2.5`}
            >
              <div className={`w-5 h-5 ${accent} rounded-md mb-2 opacity-70`} />
              <div className="h-2 bg-white/70 rounded w-full mb-1" />
              <div className="h-2 bg-white/50 rounded w-3/4" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   METRICS CARD — animasyonlu gelir/büyüme grafiği
───────────────────────────────────────────── */
function MetricsCard() {
  const bars = [30, 52, 41, 68, 55, 82, 74];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-slate-600">Müşteri Büyümesi</span>
        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          +127% ↑
        </span>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">₺2.4M</div>
      <div className="text-xs text-slate-400 mb-3">Son 7 ay toplam gelir</div>

      {/* Animated bar chart */}
      <div className="flex items-end gap-1.5 h-20 mb-3 flex-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.1 + i * 0.07,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            style={{ height: `${h}%`, originY: 1 }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-700 to-blue-400"
          />
        ))}
      </div>

      {/* Quarter indicators */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "Q1", value: "₺580K", delta: "+14%" },
          { label: "Q2", value: "₺920K", delta: "+58%" },
          { label: "Q3", value: "₺900K", delta: "+55%" },
        ].map(({ label, value, delta }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-slate-50 rounded-lg p-2 text-center"
          >
            <div className="text-[10px] text-slate-400 mb-0.5">{label}</div>
            <div className="text-xs font-bold text-slate-700">{value}</div>
            <div className="text-[10px] text-emerald-500">{delta}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHONE MOCKUP — animasyonlu mobil uygulama
───────────────────────────────────────────── */
function PhoneMockup() {
  const weekBars = [60, 80, 50, 90, 70, 85, 65];

  return (
    <div className="flex justify-center items-center h-full py-2">
      {/* Outer glow */}
      <div className="relative">
        <div className="absolute -inset-4 bg-blue-400/15 blur-2xl rounded-full" />
        <div className="relative w-44 rounded-[2.5rem] border-[5px] border-slate-800 bg-slate-900 overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
          {/* Dynamic island */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-20 h-4 bg-slate-800 rounded-full" />
          </div>

          {/* App screen */}
          <div className="bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] px-3 pb-4 min-h-64">
            {/* Status */}
            <div className="flex justify-between text-[9px] text-slate-400 mb-3 px-1">
              <span className="font-semibold">9:41</span>
              <div className="flex gap-1 items-center">
                <span>●●●●</span>
                <span>WiFi</span>
                <span>■</span>
              </div>
            </div>

            {/* Welcome card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur rounded-2xl p-3 mb-3"
            >
              <div className="text-[10px] text-blue-200 mb-0.5">Hoş geldiniz</div>
              <div className="text-white text-[13px] font-bold">Alican Dağıdır</div>
              <div className="text-blue-300 text-[9px]">CEO & Yazılım Danışmanı</div>
            </motion.div>

            {/* Stat pills */}
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {[
                { n: "20+", l: "Proje", color: "from-blue-500/30 to-blue-600/20" },
                { n: "15+", l: "Müşteri", color: "from-violet-500/30 to-violet-600/20" },
              ].map(({ n, l, color }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.12 }}
                  className={`bg-gradient-to-br ${color} rounded-xl p-2.5 text-center`}
                >
                  <div className="text-white text-sm font-black">{n}</div>
                  <div className="text-blue-200 text-[9px]">{l}</div>
                </motion.div>
              ))}
            </div>

            {/* Mini bar chart */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 rounded-2xl p-2.5"
            >
              <div className="text-[9px] text-blue-300 mb-2 font-medium">Bu Hafta</div>
              <div className="flex items-end gap-1 h-10">
                {weekBars.map((h, i) => (
                  <motion.div
                    key={i}
                    style={{ height: `${h}%`, originY: 1 }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55 + i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-blue-400 to-sky-300 rounded-t-[2px] opacity-80"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Home indicator */}
          <div className="bg-slate-900 flex justify-center py-2">
            <div className="w-24 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CODE TERMINAL — AI entegrasyon kodu
───────────────────────────────────────────── */
function CodeTerminal() {
  const lines = [
    { tokens: [{ t: "// CanLabs × AI Entegrasyon", c: "text-slate-500" }] },
    { tokens: [{ t: "", c: "" }] },
    { tokens: [{ t: "const", c: "text-blue-400" }, { t: " client ", c: "text-slate-200" }, { t: "=", c: "text-slate-400" }, { t: " new", c: "text-blue-400" }, { t: " OpenAI", c: "text-emerald-300" }, { t: "();", c: "text-slate-400" }] },
    { tokens: [{ t: "", c: "" }] },
    { tokens: [{ t: "const", c: "text-blue-400" }, { t: " response ", c: "text-slate-200" }, { t: "=", c: "text-slate-400" }, { t: " await", c: "text-violet-400" }, { t: " client", c: "text-slate-200" }, { t: ".chat(", c: "text-slate-400" }, { t: "{", c: "text-orange-300" }] },
    { tokens: [{ t: "  model:", c: "text-slate-300" }, { t: " \"gpt-4o\"", c: "text-orange-300" }, { t: ",", c: "text-slate-400" }] },
    { tokens: [{ t: "  messages:", c: "text-slate-300" }, { t: " chatHistory", c: "text-emerald-300" }, { t: ",", c: "text-slate-400" }] },
    { tokens: [{ t: "  tools:", c: "text-slate-300" }, { t: " companyTools", c: "text-emerald-300" }, { t: ",", c: "text-slate-400" }] },
    { tokens: [{ t: "}", c: "text-orange-300" }, { t: ");", c: "text-slate-400" }] },
    { tokens: [{ t: "", c: "" }] },
    { tokens: [{ t: "// Sonuç: %340 otomasyon artışı", c: "text-emerald-500" }] },
  ];

  return (
    <div className="bg-[#0d1117] rounded-xl overflow-hidden shadow-2xl h-full border border-slate-800">
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c940]" />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <span className="text-slate-400 text-[11px] font-mono">ai-integration.ts</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-medium">TypeScript</span>
        </div>
      </div>

      {/* Code lines */}
      <div className="p-4 font-mono text-[11px] leading-5 overflow-hidden">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 + i * 0.07, ease: "easeOut" }}
            className="flex items-center gap-0"
          >
            <span className="text-slate-600 mr-4 w-4 shrink-0 text-right select-none">
              {line.tokens[0].t ? i + 1 : ""}
            </span>
            <span>
              {line.tokens.map((tok, j) => (
                <span key={j} className={tok.c}>
                  {tok.t}
                  {j < line.tokens.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <div className="flex items-center mt-0.5">
          <span className="text-slate-600 mr-4 w-4 text-right select-none">{lines.length + 1}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="inline-block w-1.5 h-3.5 bg-blue-400 rounded-[1px]"
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AI CARD — yapay zeka aktivite göstergesi
───────────────────────────────────────────── */
function AIActivityCard() {
  const nodes = [
    { x: 50, y: 20, label: "Input" },
    { x: 20, y: 55, label: "NLP" },
    { x: 80, y: 55, label: "Logic" },
    { x: 50, y: 80, label: "Output" },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-[#0f1f40] rounded-xl p-5 h-full relative overflow-hidden border border-slate-700/50">
      {/* Background glow */}
      <div className="absolute inset-0 bg-blue-500/5 rounded-xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white text-sm font-bold mb-0.5">AI Motor</div>
            <div className="text-slate-400 text-[11px]">Gerçek zamanlı işlem</div>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
            <span className="text-emerald-400 text-[11px] font-medium">Aktif</span>
          </div>
        </div>

        {/* Neural network SVG */}
        <div className="relative w-full h-28 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Edges */}
            {[
              [50, 20, 20, 55],
              [50, 20, 80, 55],
              [20, 55, 50, 80],
              [80, 55, 50, 80],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(59,130,246,0.3)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              />
            ))}
            {/* Animated pulse along edges */}
            {[
              [50, 20, 20, 55],
              [20, 55, 50, 80],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.circle
                key={`pulse-${i}`}
                r="1.5"
                fill="#3b82f6"
                initial={{ cx: x1, cy: y1, opacity: 0 }}
                animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
              />
            ))}
            {/* Nodes */}
            {nodes.map(({ x, y, label }, i) => (
              <g key={label}>
                <motion.circle
                  cx={x} cy={y} r="6"
                  fill="rgba(30,64,175,0.8)"
                  stroke="rgba(59,130,246,0.6)"
                  strokeWidth="1.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 200 }}
                />
                <text x={x} y={y + 14} textAnchor="middle" fill="rgba(148,163,184,0.8)" fontSize="5" fontFamily="monospace">
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "İstek", value: "1.2K/s" },
            { label: "Gecikme", value: "43ms" },
            { label: "Başarı", value: "99.8%" },
          ].map(({ label, value }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="text-blue-300 text-xs font-bold">{value}</div>
              <div className="text-slate-500 text-[9px]">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANA BÖLÜM — paralaks bento grid
───────────────────────────────────────────── */
export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Her kart farklı hızda kayar
  const raw1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const raw2 = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const raw3 = useTransform(scrollYProgress, [0, 1], [-20, 50]);
  const raw4 = useTransform(scrollYProgress, [0, 1], [25, -35]);

  const y1 = useSpring(raw1, { damping: 30, stiffness: 60 });
  const y2 = useSpring(raw2, { damping: 30, stiffness: 60 });
  const y3 = useSpring(raw3, { damping: 30, stiffness: 60 });
  const y4 = useSpring(raw4, { damping: 30, stiffness: 60 });

  const baseDelay = 0.1;

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 overflow-hidden bg-site-bg-subtle"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-3">ÇALIŞMALARIMIZ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Fikirden{" "}
            <span className="text-primary">Canlı Ürüne</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Web siteleri, mobil uygulamalar, AI araçları ve veri panoları —
            hepsini gerçekten inşa ediyoruz.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* Sol kolon — Browser (büyük) */}
          <motion.div
            style={prefersReduced ? {} : { y: y1 }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: baseDelay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-7 h-80 lg:h-96"
          >
            <BrowserMockup />
          </motion.div>

          {/* Sağ üst — Metrics */}
          <motion.div
            style={prefersReduced ? {} : { y: y2 }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: baseDelay + 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-5 h-80 lg:h-96"
          >
            <MetricsCard />
          </motion.div>

          {/* Alt sol — Phone */}
          <motion.div
            style={prefersReduced ? {} : { y: y3 }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: baseDelay + 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-4 h-72"
          >
            <PhoneMockup />
          </motion.div>

          {/* Alt orta — Code Terminal */}
          <motion.div
            style={prefersReduced ? {} : { y: y4 }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: baseDelay + 0.26, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-4 h-72"
          >
            <CodeTerminal />
          </motion.div>

          {/* Alt sağ — AI Activity */}
          <motion.div
            style={prefersReduced ? {} : { y: y2 }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: baseDelay + 0.34, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-4 h-72"
          >
            <AIActivityCard />
          </motion.div>
        </div>

        {/* Alt CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-12 text-center"
        >
          <a href="#iletisim" className="btn-primary group inline-flex">
            Projeniz İçin Görüşelim
            <motion.span
              animate={{ x: [0, 4, 0] }}
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
