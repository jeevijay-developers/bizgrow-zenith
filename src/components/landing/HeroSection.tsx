import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Shield, Zap, Globe, Sparkles, CheckCircle, MessageSquare, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import ScheduleDemoModal from "./ScheduleDemoModal";
import heroShopkeeper from "@/assets/hero-shopkeeper.jpg";

const trustBadges = [
  { icon: Shield, text: "Bank-Level Security" },
  { icon: Globe, text: "10+ Languages" },
  { icon: Zap, text: "AI Powered" },
];

const floatingStats = [
  { value: "10K+", label: "Active Stores", color: "from-green-400 to-emerald-500" },
  { value: "₹50Cr+", label: "Monthly GMV", color: "from-amber-400 to-orange-500" },
  { value: "4.9★", label: "User Rating", color: "from-purple-400 to-pink-500" },
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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[20%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 text-sm"
                >
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 font-display"
            >
              Apni Dukaan Ko
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                Digital Banao
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              AI-powered platform to digitize your store, accept WhatsApp orders, 
              create marketing posters, and grow your business — all in your language.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10"
            >
              {["AI Product Upload", "WhatsApp Orders", "Auto Flyers", "GST Billing", "Hindi/Regional"].map((feature) => (
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
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Link to="/join">
                <RippleButton size="lg" variant="glow-accent" className="font-bold group h-14 px-8 text-lg w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
              <RippleButton 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg group border-border/50 bg-background/50 backdrop-blur-sm"
                onClick={() => setShowDemoModal(true)}
              >
                <Play className="w-5 h-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                Watch Demo
              </RippleButton>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
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
          </motion.div>

          {/* Right - Floating Stats Cards (visible on larger screens) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="relative h-[500px]">
              {/* Floating stat cards */}
              {floatingStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                  className="absolute bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-2xl"
                  style={{
                    top: index === 0 ? "10%" : index === 1 ? "40%" : "70%",
                    right: index === 0 ? "10%" : index === 1 ? "0%" : "20%",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                </motion.div>
              ))}

              {/* Floating Feature Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-[5%] bottom-[15%] bg-background border border-border rounded-xl p-3 shadow-xl z-30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">हिंदी में उपलब्ध</p>
                    <p className="text-[10px] text-muted-foreground">+ 9 more languages</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
                className="absolute right-[5%] bottom-[20%] bg-background border border-border rounded-xl p-3 shadow-xl z-30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                    <Image className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Flyer Generated!</p>
                    <p className="text-[10px] text-muted-foreground">Ready to share</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute left-[15%] top-[10%] bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3 shadow-xl z-30"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary-foreground" />
                  <div>
                    <p className="text-xs font-bold text-primary-foreground">New Order! 🎉</p>
                    <p className="text-[10px] text-primary-foreground/80">₹1,250 via WhatsApp</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                className="absolute right-[10%] top-[5%] bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-3 shadow-xl z-30"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                  <div>
                    <p className="text-xs font-bold text-primary-foreground">AI Detected</p>
                    <p className="text-[10px] text-primary-foreground/80">8 products added</p>
                  </div>
                </div>
              </motion.div>

              {/* AI Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute top-[25%] left-[5%] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-4 shadow-xl"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
                <p className="text-sm font-bold mt-2">AI Powered</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-2.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
