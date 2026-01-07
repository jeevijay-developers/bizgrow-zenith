import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, MessageCircle, ShoppingCart, Star } from "lucide-react";
import modelImage from "@/assets/bizgrow-model.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-20">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-up">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20">
              <div className="flex -space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground border-2 border-primary">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-primary-foreground/90 text-sm font-medium">
                Trusted by 1,000+ retailers
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight font-display">
              Grow Your
              <span className="text-gradient block">Retail Business</span>
              with AI & WhatsApp
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0">
              The all-in-one platform for Indian retailers. Digital catalogue, AI-powered inventory, 
              WhatsApp orders, and smart billing — all in one simple app.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/join">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 py-6 rounded-xl shadow-glow-accent group">
                  Join as Retailer
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-xl">
                Book a Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/10">
              {[
                { value: "50K+", label: "Orders Processed" },
                { value: "₹2Cr+", label: "Revenue Generated" },
                { value: "10K+", label: "Products Listed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image with Floating Elements */}
          <div className="relative flex justify-center items-center">
            {/* Main Model Image */}
            <div className="relative z-10">
              <img
                src={modelImage}
                alt="Indian retailer using BizGrow 360"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating UI Elements */}
            <div className="absolute top-10 -left-4 md:left-10 float-animation">
              <div className="bg-card rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground text-sm">WhatsApp Order</p>
                    <p className="text-xs text-muted-foreground">2 items • ₹450</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/3 -right-4 md:right-0 float-animation-delayed">
              <div className="bg-card rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Bell className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground text-sm">New Order! 🎉</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 -left-4 md:left-5 float-animation">
              <div className="bg-card rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground text-sm">Today's Sales</p>
                    <p className="text-lg font-bold text-green-600">₹12,450</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute top-20 left-0 w-24 h-24 bg-primary-foreground/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
