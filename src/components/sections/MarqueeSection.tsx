const row1 = [
  "Web Geliştirme",
  "•",
  "Yapay Zeka",
  "•",
  "React & Next.js",
  "•",
  "Mobil Uygulama",
  "•",
  "DevOps",
  "•",
  "LLM Entegrasyonu",
  "•",
  "UI/UX Tasarım",
  "•",
  "API Geliştirme",
  "•",
  "Bulut Altyapı",
  "•",
  "Veri Analitiği",
  "•",
];

const row2 = [
  "AWS",
  "•",
  "OpenAI",
  "•",
  "PostgreSQL",
  "•",
  "TypeScript",
  "•",
  "Docker",
  "•",
  "Supabase",
  "•",
  "Python",
  "•",
  "Kubernetes",
  "•",
  "React Native",
  "•",
  "FastAPI",
  "•",
];

export default function MarqueeSection() {
  return (
    <div className="py-6 overflow-hidden border-y border-card-border bg-white select-none">
      {/* Row 1 — left to right */}
      <div className="flex gap-6 mb-3">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...row1, ...row1].map((item, i) => (
            <span
              key={i}
              className={
                item === "•"
                  ? "text-primary/40 text-sm font-bold"
                  : "text-sm font-medium text-muted"
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="flex gap-6">
        <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
          {[...row2, ...row2].map((item, i) => (
            <span
              key={i}
              className={
                item === "•"
                  ? "text-accent/40 text-sm font-bold"
                  : "text-sm font-medium text-slate-400"
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
