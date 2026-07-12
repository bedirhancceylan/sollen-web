"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useT } from "@/lib/i18n";

const SECTION_ID = "why";

export default function WhySollenSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const { t, locale } = useT();

  useEffect(() => {
    const section = sectionRef.current;
    const paragraph = paragraphRef.current;
    if (!section || !paragraph) return;

    const words = t.why.statement.split(" ");
    paragraph.innerHTML = words
      .map((word) => `<span class="why-word inline-block">${word}</span>`)
      .join(" ");

    const wordEls = paragraph.querySelectorAll(".why-word");

    const ctx = gsap.context(() => {
      gsap.set(wordEls, { color: "#cbd5e1" });

      gsap.to(wordEls, {
        color: "#1E3A8A",
        duration: 0.5,
        ease: "none",
        stagger: 0.02,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 20%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [locale, t.why.statement]);

  return (
    <section
      id={SECTION_ID}
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 px-6 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading, styled like the ISGenius block heading (font + size) */}
        <h2
          className="text-[#1C2035] font-semibold tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(1.75rem, 3.4vw, 3rem)" }}
        >
          {t.nav.why}
        </h2>
        {/* Explanation reverted to a small, readable paragraph */}
        <p
          ref={paragraphRef}
          className="mt-6 lg:mt-8 font-medium tracking-tight leading-[1.5] max-w-6xl"
          style={{ fontSize: "clamp(1.3rem, 2.3vw, 1.95rem)" }}
        >
          {t.why.statement}
        </p>
      </div>
    </section>
  );
}
