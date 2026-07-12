"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

export default function Counter({ to, suffix = "", duration = 2.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };
    const decimals = String(to).includes(".") ? 1 : 0;

    const tween = gsap.to(obj, {
      value: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = obj.value.toFixed(decimals);
      },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, duration]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
