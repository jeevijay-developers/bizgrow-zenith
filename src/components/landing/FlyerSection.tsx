import { motion } from "framer-motion";
import { Image as ImageIcon, Palette, Share2, ArrowRight, Sparkles, Check, Instagram, Facebook, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";

const flyerTypes = [
  { name: "Diwali Sale", color: "from-orange-500 to-red-500" },
  { name: "Holi Offers", color: "from-pink-500 to-purple-500" },
  { name: "New Arrivals", color: "from-blue-500 to-cyan-500" },
  { name: "Weekend Deals", color: "from-green-500 to-emerald-500" },
];

const flyerFeatures = [
  "100+ Festival Templates",
  "Auto-pick Best Products",
  "Brand Colors & Logo",
  "Hindi/Regional Text",
  "One-click WhatsApp Share",
  "Instagram/Facebook Ready",
];

const FlyerSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-[10%] w-72 h-72 bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-[5%] w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Flyer Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Flyer Card */}
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative z-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 shadow-2xl max-w-sm mx-auto"
            >
              <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 rounded-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    🪔 DIWALI SALE
                  </span>
                  <span className="text-white/80 text-xs">Sharma Store</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">FLAT 30% OFF</h3>
                <p className="text-white/90 text-sm mb-4">On All Products</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="w-full h-12 bg-white/30 rounded mb-1" />
                      <p className="text-white text-xs">₹{99 * i}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> Valid till 15 Nov</p>
                  <p className="text-white text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> 98765 43210</p>
                </div>
              </div>
            </motion.div>

            {/* Background Flyers */}
            <motion.div
              animate={{ rotate: [5, 8, 5] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-4 right-4 z-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 w-48 h-48 shadow-xl opacity-60"
            />
            <motion.div
              animate={{ rotate: [-8, -5, -8] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-8 left-4 z-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 w-40 h-40 shadow-xl opacity-40"
            />

            {/* AI Badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-4 bottom-1/4 z-30 bg-background border border-border rounded-xl p-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-foreground">AI Generated</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-2 mb-6">
              <ImageIcon className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-semibold text-pink-600">Auto Flyer Creation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
              Marketing Posters
              <span className="text-pink-500 block mt-2">In One Click</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Select your products, pick a festival template, and let AI create stunning promotional 
              flyers with your branding. Share directly to WhatsApp, Instagram, and Facebook.
            </p>

            {/* Flyer Types */}
            <div className="flex flex-wrap gap-2 mb-6">
              {flyerTypes.map((type) => (
                <span
                  key={type.name}
                  className={`bg-gradient-to-r ${type.color} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                >
                  {type.name}
                </span>
              ))}
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {flyerFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-500 shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Share Icons */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm text-muted-foreground">Share to:</span>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <Link to="/join">
              <RippleButton size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 text-white font-bold h-12 px-6 group">
                <Palette className="w-4 h-4 mr-2" />
                Create Free Flyers
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FlyerSection;
