"use client";

import { useRef } from "react";
import { NAV_ITEMS } from "@/lib/constants";
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
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-6rem)] max-w-7xl border border-white/50 rounded-2xl md:rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          // Apple-style "liquid glass": translucent gradient + strong blur/saturation,
          // a bright specular top edge and layered depth shadows.
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.36) 100%)",
          backdropFilter: "blur(22px) saturate(185%)",
          WebkitBackdropFilter: "blur(22px) saturate(185%)",
          boxShadow:
            "0 14px 44px rgba(10,17,40,0.18), 0 3px 10px rgba(10,17,40,0.08), inset 0 1px 1px rgba(255,255,255,0.95), inset 0 -10px 24px rgba(255,255,255,0.28)",
        }}
      >
        {/* Mobile layout: vertical stack */}
        <div className="flex flex-col items-center px-4 py-4 gap-3 md:hidden">
          <a href="#" onClick={(e) => handleScroll(e, "#")} className="relative z-10 flex items-center gap-2">
            <Image src="/logos/beyaz-ustu-logo-1.png" alt="Sollen" width={140} height={44} className="h-9 w-auto object-contain" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-[11px] font-medium text-[#0A1128]/70 hover:text-[#1E3A8A] transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <LocaleToggle locale={locale} setLocale={setLocale} />
          </div>
        </div>

        {/* Desktop layout: horizontal */}
        <div className="hidden md:flex items-center justify-between px-8 py-4">
          <a href="#" onClick={(e) => handleScroll(e, "#")} className="relative z-10 flex items-center gap-2 shrink-0">
            <Image src="/logos/beyaz-ustu-logo-1.png" alt="Sollen" width={160} height={48} className="h-11 w-auto object-contain" />
          </a>

          <nav className="flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-sm font-medium text-[#0A1128]/70 hover:text-[#1E3A8A] transition-colors whitespace-nowrap"
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
