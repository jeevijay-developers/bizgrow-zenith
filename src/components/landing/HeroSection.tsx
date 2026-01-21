import { useState } from "react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import { ArrowRight, MessageCircle, Star, Sparkles, Clock, CheckCircle, Calendar, TrendingUp, Package } from "lucide-react";
import modelImage from "@/assets/bizgrow-model.png";
import ScheduleDemoModal from "./ScheduleDemoModal";

const HeroSection = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative min-h-[100svh] bg-gradient-to-br from-primary via-primary to-primary/95 overflow-hidden pt-16 md:pt-20">
      {/* Schedule Demo Modal */}
      <ScheduleDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />

      {/* Simplified gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,208,102,0.15)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,208,102,0.1)_0%,_transparent_50%)]" />
      </div>

      {/* Subtle floating orbs - reduced on mobile */}
      <div className="absolute top-20 left-[10%] w-20 md:w-32 h-20 md:h-32 bg-accent/20 rounded-full blur-3xl animate-pulse hidden sm:block" />
      <div className="absolute bottom-32 right-[15%] w-24 md:w-40 h-24 md:h-40 bg-accent/15 rounded-full blur-3xl animate-pulse hidden sm:block" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 py-6 md:py-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[calc(100svh-100px)] md:min-h-[calc(100vh-140px)]">
          
          {/* Left Content - Compact & Aligned */}
          <div className="text-center lg:text-left space-y-4 md:space-y-5 order-2 lg:order-1">
            {/* Live Badge - Compact */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-white/90 text-xs font-medium">
                2,847 retailers went digital this week
              </span>
            </div>

            {/* Headline - Tighter spacing */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] font-display">
              Your Shop,{" "}
              <span className="relative inline-block">
                <span className="text-accent">Online</span>
                <svg className="absolute -bottom-0.5 left-0 w-full h-2" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent/60" />
                </svg>
              </span>
              <br />
              <span className="text-white/90">in 60 Seconds</span>
            </h1>

            {/* Subtitle - Cleaner */}
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
              AI-powered catalogue • WhatsApp orders • Smart inventory
              <span className="block mt-0.5 text-white/50 text-xs sm:text-sm">Made for Bharat's retailers</span>
            </p>

            {/* Feature Pills - Compact row */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                { icon: Sparkles, text: "AI Upload", color: "from-amber-400 to-orange-500" },
                { icon: Clock, text: "60s Setup", color: "from-green-400 to-emerald-500" },
                { icon: MessageCircle, text: "WhatsApp", color: "from-green-500 to-green-600" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/15">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-2 h-2 text-white" />
                  </div>
                  <span className="text-white/90 text-xs font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs - Compact buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start pt-1">
              <Link to="/join" className="w-full sm:w-auto">
                <RippleButton size="lg" variant="glow-accent" className="font-bold w-full sm:w-auto group text-sm h-11">
                  Start Free — No Card Needed
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
              <RippleButton 
                size="lg" 
                variant="outline-light" 
                className="w-full sm:w-auto group text-sm h-11"
                onClick={() => setShowDemoModal(true)}
              >
                <Calendar className="w-3.5 h-3.5 mr-2" />
                Schedule Demo
              </RippleButton>
            </div>

            {/* Trust Indicators - Compact single row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["RS", "PP", "MI", "SD"].map((initials, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-amber-400 flex items-center justify-center text-[9px] font-bold text-primary border-2 border-primary" style={{ zIndex: 5 - i }}>
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                    <span className="text-accent font-bold ml-1 text-xs">4.9</span>
                  </div>
                  <span className="text-white/60 text-[10px]">1,000+ Retailers</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-white/70 text-xs">Free Forever Plan</span>
              </div>
            </div>
          </div>

          {/* Right Content - Model with floating cards */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">
            {/* Glow backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-accent/25 to-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Main Model Image - Responsive sizing */}
            <div className="relative z-10">
              <img
                src={modelImage}
                alt="Indian retailer using BizGrow 360"
                className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[380px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating Cards - Smaller & better positioned */}
            {/* Order notification - Top left */}
            <div className="absolute top-0 -left-2 sm:left-0 md:top-4 md:-left-8 float-animation z-20">
              <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-xl p-2 sm:p-3 border border-gray-100/50 w-32 sm:w-40">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[10px] sm:text-xs">New Order! 🎉</p>
                    <p className="text-[8px] sm:text-[10px] text-gray-500">WhatsApp</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-1.5 sm:p-2">
                  <p className="text-[10px] sm:text-xs text-green-800 font-medium">Priya • ₹850</p>
                </div>
              </div>
            </div>

            {/* AI Magic - Right side */}
            <div className="absolute top-1/4 -right-2 sm:right-0 md:top-1/3 md:-right-4 float-animation-delayed z-20">
              <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-xl p-2 sm:p-3 border border-gray-100/50 w-28 sm:w-36">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <p className="font-bold text-gray-900 text-[10px] sm:text-xs">AI Magic</p>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                  <p className="text-[9px] sm:text-[10px] text-gray-700 truncate">Parle-G ₹20</p>
                </div>
              </div>
            </div>

            {/* Sales Card - Bottom left - Hidden on very small screens */}
            <div className="absolute bottom-8 sm:bottom-12 -left-2 sm:left-0 md:-left-6 float-animation z-20 hidden sm:block">
              <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-xl p-2 sm:p-3 border border-gray-100/50 w-32 sm:w-40">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <p className="font-bold text-gray-900 text-[10px] sm:text-xs">Today</p>
                  </div>
                  <span className="text-[8px] sm:text-[10px] text-green-600 bg-green-100 px-1 py-0.5 rounded-full font-bold">+23%</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">₹12,450</p>
              </div>
            </div>

            {/* Stock Alert - Bottom right */}
            <div className="absolute bottom-2 sm:bottom-4 right-0 md:right-4 float-animation-delayed z-20">
              <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-lg p-1.5 sm:p-2 border border-gray-100/50">
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center">
                      <Package className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full flex items-center justify-center text-[6px] sm:text-[8px] text-white font-bold">3</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-800">Low Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16" preserveAspectRatio="none">
          <path
            d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 36C840 40 960 48 1080 52C1200 56 1320 56 1380 52L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
