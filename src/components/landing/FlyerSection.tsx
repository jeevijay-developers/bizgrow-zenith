import { motion } from "framer-motion";
import { Image as ImageIcon, Palette, Share2, ArrowRight, Sparkles, Check, Instagram, Facebook, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";

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
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
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
              className="relative z-20 bg-ledger-ink rounded-2xl p-6 shadow-ledger max-w-sm mx-auto"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-ledger-paper text-ledger-ink text-xs font-grotesk font-semibold px-3 py-1 rounded-full">
                    🪔 DIWALI SALE
                  </span>
                  <span className="text-ledger-paper/70 text-xs font-grotesk">Sharma Store</span>
                </div>
                <h3 className="font-ledger text-3xl font-semibold text-ledger-paper mb-2">FLAT 30% OFF</h3>
                <p className="text-ledger-paper/90 text-sm font-grotesk mb-4">On All Products</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-ledger-paper/15 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="w-full h-12 bg-ledger-paper/20 rounded mb-1" />
                      <p className="text-ledger-paper text-xs font-grotesk">₹{99 * i}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-ledger-paper text-xs font-grotesk flex items-center gap-1"><MapPin className="w-3 h-3" /> Valid till 15 Nov</p>
                  <p className="text-ledger-paper text-xs font-grotesk flex items-center gap-1"><Phone className="w-3 h-3" /> 98765 43210</p>
                </div>
              </div>
            </motion.div>

            {/* Background Flyers */}
            <motion.div
              animate={{ rotate: [5, 8, 5] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-4 right-4 z-10 bg-ledger-paper border border-ledger-rule rounded-2xl p-4 w-48 h-48 shadow-ledger-sm"
            />
            <motion.div
              animate={{ rotate: [-8, -5, -8] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-8 left-4 z-0 bg-ledger-paper border border-ledger-rule rounded-2xl p-4 w-40 h-40 shadow-ledger-sm opacity-70"
            />

            {/* AI Badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-4 bottom-1/4 z-30 bg-ledger-paper border border-ledger-rule rounded-xl p-3 shadow-ledger"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ledger-ink/70" />
                <span className="text-sm font-grotesk font-semibold text-ledger-ink">AI Generated</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <EyebrowTag icon={ImageIcon} className="mb-6">Auto Flyer Creation</EyebrowTag>

            <h2 className="font-ledger text-3xl sm:text-4xl md:text-5xl font-semibold text-ledger-ink mb-6">
              Marketing Posters
              <span className="block mt-2">In One Click</span>
            </h2>

            <p className="font-grotesk text-lg text-ledger-ink/65 mb-8 leading-relaxed">
              Select your products, pick a festival template, and let AI create stunning promotional
              flyers with your branding. Share directly to WhatsApp, Instagram, and Facebook.
            </p>

            {/* Flyer Types */}
            <div className="flex flex-wrap gap-2 mb-6">
              {flyerTypes.map((type) => (
                <span
                  key={type.name}
                  className="border border-ledger-rule text-ledger-ink text-xs font-grotesk font-semibold px-3 py-1.5 rounded-full"
                >
                  {type.name}
                </span>
              ))}
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {flyerFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ledger-sage shrink-0" />
                  <span className="text-sm font-grotesk text-ledger-ink">{feature}</span>
                </div>
              ))}
            </div>

            {/* Share Icons */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-grotesk text-ledger-ink/60">Share to:</span>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-full border border-ledger-rule flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-ledger-ink/70" />
                </div>
                <div className="w-10 h-10 rounded-full border border-ledger-rule flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-ledger-ink/70" />
                </div>
                <div className="w-10 h-10 rounded-full border border-ledger-rule flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-ledger-ink/70" />
                </div>
              </div>
            </div>

            <Link to="/join">
              <RippleButton size="lg" className="bg-ledger-ink text-ledger-paper hover:bg-ledger-marigold hover:text-ledger-ink font-grotesk font-semibold h-12 px-6 group">
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
