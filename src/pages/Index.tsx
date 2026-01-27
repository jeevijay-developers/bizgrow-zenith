import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TransformationSection from "@/components/landing/TransformationSection";
import AIScanningSection from "@/components/landing/AIScanningSection";
import WhatsAppSection from "@/components/landing/WhatsAppSection";
import FlyerSection from "@/components/landing/FlyerSection";
import RegionalLanguageSection from "@/components/landing/RegionalLanguageSection";
import RevenueGrowthSection from "@/components/landing/RevenueGrowthSection";
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
      <TransformationSection />
      <AIScanningSection />
      <WhatsAppSection />
      <FlyerSection />
      <RegionalLanguageSection />
      <RevenueGrowthSection />
      <StoreTypesSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
