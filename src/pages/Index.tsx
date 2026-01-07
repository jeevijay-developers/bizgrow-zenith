import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import DigitaliseSection from "@/components/landing/DigitaliseSection";
import AIUploadSection from "@/components/landing/AIUploadSection";
import CatalogueSection from "@/components/landing/CatalogueSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import StoreTypesSection from "@/components/landing/StoreTypesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DigitaliseSection />
      <AIUploadSection />
      <CatalogueSection />
      <DashboardPreview />
      <StoreTypesSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
