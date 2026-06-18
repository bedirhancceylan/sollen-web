"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useT } from "@/lib/i18n";

export default function ValuePropositionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const { t, locale } = useT();

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtext = subtextRef.current;
    if (!section || !headline || !subtext) return;

    const words = t.valueProp.headline.split(" ");
    headline.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block word-inner">${word}</span></span>`
      )
      .join(" ");

    const wordInners = headline.querySelectorAll(".word-inner");

    const ctx = gsap.context(() => {
      gsap.set(wordInners, { yPercent: 110, opacity: 0 });
      gsap.set(subtext, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(wordInners, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.05,
      });

      tl.to(subtext, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4");
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [locale, t.valueProp.headline]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 px-6 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-[#0A1128] text-xs tracking-[0.3em] uppercase mb-8">
          {t.valueProp.eyebrow}
        </p>
        <h2
          ref={headlineRef}
          className="text-[#1E3A8A] font-bold tracking-cinematic leading-[1.05]"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
        >
          {t.valueProp.headline}
        </h2>
        <p
          ref={subtextRef}
          className="mt-10 text-[#0A1128] text-base md:text-xl max-w-2xl leading-relaxed"
        >
          {t.valueProp.subtext}
        </p>
      </div>
    </section>
  );
}
