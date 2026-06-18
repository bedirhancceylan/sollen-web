export const SITE_CONFIG = {
  name: "Sollen",
  shortName: "Sollen",
  description: "Premium occupational safety technology",
  url: "https://sollen.tech",
  phone: "+90 (212) 000 00 00",
} as const;

export const NAV_ITEMS = [
  { key: "product", href: "#product" },
  { key: "solutions", href: "#solutions" },
  { key: "why", href: "#why" },
  { key: "contact", href: "#contact" },
] as const;

export const FEATURES = [
  { id: "emergency", texture: "/screens/feature-1-portrait.png" },
  { id: "monitoring", texture: "/screens/hero-portrait.png" },
  { id: "compliance", texture: "/screens/feature-2-portrait.png" },
  { id: "howItWorks", texture: "/screens/hero-portrait.png" },
] as const;

export const SOLUTIONS = [
  { id: "construction" },
  { id: "industrial" },
  { id: "emergency" },
] as const;

export const STATS_VALUES = [95, 100] as const;

export const TRUST_BADGES = [
  { id: "tubitak", labelKey: "tubitak" as const, logo: "/logos/tubitak.png" },
  { id: "kosgeb", labelKey: "kosgeb" as const, logo: "/logos/kosgeb.jpeg" },
];

export const CUSTOMER_LOGOS = [
  { src: "/logos/akut.png", alt: "AKUT" },
  { src: "/logos/sabanci.jpeg", alt: "Sabancı" },
  { src: "/logos/ido.png", alt: "İDO" },
  { src: "/logos/tubitak.png", alt: "TÜBİTAK" },
  { src: "/logos/ibb.png", alt: "İBB" },
];

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/sollen" },
  { label: "X", href: "https://x.com/sollen_tech" },
  { label: "GitHub", href: "https://github.com/sollen-tech" },
] as const;

export const FOOTER_NAV = {
  product: [
    { key: "platform", href: "#product" },
    { key: "mobile", href: "#product" },
    { key: "sensors", href: "#product" },
    { key: "reporting", href: "#product" },
  ],
  solutions: [
    { key: "construction", href: "#solutions" },
    { key: "industrial", href: "#solutions" },
    { key: "emergencyServices", href: "#solutions" },
  ],
  company: [
    { key: "whySollen", href: "#why" },
    { key: "about", href: "#why" },
    { key: "contact", href: "#contact" },
    { key: "demo", href: "#contact" },
  ],
  legal: [
    { key: "privacy", href: "#" },
    { key: "terms", href: "#" },
    { key: "kvkk", href: "#" },
  ],
} as const;

export type Feature = (typeof FEATURES)[number];
