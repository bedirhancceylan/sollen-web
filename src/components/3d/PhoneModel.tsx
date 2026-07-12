"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function PhoneModel() {
  const groupRef = useRef<THREE.Group>(null);
  const gl = useThree((s) => s.gl);
  const screenTexture = useTexture("/screens/hero-portrait.png");

  useEffect(() => {
    if (!screenTexture) return;
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    // Max hardware anisotropy + trilinear mipmapping keeps the screen crisp
    // even at the phone's slight tilt, instead of soft/blurry.
    screenTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    screenTexture.magFilter = THREE.LinearFilter;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.generateMipmaps = true;
    screenTexture.needsUpdate = true;
  }, [screenTexture, gl]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;
    groupRef.current.rotation.x = -0.05 + Math.sin(t * 0.3) * 0.025;
    groupRef.current.rotation.y = -0.18 + Math.sin(t * 0.4) * 0.06;
  });

  const PHONE_W = 1.12;
  const PHONE_H = 2.3;
  const PHONE_D = 0.12;
  const SCREEN_INSET = 0.04;
  const SCREEN_W = PHONE_W - SCREEN_INSET * 2;
  const SCREEN_H = PHONE_H - SCREEN_INSET * 2;

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[PHONE_W, PHONE_H]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} transparent={true} />
      </mesh>
    </group>
  );
}
