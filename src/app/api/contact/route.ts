import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, workplace } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sollen Web" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL ?? "info@sollen.com.tr",
      replyTo: email,
      subject: `Yeni İletişim: ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0A1128;">
          <div style="background: linear-gradient(135deg, #1E3A8A, #0A1128); padding: 32px; border-radius: 12px 12px 0 0;">
            <img src="https://sollen.com.tr/logos/sollen-logo.png" alt="Sollen" style="height: 28px; margin-bottom: 16px;" />
            <h2 style="color: #fff; margin: 0; font-size: 20px;">Yeni İletişim Formu</h2>
          </div>
          <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 12px; width: 130px; vertical-align: top;">AD SOYAD</td>
                <td style="padding: 10px 0; font-weight: 600; font-size: 15px;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 12px; vertical-align: top;">E-POSTA</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${email}" style="color: #1E3A8A; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 12px; vertical-align: top;">ŞİRKET</td>
                <td style="padding: 10px 0;">${company}</td>
              </tr>` : ""}
              ${workplace ? `
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 12px; vertical-align: top;">ÇALIŞTIĞI YER</td>
                <td style="padding: 10px 0;">${workplace}</td>
              </tr>` : ""}
            </table>
            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f3f4f6;">
              <a href="mailto:${email}" style="display: inline-block; background: #1E3A8A; color: #fff; padding: 12px 24px; border-radius: 999px; font-size: 14px; font-weight: 600; text-decoration: none;">
                Yanıtla →
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 11px; margin-top: 20px;">
            Bu e-posta sollen.com.tr iletişim formu aracılığıyla gönderildi.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] mail error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
