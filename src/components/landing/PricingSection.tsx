import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star, Zap, Building2 } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";

const plans = [
  {
    name: "Free",
    icon: Zap,
    description: "Perfect to get started",
    price: "₹0",
    period: "forever",
    features: [
      "Up to 50 products",
      "Digital catalogue",
      "WhatsApp orders",
      "Basic analytics",
      "1 staff account",
    ],
    cta: "Start Free",
    popular: false,
    bgClass: "bg-card",
    borderClass: "border-border",
  },
  {
    name: "Pro",
    icon: Star,
    description: "For growing businesses",
    price: "₹499",
    period: "/month",
    features: [
      "Unlimited products",
      "AI product upload",
      "Priority WhatsApp support",
      "Advanced analytics",
      "5 staff accounts",
      "Custom domain",
      "GST invoicing",
    ],
    cta: "Start Free Trial",
    popular: true,
    bgClass: "bg-primary",
    borderClass: "border-primary",
  },
  {
    name: "Enterprise",
    icon: Building2,
    description: "For large retailers",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Multi-store management",
      "Unlimited staff accounts",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
    bgClass: "bg-card",
    borderClass: "border-border",
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="pricing">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-[5%] w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-semibold text-accent-foreground">Simple Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            Plans That Grow
            <span className="text-primary block mt-2">With Your Business</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start free, upgrade when you need. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted rounded-full p-1.5">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Annual
              <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border ${plan.borderClass} ${plan.bgClass} ${
                plan.popular ? "text-primary-foreground scale-105 shadow-2xl shadow-primary/20" : ""
              } overflow-hidden`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground text-center py-1.5 text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className={`p-6 sm:p-8 ${plan.popular ? "pt-10" : ""}`}>
                {/* Plan Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${plan.popular ? "bg-white/20" : "bg-primary/10"} flex items-center justify-center`}>
                    <plan.icon className={`w-5 h-5 ${plan.popular ? "text-white" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-bold">
                    {plan.price === "₹499" && isAnnual ? "₹399" : plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                </div>

                {/* CTA Button */}
                <Link to="/join" className="block mb-6">
                  <RippleButton
                    className={`w-full h-12 font-bold ${
                      plan.popular
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {plan.cta}
                  </RippleButton>
                </Link>

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? "text-accent" : "text-primary"}`} />
                      <span className={`text-sm ${plan.popular ? "text-white/90" : "text-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            24/7 support
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
