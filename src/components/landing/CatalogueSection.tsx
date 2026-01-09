import { ExternalLink, Share2, ShoppingCart, Search, Heart, Star, ArrowRight, Link2, Globe, Smartphone, Zap, QrCode } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const CatalogueSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-secondary/30 via-background to-secondary/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left - Enhanced Catalogue Mockup */}
          <AnimatedSection className="relative order-2 lg:order-1" direction="left">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl scale-110 opacity-50" />
            
            {/* Browser Window Mockup */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 max-w-sm sm:max-w-md mx-auto">
              {/* Browser Header */}
              <div className="bg-gray-100 px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-2 sm:gap-4 border-b border-gray-200">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-lg sm:rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2 border border-gray-200 truncate">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                  <span className="font-medium truncate">sharma-store.bizgrow360.in</span>
                </div>
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-primary transition-colors flex-shrink-0" />
              </div>

              {/* Catalogue Content */}
              <div className="p-3 sm:p-5 space-y-3 sm:space-y-5 bg-gradient-to-b from-white to-gray-50/50">
                {/* Store Header */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-base sm:text-xl shadow-lg">
                      SS
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-lg">Sharma Store</h4>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-accent text-accent" />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">4.8 • Kirana</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                    Open
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-gray-100 rounded-lg sm:rounded-xl pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-xs sm:text-sm border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all"
                    readOnly
                  />
                </div>

                {/* Categories */}
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                  {["All", "Snacks", "Beverages", "Dairy", "Personal Care"].map((cat, i) => (
                    <button 
                      key={cat} 
                      className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                        i === 0 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { name: "Parle-G Biscuit", price: "₹20", img: "🍪", badge: "Bestseller" },
                    { name: "Amul Butter", price: "₹55", img: "🧈" },
                    { name: "Maggi Noodles", price: "₹14", img: "🍜", badge: "Popular" },
                    { name: "Tata Tea Gold", price: "₹120", img: "🍵" },
                  ].map((product) => (
                    <div key={product.name} className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 relative group hover:shadow-lg border border-gray-100 transition-all cursor-pointer">
                      {product.badge && (
                        <span className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 text-[8px] sm:text-[10px] bg-accent text-primary font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                          {product.badge}
                        </span>
                      )}
                      <button className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-red-50 transition-colors">
                        <Heart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
                      </button>
                      <div className="text-2xl sm:text-4xl mb-1 sm:mb-2 mt-3 sm:mt-4">{product.img}</div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                      <div className="flex items-center justify-between mt-1.5 sm:mt-2">
                        <span className="text-sm sm:text-base font-bold text-primary">{product.price}</span>
                        <button className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                          <span className="text-white text-sm sm:text-lg leading-none">+</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Bar */}
                <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-white font-bold text-sm sm:text-base">3 items</span>
                      <p className="text-white/70 text-xs sm:text-sm">₹189 total</p>
                    </div>
                  </div>
                  <button className="bg-accent text-primary font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-accent/30 transition-shadow text-xs sm:text-base">
                    Checkout →
                  </button>
                </div>
              </div>
            </div>

            {/* Floating QR code */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 float-animation hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Scan to visit</p>
                  <p className="text-xs text-gray-500">Share on WhatsApp</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Content */}
          <AnimatedSection className="text-center lg:text-left order-1 lg:order-2" direction="right" delay={150}>
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-6 border border-accent/20">
              <Link2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
              <span className="text-accent-foreground text-xs sm:text-sm font-bold">Shareable Store Link</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 font-display leading-tight px-2 sm:px-0">
              Your Own
              <span className="text-primary block">Online Store</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
              Get a beautiful, professional store with your branding. 
              Share on WhatsApp and customers can browse & order instantly.
            </p>

            {/* Feature List */}
            <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-10 px-2 sm:px-0">
              {[
                { icon: Globe, title: "Your Custom Link", desc: "yourstore.bizgrow360.in", color: "from-blue-500 to-cyan-500" },
                { icon: Smartphone, title: "Works Everywhere", desc: "Mobile-first, blazing fast", color: "from-green-500 to-emerald-500" },
                { icon: Share2, title: "One-Tap Share", desc: "Share to WhatsApp groups instantly", color: "from-green-600 to-green-700" },
                { icon: Zap, title: "Real-time Sync", desc: "Stock updates reflect instantly", color: "from-amber-500 to-orange-500" },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 sm:gap-4 text-left">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-base sm:text-lg">{feature.title}</p>
                    <p className="text-muted-foreground text-sm sm:text-base">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/join">
              <RippleButton size="xl" variant="glow" className="font-bold group">
                Create Your Store Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CatalogueSection;
