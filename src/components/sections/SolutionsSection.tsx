"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";
import IsGeniusBadge from "@/components/ui/IsGeniusBadge";

const TABS_TR = [
  {
    id: "emergency",
    label: "Acil Müdahale",
    eyebrow: "ACİL DURUM",
    title: "Kriz anında doğru kişiye, doğru bilgiyle ulaşın.",
    description:
      "Sollen, çalışanların acil durumda hızlıca yardım çağırmasını, yetkililerle iletişime geçmesini ve durumunu güvenli / tehlikede olarak bildirmesini sağlar. Müdahale ekipleri konum, kişi bilgisi ve olay durumuna tek ekrandan ulaşır.",
    pills: ["112 Entegrasyonu", "Yetkili İletişimi", "Durum Bildirimi"],
    outcome: {
      label: "SONUÇ",
      text: "Acil durumda panik azalır, iletişim hızlanır ve ekipler sahaya daha net bilgiyle yönlendirilir.",
    },
    mainImage: "/screens/Page Com-8-portrait.png",
    secondImage: "/screens/feature-2-portrait.png",
  },
  {
    id: "evacuation",
    label: "Tahliye & Toplanma",
    eyebrow: "TAHLİYE KOORDİNASYONU",
    title: "İnsanları güvenli noktaya yönlendirin.",
    description:
      "Sollen, kriz anında çalışanları en yakın güvenli toplanma alanına yönlendirir. Tahliye rotası, varış noktası ve eşleşme akışı sayesinde ekipler dağılmadan, kontrollü şekilde hareket eder.",
    pills: ["Tahliye Rotası", "Toplanma Alanı", "Konum Eşleşmesi"],
    outcome: {
      label: "SONUÇ",
      text: "Dağınık tahliye süreçleri yerine, herkesin nereye gideceğini bildiği kontrollü bir güvenlik akışı oluşur.",
    },
    mainImage: "/screens/tahliye-3-portrait.png",
    secondImage: "/screens/toplanma anı-portrait.png",
  },
  {
    id: "training",
    label: "Eğitimler",
    eyebrow: "SÜREKLİ HAZIRLIK",
    title: "Ekipleri sadece olay anında değil, öncesinde de hazırlayın.",
    description:
      "Sollen, çalışanların afet, arama-kurtarma, tahliye ve saha güvenliği eğitimlerine erişmesini sağlar. Eğitim ilerlemeleri takip edilebilir, tamamlanan içerikler izlenebilir ve ekip hazırlığı ölçülebilir hale gelir.",
    pills: ["Video Eğitimler", "İlerleme Takibi", "Hazırlık Seviyesi"],
    outcome: {
      label: "SONUÇ",
      text: "Eğitim süreçleri dağınık dokümanlardan çıkar, izlenebilir ve sürdürülebilir bir hazırlık sistemine dönüşür.",
    },
    mainImage: "/screens/Eğitimler sf-portrait.png",
    secondImage: null,
  },
  {
    id: "risk",
    label: "Risk Bilgilendirme",
    eyebrow: "BİLGİLENDİRME",
    title: "Riskleri olay olmadan önce anlaşılır hale getirin.",
    description:
      "Sollen, çalışanlara deprem, yangın, tahliye ve saha riskleri hakkında anlaşılır bilgilendirme içerikleri sunar. Risk öncesi, olay anı ve olay sonrası yapılması gerekenler tek uygulamada erişilebilir olur.",
    pills: ["Afet Bilgisi", "Olay Öncesi", "Olay Sonrası"],
    outcome: {
      label: "SONUÇ",
      text: "Çalışanlar sadece uyarı almaz; ne yapması gerektiğini de bilir.",
    },
    mainImage: "/screens/Page Com-13-portrait.png",
    secondImage: null,
  },
  {
    id: "contact",
    label: "İrtibat & Sağlık",
    eyebrow: "KİŞİSEL GÜVENLİK PROFİLİ",
    title: "Müdahale ekipleri kritik bilgilere saniyeler içinde ulaşır.",
    description:
      "Sollen, çalışanların acil irtibat kişilerini, sağlık bilgilerini, adreslerini ve temel kimlik bilgilerini güvenli şekilde organize eder. Kriz anında ekipler kime ulaşacağını ve hangi sağlık bilgilerine dikkat etmesi gerektiğini bilir.",
    pills: ["Acil Kişiler", "Sağlık Bilgisi", "Adres Kayıtları"],
    outcome: {
      label: "SONUÇ",
      text: "Müdahale sadece hızlı değil, kişiye özel ve daha bilinçli hale gelir.",
    },
    mainImage: "/screens/Page Com-19-portrait.png",
    secondImage: "/screens/acil durum çantası-portrait.png",
  },
];

const TABS_EN = [
  {
    id: "emergency",
    label: "Emergency Response",
    eyebrow: "EMERGENCY",
    title: "Reach the right person with the right information in a crisis.",
    description:
      "ISGenius enables workers to quickly call for help, contact authorities, and report their status as safe or in danger. Response teams access location, personnel details, and incident status from a single screen.",
    pills: ["112 Integration", "Authority Contact", "Status Reporting"],
    outcome: {
      label: "OUTCOME",
      text: "Panic decreases in emergencies, communication accelerates, and teams are dispatched to the field with clearer information.",
    },
    mainImage: "/screens/Page Com-8-portrait.png",
    secondImage: "/screens/feature-2-portrait.png",
  },
  {
    id: "evacuation",
    label: "Evacuation & Assembly",
    eyebrow: "EVACUATION COORDINATION",
    title: "Guide people to safety.",
    description:
      "ISGenius directs workers to the nearest safe assembly point during a crisis. With evacuation routes, destination points, and matching flows, teams move in a controlled manner without dispersing.",
    pills: ["Evacuation Routes", "Assembly Points", "Location Matching"],
    outcome: {
      label: "OUTCOME",
      text: "Instead of chaotic evacuation, a controlled safety flow emerges where everyone knows where to go.",
    },
    mainImage: "/screens/tahliye-3-portrait.png",
    secondImage: "/screens/toplanma anı-portrait.png",
  },
  {
    id: "training",
    label: "Trainings",
    eyebrow: "CONTINUOUS PREPAREDNESS",
    title: "Prepare teams not just during incidents, but before them.",
    description:
      "ISGenius gives workers access to disaster, search-and-rescue, evacuation, and field safety trainings. Progress is trackable, completed content is monitored, and team readiness becomes measurable.",
    pills: ["Video Trainings", "Progress Tracking", "Readiness Level"],
    outcome: {
      label: "OUTCOME",
      text: "Training moves beyond scattered documents into a trackable and sustainable preparedness system.",
    },
    mainImage: "/screens/Eğitimler sf-portrait.png",
    secondImage: null,
  },
  {
    id: "risk",
    label: "Risk Information",
    eyebrow: "AWARENESS",
    title: "Make risks understandable before incidents occur.",
    description:
      "ISGenius provides workers with clear informational content about earthquakes, fires, evacuations, and field risks. What to do before, during, and after an incident is accessible in one application.",
    pills: ["Disaster Info", "Pre-Incident", "Post-Incident"],
    outcome: {
      label: "OUTCOME",
      text: "Workers don't just receive alerts — they also know what to do.",
    },
    mainImage: "/screens/Page Com-13-portrait.png",
    secondImage: null,
  },
  {
    id: "contact",
    label: "Contacts & Health",
    eyebrow: "PERSONAL SAFETY PROFILE",
    title: "Response teams access critical information within seconds.",
    description:
      "ISGenius securely organizes workers' emergency contacts, health information, addresses, and key identity details. In a crisis, teams know who to reach and which health conditions require attention.",
    pills: ["Emergency Contacts", "Health Info", "Address Records"],
    outcome: {
      label: "OUTCOME",
      text: "Response becomes not just fast, but personalized and more informed.",
    },
    mainImage: "/screens/Page Com-19-portrait.png",
    secondImage: "/screens/acil durum çantası-portrait.png",
  },
];

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const { locale, t: tDict } = useT();
  const TABS = locale === "en" ? TABS_EN : TABS_TR;

  // Reset tab selection when locale changes
  const prevLocale = useState(locale);
  if (prevLocale[0] !== locale) {
    setActiveTab(0);
    prevLocale[1](locale);
  }

  return (
    <section id="solutions" className="w-full py-16 lg:py-20 px-6 lg:px-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[#0A1128] text-xs tracking-[0.3em] uppercase mb-4">
            {tDict.solutions.eyebrow}
          </p>
          <h2
            className="text-[#1C2035] font-bold tracking-tight leading-[1.05] mb-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            {tDict.solutions.headline}
          </h2>
          <p className="text-[#333B4D] text-sm md:text-base leading-relaxed max-w-2xl">
            {tDict.solutions.subtext}
          </p>
        </div>

        {/* Tab Buttons Navigation */}
        <div className="flex gap-1 border-b border-[#E5E7EB] mb-8 overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className={`relative px-4 py-3 text-[13px] md:text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap
                ${
                  activeTab === i
                  ? "text-[#1C2035]"
                  : "text-[#8B95A8] hover:text-[#1C2035]"
                }
              `}
            >
              {t.label}
              {activeTab === i && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0036A3] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="overflow-hidden w-full relative">
          <div 
            className="flex transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{ transform: `translateX(-${activeTab * 100}%)` }}
          >
            {TABS.map((t) => (
              <div key={t.id} className="flex-[0_0_100%] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start lg:min-h-[500px]">
                
                {/* Left side – Text content */}
                <div className="flex flex-col pt-4">
                  <p className="text-[#0A1128] text-xs tracking-[0.3em] uppercase">
                    {t.eyebrow}
                  </p>
                  <h3
                    className="text-[#1C2035] font-bold tracking-tight leading-[1.1]"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", marginTop: "0.75rem", marginBottom: "1rem" }}
                  >
                    {t.title}
                  </h3>
                  <p className="text-[#333B4D] text-[15px] leading-[1.6]">
                    {t.description}
                  </p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2 mt-8">
                    {t.pills.map((pill) => (
                      <span
                        key={pill}
                        className="px-3 py-1.5 text-xs font-medium text-[#0036A3] bg-[#0036A3]/[0.08] rounded-full"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Outcome Block */}
                  <div className="mt-8 bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E7EB]">
                    <p className="text-[#0A1128] text-xs tracking-[0.3em] uppercase mb-3">
                      {t.outcome.label}
                    </p>
                    <p className="text-[#1C2035] text-[15px] font-semibold leading-snug">
                      {t.outcome.text}
                    </p>
                  </div>


                </div>

                {/* Right side – phone mockup(s) */}
                <div className="flex flex-col items-center gap-4 pt-2 w-full">
                  <div className="flex items-start justify-center gap-3 sm:gap-4 w-full">
                  {/* Main phone */}
                  <div className={`drop-shadow-xl ${t.secondImage ? "w-[42%] max-w-[220px] sm:max-w-[260px]" : "w-full max-w-[220px] sm:max-w-[260px]"}`}>
                    <img
                      src={t.mainImage}
                      alt={t.label}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Secondary phone – side by side, smaller on mobile */}
                  {t.secondImage && (
                    <div className="drop-shadow-xl w-[42%] max-w-[220px] sm:max-w-[260px]">
                      <img
                        src={t.secondImage}
                        alt={`${t.label} - 2`}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                  </div>
                  <IsGeniusBadge />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
