import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Store, Package, TrendingUp,
  Bell, Clock, BarChart3, Truck, MessageSquare, Tag, Users, ShoppingBag, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, Lead } from "@/components/ui/typography";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const features = [
  { icon: ShoppingBag, title: "Flexible Inventory", description: "Manage any type of product with custom categories" },
  { icon: Tag, title: "Smart Pricing", description: "Set MRP, selling price, and offer prices easily" },
  { icon: MessageSquare, title: "WhatsApp Orders", description: "Receive orders from customers via WhatsApp" },
  { icon: Truck, title: "Delivery Tracking", description: "Manage local deliveries and pickups" },
  { icon: BarChart3, title: "Sales Analytics", description: "Understand your business with detailed reports" },
  { icon: Sparkles, title: "AI Product Upload", description: "Add products instantly with AI photo recognition" },
];

const benefits = [
  "Works for any retail category — gifts, toys, pet supplies & more",
  "Fully customizable product categories and attributes",
  "Quick billing with barcode and product search",
  "Digital catalogue to share with customers",
  "Track customer purchase history and preferences",
  "Bulk upload products with Excel import"
];

const OtherRetailStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 relative overflow-hidden bg-ledger-ink">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <EyebrowTag icon={Store} className="mb-4 sm:mb-6 border-ledger-paper/25 text-ledger-paper/85">
                All Retail Stores
              </EyebrowTag>
              <H1 className="text-ledger-paper mb-4 sm:mb-6">
                Digitize{" "}
                <span className="ledger-highlight">Any Retail Store</span>
              </H1>
              <Lead className="text-ledger-paper/70 mb-6 sm:mb-8 max-w-xl">
                Whether you sell gifts, toys, pet supplies, or anything else —
                BizGrow 360 adapts to your unique retail needs.
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

            <div className="relative mt-6 lg:mt-0">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-ledger border border-ledger-paper/15 bg-ledger-paper/5 p-8 sm:p-12 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                <div className="text-center">
                  <Store className="w-16 h-16 sm:w-24 sm:h-24 text-ledger-paper/40 mx-auto mb-4" />
                  <p className="font-grotesk text-ledger-paper/80 text-lg sm:text-xl font-semibold">Your Store Dashboard</p>
                  <p className="font-grotesk text-ledger-paper/50 text-sm mt-2">Manage products, orders & customers</p>
                </div>
              </div>

              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-ledger-paper rounded-lg sm:rounded-xl p-2.5 sm:p-4 shadow-ledger hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border border-ledger-rule bg-transparent rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-ledger-sage" />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-ledger-ink text-xs sm:text-sm">Sales Up</p>
                    <p className="text-[10px] sm:text-xs text-ledger-sage">+26% this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <H2 className="mb-3 sm:mb-4">Built for Every Retailer</H2>
            <p className="font-grotesk text-ledger-ink/65 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Flexible features that adapt to any type of retail business.
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
              <H2 className="mb-4 sm:mb-6">Why Retailers Love BizGrow 360</H2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2.5 sm:gap-3">
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

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 lg:mt-0">
              {[
                { icon: Users, value: "5K+", label: "Retail Stores" },
                { icon: Package, value: "3M+", label: "Products Listed" },
                { icon: TrendingUp, value: "35%", label: "Sales Increase" },
                { icon: Clock, value: "2hrs", label: "Saved Daily" },
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

export default OtherRetailStorePage;
