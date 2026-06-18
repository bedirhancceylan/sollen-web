"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import PhoneModel from "./PhoneModel";
import StudioLights from "./StudioLights";
import CameraRig from "./CameraRig";

export default function PhoneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 35 }}
      dpr={[1, 1.5]}
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
