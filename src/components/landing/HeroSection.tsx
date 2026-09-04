import { useState } from "react";
import { ArrowRight, Play, Star, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import ScheduleDemoModal from "./ScheduleDemoModal";
import heroShopkeeper from "@/assets/hero-shopkeeper.jpg";

const trustBadges = [
  { icon: Zap, text: "AI Powered" },
];

const HeroSection = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Schedule Demo Modal */}
      <ScheduleDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />

      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroShopkeeper} 
          alt="Indian shopkeeper with BizGrow app"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/20" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[20%] w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
        <div className="max-w-3xl mx-auto lg:mx-0">
          {/* Left Content */}
          <div
            className="text-center lg:text-left"
          >
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-1.5 sm:gap-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm"
                >
                  <badge.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-foreground font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-[clamp(2.25rem,9.3vw,3rem)] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight font-display mb-5 sm:mb-6 whitespace-nowrap sm:whitespace-normal"
            >
              Apni Dukaan Ko
              <span className="block mt-2 sm:mt-3 text-gold">
                Digital Banao
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              AI-powered platform to digitize your store, accept WhatsApp orders,
              create marketing posters, and grow your business — all in your language.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10"
            >
              {["AI Product Upload", "WhatsApp Orders", "Auto Flyers", "GST Billing"].map((feature) => (
                <span
                  key={feature}
                  className="flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full border border-primary/20"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-10"
            >
              <Link to="/join" className="flex-1 sm:flex-none">
                <RippleButton size="lg" variant="glow-accent" className="font-bold group h-11 sm:h-14 px-3 sm:px-8 text-sm sm:text-lg w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
                </RippleButton>
              </Link>
              <RippleButton
                size="lg"
                variant="outline"
                className="h-11 sm:h-14 px-3 sm:px-8 text-sm sm:text-lg group border-border/50 bg-background/50 backdrop-blur-sm flex-1 sm:flex-none w-full sm:w-auto"
                onClick={() => setShowDemoModal(true)}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-primary group-hover:scale-110 transition-transform shrink-0" />
                Schedule a demo
              </RippleButton>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <div className="flex -space-x-3">
                {["RS", "PP", "MI", "SD"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-bold border-2 border-background"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                  <span className="ml-1 font-bold text-foreground">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">10,000+ stores trust us</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2 animate-bounce"
        >
          <div className="w-1.5 h-2.5 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
