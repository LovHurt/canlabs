import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  color,
}: ServiceCardProps) {
  return (
    <div className="group card-base p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-default">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
      >
        <Icon size={22} />
      </div>
      <h3 className="font-semibold text-ink text-lg mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
      <a
        href="#iletisim"
        className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        Görüşme ayarla →
      </a>
    </div>
  );
}
