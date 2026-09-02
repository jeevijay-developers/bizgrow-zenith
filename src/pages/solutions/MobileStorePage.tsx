import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Smartphone, Shield, CreditCard,
  Package, BarChart3, Zap, Users, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, Lead } from "@/components/ui/typography";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import mobileMockup from "@/assets/solution-mobile-mockup.png";

const features = [
  { icon: Smartphone, title: "Device Catalog", description: "Showcase phones with all specs and colors" },
  { icon: FileText, title: "IMEI Tracking", description: "Track every device by unique IMEI" },
  { icon: Shield, title: "Warranty Management", description: "Manage device warranties efficiently" },
  { icon: CreditCard, title: "EMI Calculator", description: "Show financing options to customers" },
  { icon: Package, title: "Accessories Bundling", description: "Create phone + accessories combos" },
  { icon: BarChart3, title: "Brand Analytics", description: "Track sales by brand and model" },
];

const benefits = [
  "Complete smartphone inventory management",
  "IMEI/serial number tracking for each unit",
  "Accessories inventory - cases, chargers, earphones",
  "EMI options display with calculator",
  "Exchange and buyback program support",
  "Warranty tracking with expiry reminders"
];

const MobileStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden bg-ledger-ink">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <EyebrowTag icon={Smartphone} className="mb-4 sm:mb-6 border-ledger-paper/25 text-ledger-paper/85">
                Mobile Phone Shops
              </EyebrowTag>
              <H1 className="text-ledger-paper mb-4 sm:mb-6">
                Mobile Store,{" "}
                <span className="ledger-highlight">Smart Management</span>
              </H1>
              <Lead className="text-ledger-paper/70 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Track every phone by IMEI, manage warranties, show EMI options,
                and run your mobile shop like a pro.
              </Lead>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/join" className="w-full sm:w-auto">
                  <Button size="lg" variant="ledger-inverse" className="px-6 sm:px-8 gap-2 h-12 sm:h-14 text-sm sm:text-base w-full">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-ledger border border-ledger-paper/10">
                <img src={mobileMockup} alt="Mobile Store Dashboard" className="w-full h-auto" />
              </div>

              <div className="absolute -top-4 -right-4 bg-ledger-paper rounded-xl p-4 shadow-ledger">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-ledger-sage" />
                  <span className="font-grotesk font-semibold text-ledger-ink text-sm">25 Phones Sold Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <H2 className="mb-4">Built for Mobile Retail</H2>
            <p className="font-grotesk text-ledger-ink/65 text-lg max-w-2xl mx-auto">
              Features designed specifically for phone and accessory shops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl sm:rounded-2xl border border-ledger-rule shadow-ledger-sm p-4 sm:p-6"
              >
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl border border-ledger-rule bg-transparent flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-ledger-ink/70" />
                </div>
                <H3 className="mb-1.5 sm:mb-2">{feature.title}</H3>
                <p className="font-grotesk text-ledger-ink/65 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-ledger-paper">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <H2 className="mb-4 sm:mb-6 text-center lg:text-left">
                Why Mobile Retailers Love BizGrow 360
              </H2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start sm:items-center gap-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-ledger-sage/30 bg-ledger-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-ledger-sage" />
                    </div>
                    <span className="font-grotesk text-ledger-ink/80 text-sm sm:text-base lg:text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 text-center lg:text-left">
                <Link to="/join">
                  <Button size="lg" variant="ledger" className="gap-2 w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {[
                { icon: Smartphone, value: "7K+", label: "Mobile Shops" },
                { icon: Shield, value: "500K+", label: "Devices Tracked" },
                { icon: Users, value: "400K+", label: "Customers" },
                { icon: BarChart3, value: "50%", label: "Faster Sales" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-ledger-rule shadow-ledger-sm">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-ledger-ink/70 mx-auto mb-1.5 sm:mb-2" />
                  <p className="font-ledger text-xl sm:text-2xl font-semibold text-ledger-ink">{stat.value}</p>
                  <p className="text-xs sm:text-sm font-grotesk text-ledger-ink/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MobileStorePage;
