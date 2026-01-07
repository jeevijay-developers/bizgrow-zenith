import { Camera, Share2, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggeredContainer } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Snap a Photo",
    description: "Take a photo of any product. Our AI instantly recognizes it and fills all details — name, price, category, and more.",
    highlight: "AI-Powered",
    color: "from-violet-500 to-purple-600",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "Your Catalogue is Ready",
    description: "A beautiful digital catalogue is created automatically. Share it with customers via WhatsApp link.",
    highlight: "Instant",
    color: "from-amber-500 to-orange-500",
  },
  {
    number: "03",
    icon: Share2,
    title: "Start Receiving Orders",
    description: "Customers browse, add to cart, and order. You get instant WhatsApp notifications with every order.",
    highlight: "WhatsApp",
    color: "from-green-500 to-emerald-600",
  },
];

const benefits = [
  "No technical skills required",
  "Works in Hindi & English",
  "Free to start, no card needed",
  "24/7 WhatsApp support",
];

const DigitaliseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary text-sm font-semibold">Simple 3-Step Process</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
            Digitalise Your Shop
            <span className="text-primary block">in Just 60 Seconds</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            No coding. No complicated setup. Just snap, share, and sell. 
            It's that simple with BizGrow 360.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <StaggeredContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12" staggerDelay={150}>
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}

              <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group-hover:-translate-y-1 z-10">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center font-bold text-sm text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                  {step.number}
                </div>

                {/* Highlight Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${step.color} mb-4`}>
                  {step.highlight}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </StaggeredContainer>

        {/* Benefits + CTA */}
        <AnimatedSection className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl p-6 md:p-10 border border-border" delay={200}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Benefits List */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 bg-background rounded-full px-4 py-2 border border-border">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/join">
              <RippleButton size="xl" variant="glow" className="font-bold group whitespace-nowrap">
                Get Your Digital Store Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DigitaliseSection;
