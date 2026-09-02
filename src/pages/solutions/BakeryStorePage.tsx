import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Cake, Clock, Calendar,
  Bell, Star, BarChart3, Heart, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, Lead } from "@/components/ui/typography";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import bakeryMockup from "@/assets/solution-bakery-mockup.png";

const features = [
  { icon: Cake, title: "Product Showcase", description: "Beautiful displays for cakes, pastries & breads" },
  { icon: Calendar, title: "Pre-Orders", description: "Accept custom cake orders with dates" },
  { icon: Clock, title: "Fresh Batch Alerts", description: "Notify customers when fresh items arrive" },
  { icon: Star, title: "Customer Favorites", description: "Track and promote bestselling items" },
  { icon: MessageSquare, title: "Custom Requests", description: "Receive special orders via WhatsApp" },
  { icon: Bell, title: "Daily Specials", description: "Promote today's special bakes" },
];

const benefits = [
  "Showcase cakes with multiple photo angles",
  "Accept pre-orders for birthdays & events",
  "Set different prices for sizes and flavors",
  "Track daily production and sales",
  "Send new batch notifications to customers",
  "Manage peak hour rush with order queue"
];

const BakeryStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-ledger-ink" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <EyebrowTag icon={Cake} className="mb-4 sm:mb-6 border-ledger-paper/25 text-ledger-paper/85">
                Bakeries & Confectioneries
              </EyebrowTag>
              <H1 className="text-ledger-paper mb-4 sm:mb-6">
                Your Bakery,{" "}
                <span className="ledger-highlight">Online & Fresh</span>
              </H1>
              <Lead className="text-ledger-paper/70 mb-6 sm:mb-8 max-w-xl">
                Showcase your delicious creations, accept pre-orders, and delight
                customers with fresh batch notifications.
              </Lead>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/join" className="w-full sm:w-auto">
                  <Button size="lg" variant="ledger-inverse" className="px-6 sm:px-8 gap-2 h-11 sm:h-12 md:h-14 text-sm sm:text-base w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className="relative mt-6 lg:mt-0"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-ledger border border-ledger-paper/10">
                <img src={bakeryMockup} alt="Bakery Dashboard" className="w-full h-auto" />
              </div>

              <div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-ledger-paper rounded-lg sm:rounded-xl p-2.5 sm:p-4 shadow-ledger hidden sm:block"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-ledger-sage fill-ledger-sage" />
                  <span className="font-grotesk font-semibold text-ledger-ink text-xs sm:text-sm">45 Pre-orders Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <H2 className="mb-3 sm:mb-4">
              Baked for Bakery Success
            </H2>
            <p className="font-grotesk text-ledger-ink/65 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Features that help bakeries serve customers better.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl sm:rounded-2xl border border-ledger-rule shadow-ledger-sm p-4 sm:p-5 md:p-6"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl border border-ledger-rule bg-transparent flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-ledger-ink/70" />
                </div>
                <H3 className="mb-1.5 sm:mb-2">{feature.title}</H3>
                <p className="font-grotesk text-ledger-ink/65 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-ledger-paper">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <H2 className="mb-4 sm:mb-6">
                Why Bakers Love BizGrow 360
              </H2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 sm:gap-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-ledger-sage/30 bg-ledger-sage/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-ledger-sage" />
                    </div>
                    <span className="font-grotesk text-ledger-ink/80 text-sm sm:text-base md:text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8">
                <Link to="/join" className="inline-block w-full sm:w-auto">
                  <Button size="lg" variant="ledger" className="gap-2 w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 lg:mt-0"
            >
              {[
                { icon: Cake, value: "5K+", label: "Bakeries" },
                { icon: Calendar, value: "100K+", label: "Pre-orders" },
                { icon: Star, value: "4.9", label: "Avg Rating" },
                { icon: BarChart3, value: "55%", label: "More Orders" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 sm:p-5 md:p-6 bg-white rounded-lg sm:rounded-xl border border-ledger-rule shadow-ledger-sm">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-ledger-ink/70 mx-auto mb-1.5 sm:mb-2" />
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

export default BakeryStorePage;
