import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Vercel'da (özellikle sınırlı CPU/RAM kaynaklarında) static generation
    // aşamasında takılmaları (hang) önlemek için worker kullanımını kapatıyoruz.
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
