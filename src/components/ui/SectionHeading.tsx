interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  id,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2
        id={id}
        className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted text-lg leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
