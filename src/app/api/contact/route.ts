import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { getMailFrom } from "@/lib/site";

const serviceLabels: Record<string, string> = {
  web: "Web Sitesi Geliştirme",
  consulting: "Yazılım Danışmanlığı",
  ai: "Yapay Zeka Entegrasyonu",
  mobile: "Mobil Uygulama",
  devops: "DevOps & Bulut Altyapı",
  analytics: "Veri Analitiği & Dashboard",
  other: "Diğer",
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed } = checkRateLimit(ip, 3, 60_000);

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Çok fazla istek. Lütfen 1 dakika bekleyin." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Geçersiz istek." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Form verileri geçersiz." },
      { status: 422 }
    );
  }

  const { name, email, company, phone, service, message } = parsed.data;
  const serviceLabel = serviceLabels[service] ?? service;

  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFICATION_EMAIL ?? "alican@canlabs.co";

  if (!apiKey) {
    console.log("[Contact Form] Dev mode — would send email:");
    console.log({ name, email, company, phone, service: serviceLabel, message });
    return NextResponse.json({ success: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: getMailFrom(),
      to: notifyEmail,
      subject: `Yeni İletişim Talebi: ${name} — ${serviceLabel}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#1e40af;margin-bottom:24px;">Yeni İletişim Talebi</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;">Ad Soyad</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">E-posta</td><td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Şirket</td><td style="padding:8px 0;font-size:14px;">${company}</td></tr>` : ""}
            ${phone ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Telefon</td><td style="padding:8px 0;font-size:14px;">${phone}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Hizmet</td><td style="padding:8px 0;font-size:14px;">${serviceLabel}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;"/>
          <p style="color:#64748b;font-size:13px;margin-bottom:4px;">Mesaj:</p>
          <p style="font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact Form] Email send failed:", err);
    return NextResponse.json(
      { success: false, error: "E-posta gönderilemedi." },
      { status: 500 }
    );
  }
}
