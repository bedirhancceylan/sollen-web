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
      className="relative w-full py-40 lg:py-56 px-6 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-[#0A1128] text-xs tracking-[0.3em] uppercase">
          {t.why.eyebrow}
        </p>
        <p
          ref={paragraphRef}
          className="mt-10 lg:mt-14 font-bold tracking-tight leading-[1.2]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)" }}
        >
          {t.why.statement}
        </p>
      </div>
    </section>
  );
}
