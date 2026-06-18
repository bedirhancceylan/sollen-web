"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TRUST_BADGES } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import TrustBadge from "@/components/ui/TrustBadge";

export default function TrustStripSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useT();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
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
      ref={sectionRef}
      className="relative w-full py-20 lg:py-24 px-6 lg:px-16 opacity-0"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col items-center gap-10 text-center">
          <p className="text-[#0A1128] text-xs tracking-[0.3em] uppercase">
            {t.customers.heading}
          </p>
          <h2
            className="text-[#1E3A8A] font-bold tracking-cinematic leading-[1.05] max-w-4xl"
            style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
          >
            {t.trust.headline}
          </h2>
          <p className="text-[#0A1128]/70 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.trust.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {TRUST_BADGES.map((badge) => (
              <TrustBadge key={badge.id} label={t.trust[badge.labelKey]} logo={badge.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
