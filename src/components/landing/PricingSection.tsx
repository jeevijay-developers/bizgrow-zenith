import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star, Zap, Building2, Sparkles } from "lucide-react";
import { HiStar } from "react-icons/hi2";
import { RippleButton } from "@/components/ui/ripple-button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";

const plans = [
  {
    name: "Free",
    icon: Zap,
    description: "Perfect to get started",
    price: "₹0",
    period: "forever",
    annualPrice: "₹0",
    features: [
      "Up to 10 products",
      "Basic catalogue",
      "Email support",
      "Mobile app access",
    ],
    cta: "Start Free",
    popular: false,
    href: "/join",
  },
  {
    name: "Starter",
    icon: Star,
    description: "For growing businesses",
    price: "₹999",
    period: "/month",
    annualPrice: "₹799",
    features: [
      "Up to 100 products",
      "Basic catalogue",
      "WhatsApp orders",
      "Email support",
      "Mobile app access",
    ],
    cta: "Start 14-Day Free Trial",
    popular: false,
    href: "/join",
  },
  {
    name: "Pro",
    icon: Star,
    description: "Most popular plan",
    price: "₹1,499",
    period: "/month",
    annualPrice: "₹1,199",
    features: [
      "Unlimited products",
      "AI Photo Upload",
      "Analytics dashboard",
      "Priority support",
      "Custom domain",
      "WhatsApp orders",
      "GST invoicing",
    ],
    cta: "Start 14-Day Free Trial",
    popular: true,
    href: "/join",
  },
  {
    name: "Enterprise",
    icon: Building2,
    description: "For large retailers",
    price: "Custom",
    period: "",
    annualPrice: "Custom",
    features: [
      "Everything in Pro",
      "Multi-store management",
      "Unlimited staff accounts",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
    href: "/contact",
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="py-20 md:py-28 bg-ledger-paper relative overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-ledger-rule rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-ledger-ink/60" strokeWidth={1.75} />
            <span className="text-sm font-grotesk font-semibold text-ledger-ink/75">Simple Pricing</span>
          </div>
          <h2 className="font-ledger text-3xl sm:text-4xl md:text-5xl font-semibold text-ledger-ink mb-6">
            Plans That Scale
            <span className="block mt-2">With Your Success</span>
          </h2>
          <p className="font-grotesk text-lg text-ledger-ink/65 mb-8">
            Start free, upgrade when you need. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-ledger-rule rounded-full p-1.5">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 rounded-full text-sm font-grotesk font-medium transition-all ${
                !isAnnual ? "bg-ledger-ink text-ledger-paper shadow-ledger-sm" : "text-ledger-ink/55 hover:text-ledger-ink"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-grotesk font-medium transition-all flex items-center gap-2 ${
                isAnnual ? "bg-ledger-ink text-ledger-paper shadow-ledger-sm" : "text-ledger-ink/55 hover:text-ledger-ink"
              }`}
            >
              Annual
              <span className="text-xs bg-ledger-sage text-ledger-paper px-2 py-0.5 rounded-full font-grotesk font-semibold">
                20% OFF
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards - Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel opts={{ align: "start" }} setApi={setApi}>
            <CarouselContent>
              {plans.map((plan) => (
                <CarouselItem key={plan.name} className="basis-[88%]">
                  <PricingCard plan={plan} isAnnual={isAnnual} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <CarouselDots api={api} />
        </div>

        {/* Pricing Cards - Grid (tablet & up) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard plan={plan} isAnnual={isAnnual} />
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-sm font-grotesk text-ledger-ink/60"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-ledger-sage" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-ledger-sage" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-ledger-sage" />
            24/7 support
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-ledger-sage" />
            Data export available
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PricingCard = ({ plan, isAnnual }: { plan: (typeof plans)[number]; isAnnual: boolean }) => (
  <div
    className={`relative rounded-xl ${
      plan.popular
        ? "bg-ledger-ink text-ledger-paper scale-[1.02] lg:scale-105 shadow-ledger z-10"
        : "bg-white text-ledger-ink border border-ledger-rule shadow-ledger-sm"
    } overflow-hidden`}
  >
    {/* Popular Badge */}
    {plan.popular && (
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30">
        <Badge className="bg-ledger-marigold text-ledger-ink hover:bg-ledger-marigold font-grotesk font-semibold text-xs px-3 py-1 flex items-center gap-1.5 border-transparent">
          <HiStar className="w-3.5 h-3.5" /> MOST POPULAR <HiStar className="w-3.5 h-3.5" />
        </Badge>
      </div>
    )}

    <div className={`p-6 sm:p-8 ${plan.popular ? "pt-10" : ""}`}>
      {/* Plan Icon & Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${plan.popular ? "border-ledger-paper/20" : "border-ledger-rule"}`}>
          <plan.icon className={`w-6 h-6 ${plan.popular ? "text-ledger-paper/70" : "text-ledger-ink/70"}`} strokeWidth={1.75} />
        </div>
        <div>
          <h3 className={`font-ledger text-xl font-semibold ${plan.popular ? "text-ledger-paper" : "text-ledger-ink"}`}>{plan.name}</h3>
          <p className={`text-sm font-grotesk ${plan.popular ? "text-ledger-paper/70" : "text-ledger-ink/55"}`}>
            {plan.description}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="font-ledger text-4xl sm:text-5xl font-semibold">
          {plan.price !== "₹0" && plan.price !== "Custom" && isAnnual ? plan.annualPrice : plan.price}
        </span>
        <span className={`text-sm font-grotesk ${plan.popular ? "text-ledger-paper/70" : "text-ledger-ink/55"}`}>
          {plan.period}
        </span>
        {plan.price !== "₹0" && plan.price !== "Custom" && isAnnual && (
          <span className={`block text-sm font-grotesk mt-1 ${plan.popular ? "text-ledger-paper/60" : "text-ledger-ink/50"}`}>
            <s>{plan.price}</s> billed annually
          </span>
        )}
      </div>

      {/* CTA Button */}
      <Link to={plan.href} className="block mb-6">
        <RippleButton
          className={`w-full h-12 font-grotesk font-semibold text-base rounded-md ${
            plan.popular
              ? "bg-ledger-paper text-ledger-ink hover:bg-ledger-marigold hover:text-ledger-ink"
              : "bg-ledger-ink text-ledger-paper hover:bg-ledger-marigold hover:text-ledger-ink"
          }`}
        >
          {plan.cta}
        </RippleButton>
      </Link>

      {/* Features List */}
      <ul className="space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 shrink-0 mt-0.5 text-ledger-sage" />
            <span className={`text-sm font-grotesk ${plan.popular ? "text-ledger-paper/90" : "text-ledger-ink/80"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default PricingSection;
