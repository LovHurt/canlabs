"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Mail, ExternalLink, Clock, MessageSquare } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import { fadeUp, slideInRight } from "@/lib/animations";

const contactInfo = [
  {
    icon: Mail,
    label: "E-posta",
    value: "alican@canlabs.co",
    href: "mailto:alican@canlabs.co",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Hızlı mesaj gönder",
    href: "https://wa.me/905000000000",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "linkedin.com/in/alicandagidir",
    href: "https://linkedin.com/in/alicandagidir",
  },
  {
    icon: Clock,
    label: "Yanıt Süresi",
    value: "Genellikle 24 saat içinde",
    href: null,
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="iletisim"
      aria-labelledby="contact-heading"
      className="section-padding bg-site-bg-subtle"
    >
      <div className="container-tight">
        <motion.div
          initial={prefersReduced ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          variants={prefersReduced ? {} : fadeUp}
        >
          <SectionHeading
            id="contact-heading"
            eyebrow="İLETİŞİM"
            title="Projenizi Konuşalım"
            subtitle="Ücretsiz 30 dakikalık keşif görüşmesi için formu doldurun veya doğrudan ulaşın."
          />
        </motion.div>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
        >
          {/* Contact info */}
          <motion.div
            initial={prefersReduced ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            variants={prefersReduced ? {} : fadeUp}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="card-base p-6">
              <h3 className="font-semibold text-ink mb-5">
                Doğrudan İletişim
              </h3>
              <div className="flex flex-col gap-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-medium text-ink hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-ink">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base p-6 bg-primary text-white">
              <h3 className="font-semibold mb-2">Ücretsiz Keşif Görüşmesi</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                30 dakikalık görüşmede projenizi dinliyoruz, sorularınızı
                yanıtlıyoruz ve ihtiyacınız varsa ön teklif sunuyoruz.
                Hiçbir taahhüt gerektirmez.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={prefersReduced ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            variants={prefersReduced ? {} : slideInRight}
            className="lg:col-span-3 card-base p-6 sm:p-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
