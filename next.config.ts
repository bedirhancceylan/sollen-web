import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Vercel'da (özellikle sınırlı CPU/RAM kaynaklarında) static generation
    // aşamasında takılmaları (hang) önlemek için worker kullanımını kapatıyoruz.
    workerThreads: false,
    cpus: 1,
  },
  images: {
    // Uygulama ekranlarını mümkün olan en yüksek kalitede sunmak için.
    qualities: [75, 90, 100],
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 768],
  },
};

export default nextConfig;
