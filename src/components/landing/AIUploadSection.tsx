import { Camera, Sparkles, Check, Zap, Clock, Brain, ArrowRight, Scan, CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { RippleButton } from "@/components/ui/ripple-button";
import { Link } from "react-router-dom";

const features = [
  { icon: Zap, text: "Instant detection", color: "from-amber-400 to-orange-500" },
  { icon: Clock, text: "Saves 2+ hours daily", color: "from-blue-400 to-cyan-500" },
  { icon: Brain, text: "Gets smarter", color: "from-purple-400 to-violet-500" },
];

const AIUploadSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse,_rgba(255,208,102,0.15)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
        {/* Animated particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-accent/50 rounded-full animate-ping" />
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-accent/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <AnimatedSection className="text-center lg:text-left" direction="left">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-accent/30">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-bold">AI-Powered Magic</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
              Just Snap a Photo,
              <span className="text-accent block mt-2">AI Does Everything</span>
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg mx-auto lg:mx-0">
              Our AI instantly recognizes products from India's largest database. 
              No typing, no manual entry — just click and add.
            </p>

            {/* Enhanced Features */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/15">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 mb-10">
              {[
                { value: "10L+", label: "Products in Database" },
                { value: "99%", label: "Recognition Accuracy" },
                { value: "<2s", label: "Average Time" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/join">
              <RippleButton size="xl" variant="glow-accent" className="font-bold group">
                Try AI Upload Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
          </AnimatedSection>

          {/* Right - Enhanced Visual Demo */}
          <AnimatedSection className="relative" direction="right" delay={200}>
            {/* Glow behind phone */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
            </div>

            {/* Phone Mockup */}
            <div className="relative mx-auto max-w-xs">
              {/* Phone Frame */}
              <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/50 border border-gray-700">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-gray-100 px-6 py-2.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600">9:41</span>
                    <div className="w-20 h-6 bg-gray-900 rounded-full mx-auto" />
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-sm bg-gray-400" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-5 space-y-5 bg-gradient-to-b from-gray-50 to-white">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900">Add Product</p>
                        <p className="text-sm text-gray-500">AI-powered upload</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Camera View */}
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
                      {/* Scan frame */}
                      <div className="absolute inset-6 border-2 border-primary/50 rounded-2xl">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                      </div>
                      
                      <div className="text-center z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-3">
                          <Camera className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">Point at product</p>
                      </div>
                      
                      {/* Scanning animation */}
                      <div className="absolute top-6 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
                    </div>

                    {/* Recognition Result */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-green-800">Product Detected!</p>
                          <p className="text-sm text-green-600 mt-0.5">Parle-G Biscuit 250g</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">₹20 MRP</span>
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Biscuits</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add Button */}
                    <button className="w-full bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Add to Catalogue
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 float-animation">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">AI Learning</p>
                    <p className="text-xs text-gray-500">Getting smarter daily</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 float-animation-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">15 Products</p>
                    <p className="text-xs text-gray-500">Added in 2 min</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AIUploadSection;
