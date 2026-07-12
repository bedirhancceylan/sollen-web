"use client";

import { useEffect, useState, useRef } from "react";
import { useT } from "@/lib/i18n";
import { gsap } from "@/lib/gsap";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useT();

  useEffect(() => {
    setMounted(true);
    let consent: string | null = null;
    try {
      consent = localStorage.getItem("sollen_cookie_consent");
    } catch {}
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (show && bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { y: "100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [show]);

  const dismiss = (action: "accept" | "reject" | "custom" | "close") => {
    const preferences = {
      necessary: true,
      analytics: action === "accept" ? true : action === "custom" ? analytics : false,
      marketing: action === "accept" ? true : action === "custom" ? marketing : false,
      timestamp: new Date().toISOString(),
    };

    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          try {
            localStorage.setItem("sollen_cookie_consent", action);
            localStorage.setItem("sollen_cookie_preferences", JSON.stringify(preferences));
          } catch {}
          setShow(false);
        },
      });
    }
  };

  if (!mounted || !show) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-[90] opacity-0"
      style={{ transform: "translateY(100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 pb-4 md:px-6 md:pb-6">
        <div className="bg-white rounded-2xl shadow-[0_-4px_40px_rgba(10,17,40,0.12)] border border-[#0A1128]/8 p-5 md:p-6">

          {/* Main row */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">

            {/* Cookie icon + text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="shrink-0 w-9 h-9 bg-[#F97316] rounded-lg flex items-center justify-center mt-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 12.5v.01" />
                  <path d="M12 16v.01" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[#1C2035] text-sm font-semibold">{t.cookie.title}</p>
                <p className="text-[#333B4D] text-xs leading-relaxed mt-1">
                  {t.cookie.description}{" "}
                  <a href="#" className="text-[#1E3A8A] font-medium hover:underline">
                    {t.cookie.learnMore}
                  </a>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 text-xs font-medium text-[#333B4D] hover:text-[#1C2035] transition-colors"
              >
                {t.cookie.customize}
              </button>
              <button
                onClick={() => dismiss("reject")}
                className="px-4 py-2 text-xs font-medium text-[#1C2035] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                {t.cookie.rejectAll}
              </button>
              <button
                onClick={() => dismiss(showDetails ? "custom" : "accept")}
                className="px-5 py-2 text-xs font-medium text-white bg-[#1E3A8A] rounded-lg hover:bg-[#0A1128] transition-colors shadow-sm"
              >
                {t.cookie.acceptAll}
              </button>
            </div>
          </div>

          {/* Expandable detail categories */}
          {showDetails && (
            <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                {/* Necessary */}
                <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#1C2035] text-xs font-semibold">{t.cookie.categories.necessary.title}</p>
                    <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-[#1E3A8A] bg-[#1E3A8A]/10 rounded-full">
                      {t.cookie.alwaysOn}
                    </span>
                  </div>
                  <p className="text-[#333B4D] text-[11px] leading-relaxed">{t.cookie.categories.necessary.description}</p>
                </div>

                {/* Analytics */}
                <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#1C2035] text-xs font-semibold">{t.cookie.categories.analytics.title}</p>
                    <button
                      onClick={() => setAnalytics(!analytics)}
                      className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${
                        analytics ? "bg-[#1E3A8A]" : "bg-[#D1D5DB]"
                      }`}
                      aria-label="Toggle analytics"
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                          analytics ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[#333B4D] text-[11px] leading-relaxed">{t.cookie.categories.analytics.description}</p>
                </div>

                {/* Marketing */}
                <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#1C2035] text-xs font-semibold">{t.cookie.categories.marketing.title}</p>
                    <button
                      onClick={() => setMarketing(!marketing)}
                      className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${
                        marketing ? "bg-[#1E3A8A]" : "bg-[#D1D5DB]"
                      }`}
                      aria-label="Toggle marketing"
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                          marketing ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[#333B4D] text-[11px] leading-relaxed">{t.cookie.categories.marketing.description}</p>
                </div>
              </div>

              <p className="text-[#0A1128]/35 text-[10px] mt-3">
                {t.cookie.compliance}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
