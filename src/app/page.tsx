import HeroSection from "@/components/sections/HeroSection";
import TrustStripSection from "@/components/sections/TrustStripSection";
import ProductFeaturesSection from "@/components/sections/ProductFeaturesSection";
import StatsCardSection from "@/components/sections/StatsCardSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import WhySollenSection from "@/components/sections/WhySollenSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <TrustStripSection />
      <ProductFeaturesSection />
      <StatsCardSection />
      <SolutionsSection />
      <WhySollenSection />
      <FooterSection />
    </main>
  );
}
