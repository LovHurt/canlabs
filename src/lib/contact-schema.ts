import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalı").max(100),
  email: z.string().email("Geçerli bir e-posta adresi girin").max(200),
  company: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  service: z.enum(
    ["web", "consulting", "ai", "mobile", "devops", "analytics", "other"] as const
  ),
  message: z
    .string()
    .min(20, "Mesaj en az 20 karakter olmalı")
    .max(2000, "Mesaj en fazla 2000 karakter olabilir"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
