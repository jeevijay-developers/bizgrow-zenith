import { motion } from "framer-motion";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import { BizgrowTag } from "@/components/ui/bizgrow-tag";
import aiScanningDemo from "@/assets/ai-scanning-demo.jpg";

const detectionFeatures = [
  "Detects 1000+ product types",
  "Works in any lighting",
  "Bulk scan from shelf photos",
  "Market price suggestions",
  "Auto-categorization",
  "Hindi/Regional language labels",
];

const ScanningVisual = () => (
  <img
    src={aiScanningDemo}
    alt="AI detecting a product on a store shelf via phone camera"
    className="w-full h-auto rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]"
  />
);

const AIScanningSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/3 right-[5%] w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full min-w-0">
          {/* Desktop Left - Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block relative w-full min-w-0"
          >
            <ScanningVisual />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full min-w-0 max-w-full text-center sm:text-left"
          >
            <div className="mb-6">
              <BizgrowTag icon={Sparkles}>AI Product Detection</BizgrowTag>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display break-words">
              Snap, Scan,
              <span className="text-gold block mt-2">Sell in Seconds</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed break-words">
              Simply point your phone camera at products. Our AI instantly recognizes items, 
              suggests prices from market data, and auto-categorizes everything. 
              <strong className="text-foreground"> No manual typing needed.</strong>
            </p>

            {/* Mobile View - Image below section description */}
            <div className="block lg:hidden mb-8 w-full min-w-0">
              <ScanningVisual />
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {detectionFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link to="/join">
                <RippleButton size="lg" className="btn-gradient-accent text-accent-foreground font-bold h-12 px-6 group">
                  Try AI Upload Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIScanningSection;
