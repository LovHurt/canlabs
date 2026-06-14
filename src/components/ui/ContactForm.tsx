"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

const serviceOptions = [
  { value: "web", label: "Web Sitesi Geliştirme" },
  { value: "consulting", label: "Yazılım Danışmanlığı" },
  { value: "ai", label: "Yapay Zeka Entegrasyonu" },
  { value: "mobile", label: "Mobil Uygulama" },
  { value: "devops", label: "DevOps & Bulut Altyapı" },
  { value: "analytics", label: "Veri Analitiği & Dashboard" },
  { value: "other", label: "Diğer" },
];

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormState("success");
        reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-ink">
          Mesajınız iletildi!
        </h3>
        <p className="text-muted text-sm max-w-xs">
          En geç 24 saat içinde size dönüş yapacağız. Görüşmeyi sabırsızlıkla
          bekliyoruz.
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="btn-ghost text-sm mt-2"
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Ad Soyad <span className="text-red-400">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="Alican Dağıdır"
            className={cn("input-field", errors.name && "border-red-300 focus:ring-red-200")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            E-posta <span className="text-red-400">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="alican@sirket.com"
            className={cn("input-field", errors.email && "border-red-300 focus:ring-red-200")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Şirket
          </label>
          <input
            {...register("company")}
            placeholder="Şirket Adı"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Telefon
          </label>
          <input
            {...register("phone")}
            placeholder="+90 555 000 00 00"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          İlgilendiğiniz Hizmet <span className="text-red-400">*</span>
        </label>
        <select
          {...register("service")}
          className={cn("input-field", errors.service && "border-red-300 focus:ring-red-200")}
          defaultValue=""
        >
          <option value="" disabled>
            Bir hizmet seçin
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Mesajınız <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Projenizi ve ihtiyaçlarınızı kısaca anlatın..."
          className={cn("input-field resize-none", errors.message && "border-red-300 focus:ring-red-200")}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {formState === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
          <AlertCircle size={16} />
          Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.
        </div>
      )}

      <button
        type="submit"
        disabled={formState === "loading"}
        className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {formState === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          "Mesaj Gönder"
        )}
      </button>

      <p className="text-xs text-muted text-center">
        Bilgileriniz yalnızca sizinle iletişim kurmak için kullanılır.
      </p>
    </form>
  );
}
