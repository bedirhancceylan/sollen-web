"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function PhoneModel() {
  const groupRef = useRef<THREE.Group>(null);
  const gl = useThree((s) => s.gl);
  const sourceTexture = useTexture("/screens/hero-portrait.png");

  const screenTexture = useMemo(() => {
    const texture = sourceTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  }, [sourceTexture, gl]);

  useEffect(() => () => screenTexture.dispose(), [screenTexture]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;
    groupRef.current.rotation.x = -0.05 + Math.sin(t * 0.3) * 0.025;
    groupRef.current.rotation.y = -0.18 + Math.sin(t * 0.4) * 0.06;
  });

  const PHONE_W = 1.12;
  const PHONE_H = 2.3;

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[PHONE_W, PHONE_H]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} transparent={true} />
      </mesh>
    </group>
  );
}
