import { ExternalLink, Share2, ShoppingCart, Search, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const CatalogueSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,208,102,0.05)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Catalogue Mockup */}
          <AnimatedSection className="relative order-2 lg:order-1" direction="left">
            {/* Browser Window Mockup */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 max-w-md mx-auto">
              {/* Browser Header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-500 flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  <span>sharma-store.bizgrow360.in</span>
                </div>
                <Share2 className="w-4 h-4 text-gray-400" />
              </div>

              {/* Catalogue Content */}
              <div className="p-4 space-y-4">
                {/* Store Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
                      SS
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sharma Store</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span className="text-xs text-gray-500">4.8 • Kirana</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                    Open Now
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-gray-50 rounded-xl pl-10 pr-4 py-2.5 text-sm border border-gray-100 focus:outline-none focus:border-primary/50"
                    readOnly
                  />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {["All", "Snacks", "Beverages", "Dairy", "Personal Care"].map((cat, i) => (
                    <button 
                      key={cat} 
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        i === 0 ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Parle-G Biscuit", price: "₹20", img: "🍪" },
                    { name: "Amul Butter", price: "₹55", img: "🧈" },
                    { name: "Maggi Noodles", price: "₹14", img: "🍜" },
                    { name: "Tata Tea Gold", price: "₹120", img: "🍵" },
                  ].map((product) => (
                    <div key={product.name} className="bg-gray-50 rounded-xl p-3 relative group hover:bg-gray-100 transition-colors">
                      <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center">
                        <Heart className="w-3 h-3 text-gray-400" />
                      </button>
                      <div className="text-3xl mb-2">{product.img}</div>
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-primary">{product.price}</span>
                        <button className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white text-xs">+</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Bar */}
                <div className="bg-primary rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <span className="text-white text-sm">3 items • ₹189</span>
                  </div>
                  <button className="bg-accent text-accent-foreground text-sm font-bold px-4 py-1.5 rounded-lg">
                    Checkout
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
          </AnimatedSection>

          {/* Right - Content */}
          <AnimatedSection className="text-center lg:text-left order-1 lg:order-2" direction="right" delay={150}>
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 mb-6">
              <ExternalLink className="w-4 h-4 text-accent" />
              <span className="text-accent-foreground text-sm font-semibold">Shareable Link</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display leading-tight">
              Your Own Digital
              <span className="text-primary block">Online Catalogue</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Get a beautiful, professional catalogue with your store's branding. 
              Share the link on WhatsApp, and customers can browse and order instantly.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                { title: "Custom Store Link", desc: "yourstore.bizgrow360.in" },
                { title: "Works Offline", desc: "Customers can browse even without internet" },
                { title: "WhatsApp Sharing", desc: "One-tap share to customer groups" },
                { title: "Real-time Updates", desc: "Stock changes reflect instantly" },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-xl shadow-lg shadow-primary/20">
              Create Your Catalogue →
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CatalogueSection;
