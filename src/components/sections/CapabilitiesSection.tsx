"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import TechBadge from "@/components/ui/TechBadge";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerFast, scaleIn } from "@/lib/animations";

const techStack = [
  {
    category: "Frontend",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native"],
  },
  {
    category: "Backend",
    techs: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "AI / ML",
    techs: ["OpenAI API", "LangChain", "Hugging Face", "Pinecone", "Weaviate"],
  },
  {
    category: "Cloud & DevOps",
    techs: ["AWS", "GCP", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
  },
  {
    category: "Mobil",
    techs: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    category: "Araçlar",
    techs: ["Figma", "Vercel", "Supabase", "Stripe", "Resend"],
  },
];

const capabilities = [
  "Kurumsal tanıtım & lead generation siteleri",
  "SaaS ürünleri (B2B / B2C)",
  "E-ticaret ve marketplace platformları",
  "Dahili araçlar ve operasyonel dashboard'lar",
  "LLM destekli müşteri hizmetleri botları",
  "ERP / CRM entegrasyonları ve API'lar",
  "iOS & Android mobil uygulamalar",
  "Veri görselleştirme ve BI raporlama sistemleri",
];

export default function CapabilitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="yetenekler"
      aria-labelledby="capabilities-heading"
      className="section-padding bg-white"
    >
      <div className="container-tight">
        <motion.div
          initial={prefersReduced ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          variants={prefersReduced ? {} : fadeUp}
        >
          <SectionHeading
            id="capabilities-heading"
            eyebrow="YETENEKLERİMİZ"
            title="Hangi Teknolojileri Kullanıyoruz?"
            subtitle="Modern, kanıtlanmış ve ölçeklenebilir teknolojilerle inşa ediyoruz. Trend peşinde değil, doğru araç peşindeyiz."
          />
        </motion.div>

        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Tech stack */}
          <motion.div
            initial={prefersReduced ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            variants={prefersReduced ? {} : fadeUp}
            className="flex flex-col gap-6"
          >
            {techStack.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">
                  {group.category}
                </p>
                <motion.div
                  variants={prefersReduced ? {} : staggerFast}
                  className="flex flex-wrap gap-2"
                >
                  {group.techs.map((tech) => (
                    <motion.div key={tech} variants={prefersReduced ? {} : scaleIn}>
                      <TechBadge name={tech} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Capabilities list */}
          <motion.div
            initial={prefersReduced ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            variants={prefersReduced ? {} : fadeUp}
            transition={{ delay: prefersReduced ? 0 : 0.2 }}
            className="card-base p-8"
          >
            <h3 className="font-semibold text-ink text-lg mb-6">
              Neler İnşa Edebiliriz?
            </h3>
            <ul className="flex flex-col gap-3">
              {capabilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-ink leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-card-border">
              <p className="text-sm text-muted mb-4">
                İhtiyacınız listede yok mu? Özel projeler için görüşelim.
              </p>
              <a href="#iletisim" className="btn-primary text-sm">
                Projenizi Anlat
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
