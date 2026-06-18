"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { STATS_VALUES } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import Counter from "@/components/ui/Counter";

export default function StatsCardSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useT();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelector(".stats-card") || null,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      className="relative w-full py-24 lg:py-32 px-6 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="stats-card relative rounded-3xl p-10 lg:p-16 bg-[#0A1128]/[0.03] backdrop-blur-xl border border-[#0A1128]/10 opacity-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(30, 58, 138, 0.05) 0%, rgba(10, 17, 40, 0.01) 60%)",
          }}
        >
          <p className="text-[#0A1128] text-xs tracking-[0.3em] uppercase">
            {t.stats.eyebrow}
          </p>
          <h2
            className="mt-6 text-[#1E3A8A] font-bold tracking-cinematic leading-[1.05] max-w-3xl"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
          >
            {t.stats.headline}
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {t.stats.items.map((item, idx) => (
              <div key={item.label} className="flex flex-col">
                <div
                  className="text-[#1E3A8A] font-bold tracking-cinematic leading-none"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
                >
                  <Counter to={STATS_VALUES[idx]} suffix={item.suffix} />
                </div>
                <p className="mt-4 text-[#0A1128] text-sm tracking-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[#0A1128]/40 text-xs tracking-tight italic">
            * {t.stats.note}
          </p>
        </div>
      </div>
    </section>
  );
}
