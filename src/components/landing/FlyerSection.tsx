import { motion } from "framer-motion";
import { Image as ImageIcon, Palette, ArrowRight, Sparkles, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import { BizgrowTag } from "@/components/ui/bizgrow-tag";
import whatsappIcon from "@/assets/whatsapp-tile.svg";
import instagramIcon from "@/assets/instagram-icon.webp";
import facebookIcon from "@/assets/facebook-icon.png";

import marketingPosterImg from "@/assets/marketing-poster-builder.jpg";

const flyerTypes = ["Diwali Sale", "Holi Offers", "New Arrivals", "Weekend Deals"];

const flyerFeatures = [
  "100+ Festival Templates",
  "Auto-pick Best Products",
  "Brand Colors & Logo",
  "Hindi/Regional Text",
  "One-click WhatsApp Share",
  "Instagram/Facebook Ready",
];

const FlyerVisual = () => (
  <div className="relative mx-auto max-w-[340px] sm:max-w-[390px] lg:max-w-[430px]">
    {/* Ambient Background Glow */}
    <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/25 via-primary/20 to-orange-500/25 rounded-[36px] blur-2xl -z-10" />

    {/* Main Image Container */}
    <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border-2 border-border/80 shadow-2xl bg-card aspect-[4/5] max-h-[520px] w-full">
      <img
        src={marketingPosterImg}
        alt="Store owner creating 1-click festive marketing poster on tablet with BizGrow 360"
        className="w-full h-full object-cover object-center block scale-110 -rotate-[4.5deg] origin-center"
      />

      {/* Floating Top Badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>1-Click Festival Poster</span>
      </motion.div>
    </div>
  </div>
);

const FlyerSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-[5%] w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full min-w-0">
          {/* Desktop Left - Flyer Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block relative w-full min-w-0"
          >
            <FlyerVisual />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full min-w-0 max-w-full text-center sm:text-left"
          >
            <div className="mb-6">
              <BizgrowTag icon={ImageIcon}>Auto Flyer Creation</BizgrowTag>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display break-words">
              Marketing Posters
              <span className="text-gold block mt-2">In One Click</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed break-words">
              Select your products, pick a festival template, and let AI create stunning promotional 
              flyers with your branding. Share directly to WhatsApp, Instagram, and Facebook.
            </p>

            {/* Mobile View - Flyer Preview below section description */}
            <div className="block lg:hidden mb-8 w-full min-w-0">
              <FlyerVisual />
            </div>

            {/* Flyer Types */}
            <div className="grid grid-cols-2 justify-items-stretch sm:flex sm:flex-wrap gap-2.5 mb-6">
              {flyerTypes.map((type) => (
                <BizgrowTag key={type} className="text-xs uppercase tracking-wider justify-center">
                  {type}
                </BizgrowTag>
              ))}
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {flyerFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start mb-8">
              <Link to="/join">
                <RippleButton size="lg" className="btn-gradient-accent text-accent-foreground font-bold h-12 px-6 group">
                  <Palette className="w-4 h-4 mr-2" />
                  Create Free Flyers
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
            </div>

            {/* Share Icons */}
            <div className="flex items-center justify-center sm:justify-start gap-3.5">
              <span className="text-sm font-medium text-muted-foreground">Share to:</span>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center bg-white border border-border/50 p-0.5">
                  <img src={whatsappIcon} alt="Share on WhatsApp" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center bg-white border border-border/50 p-0.5">
                  <img src={instagramIcon} alt="Share on Instagram" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center bg-white border border-border/50 p-0.5">
                  <img src={facebookIcon} alt="Share on Facebook" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FlyerSection;
