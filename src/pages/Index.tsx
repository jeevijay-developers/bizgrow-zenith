import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import USPSection from "@/components/landing/USPSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StoreTypesSection from "@/components/landing/StoreTypesSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <USPSection />
      <FeaturesSection />
      <StoreTypesSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
