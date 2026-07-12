export const SITE_CONFIG = {
  name: "Sollen",
  shortName: "Sollen",
  description: "Premium occupational safety technology",
  url: "https://sollen.tech",
  phone: "+90 (212) 000 00 00",
} as const;

export const NAV_ITEMS = [
  { key: "why", href: "#why" },
  { key: "product", href: "#product" },
  { key: "solutions", href: "#solutions" },
  { key: "contact", href: "#contact" },
] as const;

export const FEATURES = [
  { id: "emergency", texture: "/screens/feature-1-portrait.png" },
  { id: "monitoring", texture: "/screens/hero-portrait.png" },
  { id: "compliance", texture: "/screens/feature-2-portrait.png" },
  { id: "howItWorks", texture: "/screens/hero-portrait.png" },
] as const;

export const STATS_VALUES = [95, 100] as const;

export const TRUST_BADGES = [
  { id: "tubitak", labelKey: "tubitak" as const, logo: "/logos/tubitak.png" },
  { id: "kosgeb", labelKey: "kosgeb" as const, logo: "/logos/kosgeb.jpeg" },
];

export type Feature = (typeof FEATURES)[number];
