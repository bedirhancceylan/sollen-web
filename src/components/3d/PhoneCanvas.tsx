"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import PhoneModel from "./PhoneModel";
import StudioLights from "./StudioLights";
import CameraRig from "./CameraRig";

export default function PhoneCanvas() {
  // Force R3F to re-measure its container once layout has settled after mount,
  // so the canvas never gets stuck at an initial (too-small) size.
  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event("resize"));
    const raf = requestAnimationFrame(fire);
    const t = setTimeout(fire, 250);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  // Maximum resolution on desktop; a safe cap on phones (memory-constrained
  // mobile Safari). A WebGL failure is contained by CanvasErrorBoundary.
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const maxDpr = isMobile ? 2 : 3;

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 35 }}
      dpr={[1.5, maxDpr]}
      resize={{ scroll: false }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <StudioLights />
        <PhoneModel />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
