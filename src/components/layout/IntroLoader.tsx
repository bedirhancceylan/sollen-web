"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

/**
 * Intro shown on every page load. The full Sollen logo sits centered, then the
 * screen splits from the center into four triangular petals that slide outward
 * (top / right / bottom / left) — a clover-leaf opening that reveals the page.
 * The parting edges are softened with a light-gray shadow. No center line.
 */
export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prevOverflow = document.body.style.overflow;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = prevOverflow;
      setDone(true);
    };

    // Absolute fail-safe: never leave the off-white overlay covering the page,
    // even if the animation stalls or errors (e.g. on mobile Safari).
    const failSafe = window.setTimeout(finish, 4000);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return () => window.clearTimeout(failSafe);
    }

    document.body.style.overflow = "hidden";

    let tl: gsap.core.Timeline | null = null;
    try {
      gsap.set(logoRef.current, { autoAlpha: 0, scale: 0.9, transformOrigin: "50% 50%" });

      tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: finish });

      tl
        // 1. Full logo settles in.
        .to(logoRef.current, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" })
        // 2. Logo eases out as the petals begin to part.
        .to(logoRef.current, { autoAlpha: 0, scale: 1.08, duration: 0.5, ease: "power2.in" }, "+=0.45")
        // Enable the soft gray edge only as they start to move (keeps the start clean).
        .set([topRef.current, rightRef.current, bottomRef.current, leftRef.current], {
          filter: "drop-shadow(0 0 5px rgba(10,17,40,0.16))",
        }, "-=0.3")
        // 3. Four petals slide outward from the center, revealing the page.
        .to(topRef.current, { yPercent: -120, duration: 1.05, ease: "power4.inOut" }, "-=0.3")
        .to(bottomRef.current, { yPercent: 120, duration: 1.05, ease: "power4.inOut" }, "<")
        .to(leftRef.current, { xPercent: -120, duration: 1.05, ease: "power4.inOut" }, "<")
        .to(rightRef.current, { xPercent: 120, duration: 1.05, ease: "power4.inOut" }, "<");
    } catch {
      finish();
    }

    return () => {
      window.clearTimeout(failSafe);
      document.body.style.overflow = prevOverflow;
      tl?.kill();
    };
  }, []);

  if (done) return null;

  // Four triangles meeting at the center; a soft light-gray shadow thickens the
  // parting edges as they separate.
  const petal = "absolute inset-0 bg-[#FDFBF7] will-change-transform";

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200] overflow-hidden" aria-hidden>
      <div ref={topRef} className={petal} style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)" }} />
      <div ref={rightRef} className={petal} style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }} />
      <div ref={bottomRef} className={petal} style={{ clipPath: "polygon(100% 100%, 0 100%, 50% 50%)" }} />
      <div ref={leftRef} className={petal} style={{ clipPath: "polygon(0 100%, 0 0, 50% 50%)" }} />

      {/* The full, centered Sollen logo (with the SOLLEN wordmark) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div ref={logoRef} style={{ opacity: 0 }}>
          <Image
            src="/logos/beyaz-ustu-logo-1.png"
            alt="Sollen"
            width={220}
            height={68}
            priority
            className="w-[160px] md:w-[200px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
