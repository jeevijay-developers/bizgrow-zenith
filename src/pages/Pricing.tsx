import Navbar from "@/components/landing/Navbar";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-18">
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
