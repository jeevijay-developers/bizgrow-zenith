import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/ripple-button";
import { 
  ArrowRight, 
  Play, 
  Star, 
  CheckCircle, 
  Sparkles, 
  MessageSquare,
  Globe,
  Image,
  Smartphone
} from "lucide-react";
import ScheduleDemoModal from "./ScheduleDemoModal";

// Import mockup images
import dashboardMockup from "@/assets/feature-analytics-mockup.png";
import catalogueMockup from "@/assets/feature-catalogue-mockup.png";
import whatsappMockup from "@/assets/feature-whatsapp-mockup.png";

const HeroSection = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const floatingFeatures = [
    { icon: Globe, text: "10+ Regional Languages", color: "from-emerald-500 to-teal-600" },
    { icon: Sparkles, text: "AI Product Detection", color: "from-amber-500 to-orange-600" },
    { icon: Image, text: "Auto Flyer Creation", color: "from-pink-500 to-rose-600" },
    { icon: MessageSquare, text: "WhatsApp Orders", color: "from-green-500 to-emerald-600" },
  ];

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-20 md:pt-24">
      {/* Schedule Demo Modal */}
      <ScheduleDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />

      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Accent glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100svh-8rem)]">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-bizgrow-yellow-dark border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-900"
                  >
                    {["R", "S", "P", "M"][i - 1]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/80">
                Trusted by <span className="font-semibold text-white">10,000+</span> retailers
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 font-display"
            >
              Transform Your Shop Into a
              <span className="block mt-2">
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-bizgrow-yellow to-amber-400">
                  Digital Powerhouse
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              AI-powered tools that work in your language. Create stunning catalogues, 
              auto-generate flyers, and manage orders via WhatsApp.
            </motion.p>

            {/* USP Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
            >
              {floatingFeatures.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm font-medium text-white"
                >
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-3 h-3 text-white" />
                  </div>
                  {item.text}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
            >
              <Link to="/join">
                <RippleButton
                  size="lg"
                  className="bg-gradient-to-r from-accent to-bizgrow-yellow-dark hover:opacity-90 text-slate-900 font-bold px-8 h-14 text-lg group shadow-lg shadow-accent/30"
                >
                  Start Free — No Card Needed
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
              <RippleButton
                size="lg"
                variant="outline"
                className="h-14 px-6 text-lg font-medium border-white/30 text-white hover:bg-white/10 group"
                onClick={() => setShowDemoModal(true)}
              >
                <Play className="w-5 h-5 mr-2 text-accent" />
                Watch Demo
              </RippleButton>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8"
            >
              {[
                { value: "10K+", label: "Active Stores" },
                { value: "₹50Cr+", label: "Monthly GMV" },
                { value: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - 3D Floating Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] hidden md:block"
          >
            {/* Main Dashboard Mockup - Center */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] lg:w-[400px] z-20"
              style={{ transform: "translateX(-50%) translateY(-50%) perspective(1000px) rotateY(-5deg)" }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-primary/30 rounded-3xl blur-2xl" />
                
                {/* Browser chrome */}
                <div className="relative bg-slate-800 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-900/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-slate-800 border border-white/10 rounded-lg px-3 py-1 text-xs text-white/50 flex items-center gap-2">
                        <span>yourstore.bizgrow360.com</span>
                      </div>
                    </div>
                  </div>
                  <img 
                    src={dashboardMockup} 
                    alt="BizGrow Dashboard"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Catalogue Mockup - Left */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute left-0 top-[20%] w-[180px] lg:w-[220px] z-10"
              style={{ transform: "perspective(1000px) rotateY(15deg) rotateZ(-3deg)" }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl" />
                <div className="relative bg-slate-800 border border-white/20 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={catalogueMockup} 
                    alt="Digital Catalogue"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Mockup - Right */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-0 top-[25%] w-[160px] lg:w-[200px] z-10"
              style={{ transform: "perspective(1000px) rotateY(-15deg) rotateZ(3deg)" }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl blur-xl" />
                <div className="relative bg-slate-800 border border-white/20 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={whatsappMockup} 
                    alt="WhatsApp Orders"
                    className="w-full aspect-[9/16] object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating Feature Cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[5%] bottom-[15%] bg-white rounded-xl p-3 shadow-xl z-30"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">हिंदी में उपलब्ध</p>
                  <p className="text-[10px] text-slate-500">+ 9 more languages</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-[5%] bottom-[20%] bg-white rounded-xl p-3 shadow-xl z-30"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Flyer Generated!</p>
                  <p className="text-[10px] text-slate-500">Ready to share</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-[15%] top-[10%] bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3 shadow-xl z-30"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white" />
                <div>
                  <p className="text-xs font-bold text-white">New Order! 🎉</p>
                  <p className="text-[10px] text-white/80">₹1,250 via WhatsApp</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute right-[10%] top-[5%] bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-3 shadow-xl z-30"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-white" />
                <div>
                  <p className="text-xs font-bold text-white">AI Detected</p>
                  <p className="text-[10px] text-white/80">8 products added</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Mockup - Only shown on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:hidden relative"
          >
            <div className="relative max-w-[280px] mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-primary/30 rounded-3xl blur-2xl" />
              <div className="relative bg-slate-800 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={dashboardMockup} 
                  alt="BizGrow Dashboard"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
