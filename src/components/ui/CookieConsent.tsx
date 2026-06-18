"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import { gsap } from "@/lib/gsap";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useT();

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("sollen_cookie_consent");
    if (!consent) {
      // Small delay so it animates in nicely after page load
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".cookie-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        ".cookie-modal",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  const handleAction = (action: "accept" | "reject" | "close") => {
    gsap.to(".cookie-modal", {
      opacity: 0,
      y: 10,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(".cookie-overlay", {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.in",
      onComplete: () => {
        localStorage.setItem("sollen_cookie_consent", action);
        setShow(false);
      },
    });
  };

  if (!mounted || !show) return null;

  return (
    <div className="cookie-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#0A1128]/30 backdrop-blur-md opacity-0">
      <div className="cookie-modal relative w-full max-w-[640px] bg-white rounded-[24px] shadow-2xl p-6 md:p-8 flex flex-col gap-6 opacity-0">
        <button
          onClick={() => handleAction("close")}
          className="absolute top-6 right-6 p-2 text-[#0A1128]/40 hover:text-[#0A1128] transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 12.5v.01" />
              <path d="M12 16v.01" />
              <path d="M11 12.5v.01" />
              <path d="M14.5 15.5v.01" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#1E3A8A] text-lg font-bold tracking-tight">
              {t.cookie.title}
            </h3>
            <p className="text-[#0A1128]/60 text-sm">{t.cookie.subtitle}</p>
          </div>
        </div>

        <p className="text-[#0A1128]/80 text-sm leading-relaxed">
          {t.cookie.description}{" "}
          <a href="#" className="text-[#1E3A8A] font-medium hover:underline">
            {t.cookie.learnMore}
          </a>
        </p>

        <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#0A1128]/10">
          <button className="flex items-center gap-2 text-[#0A1128]/60 hover:text-[#0A1128] text-sm font-medium transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            {t.cookie.customize}
          </button>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => handleAction("reject")}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-[#0A1128] hover:bg-[#0A1128]/5 rounded-xl transition-colors"
            >
              {t.cookie.rejectAll}
            </button>
            <button
              onClick={() => handleAction("accept")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#0A1128] hover:bg-black rounded-xl transition-colors shadow-lg shadow-[#0A1128]/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t.cookie.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
