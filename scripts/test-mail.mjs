/**
 * Geçici Ethereal test SMTP hesabı oluşturur ve .env.local'e yazar.
 * Sonra test maili gönderir ve Ethereal preview URL'ini gösterir.
 *
 * Kullanım: node scripts/test-mail.mjs
 */

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const ENV_PATH = path.resolve(".env.local");

console.log("🔧 Ethereal test hesabı oluşturuluyor...");
const account = await nodemailer.createTestAccount();

console.log("\n✅ Test SMTP bilgileri:");
console.log("  SMTP_HOST   :", account.smtp.host);
console.log("  SMTP_PORT   :", account.smtp.port);
console.log("  SMTP_USER   :", account.user);
console.log("  SMTP_PASS   :", account.pass);
console.log("  Inbox URL   : https://ethereal.email/messages\n");

// .env.local'e ekle (mevcut satırları koru, SMTP satırlarını yaz/güncelle)
let envContent = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, "utf-8") : "";

const lines = envContent.split("\n").filter(
  (l) => !l.startsWith("SMTP_") && !l.startsWith("CONTACT_EMAIL")
);

lines.push(
  `SMTP_HOST=${account.smtp.host}`,
  `SMTP_PORT=${account.smtp.port}`,
  `SMTP_SECURE=false`,
  `SMTP_USER=${account.user}`,
  `SMTP_PASS=${account.pass}`,
  `CONTACT_EMAIL=info@sollen.com.tr`,
  ""
);

fs.writeFileSync(ENV_PATH, lines.join("\n"));
console.log("📝 .env.local güncellendi.\n");

// Test maili gönder
const transporter = nodemailer.createTransport({
  host: account.smtp.host,
  port: account.smtp.port,
  secure: false,
  auth: { user: account.user, pass: account.pass },
});

const info = await transporter.sendMail({
  from: `"Sollen Web" <${account.user}>`,
  to: "info@sollen.com.tr",
  replyTo: "ziyaretci@test.com",
  subject: "Test: Yeni İletişim — Test Kullanıcısı",
  html: `<p><b>Ad:</b> Test Kullanıcısı</p><p><b>E-posta:</b> ziyaretci@test.com</p><p><b>Şirket:</b> Test A.Ş.</p>`,
});

console.log("📧 Test maili gönderildi!");
console.log("👁️  Maili görmek için şu linke git:\n");
console.log("   ", nodemailer.getTestMessageUrl(info), "\n");
