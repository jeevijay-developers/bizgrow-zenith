import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggeredContainer } from "@/hooks/useScrollAnimation";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "₹499",
    period: "/month",
    description: "Perfect for small shops just getting started",
    features: [
      "Up to 100 products",
      "Digital catalogue",
      "WhatsApp notifications",
      "Basic inventory",
      "5 invoices/day",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
    color: "from-gray-500 to-gray-600",
  },
  {
    name: "Pro",
    icon: Sparkles,
    price: "₹999",
    period: "/month",
    description: "For growing businesses with more needs",
    features: [
      "Unlimited products",
      "AI product upload",
      "Advanced inventory",
      "Customer CRM",
      "Unlimited invoices",
      "GST reports",
      "Analytics dashboard",
      "Priority WhatsApp support",
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "from-primary to-purple-700",
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "Custom",
    period: "",
    description: "For large retailers and chains",
    features: [
      "Everything in Pro",
      "Multi-store management",
      "Custom integrations",
      "Dedicated account manager",
      "API access",
      "SLA guarantee",
      "On-site training",
    ],
    cta: "Contact Sales",
    popular: false,
    color: "from-amber-500 to-orange-500",
  },
];

const PricingSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden" id="pricing">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse,_rgba(255,208,102,0.1)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-2">
          <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-1.5 mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="text-accent text-xs sm:text-sm font-bold">Simple Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-display">
            Choose Your Plan
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 px-2">
            Start with a 14-day free trial. No credit card required. 
            Cancel anytime.
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto" staggerDelay={150}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] ${
                plan.popular 
                  ? "ring-2 ring-accent shadow-2xl shadow-accent/20 md:scale-105 order-first md:order-none" 
                  : "shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-accent text-accent-foreground px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className={`text-center mb-5 sm:mb-6 ${plan.popular ? 'mt-2 sm:mt-0' : ''}`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <plan.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm sm:text-base">{plan.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2 px-2">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/join" className="block">
                <Button 
                  className={`w-full py-4 sm:py-5 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl ${
                    plan.popular 
                      ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </StaggeredContainer>

        {/* Trust Note */}
        <AnimatedSection className="text-center mt-8 sm:mt-10" delay={300}>
          <p className="text-white/60 text-xs sm:text-sm px-4">
            🔒 All plans include SSL security, daily backups, and 99.9% uptime guarantee.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PricingSection;