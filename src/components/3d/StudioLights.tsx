"use client";

export default function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1E3A8A" />
      <directionalLight position={[4, 5, 4]} intensity={1.2} color="#1E3A8A" />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#0A1128" />
      <directionalLight position={[0, 2, -5]} intensity={0.8} color="#1E3A8A" />
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#1E3A8A" />
    </>
  );
}
