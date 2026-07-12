"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE_CONFIG } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import Image from "next/image";

const SECTION_ID = "contact";

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const { t } = useT();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);



  return (
    <section
      id={SECTION_ID}
      ref={sectionRef}
      className="relative w-full pt-32 pb-16 px-6 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="pb-24 lg:pb-32">
          <div ref={ctaRef} className="opacity-0">
            <p className="text-[#0A1128] text-xs tracking-[0.3em] uppercase">
              {t.footer.cta.eyebrow}
            </p>
            {/* Heading left, button right on the same line (§9 option b) */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
              <h2
                className="text-[#1E3A8A] font-bold tracking-cinematic leading-[1.05] lg:whitespace-nowrap"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {t.footer.cta.headline}
              </h2>
              <div ref={formRef} className="opacity-0 shrink-0">
                <a
                  href="mailto:info@sollen.com.tr"
                  className="inline-flex items-center px-8 py-4 text-sm font-medium text-[#1E3A8A] border border-[#0A1128]/20 rounded-full hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-all duration-300"
                >
                  {t.footer.form.submit}
                </a>
              </div>
            </div>
            <p className="mt-8 text-base md:text-lg max-w-md leading-relaxed" style={{ color: "#333B4D" }}>
              {t.footer.cta.lede}
            </p>
          </div>
        </div>


        <div className="pt-6 pb-4 flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A1128]/40 shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <p className="text-[#0A1128]/45 text-xs">
            Şehit Muhtar Mahallesi, Mis Sokak, No: 24, İç Kapı No: 28, Beyoğlu / İstanbul
          </p>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logos/sollen-logo.png"
              alt={SITE_CONFIG.name}
              width={120}
              height={36}
              className="object-contain w-auto h-6"
            />
            <p className="text-[#0A1128]/50 text-xs">
              © {new Date().getFullYear()} Sollen Akıllı Sistemler ve Bilişim Teknolojileri. {t.footer.rights}
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/sollentech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A1128] hover:text-[#1E3A8A] text-sm transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/sollen-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A1128] hover:text-[#1E3A8A] text-sm transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


