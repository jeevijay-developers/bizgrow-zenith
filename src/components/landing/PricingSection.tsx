import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
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
  },
  {
    name: "Pro",
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
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
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
  },
];

const PricingSection = () => {
  return (
    <section className="py-20 md:py-28 gradient-hero" id="pricing">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-bold mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 font-display">
            Choose Your Plan
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Start with a 14-day free trial. No credit card required. 
            Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? "border-accent shadow-2xl shadow-accent/20 scale-105" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-card-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/join">
                <Button 
                  className={`w-full py-6 text-lg font-semibold rounded-xl ${
                    plan.popular 
                      ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <p className="text-center text-primary-foreground/70 mt-12 text-sm">
          All plans include SSL security, daily backups, and 99.9% uptime guarantee.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
