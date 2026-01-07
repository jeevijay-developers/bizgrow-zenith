import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, MessageCircle, ShoppingCart, Star, Sparkles, Clock, Zap } from "lucide-react";
import modelImage from "@/assets/bizgrow-model.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/95 via-primary to-primary/90 overflow-hidden pt-20">
      {/* Soft gradient overlays for soothing effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,208,102,0.15)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,208,102,0.1)_0%,_transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      </div>

      {/* Decorative floating shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full blur-2xl float-animation" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl float-animation-delayed" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl" />

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-140px)]">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-white/90 text-sm font-medium">
                #1 Platform for Indian Retailers
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight font-display">
              Digitalise Your Shop
              <span className="block mt-2">
                <span className="relative inline-block">
                  <span className="text-accent">in Just 1 Minute</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent/50" />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              AI-powered digital catalogue, WhatsApp orders, smart inventory & GST billing — 
              everything you need to grow your business, in one simple app made for Bharat.
            </p>

            {/* Key Features Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                { icon: Zap, text: "AI Product Upload" },
                { icon: Clock, text: "60 Sec Setup" },
                { icon: MessageCircle, text: "WhatsApp Orders" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                  <item.icon className="w-3.5 h-3.5 text-accent" />
                  <span className="text-white/80 text-xs font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Link to="/join">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-6 py-5 rounded-xl shadow-lg shadow-accent/20 group w-full sm:w-auto">
                  Start Free — No Card Needed
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-base px-6 py-5 rounded-xl w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["RS", "PP", "MI", "SD"].map((initials, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-xs font-bold text-accent-foreground border-2 border-primary">
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">1,000+ Happy Retailers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className="relative flex justify-center items-center">
            {/* Glow behind model */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-accent/20 rounded-full blur-3xl" />
            </div>

            {/* Main Model Image */}
            <div className="relative z-10">
              <img
                src={modelImage}
                alt="Indian retailer using BizGrow 360"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating Dashboard Cards */}
            <div className="absolute -top-4 -left-4 md:top-4 md:left-0 float-animation z-20">
              <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-4 border border-gray-100 w-44 md:w-52">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">WhatsApp Order</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-2">
                  <p className="text-xs text-green-700 font-medium">🛒 New order from Priya</p>
                  <p className="text-xs text-green-600">3 items • ₹850</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 -right-4 md:right-0 float-animation-delayed z-20">
              <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-4 border border-gray-100 w-40 md:w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">AI Upload</p>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-accent rounded-full w-full" />
                  <p className="text-xs text-gray-600">Product detected!</p>
                  <p className="text-xs text-gray-500">Parle-G Biscuit added ✓</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 -left-4 md:left-4 float-animation z-20">
              <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-4 border border-gray-100 w-44 md:w-52">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900 text-sm">Today's Sales</p>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+23%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">₹12,450</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "73%" }} />
                  </div>
                  <span className="text-xs text-gray-500">73%</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-0 md:right-10 float-animation-delayed z-20">
              <div className="bg-white rounded-xl shadow-xl p-2 md:p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Bell className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Low stock alert! 🔔</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
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
