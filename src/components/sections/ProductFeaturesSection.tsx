"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FEATURES } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import PhoneFrame from "@/components/ui/PhoneFrame";
import IsGeniusBadge from "@/components/ui/IsGeniusBadge";

const SECTION_ID = "product";

// Category labels are stored uppercase; render them title-cased as real headings.
// Locale-aware so Turkish I/İ (e.g. "NASIL" → "Nasıl", not "Nasil") is correct.
const toTitleCase = (text: string, locale: string) =>
  text
    .toLocaleLowerCase(locale)
    .split(" ")
    .map((w) => (w ? w[0].toLocaleUpperCase(locale) + w.slice(1) : w))
    .join(" ");

const highlightSecondHalf = (text: string) => {
  const words = text.split(" ");
  const mid = Math.ceil(words.length / 2);
  const normal = words.slice(0, mid).join(" ");
  const highlight = words.slice(mid).join(" ");
  return (
    <>
      {normal} <span className="text-[#0036A3]">{highlight}</span>
    </>
  );
};

export default function ProductFeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t, locale } = useT();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".feature-row");
      rows.forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll(".feature-anim"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
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
      className="relative w-full py-32 lg:py-48 px-6 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-24 lg:mb-32">
          {/* Co-brand lockup: ISGenius logo and Sollen logo side by side. */}
          <IsGeniusBadge size="lg" withSollen className="mb-7" />
          <p
            className="text-[#1C2035] font-semibold tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 3rem)" }}
          >
            {t.product.headline}
          </p>
          <p className="mt-6 text-[#333B4D] text-base md:text-lg leading-relaxed max-w-2xl">
            {t.product.subtext}
          </p>
        </div>

        <div className="flex flex-col gap-32 lg:gap-44">
          {FEATURES.map((feature, idx) => {
            const tr = t.product.features[feature.id as keyof typeof t.product.features];
            const reversed = idx % 2 === 1;
            return (
              <div
                key={feature.id}
                className={`feature-row grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="feature-anim opacity-0 flex flex-col items-center">
                  <PhoneFrame src={feature.texture} alt={tr.title} priority={idx === 0} width={250} />
                  <IsGeniusBadge className="mt-6" />
                </div>

                <div className="feature-anim opacity-0 flex flex-col justify-center">
                  {/* Category label promoted to the section heading (§1.5 / §5.1) */}
                  <h3
                    className="text-[#1C2035] font-bold tracking-tight leading-[1.1] mb-3"
                    style={{ fontSize: "clamp(1.6rem, 3.1vw, 3.1rem)" }}
                  >
                    {toTitleCase(tr.eyebrow, locale)}
                  </h3>
                  {/* Tagline demoted: subordinate, dark, brand-blue accent (§5.1) */}
                  <p
                    className="text-[#1C2035] font-semibold tracking-tight leading-[1.25] mb-6"
                    style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)" }}
                  >
                    {highlightSecondHalf(tr.title)}
                  </p>
                  <p className="text-[#333B4D] text-[17px] md:text-lg leading-[1.7] max-w-[90%] mb-10">
                    {tr.description}
                  </p>

                  <div className="flex flex-col gap-5">
                    {tr.bullets && tr.bullets.map((bullet, i) => (
                      <div key={i} className="flex flex-row items-start gap-4">
                        <svg className="w-[22px] h-[22px] text-[#0036A3] flex-shrink-0 mt-[2px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9 12l2 2 4-4"></path>
                        </svg>
                        <p suppressHydrationWarning className="text-[#333B4D] text-[17px] md:text-lg leading-[1.7] m-0">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
