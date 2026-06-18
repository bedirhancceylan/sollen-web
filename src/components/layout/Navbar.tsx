"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import Image from "next/image";
import { useLenis } from "lenis/react";

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const { locale, setLocale, t } = useT();
  const lenis = useLenis();

  const navLinks = NAV_ITEMS.map((item) => ({
    href: item.href,
    label: t.nav[item.key as keyof typeof t.nav],
  }));

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    if (lenis) {
      // 1.5s duration with a very smooth cubic bezier equivalent
      lenis.scrollTo(targetId === "#" ? 0 : targetId, {
        duration: 1.5,
        easing: (t: number) => {
          // This matches a very slow ease-in-out curve
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
      });
      return;
    }

    if (targetId === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
        ref={navRef}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-5xl bg-[#FDFBF7]/95 backdrop-blur-md shadow-[0_8px_30px_rgb(10,17,40,0.06)] border border-[#0A1128]/10 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="flex items-center justify-between px-3 py-3 md:px-6 md:py-4">
          <a href="#" onClick={(e) => handleScroll(e, "#")} className="relative z-10 flex items-center gap-2 shrink-0">
            <Image src="/logos/beyaz-ustu-logo-1.png" alt="Sollen" width={100} height={32} className="h-6 md:h-8 w-auto object-contain" />
          </a>

          {/* Nav Links – always visible */}
          <nav className="flex items-center gap-3 md:gap-8">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-[11px] md:text-sm font-medium text-[#0A1128]/70 hover:text-[#1E3A8A] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center shrink-0">
            <LocaleToggle locale={locale} setLocale={setLocale} />
          </div>
        </div>
      </header>
  );
}

function LocaleToggle({
  locale,
  setLocale,
}: {
  locale: "en" | "tr";
  setLocale: (l: "en" | "tr") => void;
}) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 transition-colors duration-300 ${
          locale === "en" ? "text-[#1E3A8A]" : "text-[#0A1128]/60 hover:text-[#1E3A8A]"
        }`}
      >
        EN
      </button>
      <span className="text-[#0A1128]/40">/</span>
      <button
        onClick={() => setLocale("tr")}
        className={`px-2 py-1 transition-colors duration-300 ${
          locale === "tr" ? "text-[#1E3A8A]" : "text-[#0A1128]/60 hover:text-[#1E3A8A]"
        }`}
      >
        TR
      </button>
    </div>
  );
}
