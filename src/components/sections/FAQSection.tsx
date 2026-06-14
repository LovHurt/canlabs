"use client";

import { useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import AccordionItem from "@/components/ui/AccordionItem";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";
import { fadeUp, slideInRight } from "@/lib/animations";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="sss"
      aria-labelledby="faq-heading"
      className="section-padding bg-white"
    >
      <div className="container-tight">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
        >
          {/* Sticky heading */}
          <motion.div
            initial={prefersReduced ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            variants={prefersReduced ? {} : fadeUp}
            className="lg:sticky lg:top-24"
          >
            <SectionHeading
              id="faq-heading"
              eyebrow="SIK SORULAN SORULAR"
              title="Aklınızdaki Soruların Yanıtları"
              centered={false}
            />
            <p className="mt-4 text-muted text-sm leading-relaxed">
              Burada bulamadığınız bir soru varsa, doğrudan bizimle iletişime
              geçin.
            </p>
            <a href="#iletisim" className="btn-primary text-sm mt-6 inline-flex">
              Soru Sor
            </a>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={prefersReduced ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            variants={prefersReduced ? {} : slideInRight}
            className="lg:col-span-2 card-base p-6 sm:p-8"
          >
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                index={i}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
