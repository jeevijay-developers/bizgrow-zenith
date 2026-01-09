import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import { ArrowRight, Bell, MessageCircle, Star, Sparkles, Clock, Zap, TrendingUp, Package, CheckCircle, Play } from "lucide-react";
import modelImage from "@/assets/bizgrow-model.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary to-primary/95 overflow-hidden pt-20">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,208,102,0.2)_0%,_transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,208,102,0.15)_0%,_transparent_40%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-[15%] w-40 h-40 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-[10%] w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-6 animate-slide-up">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-5 py-2 sm:py-2.5 border border-white/20 shadow-lg">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-400"></span>
              </span>
              <span className="text-white/90 text-xs sm:text-sm font-medium">
                2,847 retailers went digital this week
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] font-display">
              Your Shop,{" "}
              <span className="relative inline-block">
                <span className="text-accent">Online</span>
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-accent/60" />
                </svg>
              </span>
              <br />
              <span className="text-white/90">in 60 Seconds</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
              AI-powered catalogue • WhatsApp orders • Smart inventory • GST billing
              <span className="block mt-1 text-white/50">— Made for Bharat's retailers</span>
            </p>

            {/* Feature Pills with icons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start px-2 sm:px-0">
              {[
                { icon: Sparkles, text: "AI Product Upload", color: "from-amber-400 to-orange-500" },
                { icon: Clock, text: "60 Sec Setup", color: "from-green-400 to-emerald-500" },
                { icon: MessageCircle, text: "WhatsApp Orders", color: "from-green-500 to-green-600" },
              ].map((item) => (
                <div key={item.text} className="group flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/15 hover:border-white/30 hover:bg-white/15 transition-all cursor-default">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                  <span className="text-white/90 text-xs sm:text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 px-2 sm:px-0">
              <Link to="/join" className="w-full sm:w-auto">
                <RippleButton size="xl" variant="glow-accent" className="font-bold w-full sm:w-auto group text-sm sm:text-base">
                  Start Free — No Card Needed
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
              <RippleButton size="xl" variant="outline" className="border-white/25 text-white hover:bg-white/10 w-full sm:w-auto group text-sm sm:text-base">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 fill-white" />
                Watch 2 Min Demo
              </RippleButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 sm:pt-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {["RS", "PP", "MI", "SD", "AK"].map((initials, i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent to-amber-400 flex items-center justify-center text-[10px] sm:text-xs font-bold text-primary border-2 sm:border-3 border-primary shadow-lg" style={{ zIndex: 5 - i }}>
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-accent text-accent" />
                    ))}
                    <span className="text-accent font-bold ml-1 text-sm sm:text-base">4.9</span>
                  </div>
                  <span className="text-white/60 text-xs sm:text-sm">1,000+ Happy Retailers</span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-white/70 text-xs sm:text-sm">Free Forever Plan Available</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Dashboard Preview */}
          <div className="relative flex justify-center items-center lg:scale-105 mt-8 lg:mt-0">
            {/* Large glowing backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-accent/30 to-accent/10 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Main Model Image */}
            <div className="relative z-10">
              <img
                src={modelImage}
                alt="Indian retailer using BizGrow 360"
                className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating Dashboard Cards - Enhanced */}
            <div className="absolute -top-2 left-0 sm:-left-2 md:top-8 md:-left-4 float-animation z-20">
              <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-2.5 sm:p-4 border border-gray-100/50 w-36 sm:w-48 md:w-56 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">New Order! 🎉</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">via WhatsApp</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-green-100">
                  <p className="text-xs sm:text-sm text-green-800 font-semibold">Priya Sharma</p>
                  <p className="text-[10px] sm:text-xs text-green-600">3 items • ₹850 • Just now</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 right-0 sm:-right-2 md:right-0 float-animation-delayed z-20">
              <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-2.5 sm:p-4 border border-gray-100/50 w-32 sm:w-44 md:w-52 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">AI Magic</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Auto-detected</p>
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="h-1.5 sm:h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full w-full animate-pulse" />
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <p className="text-[10px] sm:text-xs text-gray-700 font-medium">Parle-G Biscuit 250g</p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500">₹20 MRP • Biscuits Category</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 sm:bottom-16 left-0 sm:-left-2 md:left-4 float-animation z-20 hidden sm:block">
              <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-2.5 sm:p-4 border border-gray-100/50 w-40 sm:w-48 md:w-56 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">Today's Sales</p>
                  </div>
                  <span className="text-[10px] sm:text-xs text-green-600 bg-green-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold">+23%</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">₹12,450</p>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full transition-all" style={{ width: "73%" }} />
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-600 font-medium">73% of goal</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-2 sm:right-4 md:right-12 float-animation-delayed z-20">
              <div className="bg-white/95 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-xl p-2 sm:p-3 border border-gray-100/50 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center">
                      <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] sm:text-[10px] text-white font-bold">3</span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-800">Low Stock Alert</span>
                    <p className="text-[8px] sm:text-[10px] text-gray-500">Maggi, Surf, Amul</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 md:h-auto" preserveAspectRatio="none">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 85L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
