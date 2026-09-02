import { useState } from "react";
import { ArrowRight, Play, Star, Shield, Zap, Globe, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import ScheduleDemoModal from "./ScheduleDemoModal";
import heroShopkeeper from "@/assets/hero-shopkeeper.jpg";

const trustBadges = [
  { icon: Shield, text: "Bank-Level Security" },
  { icon: Globe, text: "10+ Languages" },
  { icon: Zap, text: "AI Powered" },
];

const HeroSection = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-ledger-paper">
      {/* Schedule Demo Modal */}
      <ScheduleDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />

      {/* Background Image — warm ink duotone, like a printed poster, not a CSS gradient wash */}
      <div className="absolute inset-0">
        <img
          src={heroShopkeeper}
          alt="Indian shopkeeper with BizGrow app"
          className="w-full h-full object-cover grayscale contrast-[1.08] brightness-[0.97]"
        />
        <div className="absolute inset-0 bg-ledger-ink/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-ledger-paper via-ledger-paper/92 to-ledger-paper/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ledger-ink/25 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div
            className="text-center lg:text-left"
          >
            {/* Trust Badges — one text-led row, hairline dividers, no pill fills */}
            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-1 gap-y-2 sm:gap-x-0 sm:divide-x sm:divide-ledger-rule mb-8 ledger-enter ledger-enter-1"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 px-4 first:pl-0 py-1 text-sm"
                >
                  <badge.icon className="w-4 h-4 text-ledger-ink/50" strokeWidth={1.75} />
                  <span className="text-ledger-ink/75 font-grotesk font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Main Headline */}
            <h1
              className="font-ledger text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-ledger-ink leading-[1.05] tracking-tight ledger-enter ledger-enter-2"
            >
              Apni Dukaan Ko
              <span className="block mt-1 ledger-highlight">Digital Banao</span>
            </h1>

            {/* Subheadline */}
            <p
              className="font-grotesk text-lg md:text-xl text-ledger-ink/65 max-w-xl mx-auto lg:mx-0 mt-6 mb-8 leading-relaxed ledger-enter ledger-enter-2"
            >
              AI-powered platform to digitize your store, accept WhatsApp orders,
              create marketing posters, and grow your business — all in your language.
            </p>

            {/* Feature Tags — hairline outline, no fill, its own distinct family */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10 ledger-enter ledger-enter-3"
            >
              {["AI Product Upload", "WhatsApp Orders", "Auto Flyers", "GST Billing", "Hindi/Regional"].map((feature) => (
                <span
                  key={feature}
                  className="flex items-center gap-1.5 bg-ledger-paper/70 text-ledger-ink/80 text-sm font-grotesk font-medium px-3 py-1.5 rounded-full border border-ledger-rule"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-ledger-sage" strokeWidth={1.75} />
                  {feature}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 ledger-enter ledger-enter-4"
            >
              <Link to="/join">
                <RippleButton
                  size="lg"
                  className="font-grotesk font-semibold group h-11 sm:h-14 px-5 sm:px-8 text-base sm:text-lg w-full sm:w-auto rounded-md bg-ledger-ink text-ledger-paper hover:bg-ledger-marigold hover:text-ledger-ink"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
              <button
                onClick={() => setShowDemoModal(true)}
                className="group inline-flex items-center justify-center sm:justify-start gap-2 h-11 sm:h-14 px-2 text-base sm:text-lg font-grotesk font-semibold text-ledger-ink underline decoration-ledger-rule decoration-2 underline-offset-4 hover:decoration-ledger-marigold transition-colors"
              >
                <Play className="w-5 h-5 text-ledger-ink/70 group-hover:text-ledger-marigold transition-colors" strokeWidth={1.75} />
                Schedule a demo
              </button>
            </div>

            {/* Social Proof */}
            <div
              className="flex items-center justify-center lg:justify-start gap-4 ledger-enter ledger-enter-5"
            >
              <div className="flex -space-x-3">
                {["RS", "PP", "MI", "SD"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-ledger-ink flex items-center justify-center text-ledger-paper text-xs font-grotesk font-bold border-2 border-ledger-paper"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-ledger-sage text-ledger-sage" />
                  ))}
                  <span className="ml-1 font-ledger font-semibold text-ledger-ink">4.9</span>
                </div>
                <p className="text-sm font-grotesk text-ledger-ink/60">10,000+ stores trust us</p>
              </div>
            </div>
          </div>

          {/* Right — kept as a spacer so the photo reads clean and unobstructed */}
          <div className="hidden lg:block relative h-[550px] w-full" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-6 h-10 border-2 border-ledger-ink/25 rounded-full flex justify-center pt-2 animate-bounce"
        >
          <div className="w-1.5 h-2.5 bg-ledger-marigold rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
