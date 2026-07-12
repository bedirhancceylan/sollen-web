"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useT } from "@/lib/i18n";
import PhoneCanvasClient from "@/components/3d/PhoneCanvasClient";
import CanvasErrorBoundary from "@/components/3d/CanvasErrorBoundary";
import IsGeniusBadge from "@/components/ui/IsGeniusBadge";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const { t } = useT();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      tl.fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.5");
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.7");
      tl.fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
      // NOTE: animate opacity + y only (never `scale`). A CSS scale transform on the
      // canvas wrapper skews R3F's getBoundingClientRect measurement, making the phone
      // render small until the next resize/scroll re-measure — the "jump on scroll" bug.
      tl.fromTo(canvasWrapperRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, "-=1.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = useSmoothScroll();

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-36 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-16 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
        <div className="flex flex-col">
          <p
            ref={eyebrowRef}
            className="text-[#0A1128] text-xs tracking-[0.3em] uppercase opacity-0"
          >
            {t.hero.eyebrow}
          </p>
          {/* Clarifies Sollen (company) vs ISGenius (product) on first load (§2.1) */}
          <div className="mt-5">
            <IsGeniusBadge size="md" />
          </div>
          {/*
            Hero headline size ≈ H_BUILT and is intentionally used ONLY here (§2.4).
            Conditional rule (§2.5): if a background image is ever placed behind this
            text, reduce this clamp (e.g. max ~3rem) so the image commands attention
            and the type does not scatter focus. With no background image, this
            attention-grabbing size is correct.
          */}
          <h1
            ref={headlineRef}
            className="mt-6 text-[#1E3A8A] font-bold tracking-cinematic leading-[1.02] opacity-0"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {t.hero.headline}
          </h1>
          <p
            ref={subtitleRef}
            className="mt-8 text-[#0A1128] text-base md:text-lg max-w-xl leading-relaxed opacity-0"
          >
            {t.hero.subtitle}
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4 opacity-0">
            <a
              href="#product"
              onClick={(e) => handleScroll(e, "#product")}
              className="inline-flex items-center px-6 py-3.5 text-sm font-medium text-white bg-[#1E3A8A] rounded-full hover:bg-[#0A1128] transition-colors duration-300"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div
          ref={canvasWrapperRef}
          className="relative w-full h-[55vh] lg:h-[70vh] opacity-0"
        >
          <CanvasErrorBoundary
            fallback={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/screens/hero-portrait.png"
                alt="ISGenius"
                className="mx-auto h-full w-auto object-contain"
              />
            }
          >
            <PhoneCanvasClient />
          </CanvasErrorBoundary>
        </div>
      </div>
    </section>
  );
}
