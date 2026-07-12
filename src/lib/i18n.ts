"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "tr";

export const TRANSLATIONS = {
  en: {
    nav: {
      product: "ISGenius",
      solutions: "Solutions",
      why: "Why Sollen?",
      contact: "Contact",
      cta: "Book a demo",
    },
    hero: {
      eyebrow: "AI AND IOT-NATIVE FIELD SAFETY",
      headline: "The operating system for corporate field safety.",
      subtitle:
        "Sollen unifies field teams, sensors, emergency protocols, and compliance tracking into a single platform. Risks become visible before they grow, and response begins without delay.",
      primaryCta: "Book a demo",
      secondaryCta: "How it works",
      scrollHint: "Scroll",
    },
    trust: {
      backedBy: "TRUSTED BY ORGANIZATIONS THAT DON'T LEAVE SAFETY TO CHANCE",
      memberOf: "Memberships",
      compliance: "Compliance",
      tubitak: "TÜBİTAK BIGG\nSeal of Excellence",
      kosgeb: "KOSGEB\nEntrepreneurship Fund",
      excellence: "EU Excellence Seal",
      headline: "Trust in the field, continuity in the system.",
      description:
        "Sollen is a safety-focused platform co-developed with universities, corporate enterprises, emergency response teams, and technology partners.",
    },
    customers: {
      heading: "TRUSTED BY ORGANIZATIONS THAT DON'T LEAVE SAFETY TO CHANCE",
    },
    product: {
      eyebrow: "ISGenius",
      headline: "Built for the moment everything goes wrong.",
      subtext:
        "Sollen consolidates emergency and occupational safety workflows into one app. Maps, alerts, tasks, team coordination, and incident tracking are managed from the same place.",
      features: {
        emergency: {
          eyebrow: "EMERGENCY RESPONSE",
          title: "Operates when networks don't.",
          description: "Our offline-first communication layer keeps your team coordinated even during network outages. Emergency alerts run seamlessly.",
          bullets: [
            "Critical information remains accessible in the field via offline use.",
            "Team communication continues seamlessly through network disruptions.",
            "Emergency calls are transmitted with exact location and personnel data.",
          ],
        },
        monitoring: {
          eyebrow: "REAL-TIME MONITORING",
          title: "See risks before they grow.",
          description: "Processing data from sensor networks, AI detects anomalies and hazardous events in seconds, not hours, and reports them instantly to field managers.",
          bullets: [
            "Worker location and site movements are tracked in real time.",
            "Risk zones, incident points, and team distribution are visible on the map.",
            "Site managers can make critical decisions without delay.",
          ],
        },
        compliance: {
          eyebrow: "COMPLIANCE INTELLIGENCE",
          title: "Audit-ready at any moment.",
          description: "Sollen records occupational health and safety, emergency management, and regulatory compliance processes. With automated reports and audit trails, your organization stays audit-ready at all times.",
          bullets: [
            "Incident records, response steps, and the chain of responsibility are automatically maintained.",
            "Training, drills, task histories, and emergency preparations are systematically tracked.",
            "Provides a reportable data infrastructure for OHS, emergency management, and compliance audits.",
          ],
        },
        howItWorks: {
          eyebrow: "HOW IT WORKS",
          title: "All sensors, alerts, and field teams in one platform.",
          description:
            "Field data is collected from IoT sensors and user actions. Sollen makes sense of this data, prioritizes risks, and generates the right action for the right person at the right moment.",
          bullets: [
            "Detect — sensors, location data, and field inputs are gathered.",
            "Prioritize — risk levels and response needs are determined.",
            "Respond — the right team takes action at the right location with the right information.",
          ],
        },
      },
    },
    stats: {
      eyebrow: "BY THE NUMBERS",
      headline: "Built to perform when it matters most.",
      note: "Based on field tests and network coverage data",
      items: [
        { label: "Istanbul city coverage", suffix: "%" },
        { label: "Uninterrupted availability", suffix: "%" },
      ],
    },
    solutions: {
      eyebrow: "SOLUTIONS",
      headline: "Manage safety operations in a single flow.",
      subtext:
        "Sollen unifies emergency management, evacuation coordination, training tracking, risk communication, and personal safety profiles into a single platform.",
      hint: "Drag, scroll, or swipe →",
      items: {
        construction: {
          label: "01 — CONSTRUCTION SITES",
          title: "Every worker. Every floor. Every moment.",
          description:
            "Makes site safety visible in high-risk environments with real-time location tracking, fall detection, equipment compliance, and instant alerts.",
        },
        industrial: {
          label: "02 — OPERATIONAL FACILITIES",
          title: "Multi-floor hazard intelligence.",
          description:
            "Reduces operational risk by monitoring gas leaks, temperatures, fire risks, shift movements, and site responsibilities from a single panel.",
        },
        emergency: {
          label: "03 — EMERGENCY SERVICES",
          title: "Operates when networks don't.",
          description:
            "Our offline-first architecture and automated incident reports keep teams connected during a crisis — completely independent of network infrastructure.",
        },
      },
    },
    why: {
      eyebrow: "WHY SOLLEN",
      statement:
        "ISGenius approaches occupational safety as an integrated system rather than standalone software. Sensor data, alert mechanisms, field teams, and compliance requirements are consolidated in a single hub. This unified structure transforms complex processes into a measurable, trackable, and manageable format.",
    },
    footer: {
      cta: {
        eyebrow: "GET STARTED",
        headline: "Contact our team.",
        lede: "Let's explore how Sollen can be adapted to your organization for field safety, emergency management, or operational risk tracking.",
      },
      form: {
        name: "Your name",
        email: "Email",
        company: "Your company",
        workplace: "Where you work",
        message: "Tell us what you're building…",
        namePlaceholder: "Your name",
        emailPlaceholder: "you@company.com",
        companyPlaceholder: "Your company name",
        workplacePlaceholder: "Where you work",
        messagePlaceholder: "Tell us what you're building…",
        submit: "Send message →",
        thanks: "Thanks — we'll be in touch.",
        thanksLede: "Expect a reply within one business day.",
      },
      rights: "All rights reserved.",
      sections: {
        product: "Product",
        solutions: "Solutions",
        company: "Company",
        legal: "Legal",
      },
      links: {
        platform: "Platform",
        mobile: "Mobile App",
        sensors: "Sensor Integrations",
        reporting: "Reporting",
        construction: "Construction Sites",
        industrial: "Operational Facilities",
        emergencyServices: "Emergency Services",
        whySollen: "Why Sollen",
        about: "About",
        contact: "Contact",
        demo: "Book a demo",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        kvkk: "KVKK Notice",
      },
    },
    cookie: {
      title: "Cookie Preferences",
      subtitle: "We value your privacy",
      description:
        "We use cookies and similar technologies to provide our services, enhance your browsing experience, analyze site traffic, and personalize content. You can manage your preferences below. For more information, see our Privacy Policy.",
      learnMore: "Privacy Policy",
      customize: "Customize",
      rejectAll: "Reject All",
      acceptAll: "Accept All",
      categories: {
        necessary: {
          title: "Strictly Necessary",
          description: "Essential for the website to function. These cookies enable core features such as security, session management, and accessibility. They cannot be disabled.",
        },
        analytics: {
          title: "Analytics & Performance",
          description: "Help us understand how visitors interact with our website by collecting and reporting information anonymously. This data helps us improve site performance and user experience.",
        },
        marketing: {
          title: "Marketing & Personalization",
          description: "Used to deliver relevant advertisements and track campaign effectiveness across platforms. These cookies may be set by third-party partners.",
        },
      },
      alwaysOn: "Always on",
      compliance: "This site complies with GDPR (EU) and KVKK (Türkiye) data protection regulations.",
    },
  },
  tr: {
    nav: {
      product: "ISGenius",
      solutions: "Çözümler",
      why: "Neden Sollen?",
      contact: "İletişim",
      cta: "Demo al",
    },
    hero: {
      eyebrow: "YAPAY ZEKA VE IOT TEMELLİ SAHA GÜVENLİĞİ",
      headline: "Kurumsal saha güvenliğinin işletim sistemi.",
      subtitle:
        "Sollen; saha ekiplerini, sensörleri, acil durum süreçlerini ve mevzuat takibini tek bir platformda birleştirir. Risk büyümeden görünür olur, müdahale gecikmeden başlar.",
      primaryCta: "Demo al",
      secondaryCta: "Nasıl çalışır?",
      scrollHint: "Kaydır",
    },
    trust: {
      backedBy: "GÜVENLİĞİ ŞANSA BIRAKMAYAN KURUMLARIN TERCİHİ",
      memberOf: "Üyelikler",
      compliance: "Uyumluluk",
      tubitak: "TÜBİTAK BIGG\nMükemmeliyet Mührü",
      kosgeb: "KOSGEB\nGirişimcilik Fonu",
      excellence: "EU Excellence Seal",
      headline: "Sahada güven, sistemde süreklilik.",
      description:
        "Sollen; üniversiteler, köklü kurumlar, acil durum ekipleri ve teknoloji paydaşlarıyla birlikte geliştirilen güvenlik odaklı bir platformdur.",
    },
    customers: {
      heading: "GÜVENLİĞİ ŞANSA BIRAKMAYAN KURUMLARIN TERCİHİ",
    },
    product: {
      eyebrow: "ISGenius",
      headline: "Her şeyin yanlış gittiği an için tasarlandı.",
      subtext:
        "Sollen, acil durum ve iş güvenliği süreçlerini tek uygulamada toplar. Haritalar, bildirimler, görevler, ekip koordinasyonu ve olay takibi aynı yerden yönetilir.",
      features: {
        emergency: {
          eyebrow: "ACİL MÜDAHALE",
          title: "Şebeke yokken bile çalışır.",
          description: "Offline-first iletişim altyapımız sayesinde şebeke kesintilerinde bile ekibiniz koordineli kalır. Acil durum bildirimleri kesintisiz çalışır.",
          bullets: [
            "Offline kullanım ile kritik bilgiler sahada erişilebilir kalır.",
            "Bağlantı kesintilerinde ekip iletişimi kesintisiz sürer.",
            "Acil durum çağrıları, konum ve kişi bilgisiyle birlikte iletilir.",
          ],
        },
        monitoring: {
          eyebrow: "GERÇEK ZAMANLI İZLEME",
          title: "Riskleri büyümeden gör.",
          description: "Sensör ağından gelen verileri işleyen yapay zeka, anormallikleri ve tehlikeli olayları saatler değil, saniyeler içinde tespit edip saha yöneticilerine raporlar.",
          bullets: [
            "Çalışan konumu ve saha hareketleri anlık izlenir.",
            "Riskli bölgeler, olay noktaları ve ekip dağılımı harita üzerinde görünür.",
            "Saha yöneticileri gecikmeden karar alabilir.",
          ],
        },
        compliance: {
          eyebrow: "UYUMLULUK ZEKÂSI",
          title: "Her an denetime hazır.",
          description: "Sollen, iş sağlığı ve güvenliği, acil durum yönetimi ve mevzuata uyum süreçlerini kayıt altına alır. Otomatik raporlar ve denetim izleriyle kurumunuz her an denetime hazır kalır.",
          bullets: [
            "Olay kayıtları, müdahale adımları ve sorumluluk zinciri otomatik tutulur.",
            "Eğitim, tatbikat, görev geçmişi ve acil durum hazırlıkları düzenli şekilde izlenir.",
            "İSG, acil durum yönetimi ve mevzuata uyum denetimleri için raporlanabilir veri altyapısı sağlar.",
          ],
        },
        howItWorks: {
          eyebrow: "NASIL ÇALIŞIR",
          title: "Tüm sensörler, uyarılar ve saha ekipleri tek platformda.",
          description:
            "Saha verileri IoT sensörlerinden ve kullanıcı aksiyonlarından toplanır. Sollen bu verileri anlamlandırır, riskleri önceliklendirir ve doğru kişiye doğru anda aksiyon üretir.",
          bullets: [
            "Algıla — sensörler, konum verisi ve saha girişleri toplanır.",
            "Önceliklendir — risk seviyesi ve müdahale ihtiyacı belirlenir.",
            "Müdahale et — doğru ekip, doğru konum, doğru bilgiyle harekete geçer.",
          ],
        },
      },
    },
    stats: {
      eyebrow: "RAKAMLARLA",
      headline: "En önemli anda performans için inşa edildi.",
      note: "Saha testleri ve ağ kapsama verilerine dayanmaktadır",
      items: [
        { label: "İstanbul içi kapsama", suffix: "%" },
        { label: "Kesintisiz erişilebilirlik", suffix: "%" },
      ],
    },
        solutions: {
      eyebrow: "ÇÖZÜMLER",
      headline: "Güvenlik operasyonlarını tek akışta yönetin.",
      subtext:
        "Sollen; acil durum yönetimi, tahliye koordinasyonu, eğitim takibi, risk bilgilendirme ve kişisel güvenlik profillerini tek platformda birleştirir.",
      hint: "Sürükle, kaydır veya dokun →",
      items: {
        construction: {
          label: "01 — İNŞAAT SAHALARI",
          title: "Her işçi. Her kat. Her an.",
          description:
            "Yüksek riskli sahalarda konum takibi, düşme algılama, ekipman uyumu ve anlık uyarılarla saha güvenliğini görünür hale getirir.",
        },
        industrial: {
          label: "02 — OPERASYONEL TESİSLER",
          title: "Çok katlı tehlike zekâsı.",
          description:
            "Gaz sızıntısı, sıcaklık, yangın riski, vardiya hareketleri ve saha sorumluluklarını tek panelde izleyerek operasyonel riski azaltır.",
        },
        emergency: {
          label: "03 — ACİL DURUM SERVİSLERİ",
          title: "Şebeke yokken bile çalışır.",
          description:
            "Offline-first iletişim mimarisi ve otomatik olay raporlarıyla kriz anında ekipler herhangi bir ağ altyapısına ihtiyaç duymadan bağlantıda kalır.",
        },
      },
    },
    why: {
      eyebrow: "NEDEN SOLLEN",
      statement:
        "ISGenius, iş güvenliğini bağımsız bir yazılım yerine entegre bir sistem olarak ele alır. Sensör verileri, uyarı mekanizmaları, saha ekipleri ve mevzuat gereksinimleri tek bir merkezde toplanır. Bu yapı sayesinde karmaşık süreçler ölçülebilir, izlenebilir ve yönetilebilir bir formata kavuşur.",
    },
    footer: {
      cta: {
        eyebrow: "BAŞLAYIN",
        headline: "Ekibimizle iletişime geçin.",
        lede: "Saha güvenliği, acil durum yönetimi veya operasyonel risk takibi için Sollen’in kurumunuza nasıl uyarlanabileceğini birlikte değerlendirelim.",
      },
      form: {
        name: "Adınız",
        email: "E-posta",
        company: "Şirketiniz",
        workplace: "Çalıştığınız yer",
        message: "Ne inşa ettiğinizi anlatın…",
        namePlaceholder: "Adınız",
        emailPlaceholder: "E-posta",
        companyPlaceholder: "Şirket adı",
        workplacePlaceholder: "Çalıştığınız yer",
        messagePlaceholder: "Ne inşa ettiğinizi anlatın…",
        submit: "Mesaj gönder →",
        thanks: "Teşekkürler — sizinle iletişime geçeceğiz.",
        thanksLede: "Bir iş günü içinde yanıt bekleyin.",
      },
      rights: "Tüm hakları saklıdır.",
      sections: {
        product: "Ürün",
        solutions: "Çözümler",
        company: "Şirket",
        legal: "Yasal",
      },
      links: {
        platform: "Platform",
        mobile: "Mobil Uygulama",
        sensors: "Sensör Entegrasyonları",
        reporting: "Raporlama",
        construction: "İnşaat Sahaları",
        industrial: "Operasyonel Tesisler",
        emergencyServices: "Acil Durum Servisleri",
        whySollen: "Neden Sollen",
        about: "Hakkımızda",
        contact: "İletişim",
        demo: "Demo al",
        privacy: "Gizlilik Politikası",
        terms: "Kullanım Şartları",
        kvkk: "KVKK Aydınlatma Metni",
      },
    },
    cookie: {
      title: "Çerez Tercihleri",
      subtitle: "Gizliliğinize önem veriyoruz",
      description:
        "Hizmetlerimizi sunmak, tarama deneyiminizi geliştirmek, site trafiğini analiz etmek ve içeriği kişiselleştirmek için çerezler ve benzer teknolojiler kullanıyoruz. Tercihlerinizi aşağıdan yönetebilirsiniz. Daha fazla bilgi için Gizlilik Politikamızı inceleyebilirsiniz.",
      learnMore: "Gizlilik Politikası",
      customize: "Özelleştir",
      rejectAll: "Tümünü Reddet",
      acceptAll: "Tümünü Kabul Et",
      categories: {
        necessary: {
          title: "Zorunlu Çerezler",
          description: "Web sitesinin çalışması için gereklidir. Güvenlik, oturum yönetimi ve erişilebilirlik gibi temel işlevleri sağlar. Bu çerezler devre dışı bırakılamaz.",
        },
        analytics: {
          title: "Analiz ve Performans",
          description: "Ziyaretçilerin web sitemizle nasıl etkileşimde bulunduğunu anonim olarak anlamamıza yardımcı olur. Bu veriler site performansını ve kullanıcı deneyimini iyileştirmemize katkı sağlar.",
        },
        marketing: {
          title: "Pazarlama ve Kişiselleştirme",
          description: "İlgili reklamları sunmak ve kampanya etkinliğini platformlar arasında izlemek için kullanılır. Bu çerezler üçüncü taraf ortaklar tarafından ayarlanabilir.",
        },
      },
      alwaysOn: "Her zaman açık",
      compliance: "Bu site GDPR (AB) ve KVKK (Türkiye) kişisel verilerin korunması mevzuatına uygundur.",
    },
  },
} as const;

export type Dictionary = (typeof TRANSLATIONS)[Locale];

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
}>({
  locale: "en",
  setLocale: () => {},
  t: TRANSLATIONS.en,
});

export function useT() {
  return useContext(LocaleContext);
}
