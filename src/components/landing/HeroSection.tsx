import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/ripple-button";
import { ArrowRight, Play, Star, CheckCircle, Sparkles, Users, Store } from "lucide-react";
import ScheduleDemoModal from "./ScheduleDemoModal";

const HeroSection = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const stats = [
    { icon: Store, value: "10,000+", label: "Active Stores" },
    { icon: Users, value: "500K+", label: "Happy Customers" },
    { icon: Star, value: "4.9/5", label: "Store Rating" },
  ];

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-20 md:pt-24">
      {/* Schedule Demo Modal */}
      <ScheduleDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />

      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background" />
      
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-[15%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-[30%] w-64 h-64 bg-accent/15 rounded-full blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Centered Hero Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6 shadow-sm"
          >
            <div className="flex -space-x-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-bizgrow-yellow-dark border-2 border-background flex items-center justify-center text-[8px] font-bold text-accent-foreground"
                >
                  {["A", "R", "S", "P"][i - 1]}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">10,000+</span> retailers
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 font-display"
          >
            Grow Your Shop
            <span className="block mt-2">
              <span className="relative inline-block">
                <span className="text-primary">Digitally</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="hsl(var(--accent))" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Create your online store in 60 seconds with AI-powered tools.
            <span className="block mt-1 text-foreground/70">
              No technical skills needed. Made for Indian retailers.
            </span>
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center mb-10"
          >
            {[
              { icon: Sparkles, text: "AI Product Upload" },
              { icon: CheckCircle, text: "WhatsApp Orders" },
              { icon: CheckCircle, text: "Free Forever Plan" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm"
              >
                <item.icon className="w-4 h-4 text-primary" />
                {item.text}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link to="/join">
              <RippleButton
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-14 text-lg group shadow-lg shadow-primary/20"
              >
                Start Free — No Card Needed
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
            <RippleButton
              size="lg"
              variant="outline"
              className="h-14 px-6 text-lg font-medium border-2 group"
              onClick={() => setShowDemoModal(true)}
            >
              <Play className="w-5 h-5 mr-2 text-primary" />
              Watch Demo
            </RippleButton>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-5 h-5 text-accent" />
                  <span className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Glow effect behind */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-primary/10 to-transparent rounded-3xl blur-2xl scale-95" />
            
            {/* Browser mockup */}
            <div className="relative bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background border border-border rounded-lg px-4 py-1.5 text-xs text-muted-foreground flex items-center gap-2 w-full max-w-xs">
                    <span className="truncate">yourstore.bizgrow360.com</span>
                  </div>
                </div>
              </div>

              {/* Dashboard content placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-muted/30 to-muted/50 p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {["Today's Sales", "Orders", "Products", "Customers"].map((label, i) => (
                    <div key={label} className="bg-card border border-border rounded-xl p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">{label}</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground">
                        {["₹12,450", "23", "156", "89"][i]}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="sm:col-span-2 bg-card border border-border rounded-xl p-4 h-32 sm:h-40">
                    <p className="text-xs text-muted-foreground mb-3">Sales Overview</p>
                    <div className="flex items-end gap-1 h-20 sm:h-24">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-3">Top Products</p>
                    <div className="space-y-2">
                      {["Parle-G", "Amul Milk", "Maggi"].map((name, i) => (
                        <div key={name} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-muted" />
                          <span className="text-xs text-foreground truncate">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 sm:-left-8 top-1/4 bg-card border border-border rounded-xl p-3 shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">AI Detected</p>
                  <p className="text-[10px] text-muted-foreground">5 products added</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-4 sm:-right-8 top-1/3 bg-card border border-border rounded-xl p-3 shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-bizgrow-yellow-dark flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">New Order! 🎉</p>
                  <p className="text-[10px] text-muted-foreground">₹850 via WhatsApp</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
