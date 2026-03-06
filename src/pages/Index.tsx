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
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      // Small delay to ensure rendering is complete
      const timer = setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

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
