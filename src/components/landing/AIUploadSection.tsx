import { Camera, Sparkles, Check, Zap, Clock, Brain } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const features = [
  { icon: Zap, text: "Instant recognition" },
  { icon: Clock, text: "Saves 2+ hours daily" },
  { icon: Brain, text: "Learns your products" },
];

const AIUploadSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse,_rgba(255,208,102,0.1)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Content */}
          <AnimatedSection className="text-center lg:text-left" direction="left">
            <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-semibold">AI-Powered Magic</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-display leading-tight">
              Just Snap a Photo,
              <span className="text-accent block">AI Does the Rest</span>
            </h2>

            <p className="text-base md:text-lg text-white/70 mb-8 max-w-lg mx-auto lg:mx-0">
              Our AI recognizes products from India's largest database. No typing, no manual entry. 
              Simply take a photo and watch the magic happen.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <feature.icon className="w-4 h-4 text-accent" />
                  <span className="text-white/90 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { value: "10L+", label: "Products in Database" },
                { value: "99%", label: "Recognition Accuracy" },
                { value: "2 Sec", label: "Average Time" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right - Visual Demo */}
          <AnimatedSection className="relative" direction="right" delay={200}>
            {/* Phone Mockup */}
            <div className="relative mx-auto max-w-xs">
              {/* Phone Frame */}
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-gray-100 px-6 py-2 flex items-center justify-between">
                    <span className="text-xs text-gray-600">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-gray-300" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Add Product</p>
                        <p className="text-xs text-gray-500">AI-powered upload</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    {/* Camera View */}
                    <div className="relative bg-gray-100 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-4 border-2 border-dashed border-primary/50 rounded-xl" />
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">Point camera at product</p>
                      </div>
                      
                      {/* Scanning animation */}
                      <div className="absolute top-4 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
                    </div>

                    {/* Recognition Result */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-green-800">Product Detected!</p>
                          <p className="text-xs text-green-600 mt-0.5">Parle-G Biscuit 250g</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">₹20 MRP</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Biscuits</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add Button */}
                    <button className="w-full bg-primary text-white rounded-xl py-3 font-semibold text-sm">
                      Add to Catalogue ✓
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-3 float-animation">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <Brain className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">AI Learning</p>
                    <p className="text-[10px] text-gray-500">Getting smarter</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-3 float-animation-delayed">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">15 Added</p>
                    <p className="text-[10px] text-gray-500">in 2 minutes</p>
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
