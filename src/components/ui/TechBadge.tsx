interface TechBadgeProps {
  name: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-card-border text-sm font-medium text-ink shadow-sm hover:border-primary/30 hover:shadow-card hover:scale-105 transition-all duration-200 cursor-default">
      {name}
    </span>
  );
}
